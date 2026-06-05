import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { StatsGrid } from './components/StatsGrid';
import { ControlsPanel } from './components/ControlsPanel';
import { LeadsTable } from './components/LeadsTable';
import { OutreachModal } from './components/OutreachModal';
import { AddLeadModal } from './components/AddLeadModal';
import { PriceList } from './components/PriceList';
import type { Lead } from './data/localLeads';
import { fetchLeads, updateLead, addLead, testSupabaseConnection } from './lib/supabaseClient';

function App() {
  const [activeSection, setActiveSection] = useState<'leads' | 'prices'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(false);
  
  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modals state
  const [outreachLead, setOutreachLead] = useState<Lead | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Load leads and check connection status
  useEffect(() => {
    const initApp = async () => {
      setIsLoading(true);
      const online = await testSupabaseConnection();
      setIsOnline(online);
      
      const data = await fetchLeads();
      setLeads(data);
      setIsLoading(false);
    };
    initApp();
  }, []);

  const handleUpdateLead = async (id: number, updates: Partial<Lead>) => {
    const success = await updateLead(id, updates);
    if (success) {
      setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, ...updates } : lead));
    }
    return success;
  };

  const handleAddLead = async (newLeadData: Omit<Lead, 'id'>) => {
    const added = await addLead(newLeadData);
    if (added) {
      setLeads(prev => [...prev, added]);
      triggerToast('Nuovo lead salvato con successo!');
      return true;
    }
    return false;
  };

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleExportCSV = () => {
    const headers = 'id,target,name,location,phone,email,instagram,status,notes\n';
    
    const escapeCsv = (val: any) => {
      if (val === null || val === undefined) return '';
      const str = String(val);
      if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const rows = filteredLeads.map(lead => [
      lead.id,
      escapeCsv(lead.target),
      escapeCsv(lead.name),
      escapeCsv(lead.location),
      escapeCsv(lead.phone),
      escapeCsv(lead.email),
      escapeCsv(lead.instagram),
      escapeCsv(lead.status || 'new'),
      escapeCsv(lead.notes || '')
    ].join(',')).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_export_${selectedCategory}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('File CSV scaricato con successo!');
  };

  // Perform client-side search and category filtering
  const filteredLeads = leads.filter(lead => {
    const matchesCategory = selectedCategory === 'all' || lead.target === selectedCategory;
    
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch = 
      lead.name.toLowerCase().includes(query) ||
      lead.location.toLowerCase().includes(query) ||
      (lead.phone && lead.phone.toLowerCase().includes(query)) ||
      (lead.email && lead.email.toLowerCase().includes(query)) ||
      (lead.instagram && lead.instagram.toLowerCase().includes(query)) ||
      (lead.notes && lead.notes.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app-container">
      {/* Ambient backgrounds */}
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>

      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        isOnline={isOnline} 
      />

      <main className="main-content">
        {isLoading ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
            gap: '1rem'
          }}>
            <span className="material-symbols-outlined spin" style={{ fontSize: '3rem', color: 'var(--primary)' }}>
              hourglass_empty
            </span>
            <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
              Caricamento database lead in corso...
            </p>
          </div>
        ) : activeSection === 'leads' ? (
          <>
            <header style={{ marginBottom: '2.5rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)', fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase' }}>
                The Earliest Brand • CRM Consolle
              </p>
              <h1 style={{
                fontFamily: 'var(--font-head)',
                fontSize: '2.8rem',
                fontWeight: 700,
                marginTop: '0.5rem',
                background: 'linear-gradient(135deg, #fff 40%, var(--primary) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                ANAGRAFICA LEAD PROFILATI
              </h1>
            </header>

            <StatsGrid leads={leads} />

            <ControlsPanel
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onExport={handleExportCSV}
              onOpenAddModal={() => setIsAddModalOpen(true)}
              leads={leads}
            />

            <LeadsTable
              leads={filteredLeads}
              onUpdateLead={handleUpdateLead}
              onSelectOutreach={(lead) => setOutreachLead(lead)}
            />
          </>
        ) : (
          <PriceList />
        )}
      </main>

      {/* Modals */}
      <OutreachModal
        isOpen={outreachLead !== null}
        lead={outreachLead}
        onClose={() => setOutreachLead(null)}
        showToast={triggerToast}
      />

      <AddLeadModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddLead}
      />

      {/* Success/Error Toast notification */}
      <div className={`toast-notification ${showToast ? 'show' : ''}`}>
        <span className="material-symbols-outlined">verified</span>
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}

export default App;
