import { useState, useRef } from 'react';
import Button from '../UI/Button';
import { useTiltEffect } from '../../hooks/useTiltEffect';
import styles from './Packages.module.css';

interface PackageItem {
  id: string;
  name: string;
  price: string;
  billing: string;
  target: string;
  serviceKey: string;
  features: string[];
  highlight?: boolean;
  tag?: string;
  valueStack?: string;
}

const VERTICAL_PACKS: Record<string, PackageItem[]> = {
  social: [
    {
      id: 'pack_essential_authority',
      name: 'Essential Authority',
      price: '€ 800 - € 1.000',
      billing: '/ mese (ADV escluso)',
      target: 'Professionisti o attività locali che devono costruire un posizionamento digitale credibile e pulito.',
      serviceKey: 'strategy_lead_gen',
      features: [
        'Analisi Strategica del brand & competitor',
        'Definizione del Tono di Voce ufficiale',
        'Restyling Visivo completo dei profili social',
        'PED: 10 contenuti mensili (Reel + Caroselli)',
        'Social Copywriting persuasivo (AIDA/PAS)',
        'Video Scripting Base (Hook, Corpo, CTA)',
        '1 Report Analitico mensile completo'
      ]
    },
    {
      id: 'pack_omnichannel_dominance',
      name: 'Omnichannel Dominance',
      price: '€ 1.500 - € 1.900',
      billing: '/ mese (ADV escluso)',
      target: 'Business o figure pubbliche che vogliono saturare i feed della propria nicchia, puntando sul personal branding e sulle conversioni.',
      serviceKey: 'strategy_lead_gen',
      features: [
        'Tutti i servizi Essential Authority inclusi',
        'PED Avanzato: 18-20 contenuti mensili',
        'Focus totale su video brevi (Reel/TikTok/Shorts)',
        'Strategia di Personal Branding dedicata',
        'Advanced Video Scripting con ganci psicologici',
        'Gestione quotidiana dei commenti e Direct (DM)',
        'Inbound Copywriting per convertire follower in lead'
      ],
      highlight: true,
      tag: 'PIÙ RICHIESTO'
    }
  ],
  web: [
    {
      id: 'pack_performance_landing',
      name: 'Performance Landing Page',
      price: '€ 800',
      billing: 'una tantum',
      target: 'Chi ha bisogno di una pagina focalizzata sulla vendita di un singolo prodotto/servizio o sulla generazione contatti da advertising.',
      serviceKey: 'brand_identity',
      features: [
        'Struttura One-Page ultra-veloce (CRO e Mobile)',
        'Direct Response Copywriting da zero',
        'Titolo d\'impatto, benefici logici/emotivi',
        'Gestione obiezioni e integrazione riprova sociale',
        'Tracciamento avanzato (Meta Pixel, CAPI, Google Tag)',
        'Collegamento a moduli di contatto o calendari (Calendly/Supabase)'
      ]
    },
    {
      id: 'pack_corporate_ecosystem',
      name: 'Custom Corporate Ecosystem',
      price: '€ 2.000',
      billing: 'una tantum',
      target: 'Aziende che vogliono un ecosistema web completo, autorevole e istituzionale (limite massimo di 5 sezioni/pagine principali).',
      serviceKey: 'brand_identity',
      features: [
        'Architettura e UX/UI Design su misura premium',
        'Corporate Copywriting orientato alla conversione',
        'Configurazione automazioni di sistema (Email autoresponder)',
        'SEO Tecnica d\'ingresso (ottimizzazione titoli, testi, immagini)',
        'Integrazione API avanzata con database aziendali'
      ],
      highlight: true
    }
  ],
  adv: [
    {
      id: 'pack_lead_boost',
      name: 'Performance Lead Boost',
      price: '€ 700 - € 900',
      billing: '/ mese (Budget ADV escluso)',
      target: 'Attività con sito funzionante che vogliono un flusso costante di clienti e contatti qualificati tramite inserzioni tradizionali.',
      serviceKey: 'strategy_lead_gen',
      features: [
        'Technical Set-up o bonifica Business Manager (Meta/Google)',
        'Targeting chirurgico & Studio angoli di marketing',
        'ADV Copywriting: 4 varianti di copy pubblicitari al mese',
        'Sviluppo di asset creativi e grafiche statiche ottimizzate',
        'Ottimizzazione quotidiana (CPA, ROAS) & Gestione budget'
      ]
    },
    {
      id: 'pack_ai_cinematic',
      name: 'AI Cinematic Scale',
      price: '€ 1.800 - € 2.400',
      billing: '/ mese (Budget ADV escluso)',
      target: 'Brand d\'élite o e-commerce che vogliono dominare l\'attenzione con annunci video scioccanti ed emozionali generati in AI.',
      serviceKey: 'strategy_lead_gen',
      features: [
        'Tutti i servizi del pack Performance Lead Boost inclusi',
        'AI Prompters & Video Generation cinematografica',
        'AI Scriptwriting & Storyboarding (6-8 video/mese)',
        'Voice Cloning & Audio Design iper-realistico',
        'Creative Testing di massa (formati verticali/orizzontali)',
        'Analisi e scaling dei ganci visivi vincenti'
      ],
      highlight: true,
      tag: 'AVANGUARDIA AI'
    }
  ]
};

