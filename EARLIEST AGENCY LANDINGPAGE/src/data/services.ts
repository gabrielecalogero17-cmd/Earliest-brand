export interface ServiceItem {
  num: string;
  title: string;
  bullets: string[];
  serviceKey: string;
}

export const services: ServiceItem[] = [
  {
    num: '01',
    title: 'BRAND & IDENTITY',
    bullets: [
      'Linee guida brand identity',
      'Logo / Crest',
      'Vanguard Strategy',
      'Font di comando',
      'Archetipo di voce',
    ],
    serviceKey: 'brand_identity',
  },
  {
    num: '02',
    title: 'STRATEGIA, CONTENUTI & LEAD GENERATION',
    bullets: [
      "Sistemi di Lead Generation d'Élite",
      'Produzione Contenuti a 360° (Foto, Video, Editoriali)',
      "Posizionamento & Distribuzione d'Avanguardia",
      'Canali editoriali & PR di Comando',
      'Copywriting e Tono di Voce Sovrano',
    ],
    serviceKey: 'strategy_lead_gen',
  },
  {
    num: '03',
    title: 'FASHION & MERCHANDISING',
    bullets: [
      'Linee Creative & Apparel Design',
      'Selezione Tessuti Premium (450 GSM)',
      "Capi d'archivio (Hoodie / Crewneck)",
      'Studio di Vestibilità & Parametri Sartoriali',
      'Cartellini e packaging personalizzato',
    ],
    serviceKey: 'fashion_merch',
  },
];
