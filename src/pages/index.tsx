import React from "react";
import MailIcon from "@mui/icons-material/Mail";
import GitHubIcon from "@mui/icons-material/GitHub";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DoneIcon from "@mui/icons-material/Done";
import LinkedIn from "@mui/icons-material/LinkedIn";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import Copyright from "../components/Copyright";
import Avatar from "../components/Avatar";
import ReferenceIcon from "../components/ReferenceIcon";
import SectionItem from "../components/SectionItem";
import SkypeIcon from "../components/icons/SkypeIcon";
import AppBar from "../components/Appbar";
import CvDownloadButton from "../components/CvDownloadButton";
import DataItem from "../components/DataItem";
import ContactForm from "../components/ContactForm";
import MotionSection, {
  StaggerChild,
  StaggerInView,
} from "../components/MotionSection";
import settings from "../data.json";

export default function Index() {
  const name = settings.fullName;
  const role = settings.role;
  const profileImage = settings.imageUrl;

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        pb: 6,
      }}
    >
      <AppBar />
      <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="stretch"
          sx={{ pt: { xs: 2, sm: 4 }, width: "100%" }}
        >
          <Box
            sx={{
              alignSelf: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              maxWidth: 640,
            }}
          >
            <MotionSection>
              <Box
                textAlign="center"
                sx={{
                  width: "100%",
                  px: 1,
                  py: { xs: 1, sm: 2 },
                }}
              >
                <Typography variant="h4" component="h1" gutterBottom>
                  {name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ fontWeight: 500, letterSpacing: "0.01em" }}
                >
                  {role}
                </Typography>
                <Box sx={{ mt: 2.5 }}>
                  <CvDownloadButton />
                </Box>
              </Box>
            </MotionSection>

            <Box sx={{ my: 2 }} />

            <MotionSection delay={0.06}>
              <Avatar imgSrc={profileImage} imgAlt={name} />
            </MotionSection>

            <Box sx={{ my: 3 }} />

            <MotionSection delay={0.1}>
              <StaggerInView
                style={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "14px 20px",
                }}
              >
                {[
                  {
                    icon: GitHubIcon,
                    description: "@dannyd2222",
                    href: "https://github.com/dannyd2222",
                  },
                  {
                    icon: LocationOnIcon,
                    description: "Milan, Italy",
                    href: "https://en.wikipedia.org/wiki/Milan",
                  },
                  {
                    icon: LinkedIn,
                    description: "in/danieledallenogare",
                    href: "https://www.linkedin.com/in/danieledallenogare/",
                  },
                  {
                    icon: SkypeIcon,
                    description: "Daniele(dannyd22)",
                    href: "https://join.skype.com/invite/pBiNl8SEdq8I",
                  },
                  {
                    icon: MailIcon,
                    description: "daniele.dallen@gmail.com",
                    href: "mailto:daniele.dallen@gmail.com",
                  },
                ].map((item) => (
                  <StaggerChild
                    key={item.description}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Box
                      sx={{
                        px: 1.5,
                        py: 0.75,
                        borderRadius: 2,
                        border: 1,
                        borderColor: "divider",
                        bgcolor: "background.paper",
                        transition: "border-color 0.2s, box-shadow 0.2s",
                        "&:hover": {
                          borderColor: "primary.main",
                          boxShadow: (t) =>
                            `0 4px 20px ${alpha(t.palette.primary.main, 0.15)}`,
                        },
                      }}
                    >
                      <ReferenceIcon
                        icon={item.icon}
                        description={item.description}
                        href={item.href}
                      />
                    </Box>
                  </StaggerChild>
                ))}
              </StaggerInView>
            </MotionSection>
          </Box>

          <Box sx={{ my: 4 }} />

          <MotionSection delay={0.05}>
            <SectionItem title="Competenze digitali" initiallyExpanded>
              <StaggerInView
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  width: "100%",
                  columnGap: 24,
                  rowGap: 22,
                }}
              >
                {settings.techStaff.map((staff) => (
                  <StaggerChild key={staff} style={{ display: "inline-block" }}>
                    <Chip
                      label={staff}
                      avatar={<DoneIcon fontSize="small" />}
                      sx={{
                        borderColor: (t) => alpha(t.palette.primary.main, 0.4),
                        bgcolor: (t) => alpha(t.palette.primary.main, 0.06),
                      }}
                    />
                  </StaggerChild>
                ))}
              </StaggerInView>
            </SectionItem>
          </MotionSection>

          <Box sx={{ my: 3 }} />

          <MotionSection delay={0.08}>
            <SectionItem title="Esperienze lavorative">
              {settings.experience.map((it) => (
                <DataItem
                  key={it.title + it.timePeriod}
                  title={it.title}
                  place={it.place}
                  placeUrl={it.placeUrl}
                  image={it.image}
                  timePeriod={it.timePeriod}
                  contentParagraphs={it.contentParagraphs}
                />
              ))}
            </SectionItem>
          </MotionSection>

          <Box sx={{ my: 3 }} />

          <MotionSection delay={0.1}>
            <SectionItem title="Istruzione e formazione">
              {settings.education.map((it) => (
                <DataItem
                  key={`${it.title}-${it.timePeriod}`}
                  title={it.title}
                  place={it.place}
                  placeUrl={it.placeUrl}
                  image={it.image}
                  timePeriod={it.timePeriod}
                  contentParagraphs={it.contentParagraphs}
                />
              ))}
              {Array.isArray(settings.researchProjects) &&
              settings.researchProjects.length > 0 ? (
                <>
                  <Typography
                    variant="subtitle1"
                    component="h3"
                    sx={{
                      mt: 2,
                      mb: 1.5,
                      ml: 2,
                      fontWeight: 600,
                      color: "text.primary",
                    }}
                  >
                    Progetti di ricerca
                  </Typography>
                  {settings.researchProjects.map((it) => (
                    <DataItem
                      key={`${it.title}-${it.timePeriod}`}
                      title={it.title}
                      place={it.place}
                      placeUrl={it.placeUrl}
                      image={it.image}
                      timePeriod={it.timePeriod}
                      contentParagraphs={it.contentParagraphs}
                    />
                  ))}
                </>
              ) : null}
              {Array.isArray(settings.publications) &&
              settings.publications.length > 0 ? (
                <>
                  <Typography
                    variant="subtitle1"
                    component="h3"
                    sx={{
                      mt: 3,
                      mb: 1.5,
                      ml: 2,
                      fontWeight: 600,
                      color: "text.primary",
                    }}
                  >
                    Pubblicazioni scientifiche
                  </Typography>
                  {settings.publications.map((it) => (
                    <DataItem
                      key={`${it.title}-${it.timePeriod}`}
                      title={it.title}
                      place={it.place}
                      placeUrl={it.placeUrl}
                      image={it.image}
                      timePeriod={it.timePeriod}
                      contentParagraphs={it.contentParagraphs}
                    />
                  ))}
                </>
              ) : null}
            </SectionItem>
          </MotionSection>

          <Box sx={{ my: 3 }} />

          <MotionSection delay={0.12}>
            <ContactForm />
          </MotionSection>

          <Box sx={{ my: 3 }} />

          <MotionSection delay={0.14}>
            <Copyright />
          </MotionSection>

          <Box sx={{ m: 2 }} />
        </Box>
      </Container>
    </Box>
  );
}
