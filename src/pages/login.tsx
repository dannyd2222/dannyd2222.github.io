import React from "react";
import Head from "next/head";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import GitHubIcon from "@mui/icons-material/GitHub";
import AppBar from "../components/Appbar";
import Copyright from "../components/Copyright";
import { buildOAuthStartUrl, isAdminApiConfigured } from "../lib/adminAuth";

export default function Login() {
  const apiReady = isAdminApiConfigured();

  const handleGitHubLogin = () => {
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://dannyd2222.github.io";
    window.location.href = buildOAuthStartUrl(origin);
  };

  return (
    <div>
      <Head>
        <title>Accesso admin · DDN</title>
      </Head>
      <AppBar parent="/" />
      <Container maxWidth="md">
        <Box
          sx={{
            width: "100%",
            maxWidth: 420,
            mx: "auto",
            my: 4,
            py: 3,
            px: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <div>
            <Typography variant="h5" align="center">
              <strong>Area admin</strong>
            </Typography>
            <Box m={1} />
            <Typography variant="subtitle1" color="textSecondary" align="center">
              Accedi con GitHub per modificare competenze, esperienze e
              istruzione.
            </Typography>
          </div>

          {!apiReady ? (
            <Alert severity="warning">
              L&apos;URL dell&apos;API non è configurato. In produzione imposta
              il secret{" "}
              <code>NEXT_PUBLIC_PROFILE_API_URL</code> nel workflow GitHub
              Actions (vedi docs/ADMIN_SETUP.md).
            </Alert>
          ) : null}

          <Button
            variant="contained"
            size="large"
            startIcon={<GitHubIcon />}
            onClick={handleGitHubLogin}
            disabled={!apiReady}
            sx={{ mt: 1 }}
          >
            Accedi con GitHub
          </Button>
        </Box>

        <Box my={4} display="flex" flexDirection="column" alignItems="center">
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
