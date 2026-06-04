export interface Garment {
  id: string;
  tag: string;
  title: string;
  price: string;
  desc: string;
  fit: string;
  stitching: string;
  img: string;
}

export const garments: Garment[] = [
  {
    id: '1',
    tag: 'FELPA | ARCHIVIO',
    title: 'FELPA CON STEMMA IMPERIALE',
    price: '€ 189.00',
    desc: "Capo iconico costruito per il comando. Questa felpa esclusiva in edizione d'archivio presenta l'emblema della corona e dello scudo ricamato sul petto in un profondo rosso imperiale. Realizzata in cotone spazzolato a grammatura pesante.",
    fit: 'Taglio Oversize Imperiale con spalle scese',
    stitching: 'Cuciture in rilievo tono su tono ultra resistenti',
    img: '/assets/clothing/crewneck_full.jpg',
  },
  {
    id: '2',
    tag: 'HOODIE | ARCHIVIO',
    title: 'HOODIE VANGUARD DI LUSSO',
    price: '€ 220.00',
    desc: "La fusione perfetta tra comodità streetwear e l'eleganza sofisticata del brand EARLIEST. Cappuccio foderato a doppio strato rigido, tasca a marsupio geometrica priva di cuciture a vista e ricamo araldico sul retro per comandare la strada.",
    fit: 'Boxy Fit strutturato con polsini spessi a coste',
    stitching: 'Ricamo in filo rosso ad alta densità sul retro',
    img: '/assets/clothing/luxury_hoodie.jpg',
  },
  {
    id: '3',
    tag: 'POLO | SOVRANA',
    title: 'POLO ARISTOCRATICA SLIM-FIT',
    price: '€ 125.00',
    desc: "Una reinterpretazione contemporanea del lusso classico. Colletto a coste affusolato e chiusura a bottoni nascosta. Lo stemma minimale 'E' ricamato sul petto testimonia un'eccellenza sartoriale silenziosa ma autorevole.",
    fit: 'Slim-fit raffinato con spacchetti laterali',
    stitching: 'Cuciture invisibili sui bordi e ricamo micro sul petto',
    img: '/assets/clothing/elegant_polo.jpg',
  },
  {
    id: '4',
    tag: 'FELPA | DETTAGLI',
    title: 'CREWNECK CON DETTAGLI DI CUCITURA ROSSI',
    price: '€ 195.00',
    desc: 'Studio meticoloso sul contrasto cromatico. Questa felpa nera esalta le linee costruttive del capo con cuciture rosse a contrasto posizionate lungo le giunture anatomiche delle maniche e del colletto. Uno status metropolitano audace.',
    fit: 'Regular Fit strutturato prelavato anti-restringimento',
    stitching: 'Cuciture piatte a contrasto in filato rosso robusto',
    img: '/assets/clothing/crewneck_detail.jpg',
  },
  {
    id: '5',
    tag: 'EDITORIALE | CAMPAGNA',
    title: 'FELPA SOVRANA - STEMMA POSTERIORE',
    price: '€ 189.00',
    desc: "Direttamente dallo shooting ufficiale di campagna. Felpa nera d'archivio immortalata sul modello nella vista posteriore, evidenziando il maestoso stemma ricamato in rosso che si staglia sulle spalle in un connubio di prestigio e attitudine urban.",
    fit: 'Taglio Comfort Oversize con spalle strutturate',
    stitching: 'Dettaglio ricamato posteriore 24x28 cm ad altissima precisione',
    img: '/assets/shooting/model_back_car.jpg',
  },
  {
    id: '6',
    tag: 'EDITORIALE | VETTURA',
    title: 'FELPA SOVRANA - STEMMA ANTERIORE',
    price: '€ 189.00',
    desc: "Foto editoriale del modello all'interno dell'abitacolo della vettura sportiva nera. Evidenzia la vestibilità frontale e il posizionamento asimmetrico dello stemma imperiale sul petto sinistro, a indicare l'appartenenza alla nuova élite dello stile.",
    fit: 'Drappeggio sartoriale da streetwear',
    stitching: 'Cucitura spalla rinforzata in doppio filo di cotone',
    img: '/assets/shooting/model_in_car.jpg',
  },
];
