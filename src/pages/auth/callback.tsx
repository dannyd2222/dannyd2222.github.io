import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import AppBar from "../../components/Appbar";
import { storeToken } from "../../lib/adminAuth";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!router.isReady) return;

    const queryError =
      typeof router.query.error === "string" ? router.query.error : null;
    if (queryError === "not_allowed") {
      setError(
        "Account GitHub non autorizzato. Solo il proprietario del repository può modificare il profilo."
      );
      return;
    }

    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const match = hash.match(/^#token=(.+)$/);
    if (!match) {
      setError("Token di accesso mancante o non valido.");
      return;
    }

    try {
      const token = decodeURIComponent(match[1]);
      storeToken(token);
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`
      );
      router.replace("/admin");
    } catch {
      setError("Impossibile completare l'accesso.");
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Accesso · DDN</title>
      </Head>
      <AppBar parent="/login" />
      <Container maxWidth="sm" sx={{ py: 8 }}>
        {error ? (
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" href="/login">
                Riprova
              </Button>
            }
          >
            {error}
          </Alert>
        ) : (
          <Box textAlign="center">
            <CircularProgress sx={{ mb: 2 }} />
            <Typography>Accesso in corso…</Typography>
          </Box>
        )}
      </Container>
    </>
  );
}