const BUNDLE_PACKS: PackageItem[] = [
  {
    id: 'bundle_growth_engine',
    name: 'Growth Engine',
    price: '€ 1.600',
    billing: '/ mese',
    target: 'L\'acceleratore di business. La sinergia perfetta per aziende pronte a scalare combinando presenza organica, web e traffico a pagamento.',
    serviceKey: 'strategy_lead_gen',
    features: [
      'Social: Pack Essential Authority (10 contenuti/mese)',
      'Adv: Pack Performance Lead Boost (Gestione campagne)',
      'Sviluppo Web: 1 Performance Landing Page inclusa (Valore €800)',
      'Ottimizzazione mensile tasso di conversione (CRO)',
      'Reportistica mensile unificata (Social + Ads)',
      'Contratto minimo: 6 mesi'
    ],
    valueStack: 'Include 1 Landing Page da €800 in omaggio'
  },
  {
    id: 'bundle_earliest_elite',
    name: 'The Earliest Elite',
    price: '€ 3.000',
    billing: '/ mese',
    target: 'Il predatore del mercato. Per brand che vogliono dominare saturando ogni canale tramite social organici avanzati e video adv cinematografici in AI.',
    serviceKey: 'strategy_lead_gen',
    features: [
      'Social: Pack Omnichannel Dominance (18-20 contenuti/mese)',
      'Adv & Video AI: Pack AI Cinematic Scale (campagne + 6-8 video AI)',
      'Web: Custom Corporate Ecosystem incluso (Valore €2.000)',
      'Landing Page aggiuntive illimitate per lanci specifici',
      'Assistenza tecnica totale & manutenzione mensile inclusa',
      'Customer Care dedicato con report bisettimanali',
      'Linea di comunicazione prioritaria con l\'agenzia',
      'Contratto minimo: 12 mesi'
    ],
    highlight: true,
    tag: 'STATUS SOVRANO',
    valueStack: 'Include Ecosistema Web da €2.000 + Landing illimitate'
  }
];

