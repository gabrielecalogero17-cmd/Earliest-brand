import React from 'react';
import { type Lead } from '../data/localLeads';

interface ControlsPanelProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onExport: () => void;
  onOpenAddModal: () => void;
  leads: Lead[];
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onExport,
  onOpenAddModal,
  leads
}) => {
  const getCategoryCount = (cat: string) => {
    if (cat === 'all') return leads.length;
    return leads.filter(l => l.target === cat).length;
  };

  const categories = [
    { id: 'all', label: 'Tutti', icon: 'list' },
    { id: 'estetica', label: '✨ Medicina Estetica', icon: 'hotel_class' },
    { id: 'realestate', label: '🏰 Real Estate Lusso', icon: 'castle' },
    { id: 'dentisti', label: '🦷 Dentisti & Cliniche', icon: 'dentistry' },
    { id: 'hotellerie', label: '🏨 Hotel Lusso & Resort', icon: 'domain' },
    { id: 'boutique', label: '👗 Boutique', icon: 'styler' },
    { id: 'profumeria', label: '🧪 Profumerie', icon: 'experiment' },
    { id: 'artigianato', label: '⚒️ Artigianato', icon: 'construction' },
    { id: 'd2c', label: '🛒 Brand D2C', icon: 'shopping_bag' }
  ];

  return (
    <div className="controls-panel">
      <div className="search-row">
        <div className="search-input-wrapper">
          <span className="material-symbols-outlined search-icon">search</span>
          <input
            type="text"
            className="search-input"
            placeholder="Cerca per nome, località, Instagram o telefono..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <button className="btn-export" onClick={onExport}>
          <span className="material-symbols-outlined">download</span>
          Esporta CSV
        </button>

        <button 
          className="btn-modal-action" 
          onClick={onOpenAddModal}
          style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', fontSize: '0.9rem' }}
        >
          <span className="material-symbols-outlined">person_add</span>
          Aggiungi Lead
        </button>
      </div>

      <div className="target-filter-bar">
        {categories.map(cat => {
          const count = getCategoryCount(cat.id);
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              className={`filter-btn ${isActive ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span className="material-symbols-outlined">{cat.icon}</span>
              {cat.label} ({count})
            </button>
          );
        })}
      </div>
    </div>
  );
};
