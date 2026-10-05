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
import PortfolioEditor from "../../components/admin/PortfolioEditor";
import {
  fetchEditableProfile,
  fetchMe,
  saveEditableProfile,
} from "../../lib/adminApi";
import { clearToken, isAdminApiConfigured } from "../../lib/adminAuth";
import {
  emptyTimelineEntry,
  emptyPortfolioService,
  normalizeSection,
  validatePortfolioServices,
  type EditableProfile,
  type PortfolioService,
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
    enabled: typeof raw.enabled === "boolean" ? raw.enabled : true,
    title: typeof raw.title === "string" ? raw.title : "",
    place: typeof raw.place === "string" ? raw.place : "",
    placeUrl: typeof raw.placeUrl === "string" ? raw.placeUrl : "",
    image: typeof raw.image === "string" ? raw.image : "",
    timePeriod: typeof raw.timePeriod === "string" ? raw.timePeriod : "",
    contentParagraphs: normalizeParagraphs(raw.contentParagraphs),
  };
}

function normalizeProfile(data: EditableProfile): EditableProfile {
  const raw = data as unknown as Record<string, unknown>;
  const experience = normalizeSection<Record<string, unknown>>(
    raw.experience as Record<string, unknown>[] | undefined
  );
  const education = normalizeSection<Record<string, unknown>>(
    raw.education as Record<string, unknown>[] | undefined
  );
  const portfolio = normalizeSection<PortfolioService>(
    raw.portfolio as PortfolioService[] | EditableProfile["portfolio"] | undefined
  );
  return {
    techStaff: Array.isArray(data.techStaff)
      ? data.techStaff.filter((s) => typeof s === "string")
      : [],
    experience: {
      enabled: experience.enabled,
      items: experience.items.map((e) => normalizeEntry(e)),
    },
    education: {
      enabled: education.enabled,
      items: education.items.map((e) => normalizeEntry(e)),
    },
    portfolio: {
      enabled: portfolio.enabled,
      items: portfolio.items.map((item) => ({
        ...item,
        enabled: typeof item.enabled === "boolean" ? item.enabled : true,
        outcomes: Array.isArray(item.outcomes) ? item.outcomes : [],
        tags: Array.isArray(item.tags) ? item.tags : [],
      })),
    },
  };
}

function createPortfolioId(title: string, existing: PortfolioService[]) {
  const base =
    title
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "progetto";
  let id = base;
  let suffix = 2;
  while (existing.some((service) => service.id === id)) {
    id = `${base}-${suffix++}`;
  }
  return id;
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
        experience: {
          enabled: profile.experience.enabled,
          items: profile.experience.items.map((entry) => ({
            ...entry,
            contentParagraphs: entry.contentParagraphs
              .map((p) => p.trim())
              .filter(Boolean),
          })),
        },
        education: {
          enabled: profile.education.enabled,
          items: profile.education.items.map((entry) => ({
            ...entry,
            contentParagraphs: entry.contentParagraphs
              .map((p) => p.trim())
              .filter(Boolean),
          })),
        },
        portfolio: {
          enabled: profile.portfolio.enabled,
          items: profile.portfolio.items.map((service) => ({
            ...service,
            outcomes: service.outcomes.map((item) => item.trim()).filter(Boolean),
            tags: service.tags.map((item) => item.trim()).filter(Boolean),
            ...(service.image?.src.trim()
              ? { image: { src: service.image.src.trim(), alt: service.image.alt.trim() } }
              : { image: undefined }),
            ...(service.href?.trim()
              ? { href: service.href.trim() }
              : { href: undefined }),
            ...(service.hrefLabel?.trim()
              ? { hrefLabel: service.hrefLabel.trim() }
              : { hrefLabel: undefined }),
          })),
        },
      };
      const portfolioError = validatePortfolioServices(cleaned.portfolio.items);
      if (portfolioError) throw new Error(portfolioError);
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
              Competenze, esperienze, istruzione e portfolio
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
              <Tab label="Portfolio" />
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
                entries={profile.experience.items}
                enabled={profile.experience.enabled}
                onChange={(experience) =>
                  setProfile({
                    ...profile,
                    experience: { ...profile.experience, items: experience },
                  })
                }
                onEnabledChange={(enabled) =>
                  setProfile({
                    ...profile,
                    experience: { ...profile.experience, enabled },
                  })
                }
                onAdd={() =>
                  setProfile({
                    ...profile,
                    experience: {
                      ...profile.experience,
                      items: [...profile.experience.items, emptyTimelineEntry()],
                    },
                  })
                }
              />
            ) : null}

            {tab === 2 ? (
              <TimelineEntryEditor
                label="Istruzione"
                entries={profile.education.items}
                enabled={profile.education.enabled}
                onChange={(education) =>
                  setProfile({
                    ...profile,
                    education: { ...profile.education, items: education },
                  })
                }
                onEnabledChange={(enabled) =>
                  setProfile({
                    ...profile,
                    education: { ...profile.education, enabled },
                  })
                }
                onAdd={() =>
                  setProfile({
                    ...profile,
                    education: {
                      ...profile.education,
                      items: [...profile.education.items, emptyTimelineEntry()],
                    },
                  })
                }
              />
            ) : null}
            {tab === 3 ? (
              <PortfolioEditor
                enabled={profile.portfolio.enabled}
                services={profile.portfolio.items}
                onChange={(items) =>
                  setProfile({
                    ...profile,
                    portfolio: { ...profile.portfolio, items },
                  })
                }
                onEnabledChange={(enabled) =>
                  setProfile({
                    ...profile,
                    portfolio: { ...profile.portfolio, enabled },
                  })
                }
                onAdd={() => {
                  const id = createPortfolioId(
                    "Nuovo progetto",
                    profile.portfolio.items
                  );
                  setProfile({
                    ...profile,
                    portfolio: {
                      ...profile.portfolio,
                      items: [
                        ...profile.portfolio.items,
                        emptyPortfolioService(id),
                      ],
                    },
                  });
                }}
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
