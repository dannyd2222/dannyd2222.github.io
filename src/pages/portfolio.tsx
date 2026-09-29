import Head from "next/head";
import NextLink from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AppBar from "../components/Appbar";
import Copyright from "../components/Copyright";
import MotionSection from "../components/MotionSection";
import PortfolioEntry from "../components/portfolio/PortfolioEntry";
import { portfolioServices } from "../data/portfolio";

export default function PortfolioPage() {
  return (
    <Box component="main" sx={{ minHeight: "100vh", pb: 6 }}>
      <Head>
        <title>Portfolio · Daniele Dalle Nogare</title>
        <meta
          name="description"
          content="Panoramica dei servizi già realizzati: integrazioni pubblicitarie, piattaforme gestionali, intelligenza artificiale e visualizzazione dati."
        />
      </Head>
      <AppBar parent="/" />
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box sx={{ pt: { xs: 3, sm: 5 }, pb: { xs: 1, sm: 2 } }}>
          <MotionSection>
            <Box>
              <Typography
                variant="overline"
                color="primary"
                sx={{ fontWeight: 700, letterSpacing: "0.16em" }}
              >
                Portfolio
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Una panoramica dei tipi di soluzioni su cui ho lavorato:
                integrazioni che girano da sole, piattaforme per il lavoro di un
                team, intelligenza artificiale su conoscenze specifiche e dati
                che si consultano ogni giorno. Il filo conduttore è il valore
                che questi servizi lasciano a chi li usa.
              </Typography>
            </Box>
          </MotionSection>
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: { xs: 2.5, md: 6 },
            mt: { xs: 3, md: 4 },
          }}
        >
          {portfolioServices.map((service, index) => (
            <MotionSection key={service.id} delay={0.04}>
              <PortfolioEntry service={service} index={index} />
            </MotionSection>
          ))}
        </Box>

        <MotionSection delay={0.06}>
          <Box
            sx={{
              mt: { xs: 4, md: 6 },
              mb: 4,
              px: { xs: 2.5, sm: 4 },
              py: { xs: 3, sm: 4 },
              borderRadius: 3,
              border: 1,
              borderColor: "divider",
              bgcolor: "background.paper",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h6" component="p">
                Stai cercando di sviluppare una soluzione simile a queste?
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.75 }}
              >
                Posso raccontare come l’ho già affrontato e da dove conviene
                partire.
              </Typography>
            </Box>
            <Button
              component={NextLink}
              href="/#contatti"
              variant="contained"
              size="large"
            >
              Scrivimi
            </Button>
          </Box>
        </MotionSection>

        <MotionSection delay={0.08}>
          <Copyright />
        </MotionSection>
      </Container>
    </Box>
  );
}
