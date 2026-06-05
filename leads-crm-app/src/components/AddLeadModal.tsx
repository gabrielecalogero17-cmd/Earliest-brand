import React, { useState } from 'react';
import { type Lead } from '../data/localLeads';

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (lead: Omit<Lead, 'id'>) => Promise<boolean>;
}

export const AddLeadModal: React.FC<AddLeadModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [target, setTarget] = useState<Lead['target']>('estetica');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !location.trim()) {
      alert('Nome e Località sono obbligatori.');
      return;
    }

    setIsSubmitting(true);
    const success = await onAdd({
      target,
      name: name.trim(),
      location: location.trim(),
      phone: phone.trim(),
      email: email.trim(),
      instagram: instagram.trim()
    });

    setIsSubmitting(false);
    if (success) {
      // Clear fields
      setName('');
      setLocation('');
      setTarget('estetica');
      setPhone('');
      setEmail('');
      setInstagram('');
      onClose();
    } else {
      alert('Errore durante il salvataggio del lead. Riprova.');
    }
  };

  return (
    <div className={`modal-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '550px' }}>
        <div className="modal-header">
          <h3 className="modal-title">
            <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>person_add</span>
            Aggiungi Nuovo Lead
          </h3>
          <button className="btn-close-modal" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ gap: '1.25rem' }}>
            <div className="modal-input-group">
              <label>Nome del Business / Professionista *</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="es. Clinica Villa Bella" 
                required 
              />
            </div>
            
            <div className="modal-input-group">
              <label>Località *</label>
              <input 
                type="text" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                placeholder="es. Milano (MI)" 
                required 
              />
            </div>
            
            <div className="modal-input-group">
              <label>Categoria Target *</label>
              <select value={target} onChange={(e) => setTarget(e.target.value as Lead['target'])}>
                <option value="estetica">✨ Medicina Estetica</option>
                <option value="realestate">🏰 Real Estate Lusso</option>
                <option value="dentisti">🦷 Dentisti &amp; Cliniche</option>
                <option value="hotellerie">🏨 Hotel Lusso &amp; Resort</option>
                <option value="boutique">👗 Boutique</option>
                <option value="profumeria">🧪 Profumerie</option>
                <option value="artigianato">⚒️ Artigianato</option>
                <option value="d2c">🛒 Brand D2C</option>
              </select>
            </div>
            
            <div className="modal-input-group">
              <label>Telefono</label>
              <input 
                type="text" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="es. 02 4851 9500" 
              />
            </div>
            
            <div className="modal-input-group">
              <label>Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="es. info@clinica.it" 
              />
            </div>
            
            <div className="modal-input-group">
              <label>Instagram Username</label>
              <input 
                type="text" 
                value={instagram} 
                onChange={(e) => setInstagram(e.target.value)} 
                placeholder="es. @username" 
              />
            </div>
          </div>
          
          <div className="modal-footer">
            <button 
              type="button" 
              className="pagination-btn" 
              onClick={onClose}
              style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
            >
              Annulla
            </button>
            <button type="submit" className="btn-modal-action" disabled={isSubmitting}>
              {isSubmitting ? 'Salvataggio...' : 'Salva Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
