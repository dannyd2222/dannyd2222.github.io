export type TimelineEntry = {
  enabled: boolean;
  title: string;
  place: string;
  placeUrl: string;
  image: string;
  timePeriod: string;
  contentParagraphs: string[];
};

export type EditableSection<T> = {
  enabled: boolean;
  items: T[];
};

export type PortfolioImage = {
  src: string;
  alt: string;
};

export type PortfolioService = {
  enabled: boolean;
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  description: string;
  outcomes: string[];
  tags: string[];
  visual?: PortfolioVisual;
  image?: PortfolioImage;
  href?: string;
  hrefLabel?: string;
};

export const PORTFOLIO_VISUALS = ["ads", "crm", "ai", "data"] as const;
export type PortfolioVisual = (typeof PORTFOLIO_VISUALS)[number];

export type EditableProfile = {
  techStaff: string[];
  experience: EditableSection<TimelineEntry>;
  education: EditableSection<TimelineEntry>;
  portfolio: EditableSection<PortfolioService>;
};

export function normalizeSection<T>(
  raw: EditableSection<T> | T[] | undefined
): EditableSection<T> {
  if (Array.isArray(raw)) return { enabled: true, items: raw };
  if (raw && typeof raw === "object") {
    const section = raw as EditableSection<T>;
    return {
      enabled: typeof section.enabled === "boolean" ? section.enabled : true,
      items: Array.isArray(section.items) ? section.items : [],
    };
  }
  return { enabled: true, items: [] };
}

export function validatePortfolioServices(
  services: PortfolioService[]
): string | null {
  const ids = new Set<string>();
  for (const service of services) {
    if (!service.id.trim() || ids.has(service.id)) {
      return "Il portfolio deve avere ID non vuoti e univoci.";
    }
    ids.add(service.id);
    if (!service.title.trim()) return "Inserisci un titolo per ogni progetto.";
    if (
      service.visual !== undefined &&
      !PORTFOLIO_VISUALS.includes(service.visual)
    ) {
      return "Il visual selezionato non è valido.";
    }
    if (service.visual && service.image) {
      return "Scegli un solo media per progetto: visual oppure immagine.";
    }
    if (
      service.image &&
      (!isValidImageSource(service.image.src) || !service.image.alt.trim())
    ) {
      return "Inserisci un URL o percorso immagine valido e il testo alternativo.";
    }
    if (
      service.href &&
      !/^https?:\/\/\S+$/i.test(service.href.trim())
    ) {
      return "Il link del progetto deve essere un URL http o https.";
    }
  }
  return null;
}

function isValidImageSource(src: string): boolean {
  const value = src.trim();
  return (
    /^https?:\/\/\S+$/i.test(value) ||
    (value.startsWith("/") && !value.startsWith("//"))
  );
}

export function emptyTimelineEntry(): TimelineEntry {
  return {
    enabled: true,
    title: "",
    place: "",
    placeUrl: "",
    image: "",
    timePeriod: "",
    contentParagraphs: [""],
  };
}

export function emptyPortfolioService(id: string): PortfolioService {
  return {
    enabled: true,
    id,
    eyebrow: "",
    title: "Nuovo progetto",
    summary: "",
    description: "",
    outcomes: [""],
    tags: [""],
  };
}
