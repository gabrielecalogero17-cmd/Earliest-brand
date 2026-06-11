import { supabase } from './supabase';

export interface BookingPayload {
  readonly booking_id_db?: string | null;
  first_name: string;
  last_name?: string | null;
  e_mail?: string | null;
  phone_number?: string | null;
  booking_date?: string | null;
  type?: string | null;
  booking_accepted?: boolean | null;
  notes?: string | null;
  appointment_complete?: boolean | null;
  is_deleted?: boolean | null;
  profile_id?: string | null;
}

export interface BookingResult {
  success: boolean;
  error?: string;
  booking?: BookingPayload;
}

export async function createBooking(payload: BookingPayload): Promise<BookingResult> {
  try {
    const booking_id_db =
      payload.booking_id_db ||
      (typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          }));

    let bookingDateToSave = null;
    if (payload.booking_date) {
      if (payload.booking_date.includes('T')) {
        // Assume format is YYYY-MM-DDTHH:mm:ss
        // Remove trailing Z if present to ensure it's saved exactly as local time
        bookingDateToSave = payload.booking_date.replace('Z', '');
      } else {
        bookingDateToSave = payload.booking_date;
      }
    }

    const { data, error } = await supabase
      .from('Booking')
      .insert([
        {
          ...payload,
          booking_id_db,
          booking_date: bookingDateToSave,
          is_deleted: false,
        },
      ])
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, booking: data };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}
