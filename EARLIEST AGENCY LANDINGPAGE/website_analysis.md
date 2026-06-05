# Analisi Dettagliata — EARLIEST AGENCY LANDINGPAGE

Questo documento fornisce un'analisi tecnica e strutturale estremamente accurata del sito web **EARLIEST**, un'agenzia d'élite di direzione creativa e comunicazione basata sul concetto filosofico e stilistico di **"Urban Aristocracy"**.

---

## 1. Filosofia e Identità Visiva

Il sito è costruito attorno all'estetica **Urban Aristocracy**, che unisce il prestigio e l'araldica del lusso classico (stemmi, corone, rigore geometrico) con l'energia cruda dello streetwear e della cultura metropolitana (tessuti pesanti, tonalità scure, attitudine industriale).

### Tavolozza dei Colori (Design Tokens)
Definita in `variables.css`, la palette cromatica è coerente e sofisticata:
*   **Sfondo principale (`--color-bg`):** `#050505` (un nero profondo quasi assoluto).
*   **Superfici secondarie (`--color-surface` / `--color-surface-bright`):** `#0f0000` (nero con sfumature rosso-scure per dare profondità araldica) e `#201f1f`.
*   **Colore Primario (`--color-primary`):** `#660000` (un rosso imperiale cupo).
*   **Colore Secondario (`--color-secondary`):** `#ecc097` (una tonalità sabbia dorata/champagne molto calda).
*   **Testi e Dettagli:** Spaziano dal grigio ardesia (`#5a5a5a`) al grigio chiaro (`#e5e2e1`), con accenti luminescenti rossi (`--color-red-glow`).

### Tipografia
*   **Titoli (`--font-headline`):** **Syne** (un carattere geometrico, espressivo ed elegante con forte contrasto nei pesi spessi).
*   **Testo del corpo (`--font-body`):** **Space Grotesk** (un font monospace/sans-serif moderno e futuristico, ideale per descrizioni tecniche e precise).

---

## 2. Stack Tecnologico e Architettura Codebase

