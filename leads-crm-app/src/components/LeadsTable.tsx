import React, { useState, useEffect } from 'react';
import { type Lead } from '../data/localLeads';

interface LeadsTableProps {
  leads: Lead[];
  onUpdateLead: (id: number, updates: Partial<Lead>) => Promise<boolean>;
  onSelectOutreach: (lead: Lead) => void;
}

export const LeadsTable: React.FC<LeadsTableProps> = ({
  leads,
  onUpdateLead,
  onSelectOutreach
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [noteValues, setNoteValues] = useState<{ [key: number]: string }>({});

  // Reset to page 1 if list changes
  useEffect(() => {
    setCurrentPage(1);
  }, [leads]);

  // Synchronize notes local states with parent props when page changes
  useEffect(() => {
    const notesMap: { [key: number]: string } = {};
    leads.forEach(lead => {
      notesMap[lead.id] = lead.notes || '';
    });
    setNoteValues(prev => ({ ...prev, ...notesMap }));
  }, [leads, currentPage, pageSize]);

  const totalCount = leads.length;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalCount);
  const paginatedLeads = leads.slice(startIndex, endIndex);

  const handleStatusChange = async (leadId: number, newStatus: string) => {
    await onUpdateLead(leadId, { status: newStatus });
  };

  const handleNoteBlur = async (leadId: number) => {
    const updatedNote = noteValues[leadId] ?? '';
    const originalLead = leads.find(l => l.id === leadId);
    if (originalLead && originalLead.notes !== updatedNote) {
      await onUpdateLead(leadId, { notes: updatedNote });
    }
  };

  const handleNoteChange = (leadId: number, value: string) => {
    setNoteValues(prev => ({ ...prev, [leadId]: value }));
  };

  const formatTarget = (target: string) => {
    const labels: { [key: string]: string } = {
      estetica: '✨ Estetica',
      realestate: '🏰 Real Estate',
      dentisti: '🦷 Dentisti',
      hotellerie: '🏨 Hotel',
      boutique: '👗 Boutique',
      profumeria: '🧪 Profumeria',
      artigianato: '⚒️ Artigianato',
      d2c: '🛒 D2C'
    };
    return labels[target] || target.toUpperCase();
  };

  const cleanPhone = (phone: string) => {
    return phone.replace(/[^0-9+]/g, '');
  };

  return (
    <div className="directory-card">
      <div className="table-responsive">
        <table className="leads-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>ID</th>
              <th style={{ width: '130px' }}>Target</th>
              <th style={{ width: '220px' }}>Nome Referente</th>
              <th style={{ width: '150px' }}>Località</th>
              <th style={{ width: '120px' }}>Contatti</th>
              <th style={{ width: '170px' }}>Stato CRM</th>
              <th>Note Closer</th>
              <th style={{ width: '120px' }}>Azione</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLeads.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  Nessun lead trovato corrispondente ai filtri attivi.
                </td>
              </tr>
            ) : (
              paginatedLeads.map(lead => (
                <tr key={lead.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    #{lead.id}
                  </td>
                  <td>
                    <span className={`target-badge b-${lead.target}`}>
                      {formatTarget(lead.target)}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600, color: '#fff' }}>
                    {lead.name}
                  </td>
                  <td>
                    {lead.location}
                  </td>
                  <td>
                    <div className="action-group">
                      {lead.phone && (
                        <>
                          <a 
                            href={`tel:${lead.phone}`} 
                            className="quick-contact-btn" 
                            title={`Chiama ${lead.phone}`}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>call</span>
                          </a>
                          <a 
                            href={`https://wa.me/${cleanPhone(lead.phone)}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="quick-contact-btn whatsapp-style" 
                            title="Chat WhatsApp"
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>chat</span>
                          </a>
                        </>
                      )}
                      {lead.email && (
                        <a 
                          href={`mailto:${lead.email}`} 
                          className="quick-contact-btn" 
                          title={`Email a ${lead.email}`}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>mail</span>
                        </a>
                      )}
                      {lead.instagram && (
                        <a 
                          href={`https://instagram.com/${lead.instagram.replace('@', '')}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="quick-contact-btn" 
                          title="Profilo Instagram"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>photo_camera</span>
                        </a>
                      )}
                    </div>
                  </td>
                  <td>
                    <select
                      className={`status-select s-${lead.status || 'new'}`}
                      value={lead.status || 'new'}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                    >
                      <option value="new">Nuovo Lead</option>
                      <option value="contacted">Contattato</option>
                      <option value="followup">Follow-up</option>
                      <option value="booked">Call Prenotata</option>
                      <option value="closed">Chiuso (Vinto)</option>
                      <option value="lost">Perso (Perso)</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="note-input"
                      placeholder="Aggiungi note..."
                      value={noteValues[lead.id] ?? ''}
                      onChange={(e) => handleNoteChange(lead.id, e.target.value)}
                      onBlur={() => handleNoteBlur(lead.id)}
                    />
                  </td>
                  <td>
                    <button className="btn-action-script" onClick={() => onSelectOutreach(lead)}>
                      <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>send</span>
                      Outreach
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalCount > 0 && (
        <div className="pagination-row">
          <div>
            Mostrati <strong>{startIndex + 1} - {endIndex}</strong> di <strong>{totalCount}</strong> contatti
          </div>
          
          <div className="pagination-controls">
            <span style={{ marginRight: '1rem', fontSize: '0.8rem' }}>
              Righe per pagina:
              <select 
                value={pageSize} 
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                style={{ 
                  background: 'rgba(5, 5, 7, 0.85)', 
                  border: '1px solid var(--border-color)', 
                  color: '#fff',
                  marginLeft: '0.5rem',
                  padding: '0.2rem',
                  borderRadius: '4px'
                }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </span>

            <button 
              className="pagination-btn" 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1}
            >
              Precedente
            </button>
            
            <span style={{ padding: '0 0.5rem' }}>
              Pagina <strong>{currentPage}</strong> di {totalPages}
            </span>

            <button 
              className="pagination-btn" 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages}
            >
              Successiva
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
