import React from 'react';

interface SidebarProps {
  activeSection: 'leads' | 'prices';
  setActiveSection: (section: 'leads' | 'prices') => void;
  isOnline: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  setActiveSection,
  isOnline
}) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h1 className="brand-title">
          <span className="material-symbols-outlined" style={{ fontSize: '2rem' }}>
            model_training
          </span>
          The Earliest
        </h1>
        <span className="brand-subtitle">CRM &amp; Outreach</span>
      </div>

      <nav style={{ flexGrow: 1 }}>
        <ul className="sidebar-menu">
          <li className={`sidebar-item ${activeSection === 'leads' ? 'active' : ''}`}>
            <button onClick={() => setActiveSection('leads')}>
              <span className="material-symbols-outlined">list</span>
              Anagrafica Lead
            </button>
          </li>
          <li className={`sidebar-item ${activeSection === 'prices' ? 'active' : ''}`}>
            <button onClick={() => setActiveSection('prices')}>
              <span className="material-symbols-outlined">payments</span>
              Listino Prezzi
            </button>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="version-badge">v1.2.0-PRO</div>
        {isOnline ? (
          <div className="conn-status online">
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
              database
            </span>
            Supabase Connesso
          </div>
        ) : (
          <div className="conn-status offline">
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
              cloud_off
            </span>
            Offline Fallback
          </div>
        )}
      </div>
    </aside>
  );
};
