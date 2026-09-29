import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import AppBar from "../../components/Appbar";
import Copyright from "../../components/Copyright";
import TechStaffEditor from "../../components/admin/TechStaffEditor";
import TimelineEntryEditor from "../../components/admin/TimelineEntryEditor";
import {
  fetchEditableProfile,
  fetchMe,
  saveEditableProfile,
} from "../../lib/adminApi";
import { clearToken, isAdminApiConfigured } from "../../lib/adminAuth";
import {
  emptyTimelineEntry,
  type EditableProfile,
  type TimelineEntry,
} from "../../lib/profileTypes";

function normalizeParagraphs(raw: unknown): string[] {
  if (!Array.isArray(raw) || raw.length === 0) return [""];
  return raw.map((item) =>
    typeof item === "string" ? item : JSON.stringify(item)
  );
}

function normalizeEntry(raw: Record<string, unknown>): TimelineEntry {
  return {
    title: typeof raw.title === "string" ? raw.title : "",
    place: typeof raw.place === "string" ? raw.place : "",
    placeUrl: typeof raw.placeUrl === "string" ? raw.placeUrl : "",
    image: typeof raw.image === "string" ? raw.image : "",
    timePeriod: typeof raw.timePeriod === "string" ? raw.timePeriod : "",
    contentParagraphs: normalizeParagraphs(raw.contentParagraphs),
  };
}

function normalizeProfile(data: EditableProfile): EditableProfile {
  return {
    techStaff: Array.isArray(data.techStaff)
      ? data.techStaff.filter((s) => typeof s === "string")
      : [],
    experience: Array.isArray(data.experience)
      ? data.experience.map((e) =>
          normalizeEntry(e as Record<string, unknown>)
        )
      : [],
    education: Array.isArray(data.education)
      ? data.education.map((e) =>
          normalizeEntry(e as Record<string, unknown>)
        )
      : [],
  };
}

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [profile, setProfile] = React.useState<EditableProfile | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!isAdminApiConfigured()) {
      setLoading(false);
      setError(
        "API admin non configurata. Imposta NEXT_PUBLIC_PROFILE_API_URL in build."
      );
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const me = await fetchMe();
        if (!me.authenticated) {
          router.replace("/login");
          return;
        }
        const data = await fetchEditableProfile();
        if (!cancelled) {
          setProfile(normalizeProfile(data));
        }
      } catch (e) {
        if (!cancelled) {
          const message =
            e instanceof Error ? e.message : "Impossibile caricare i dati";
          setError(message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const cleaned: EditableProfile = {
        techStaff: profile.techStaff.map((s) => s.trim()).filter(Boolean),
        experience: profile.experience.map((entry) => ({
          ...entry,
          contentParagraphs: entry.contentParagraphs
            .map((p) => p.trim())
            .filter(Boolean),
        })),
        education: profile.education.map((entry) => ({
          ...entry,
          contentParagraphs: entry.contentParagraphs
            .map((p) => p.trim())
            .filter(Boolean),
        })),
      };
      const saved = await saveEditableProfile(cleaned);
      setProfile(normalizeProfile(saved));
      setSuccess(
        "Salvato su GitHub. Il sito pubblico si aggiorna dopo il deploy Actions (circa 2–3 minuti)."
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Salvataggio non riuscito");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    clearToken();
    router.push("/login");
  };

  return (
    <>
      <Head>
        <title>Modifica profilo · DDN</title>
      </Head>
      <AppBar parent="/" />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          flexWrap="wrap"
          gap={2}
          sx={{ mb: 3 }}
        >
          <div>
            <Typography variant="h5" component="h1" fontWeight={700}>
              Modifica profilo
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Competenze, esperienze lavorative e istruzione
            </Typography>
          </div>
          <Box display="flex" gap={1}>
            <Button variant="outlined" onClick={handleLogout}>
              Esci
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!profile || saving}
            >
              {saving ? "Salvataggio…" : "Salva su GitHub"}
            </Button>
          </Box>
        </Box>

        {error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : null}
        {success ? (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        ) : null}

        {loading ? (
          <Box display="flex" justifyContent="center" py={6}>
            <CircularProgress />
          </Box>
        ) : profile ? (
          <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
            <Tabs
              value={tab}
              onChange={(_, value) => setTab(value)}
              sx={{ mb: 3 }}
            >
              <Tab label="Competenze" />
              <Tab label="Esperienze" />
              <Tab label="Istruzione" />
            </Tabs>

            {tab === 0 ? (
              <TechStaffEditor
                value={profile.techStaff}
                onChange={(techStaff) =>
                  setProfile({ ...profile, techStaff })
                }
              />
            ) : null}

            {tab === 1 ? (
              <TimelineEntryEditor
                label="Esperienza"
                entries={profile.experience}
                onChange={(experience) =>
                  setProfile({ ...profile, experience })
                }
                onAdd={() =>
                  setProfile({
                    ...profile,
                    experience: [...profile.experience, emptyTimelineEntry()],
                  })
                }
              />
            ) : null}

            {tab === 2 ? (
              <TimelineEntryEditor
                label="Istruzione"
                entries={profile.education}
                onChange={(education) =>
                  setProfile({ ...profile, education })
                }
                onAdd={() =>
                  setProfile({
                    ...profile,
                    education: [...profile.education, emptyTimelineEntry()],
                  })
                }
              />
            ) : null}
          </Paper>
        ) : null}

        <Box my={4} display="flex" justifyContent="center">
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
