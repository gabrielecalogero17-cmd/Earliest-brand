import React from 'react';
import { type Lead } from '../data/localLeads';

interface StatsGridProps {
  leads: Lead[];
}

export const StatsGrid: React.FC<StatsGridProps> = ({ leads }) => {
  const total = leads.length;
  const daContattare = leads.filter(l => (l.status || 'new') === 'new').length;
  const contattiAvviati = leads.filter(l => (l.status === 'contacted' || l.status === 'followup')).length;
  const booked = leads.filter(l => l.status === 'booked').length;
  const closed = leads.filter(l => l.status === 'closed').length;

  return (
    <div className="stats-grid">
      <div className="stat-card total">
        <span className="stat-num">{total}</span>
        <span className="stat-label">Totale Lead</span>
      </div>
      <div className="stat-card todo">
        <span className="stat-num">{daContattare}</span>
        <span className="stat-label">Da Contattare</span>
      </div>
      <div className="stat-card contacted">
        <span className="stat-num">{contattiAvviati}</span>
        <span className="stat-label">Contatti Avviati</span>
      </div>
      <div className="stat-card booked">
        <span className="stat-num">{booked}</span>
        <span className="stat-label">Call Prenotate</span>
      </div>
      <div className="stat-card closed">
        <span className="stat-num">{closed}</span>
        <span className="stat-label">Chiusi</span>
      </div>
    </div>
  );
};
