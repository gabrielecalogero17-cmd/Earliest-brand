import { createClient } from '@supabase/supabase-js';
import { type Lead, allLeads } from '../data/localLeads';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = 
  supabaseUrl.trim() !== '' && 
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  supabaseAnonKey.trim() !== '' &&
  supabaseAnonKey !== 'your-anon-public-key';

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export async function testSupabaseConnection(): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from('leads').select('id').limit(1);
    if (error) {
      console.warn('Supabase reachable but query returned error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to establish connection to Supabase:', err);
    return false;
  }
}

// Local storage keys
const LOCAL_LEADS_KEY = 'the_earliest_crm_leads';

// In-memory local state fallback initialization
function getLocalFallbackLeads(): Lead[] {
  const local = localStorage.getItem(LOCAL_LEADS_KEY);
  if (local) {
    try {
      return JSON.parse(local);
    } catch (e) {
      console.error('Failed to parse local storage leads, resetting:', e);
    }
  }
  // If not in local storage, initialize with allLeads and default status/notes
  const initialized = allLeads.map((l: Lead) => ({
    ...l,
    status: 'new',
    notes: ''
  }));
  localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(initialized));
  return initialized;
}

/**
 * Fetch all leads. Triggers a database query if online, 
 * otherwise returns the cache from Local Storage.
 */
export async function fetchLeads(): Promise<Lead[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('id', { ascending: true });
        
      if (!error && data) {
        // Cache to localStorage to keep offline sync
        localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(data));
        return data as Lead[];
      }
      console.warn('Error fetching from Supabase, returning local cache:', error?.message);
    } catch (err) {
      console.error('Failed to fetch from Supabase, returning local cache:', err);
    }
  }
  return getLocalFallbackLeads();
}

/**
 * Updates an existing lead's status or notes.
 */
export async function updateLead(id: number, updates: Partial<Lead>): Promise<boolean> {
  let success = false;
  
  // 1. Sync to Supabase if connected
  if (supabase) {
    try {
      const { error } = await supabase
        .from('leads')
        .update(updates)
        .eq('id', id);
      if (!error) {
        success = true;
      } else {
        console.error('Supabase update failed:', error.message);
      }
    } catch (err) {
      console.error('Supabase update exception:', err);
    }
  }

  // 2. Always sync to Local Storage cache
  const local = getLocalFallbackLeads();
  const index = local.findIndex(l => l.id === id);
  if (index !== -1) {
    local[index] = { ...local[index], ...updates };
    localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(local));
    if (!supabase) success = true; // offline update success
  }

  return success;
}

/**
 * Inserts a new lead into the database.
 * If offline, generates a new ID and saves to Local Storage.
 */
export async function addLead(lead: Omit<Lead, 'id'> & { id?: number }): Promise<Lead | null> {
  const localLeads = getLocalFallbackLeads();
  
  // Calculate next ID
  let nextId = lead.id;
  if (!nextId) {
    nextId = localLeads.length > 0 
      ? Math.max(...localLeads.map(l => l.id)) + 1 
      : 1;
  }

  const newLead: Lead = {
    ...lead,
    id: nextId,
    status: lead.status || 'new',
    notes: lead.notes || ''
  };

  let success = false;

  // 1. Save to Supabase if connected
  if (supabase) {
    try {
      const { error } = await supabase
        .from('leads')
        .insert([newLead]);
      if (!error) {
        success = true;
      } else {
        console.error('Supabase insert failed:', error.message);
      }
    } catch (err) {
      console.error('Supabase insert exception:', err);
    }
  }

  // 2. Always sync to Local Storage cache
  localLeads.push(newLead);
  localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(localLeads));
  if (!supabase) success = true; // offline insert success

  return success || supabase ? newLead : null;
}
