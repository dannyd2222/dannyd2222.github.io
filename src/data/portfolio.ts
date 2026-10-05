import settings from "../data.json";
import {
  normalizeSection,
  type EditableSection,
  type PortfolioService,
} from "../lib/profileTypes";

export {
  PORTFOLIO_VISUALS,
  type PortfolioImage,
  type PortfolioService,
  type PortfolioVisual,
} from "../lib/profileTypes";

const portfolio = normalizeSection<PortfolioService>(
  (settings as unknown as { portfolio?: EditableSection<PortfolioService> | PortfolioService[] }).portfolio
);

export const portfolioServices = portfolio.items.filter((service) => service.enabled !== false);
export const portfolioSectionEnabled = portfolio.enabled;