La landing page è una Single Page Application (SPA) reattiva e altamente ottimizzata:
*   **Core:** React 19, TypeScript e Vite.
*   **Stile:** CSS Modules per incapsulare gli stili a livello di singolo componente, garantendo assenza di collisioni di classi.
*   **Scorrimento Fluido:** Gestito con la libreria **Lenis** (tramite l'hook custom `useSmoothScroll.ts`), con un'interpolazione personalizzata ed effetto di scorrimento naturale sia per mouse che per schermi touch.
*   **SEO:** Utilizzo di `react-helmet-async` per la gestione dinamica di metadati, parole chiave e descrizioni personalizzate.

---

## 3. Effetti Visivi e Animazioni Avanzate

Il sito presenta un'esperienza dinamica basata su micro-interazioni ed effetti d'avanguardia:

### Animazione Olografica (`.hologram-text`)
Implementata in `global.css` e `animations.css`, si attiva al passaggio del mouse sui contenitori contrassegnati con `.hologram-trigger`:
1.  **Flicker Aberration:** Il testo, inizialmente sfocato (`blur(8px)`), subisce una transizione con un'animazione che simula lo sfarfallio di un ologramma (`hologram-flicker-advanced`). Questo sfarfallio emula l'aberrazione cromatica attraverso ombre rosse e oro asimmetriche che si ricompongono gradualmente.
2.  **Scanline Sweep:** Un elemento pseudoclasse (`::after`) crea una barra orizzontale a gradiente luminoso che effettua una scansione dall'alto verso il basso (`hologram-scan-sweep`) sulla superficie del testo.

### Parallasse dello Sfondo
Nel componente `Hero.tsx`, un listener di scorrimento applica un effetto parallasse all'immagine di sfondo:
$$\text{transform} = \text{translateY}(\text{scrollY} \times 0.35)\text{px} \times \text{scale}(1.05)$$
Ciò crea un effetto di profondità tridimensionale mentre l'utente naviga la prima sezione.

### Effetto di Inclinazione 3D (`useTiltEffect.ts`)
Un hook personalizzato che traccia la coordinata del mouse rispetto al box dell'elemento e applica una trasformazione prospettica:
*   `perspective(1000px)`
*   `rotateX` e `rotateY` calcolati dinamicamente rispetto alla distanza dal centro della card (fino a un massimo di 8/15 gradi).
*   `scale(1.03)` o `scale(1.04)` sul mouseover, ripristinandosi dolcemente sul mouseleave.

---

## 4. Sezioni e Componenti nel Dettaglio

### A. Preloader (`Preloader.tsx`)
All'avvio, un preloader a schermo intero visualizza un crest SVG araldico:
1.  Disegna un cerchio dorato esterno tramite transizione del `stroke-dashoffset`.
2.  Traccia la forma dello scudo geometrico con spessore rosso.
3.  Fa apparire in dissolvenza la lettera araldica **"E"** al centro dello scudo.
4.  Termina con la comparsa del brand "EARLIEST" e della tagline "LA NUOVA ÉLITE", prima di scomparire e avviare le animazioni di reveal del sito.

### B. AtmosphereCanvas (`AtmosphereCanvas.tsx`)
Un canvas HTML5 posizionato in background genera fino a 65 particelle dorate/champagne che fluttuano verso l'alto con un leggero movimento oscillatorio (wobble sinusoidale). Le particelle interagiscono con il cursore dell'utente, venendo respinte se la distanza scende sotto i 180 pixel.

### C. CustomCursor (`CustomCursor.tsx`)
Sostituisce il cursore nativo del browser con un sistema a due livelli:
*   Un punto centrale dorato reattivo a coordinate istantanee.
*   Un cerchio follower più grande che segue il punto con un ritardo fluido basato su una formula di interpolazione lineare (LERP = 0.12).
*   Il cursore si espande e cambia colore quando rileva elementi interattivi (link, pulsanti, card).

### D. Header & SideMenu (`Header.tsx` / `SideMenu.tsx`)
*   **Header:** Diventa opaco e si compatta visivamente quando l'utente scorre verso il basso oltre i 50px.
*   **SideMenu:** Menu laterale a scorrimento orizzontale (slide-in) per navigazione secondaria e dispositivi mobile. Blocca lo scorrimento della pagina principale quando attivo.

### E. Hero (`Hero.tsx`)
Presenta il posizionamento del brand: *"DIREZIONE CREATIVA. L'identità è un territorio ostile. Noi lo dominiamo."* con l'immagine fotografica di un modello appoggiato a una supercar e pulsanti di chiamata all'azione per i servizi e la collezione.

### F. Services (`Services.tsx`)
Mostra tre aree chiave attraverso card interattive 3D con effetto "scanner beam":
1.  **BRAND & IDENTITY:** Linee guida, Crest, Vanguard Strategy, Font di comando.
2.  **STRATEGIA, CONTENUTI & LEAD GENERATION:** Sistemi di lead generation d'élite, Produzione contenuti (foto/video), canali PR e Copywriting sovrano.
3.  **FASHION & MERCHANDISING:** Apparel Design, tessuti premium (450 GSM), capi d'archivio, studio di vestibilità sartoriale e packaging personalizzato.
*Nota: Facendo clic su "Commissiona Servizio", l'utente viene reindirizzato automaticamente al modulo contatti con la pre-selezione del servizio desiderato.*

### G. Pillars (`Pillars.tsx`)
Card tilted tridimensionali che illustrano i quattro pilastri dell'agenzia:
1.  **Supremazia Estetica** (rigore geometrico).
2.  **Status Metropolitano** (aristocrazia urbana).
3.  **Rigore Sartoriale** (cotone pesante a 450 GSM).
4.  **Impatto Reale** (lead generation d'élite, conversioni matematiche).

### H. Voice (`Voice.tsx`)
Spiega la strategia comunicativa ("La Voce Implacabile") incentrata su un tono diretto, crudo e minimale. Quattro card presentano le caratteristiche chiave: **Diretto**, **Implacabile**, **Geometrico**, **Silenzioso**.

### I. Merch ("La Collezione Sovrana") (`Merch.tsx`)
Un carosello di capi d'archivio esclusivi ad alte prestazioni interattive:
*   **Slider Infinito Trascinabile:** Duplica i capi 3 volte e usa event listener per supportare il trascinamento del mouse (drag) con inerzia fisica reale, scorrimento tramite rotella del mouse (wheel) e allineamento infinito continuo.
*   **Garment Modal:** Facendo clic su un capo, si apre un modal con dettagli approfonditi (descrizione sartoriale, vestibilità, tipologia di cuciture, grammatura del cotone), selezione delle taglie (S, M, L, XL) e pulsante di ordine rapido.
*   **Capi Disponibili:**
    1.  *Felpa con Stemma Imperiale* (€ 189) — cotone spazzolato pesante, ricamo corona sul petto.
    2.  *Hoodie Vanguard di Lusso* (€ 220) — cappuccio a doppio strato, tasca geometrica, ricamo araldico sul retro.
    3.  *Polo Aristocratica Slim-Fit* (€ 125) — colletto affusolato, bottoni nascosti, ricamo micro 'E'.
    4.  *Crewneck con Cuciture Rosse* (€ 195) — cuciture piatte rosse a contrasto lungo le linee anatomiche.
    5.  *Felpa Sovrana - Stemma Posteriore* (€ 189) — ricamo posteriore ad alta densità 24x28 cm.
    6.  *Felpa Sovrana - Stemma Anteriore* (€ 189) — vestibilità frontale e stemma asimmetrico.

### J. Contact & Accesso (`Contact.tsx`)
Un modulo di contatto sofisticato per la selezione dei clienti.
*   **Effetto Floating Label:** I campi di input presentano etichette animate che si sollevano e rimpiccioliscono quando il campo riceve focus o contiene testo.
*   **Stato del Pulsante:** Il pulsante subisce tre transizioni visive distinte: `Invia Richiesta` (stato iniziale con shimmer) $\rightarrow$ `Connessione al satellite...` (stato di caricamento) $\rightarrow$ `Comando stabilito` (stato completato con bagliore oro).
*   **Notifica Toast:** Al completamento del form, appare una notifica in basso a destra con il messaggio: *"COMANDO RICEVUTO. CANALI DI IDENTITÀ ATTIVATI."*
