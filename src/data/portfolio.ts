export type PortfolioVisual = "ads" | "crm" | "ai" | "data";

export type PortfolioService = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  description: string;
  outcomes: string[];
  tags: string[];
  visual: PortfolioVisual;
  href?: string;
  hrefLabel?: string;
};

export const portfolioServices: PortfolioService[] = [
  {
    id: "ads-sync",
    eyebrow: "Integrazioni (Google Ads)",
    title: "Sincronizzazione automatica delle audience Google Ads",
    summary:
      "Le audience si aggiornano automaticamente dai dati di business, senza caricamenti manuali.",
    description:
      "Una soluzione cloud che collega BigQuery e Google Ads tramite Google Data Manager API, mantenendo le audience allineate ai dati reali. Il flusso gestisce creazione lista, ingest dei membri, checkpoint e diagnostica, così il team riduce le operazioni manuali e mantiene il controllo sul processo.",
    outcomes: [
      "Aggiornamento automatico delle audience senza interventi manuali",
      "Pipeline più affidabile grazie a checkpoint, logging e diagnostica",
      "Processo eseguibile in cloud, indipendente dalla macchina del singolo operatore",
    ],
    tags: ["Google Ads", "BigQuery", "Automazione", "Cloud Run"],
    visual: "ads",
  },
  {
    id: "platforms",
    eyebrow: "Piattaforme",
    title: "Gestionali progettati sul modo di lavorare",
    summary:
      "Soluzioni su misura per marketing, sport, servizi e altri contesti operativi.",
    description:
      "Piattaforme web pensate per organizzare attività, processi e relazioni in modo semplice e coerente con il lavoro quotidiano. Ogni flusso viene adattato al settore e agli obiettivi del cliente, evitando modelli generici e riducendo passaggi inutili.",
    outcomes: [
      "Processi più chiari e facili da seguire",
      "Meno dispersione tra fogli, email e strumenti separati",
      "Un sistema adattato al settore e ai flussi reali del team",
    ],
    tags: ["Frontend", "API", "Cloud", "Business Intelligence"],
    visual: "crm",
  },
  {
    id: "generative-ai",
    eyebrow: "Intelligenza artificiale",
    title: "Risposte ancorate a una conoscenza precisa",
    summary:
      "Analisi documenti, assistenti e suggerimenti su materiale proprio.",
    description:
      "Servizi di AI generativa che rispondono su una base di conoscenza specifica: documenti, regole, storico. Servono a leggere testi lunghi, dialogare con un assistente e ottenere previsioni o suggerimenti utili a decidere.",
    outcomes: [
      "Risposte legate al materiale dell’organizzazione",
      "Analisi di documenti in pochi minuti, al posto di una lettura integrale",
      "Indicazioni e previsioni a supporto di chi deve scegliere",
    ],
    tags: ["AI", "Documenti", "Assistenti", "Previsioni"],
    visual: "ai",
  },
  {
    id: "data",
    eyebrow: "Dati",
    title: "Numeri grandi, letture immediate",
    summary: "Dati di grandi dimensioni resi consultabili in dashboard.",
    description:
      "Dalla gestione di grandi quantità di dati fino a dashboard che si aprono e si esplorano. Gli archivi diventano una vista condivisa di cosa sta succedendo, senza aspettare che qualcuno prepari un report.",
    outcomes: [
      "Dati aggiornati e affidabili, pronti da consultare",
      "Cruscotti interattivi per filtrare, confrontare e scendere nel dettaglio",
      "La stessa lettura per chi analizza e per chi decide",
    ],
    tags: ["Big data", "Dashboard", "Data Warehouse"],
    visual: "data",
  },
];
