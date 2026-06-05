import React, { useState, useEffect } from 'react';
import { type Lead } from '../data/localLeads';
import { sectorScripts } from '../data/sectorScripts';

interface OutreachModalProps {
  isOpen: boolean;
  lead: Lead | null;
  onClose: () => void;
  showToast: (message: string) => void;
}

type ScriptAngle = 'conversational' | 'direct' | 'bold';

export const OutreachModal: React.FC<OutreachModalProps> = ({
  isOpen,
  lead,
  onClose,
  showToast
}) => {
  const [angle, setAngle] = useState<ScriptAngle>('conversational');
  const [customName, setCustomName] = useState('');
  const [customLocation, setCustomLocation] = useState('');
  const [driveLink, setDriveLink] = useState('https://drive.google.com/drive/folders/1A_t2B3w4_Earliest_Brand');

  useEffect(() => {
    if (lead) {
      setCustomName(lead.name);
      setCustomLocation(lead.location);
      setAngle('conversational');
    }
  }, [lead]);

  if (!isOpen || !lead) return null;

  // Get script template for target & angle
  const targetKey = lead.target in sectorScripts ? lead.target : 'estetica';
  const template = sectorScripts[targetKey]?.[angle] || '';

  // Process template variables
  const processedScript = template
    .replace(/{NAME}/g, customName)
    .replace(/{LOCATION}/g, customLocation)
    .replace(/{DRIVE}/g, driveLink);

  const handleCopy = () => {
    navigator.clipboard.writeText(processedScript);
    showToast('Script copiato con successo negli appunti!');
  };

  const angleLabels = {
    conversational: '💬 Conversazionale / DM Corto',
    direct: '🎯 Diretto / Presentazione Valore',
    bold: '⚡ Angolo Forte / Posizionamento Status'
  };

  return (
    <div className={`modal-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>chat</span>
            Personalizza Script Outreach
          </h3>
          <button className="btn-close-modal" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-customizer">
            <div className="modal-input-group">
              <label>Angolo di Copywriting</label>
              <select value={angle} onChange={(e) => setAngle(e.target.value as ScriptAngle)}>
                <option value="conversational">{angleLabels.conversational}</option>
                <option value="direct">{angleLabels.direct}</option>
                <option value="bold">{angleLabels.bold}</option>
              </select>
            </div>

            <div className="modal-input-group">
              <label>Link Google Drive (Modello/Demo)</label>
              <input
                type="text"
                value={driveLink}
                onChange={(e) => setDriveLink(e.target.value)}
                placeholder="https://drive.google.com/..."
              />
            </div>

            <div className="modal-input-group">
              <label>Nome Sostitutivo</label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Nome del Business"
              />
            </div>

            <div className="modal-input-group">
              <label>Località Sostitutiva</label>
              <input
                type="text"
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                placeholder="Città"
              />
            </div>
          </div>

          <div className="modal-input-group">
            <label style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Script Generato ({lead.target})</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Variabili: NAME, LOCATION, DRIVE</span>
            </label>
            <div className="modal-script-box">
              {processedScript}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="pagination-btn" onClick={onClose} style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
            Chiudi
          </button>
          <button className="btn-modal-action" onClick={handleCopy}>
            <span className="material-symbols-outlined">content_copy</span>
            Copia Script Personalizzato
          </button>
        </div>
      </div>
    </div>
  );
};
