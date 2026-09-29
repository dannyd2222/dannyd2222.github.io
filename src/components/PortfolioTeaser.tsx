import NextLink from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { alpha } from "@mui/material/styles";
import { portfolioServices } from "../data/portfolio";

export default function PortfolioTeaser() {
  return (
    <Box
      sx={{
        px: { xs: 2, sm: 2.5 },
        py: { xs: 2.5, sm: 3 },
        borderRadius: 3,
        border: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
        boxShadow: (t) =>
          t.palette.mode === "dark"
            ? `0 8px 32px ${alpha("#000", 0.4)}`
            : `0 8px 30px ${alpha("#0f172a", 0.06)}`,
      }}
    >
      <Typography
        variant="overline"
        color="primary"
        sx={{ fontWeight: 700, letterSpacing: "0.14em" }}
      >
        Portfolio
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
        Integrazioni, piattaforme gestionali, intelligenza artificiale e dati:
        una panoramica dei servizi su cui ho già lavorato.
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 1.25,
          mb: 2.5,
        }}
      >
        {portfolioServices.map((service, index) => (
          <Box
            key={service.id}
            component={NextLink}
            href="/portfolio"
            sx={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
              px: 1.5,
              py: 1.25,
              borderRadius: 2,
              border: 1,
              borderColor: "divider",
              bgcolor: (t) => alpha(t.palette.primary.main, 0.04),
              transition: "border-color 0.2s, box-shadow 0.2s",
              "&:hover": {
                borderColor: "primary.main",
                boxShadow: (t) =>
                  `0 4px 20px ${alpha(t.palette.primary.main, 0.14)}`,
              },
            }}
          >
            <Typography
              variant="caption"
              color="primary"
              sx={{ fontWeight: 700 }}
            >
              {String(index + 1).padStart(2, "0")} · {service.eyebrow}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.25 }}>
              {service.summary}
            </Typography>
          </Box>
        ))}
      </Box>
      <Button
        component={NextLink}
        href="/portfolio"
        variant="contained"
        endIcon={<ArrowForwardIcon />}
      >
        Apri il portfolio
      </Button>
    </Box>
  );
}
