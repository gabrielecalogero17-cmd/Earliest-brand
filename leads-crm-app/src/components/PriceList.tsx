import React from 'react';

export const PriceList: React.FC = () => {
  return (
    <div id="section-prices">
      {/* Header Banner */}
      <header style={{ marginBottom: '4.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2.5rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)', fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase' }}>
          The Earliest Brand • Servizi e Offerte
        </p>
        <h1 style={{
          fontFamily: 'var(--font-head)',
          fontSize: '3.4rem',
          fontWeight: 700,
          lineHeight: 1.15,
          marginTop: '0.5rem',
          background: 'linear-gradient(135deg, #fff 40%, var(--primary) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          LISTINO PREZZI UFFICIALE
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '880px', marginTop: '0.85rem', fontFamily: 'var(--font-body)' }}>
          Dettagli commerciali completi relativi ai servizi verticali singoli e ai pacchetti mensili in abbonamento (bundle consigliati).
        </p>
      </header>

      {/* BUNDLES SECTION */}
      <div style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '1.8rem', color: '#fff', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '2rem' }}>military_tech</span>
          Offerte in Abbonamento (I Bundle Consigliati)
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem' }}>
          
          {/* Tier 1 Card */}
          <div className="premium-price-card" style={{
            border: '1px solid var(--primary)',
            background: 'linear-gradient(135deg, rgba(212,175,55,0.04) 0%, rgba(18,18,25,0.95) 100%)',
            borderRadius: '16px',
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(212,175,55,0.06)'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              background: 'var(--primary)',
              color: 'var(--bg-base)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '1px',
              padding: '0.35rem 1rem',
              borderBottomLeftRadius: '8px',
              textTransform: 'uppercase'
            }}>
              Consigliato per Attività Locali
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.6rem', color: 'var(--primary)', fontWeight: 700 }}>🚀 TIER 1: GROWTH ENGINE</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>L'Acceleratore di Business</p>
            </div>
            <div style={{
              borderTop: '1px solid rgba(212,175,55,0.15)',
              borderBottom: '1px solid rgba(212,175,55,0.15)',
              padding: '1rem 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 600 }}>Fee Agenzia Mensile:</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 700, color: '#fff' }}>
                  €1.600<span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontWeight: 400 }}>/mese</span>
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <span>Budget ADV Consigliato:</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>+ €200/mese <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(al circuito pubblicitario)</span></span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <span>Vincolo Contrattuale:</span>
                <span>Minimo 6 mesi</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#fff', fontWeight: 700, letterSpacing: '1px' }}>Servizi Inclusi al 100% ogni mese:</h4>
              <ul style={{ listStyleType: 'none', fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.15rem', color: 'var(--primary)', marginTop: '0.15rem' }}>check_circle</span>
                  <span><strong>Social &bull; Pack Essential Authority:</strong> 10 contenuti mensili (Reel e Caroselli) completi di social copywriting, video scripting con hook strategici e report analitici.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.15rem', color: 'var(--primary)', marginTop: '0.15rem' }}>check_circle</span>
                  <span><strong>Adv &bull; Pack Performance Lead Boost:</strong> Configurazione/bonifica Business Manager, targeting e segmentazione, scrittura e gestione inserzioni Meta/Google Ads.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.15rem', color: 'var(--primary)', marginTop: '0.15rem' }}>check_circle</span>
                  <span><strong>Web Asset Premium:</strong> Sviluppo iniziale di <strong>1 Performance Landing Page</strong> (Valore singolo €800) interamente inclusa, con monitoraggio mensile dei tassi di conversione (CRO).</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Tier 2 Card */}
          <div className="premium-price-card" style={{
            border: '1px solid var(--accent)',
            background: 'linear-gradient(135deg, rgba(226,193,101,0.06) 0%, rgba(18,18,25,0.95) 100%)',
            borderRadius: '16px',
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 15px 40px rgba(226,193,101,0.08)'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              background: 'var(--accent)',
              color: 'var(--bg-base)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '1px',
              padding: '0.35rem 1rem',
              borderBottomLeftRadius: '8px',
              textTransform: 'uppercase'
            }}>
              Dominio Totale del Mercato
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.6rem', color: 'var(--accent)', fontWeight: 700 }}>👑 TIER 2: THE EARLIEST ELITE</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Il Predatore del Mercato</p>
            </div>
            <div style={{
              borderTop: '1px solid rgba(226,193,101,0.2)',
              borderBottom: '1px solid rgba(226,193,101,0.2)',
              padding: '1rem 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 600 }}>Fee Agenzia Mensile:</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent)' }}>
                  €3.000<span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontWeight: 400 }}>/mese</span>
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <span>Budget ADV Consigliato:</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>+ €500/mese <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(al circuito pubblicitario)</span></span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <span>Vincolo Contrattuale:</span>
                <span>Minimo 12 mesi</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#fff', fontWeight: 700, letterSpacing: '1px' }}>Servizi Inclusi al 100% ogni mese:</h4>
              <ul style={{ listStyleType: 'none', fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.15rem', color: 'var(--accent)', marginTop: '0.15rem' }}>check_circle</span>
                  <span><strong>Social &bull; Pack Omnichannel Dominance:</strong> 18-20 contenuti/mese focalizzati su video brevi (Reel/TikTok/Shorts). Include strategie avanzate di Personal Branding, script video professionali iper-specifici e inbound DM management per convertire i follower in clienti qualificati.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.15rem', color: 'var(--accent)', marginTop: '0.15rem' }}>check_circle</span>
                  <span><strong>Adv &bull; Pack AI Cinematic Scale:</strong> Campagne ads ad alte prestazioni integrate con la generazione di 6-8 video/spot mensili in AI cinematografica 4K, con voice cloning e sceneggiature ottimizzate.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.15rem', color: 'var(--accent)', marginTop: '0.15rem' }}>check_circle</span>
                  <span><strong>Web Asset Premium:</strong> Sviluppo iniziale del <strong>Custom Corporate Ecosystem</strong> (Valore singolo €2.000) fino a 5 pagine, con assistenza tecnica mensile totale e creazione di Landing Page promozionali aggiuntive illimitate.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.15rem', color: 'var(--accent)', marginTop: '0.15rem' }}>check_circle</span>
                  <span><strong>Customer Care Dedicato:</strong> Reportistica strategica bisettimanale e linea di comunicazione prioritaria con il team dell'agenzia.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* VERTICAL SERVICES SECTION */}
      <div>
        <h2 style={{
          fontFamily: 'var(--font-head)',
          fontSize: '1.8rem',
          color: '#fff',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '3rem'
        }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '2rem' }}>category</span>
          Servizi Singoli (Listino Verticale)
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          
          {/* Category 1: Social */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', backdropFilter: 'blur(12px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(212,175,55,0.15)', paddingBottom: '1rem' }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>photo_camera</span>
              <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.3rem', color: '#fff' }}>Social &amp; Presenza</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Pack Essential Authority */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 700, fontSize: '1.05rem', color: '#fff' }}>
                  <span>Essential Authority</span>
                  <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}>€800 - €1.000 / mese</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>Target: Professionisti o attività locali per credibilità digitale.</p>
                <ul style={{ listStyleType: 'none', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingLeft: '0.5rem' }}>
                  <li>&bull; <strong>Analisi Strategica:</strong> Studio brand, competitor, tono di voce.</li>
                  <li>&bull; <strong>Restyling Visivo:</strong> Ottimizzazione profili, bio e copertine.</li>
                  <li>&bull; <strong>Piano Editoriale (PED):</strong> 10 contenuti/mese (Reel/grafiche).</li>
                  <li>&bull; <strong>Social Copywriting:</strong> Testi post persuasivi (formule AIDA/PAS).</li>
                  <li>&bull; <strong>Video Scripting:</strong> Script dettagliati con hook e CTA.</li>
                  <li>&bull; <strong>Reportistica:</strong> 1 report analitico mensile.</li>
                </ul>
              </div>

              {/* Pack Omnichannel Dominance */}
              <div style={{ borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 700, fontSize: '1.05rem', color: '#fff' }}>
                  <span>Omnichannel Dominance</span>
                  <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}>€1.500 - €1.900 / mese</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>Target: Business e personal brand che puntano a saturare i feed.</p>
                <ul style={{ listStyleType: 'none', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingLeft: '0.5rem' }}>
                  <li>&bull; <strong>Tutti i servizi</strong> del pack Essential Authority inclusi.</li>
                  <li>&bull; <strong>PED Avanzato:</strong> 18-20 video brevi/mese (Reel/TikTok/Shorts).</li>
                  <li>&bull; <strong>Personal Branding:</strong> Autorevolezza e posizionamento del titolare.</li>
                  <li>&bull; <strong>Advanced Video Scripting:</strong> Tono vocale, ganci visivi, storytelling.</li>
                  <li>&bull; <strong>Inbound Management:</strong> Gestione DM/commenti con script vendita.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Category 2: Web */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', backdropFilter: 'blur(12px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(212,175,55,0.15)', paddingBottom: '1rem' }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>language</span>
              <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.3rem', color: '#fff' }}>Sviluppo Web &amp; Funnel</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Pack Performance Landing Page */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 700, fontSize: '1.05rem', color: '#fff' }}>
                  <span>Performance Landing</span>
                  <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}>€800 una tantum</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>Target: Vendita di un singolo prodotto/servizio o lead generation.</p>
                <ul style={{ listStyleType: 'none', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingLeft: '0.5rem' }}>
                  <li>&bull; <strong>Sviluppo Tecnico:</strong> Struttura One-Page ultra-veloce, responsive.</li>
                  <li>&bull; <strong>Direct Copywriting:</strong> Headline, benefici, obiezioni e CTA d'impatto.</li>
                  <li>&bull; <strong>Configurazione Tracciamenti:</strong> Pixel Meta, Conversion API, Google Tag.</li>
                  <li>&bull; <strong>Integrazione Funnel:</strong> Booking calendar o moduli personalizzati.</li>
                </ul>
              </div>

              {/* Pack Custom Corporate Ecosystem */}
              <div style={{ borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 700, fontSize: '1.05rem', color: '#fff' }}>
                  <span>Corporate Ecosystem</span>
                  <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}>€2.000 una tantum</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>Target: Aziende che cercano un ecosistema web autorevole completo.</p>
                <ul style={{ listStyleType: 'none', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingLeft: '0.5rem' }}>
                  <li>&bull; <strong>UX/UI Design:</strong> Esperienza utente custom su misura per brand di lusso.</li>
                  <li>&bull; <strong>Corporate Copywriting:</strong> Testi integrali per 5 pagine principali.</li>
                  <li>&bull; <strong>Automazioni:</strong> Email autoresponder post-lead e integrazione CRM.</li>
                  <li>&bull; <strong>SEO d'Ingresso:</strong> Indicizzazione testi e meta-tags per Google.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Category 3: Ads & AI Video */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', backdropFilter: 'blur(12px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(212,175,55,0.15)', paddingBottom: '1rem' }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>ads_click</span>
              <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.3rem', color: '#fff' }}>Campagne &amp; AI Video</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Pack Performance Lead Boost */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 700, fontSize: '1.05rem', color: '#fff' }}>
                  <span>Performance Lead Boost</span>
                  <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}>€700 - €900 / mese</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>Target: Chi ha già un sito e vuole clienti pronti all'acquisto.</p>
                <ul style={{ listStyleType: 'none', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingLeft: '0.5rem' }}>
                  <li>&bull; <strong>Technical Set-up:</strong> Setup o bonifica dei Business Manager Ads.</li>
                  <li>&bull; <strong>Targeting &amp; Angoli:</strong> Segmentazione e trigger psicologici.</li>
                  <li>&bull; <strong>ADV Copywriting:</strong> Scrittura di 4 varianti di copy pubblicitario al mese.</li>
                  <li>&bull; <strong>Asset Statici:</strong> Sviluppo immagini/grafiche pubblicitarie.</li>
                  <li>&bull; <strong>Gestione:</strong> Monitoraggio conversioni (ROAS, CPA), budget scaling.</li>
                </ul>
              </div>

              {/* Pack AI Cinematic Scale */}
              <div style={{ borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 700, fontSize: '1.05rem', color: '#fff' }}>
                  <span>AI Cinematic Scale</span>
                  <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}>€1.800 - €2.400 / mese</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>Target: Brand o e-commerce che cercano video ads scioccanti.</p>
                <ul style={{ listStyleType: 'none', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingLeft: '0.5rem' }}>
                  <li>&bull; <strong>Ottimizzazione tecnica</strong> completa del pack Lead Boost inclusa.</li>
                  <li>&bull; <strong>AI Video Generation:</strong> Generazione clip cinematografiche in AI.</li>
                  <li>&bull; <strong>AI Scriptwriting &amp; Storyboard:</strong> Scrittura di 6-8 script specifici per AI.</li>
                  <li>&bull; <strong>Voice Cloning:</strong> Cloni vocali e audio design di sottofondo.</li>
                  <li>&bull; <strong>Creative Testing:</strong> Adattamenti verticali/orizzontali continuativi.</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
