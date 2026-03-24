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
import Grid from "@mui/material/Grid";
import Copyright from "../components/Copyright";
import Avatar from "../components/Avatar";
import ReferenceIcon from "../components/ReferenceIcon";
import SectionItem from "../components/SectionItem";
import SkypeIcon from "../components/icons/SkypeIcon";
import AppBar from "../components/Appbar";
import DataItem from "../components/DataItem";
import ContactForm from '../components/ContactForm';
import settings from "../data.json";

export default function Index() {
  const name = settings.fullName;
  const role = settings.role;
  const profileImage = settings.imageUrl;

  return (
    <div>
      <AppBar />
      <Container maxWidth="md">
        <Box my={4} display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" component="h1" gutterBottom align="center">
            {name}
          </Typography>
          <Typography variant="h6" component="h6" gutterBottom align="center">
            {role}
          </Typography>

          <Box m={1} />

          <Avatar imgSrc={profileImage} imgAlt={name} />

          <Box m={1} />

          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            paddingLeft={2}
            paddingRight={2}
          >
            <Grid container spacing={2} alignItems="flex-start" justifyContent="space-evenly">
              <Grid item>
                <ReferenceIcon
                  icon={GitHubIcon}
                  description="@dannyd2222"
                  href="https://github.com/dannyd2222"
                />
              </Grid>
              <Grid item>
                <ReferenceIcon
                  icon={LocationOnIcon}
                  description="Milan, Italy"
                  href="https://en.wikipedia.org/wiki/Milan"
                />
              </Grid>
              <Grid item>
                <ReferenceIcon
                  icon={LinkedIn}
                  description="in/danieledallenogare"
                  href="https://www.linkedin.com/in/danieledallenogare/"
                />
              </Grid>
              <Grid item>
                <ReferenceIcon
                  icon={SkypeIcon}
                  description="Daniele(dannyd22)"
                  href="https://join.skype.com/invite/pBiNl8SEdq8I"
                />
              </Grid>
              <Grid item>
                <ReferenceIcon
                  icon={MailIcon}
                  description="daniele.dallen@gmail.com"
                  href="mailto:daniele.dallen@gmail.com"
                />
              </Grid>
            </Grid>
          </Box>

          <Box m={4} />

          <SectionItem title="Competenze digitali" initiallyExpanded>
            {settings.techStaff.map(staff => (
              <Box display="inline-block" key={staff} m={0.5}>
                <Chip label={staff} avatar={<DoneIcon />} />
              </Box>
            ))}
          </SectionItem>

          <Box my={2} />

          <SectionItem title="Esperienze lavorative">
            {settings.experience.map(it => (
              <DataItem
                key={it.title}
                title={it.title}
                place={it.place}
                placeUrl={it.placeUrl}
                image={it.image}
                timePeriod={it.timePeriod}
                contentParagraphs={it.contentParagraphs}
              />
            ))}
          </SectionItem>

          <Box my={2} />

          <SectionItem title="Istruzione e formazione">
            {settings.education.map(it => (
              <DataItem
                key={it.title}
                title={it.title}
                place={it.place}
                placeUrl={it.placeUrl}
                image={it.image}
                timePeriod={it.timePeriod}
              />
            ))}
          </SectionItem>

          <Box my={2} />

          <ContactForm />

          <Box my={2} />

          <Copyright />

          <Box m={2} />

        </Box>
      </Container>
    </div>
  );
}