function PackageCard({ pkg, onSelect }: { pkg: PackageItem; onSelect: (id: string, name: string) => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { handleMouseMove, handleMouseLeave } = useTiltEffect(cardRef);

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${pkg.highlight ? styles.highlightedCard : ''} reveal-fade-up`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {pkg.tag && <div className={styles.badge}>{pkg.tag}</div>}
      <div className={styles.cardHeader}>
        <h3 className={styles.packageName}>{pkg.name}</h3>
        <div className={styles.priceContainer}>
          <span className={styles.currency}>da</span>
          <span className={styles.price}>{pkg.price}</span>
          <span className={styles.billing}>{pkg.billing}</span>
        </div>
        {pkg.valueStack && <div className={styles.valueStack}>{pkg.valueStack}</div>}
      </div>
      
      <p className={styles.target}>{pkg.target}</p>
      <div className={styles.divider} />
      
      <ul className={styles.featuresList}>
        {pkg.features.map((feature, i) => (
          <li key={i} className={styles.featureItem}>
            <span className={styles.checkIcon}>✓</span>
            <span className={styles.featureText}>{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className={styles.cardFooter}>
        <Button
          variant={pkg.highlight ? 'primary' : 'ghost'}
          full
          shimmer={pkg.highlight}
          onClick={() => onSelect(pkg.id, pkg.name)}
        >
          <span>SBLOCCA PACCHETTO</span>
          <span className="material-symbols-outlined">bolt</span>
        </Button>
      </div>
    </div>
  );
}

export default function Packages() {
  const [activeTab, setActiveTab] = useState<'bundles' | 'verticals'>('bundles');
  const [activeVerticalSubTab, setActiveVerticalSubTab] = useState<'social' | 'web' | 'adv'>('social');

  const handlePackageSelect = (pkgId: string, packageName: string) => {
    // Fill in input fields in contact form
    const selectEl = document.getElementById('formService') as HTMLSelectElement | null;
    const textareaEl = document.getElementById('formNotes') as HTMLTextAreaElement | null;
    
    if (selectEl) {
      selectEl.value = pkgId;
      selectEl.dispatchEvent(new Event('change'));
    }
    
    if (textareaEl) {
      textareaEl.value = `Richiesta informazioni per il pacchetto: ${packageName}.\n\nObiettivi principali:\n`;
      textareaEl.dispatchEvent(new Event('change'));
    }
    
    // Smooth scroll to contact form
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.section} id="packages">
      <div className={styles.backgroundGrid} />
      <div className="section-container">
        <div className="reveal-fade" style={{ textAlign: 'center' }}>
          <div className="section-tag text-center">LISTINO COMMERCIALE</div>
          <h2 className="section-title text-center">PACCHETTI E SOLUZIONI</h2>
          <div className="divider-line mx-auto" />
          <p className={styles.introText}>
            Trasparenza matematica, zero metriche di vanità. Scegli il posizionamento strategico per imporre il tuo brand.
          </p>
        </div>

        {/* Tab Selector Principale */}
        <div className={`${styles.tabsWrapper} reveal-fade`}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'bundles' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('bundles')}
          >
            <span className="material-symbols-outlined">auto_awesome</span>
            <span>BUNDLE MENSILI (CONSIGLIATO)</span>
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'verticals' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('verticals')}
          >
            <span className="material-symbols-outlined">view_cozy</span>
            <span>SERVIZI VERTICALI SINGOLI</span>
          </button>
        </div>

        {/* Sotto-tab per i servizi verticali */}
        {activeTab === 'verticals' && (
          <div className={`${styles.subTabsWrapper} reveal-fade`}>
            <button
              className={`${styles.subTabBtn} ${activeVerticalSubTab === 'social' ? styles.subTabBtnActive : ''}`}
              onClick={() => setActiveVerticalSubTab('social')}
            >
              Social & Presenza
            </button>
            <button
              className={`${styles.subTabBtn} ${activeVerticalSubTab === 'web' ? styles.subTabBtnActive : ''}`}
              onClick={() => setActiveVerticalSubTab('web')}
            >
              Web & Funnel
            </button>
            <button
              className={`${styles.subTabBtn} ${activeVerticalSubTab === 'adv' ? styles.subTabBtnActive : ''}`}
              onClick={() => setActiveVerticalSubTab('adv')}
            >
              Adv & AI Video
            </button>
          </div>
        )}

        {/* Contenuto delle Card */}
        <div className={styles.cardsGrid}>
          {activeTab === 'bundles' ? (
            BUNDLE_PACKS.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} onSelect={handlePackageSelect} />
            ))
          ) : (
            VERTICAL_PACKS[activeVerticalSubTab].map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} onSelect={handlePackageSelect} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
