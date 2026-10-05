import {
  normalizeSection,
  validatePortfolioServices,
  type PortfolioService,
} from "../profileTypes";

const service: PortfolioService = {
  enabled: true,
  id: "progetto",
  eyebrow: "Progetto",
  title: "Progetto di esempio",
  summary: "Sommario",
  description: "Descrizione",
  outcomes: ["Risultato"],
  tags: ["Tag"],
};

describe("profile data compatibility", () => {
  it("treats legacy arrays as enabled sections", () => {
    expect(normalizeSection(["voce"])).toEqual({
      enabled: true,
      items: ["voce"],
    });
  });

  it("defaults a missing section flag to enabled", () => {
    expect(normalizeSection({ items: ["voce"] } as never)).toEqual({
      enabled: true,
      items: ["voce"],
    });
  });
});

describe("portfolio validation", () => {
  it("accepts text-only projects and supported visuals", () => {
    expect(validatePortfolioServices([service])).toBeNull();
    expect(
      validatePortfolioServices([{ ...service, visual: "ads" }])
    ).toBeNull();
  });

  it("rejects duplicate IDs, empty titles, and two media modes", () => {
    expect(validatePortfolioServices([service, service])).toContain("univoci");
    expect(
      validatePortfolioServices([{ ...service, title: " " }])
    ).toContain("titolo");
    expect(
      validatePortfolioServices([
        { ...service, visual: "ads", image: { src: "/image.jpg", alt: "Immagine" } },
      ])
    ).toContain("un solo media");
  });

  it("requires descriptive text and safe image sources", () => {
    expect(
      validatePortfolioServices([
        { ...service, image: { src: "javascript:alert(1)", alt: "Immagine" } },
      ])
    ).toContain("immagine valido");
    expect(
      validatePortfolioServices([
        { ...service, image: { src: "/image.jpg", alt: " " } },
      ])
    ).toContain("testo alternativo");
  });
});
