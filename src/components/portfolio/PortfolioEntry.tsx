import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { alpha, useTheme } from "@mui/material/styles";
import type { PortfolioService } from "../../data/portfolio";
import ServiceVisual from "./ServiceVisual";

type PortfolioEntryProps = {
  service: PortfolioService;
  index: number;
};

export default function PortfolioEntry({ service, index }: PortfolioEntryProps) {
  const theme = useTheme();
  const reverse = index % 2 === 1;
  const shadow =
    theme.palette.mode === "dark"
      ? `0 10px 36px ${alpha("#000", 0.45)}`
      : `0 10px 34px ${alpha("#0f172a", 0.08)}`;

  return (
    <Box
      component="article"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: reverse ? "row-reverse" : "row" },
        overflow: "hidden",
        borderRadius: 3,
        border: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
        boxShadow: shadow,
      }}
    >
      <Box sx={{ flex: { md: "1.08 1 0" }, minWidth: 0 }}>
        <ServiceVisual kind={service.visual} />
      </Box>
      <Box
        sx={{
          flex: { md: "0.92 1 0" },
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 1.5,
          px: { xs: 2.5, sm: 3.5, md: 4 },
          py: { xs: 2.5, sm: 3.5, md: 4 },
          borderTop: { xs: 1, md: 0 },
          borderColor: "divider",
        }}
      >
        <Typography
          variant="overline"
          color="primary"
          sx={{ fontWeight: 700, letterSpacing: "0.14em", lineHeight: 1.4 }}
        >
          {String(index + 1).padStart(2, "0")} · {service.eyebrow}
        </Typography>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
          {service.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {service.description}
        </Typography>
        <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none", display: "grid", gap: 1 }}>
          {service.outcomes.map((outcome) => (
            <Box
              component="li"
              key={outcome}
              sx={{ display: "flex", alignItems: "flex-start", gap: 1.25 }}
            >
              <DoneIcon
                fontSize="small"
                color="primary"
                sx={{ mt: "2px", flexShrink: 0 }}
              />
              <Typography variant="body2">{outcome}</Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, pt: 0.5 }}>
          {service.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </Box>
        {service.href ? (
          <Link
            href={service.href}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              width: "fit-content",
              fontWeight: 600,
            }}
          >
            {service.hrefLabel}
            <OpenInNewIcon sx={{ fontSize: 16 }} />
          </Link>
        ) : null}
      </Box>
    </Box>
  );
}
