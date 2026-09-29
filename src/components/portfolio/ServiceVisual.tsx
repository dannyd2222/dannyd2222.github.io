import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import type { ReactNode } from "react";
import type { PortfolioVisual } from "../../data/portfolio";

const captions: Record<PortfolioVisual, string> = {
  ads: "Sincronizzazione audience",
  crm: "Pratiche in corso",
  ai: "Assistente sui documenti",
  data: "Cruscotto",
};

export default function ServiceVisual({ kind }: { kind: PortfolioVisual }) {
  return (
    <Box
      aria-hidden
      sx={{
        height: "100%",
        minHeight: { xs: 280, md: 360 },
        p: { xs: 2, sm: 2.5, md: 3 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: (t) =>
          t.palette.mode === "light"
            ? `radial-gradient(480px 240px at 12% 0%, ${alpha(t.palette.primary.main, 0.28)}, transparent 68%),
               radial-gradient(420px 260px at 100% 100%, ${alpha(t.palette.secondary.main, 0.18)}, transparent 70%),
               ${alpha(t.palette.primary.main, 0.06)}`
            : `radial-gradient(480px 240px at 12% 0%, ${alpha(t.palette.primary.main, 0.2)}, transparent 68%),
               radial-gradient(420px 260px at 100% 100%, ${alpha(t.palette.secondary.main, 0.16)}, transparent 70%),
               ${alpha("#020617", 0.35)}`,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 460,
          borderRadius: 2.5,
          overflow: "hidden",
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          boxShadow: (t) =>
            t.palette.mode === "dark"
              ? `0 16px 40px ${alpha("#000", 0.45)}`
              : `0 16px 40px ${alpha("#0f172a", 0.12)}`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            px: 1.5,
            py: 1,
            borderBottom: 1,
            borderColor: "divider",
            bgcolor: (t) => alpha(t.palette.text.primary, 0.03),
          }}
        >
          {["#f43f5e", "#f59e0b", "#14b8a6"].map((color) => (
            <Box
              key={color}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: color,
                opacity: 0.85,
              }}
            />
          ))}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ ml: 0.75, fontWeight: 600 }}
          >
            {captions[kind]}
          </Typography>
        </Box>
        <Box sx={{ p: { xs: 1.75, sm: 2.25 } }}>
          {kind === "ads" ? <AdsScene /> : null}
          {kind === "crm" ? <CrmScene /> : null}
          {kind === "ai" ? <AiScene /> : null}
          {kind === "data" ? <DataScene /> : null}
        </Box>
      </Box>
    </Box>
  );
}

function AdsScene() {
  const segments = ["Clienti attivi", "Acquirenti", "Visitatori"];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      <Box sx={{ display: "flex", alignItems: "stretch", gap: 1 }}>
        <Panel label="BigQuery">
          {segments.map((label) => (
            <Box
              key={label}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                "& + &": { mt: 0.85 },
              }}
            >
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  flexShrink: 0,
                  bgcolor: (t) => alpha(t.palette.text.primary, 0.28),
                }}
              />
              <Typography
                variant="caption"
                sx={{ fontSize: 11, lineHeight: 1.2 }}
                noWrap
              >
                {label}
              </Typography>
            </Box>
          ))}
        </Panel>
        <Box
          sx={{
            alignSelf: "center",
            width: 28,
            height: 28,
            borderRadius: "50%",
            flexShrink: 0,
            display: "grid",
            placeItems: "center",
            color: "primary.main",
            bgcolor: (t) => alpha(t.palette.primary.main, 0.12),
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          →
        </Box>
        <Panel label="Google Ads" accent>
          {segments.map((label) => (
            <Box
              key={label}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 0.5,
                "& + &": { mt: 0.7 },
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: 11, lineHeight: 1.2 }}
                noWrap
              >
                {label}
              </Typography>
              <Typography
                variant="caption"
                color="primary"
                sx={{ fontSize: 10, fontWeight: 700, flexShrink: 0 }}
              >
                ok
              </Typography>
            </Box>
          ))}
        </Panel>
      </Box>
      <StatusLine label="Audience allineate · checkpoint salvato" />
    </Box>
  );
}

function CrmScene() {
  const rows = [
    {
      title: "Brief campagna",
      meta: "Marketing",
      status: "In corso",
      tone: "primary" as const,
    },
    {
      title: "Follow-up visita",
      meta: "Sanitario",
      status: "Da chiamare",
      tone: "warning" as const,
    },
    {
      title: "Rinnovo ordine",
      meta: "Farmaceutico",
      status: "Pronto",
      tone: "success" as const,
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {rows.map((row) => (
        <Box
          key={row.title}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.25,
            px: 1.25,
            py: 1,
            borderRadius: 1.5,
            border: 1,
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              flexShrink: 0,
              bgcolor: (t) => alpha(t.palette.primary.main, 0.16),
            }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, lineHeight: 1.3 }}
            >
              {row.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {row.meta}
            </Typography>
          </Box>
          <ToneChip label={row.status} tone={row.tone} />
        </Box>
      ))}
    </Box>
  );
}

function AiScene() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
      <Box
        sx={{
          p: 1.25,
          borderRadius: 1.5,
          border: 1,
          borderColor: "divider",
          bgcolor: (t) => alpha(t.palette.text.primary, 0.03),
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 700 }}>
          Procedura interna
        </Typography>
        <SkeletonRows count={3} />
      </Box>
      <Box
        sx={{
          alignSelf: "flex-end",
          maxWidth: "78%",
          px: 1.25,
          py: 0.75,
          borderRadius: 1.5,
          color: "primary.contrastText",
          bgcolor: "primary.main",
        }}
      >
        <Typography
          variant="caption"
          sx={{ fontWeight: 600, color: "inherit" }}
        >
          Qual è il passaggio successivo?
        </Typography>
      </Box>
      <Box
        sx={{
          maxWidth: "92%",
          px: 1.25,
          py: 1,
          borderRadius: 1.5,
          border: 1,
          borderColor: (t) => alpha(t.palette.primary.main, 0.35),
          bgcolor: (t) => alpha(t.palette.primary.main, 0.08),
        }}
      >
        <Typography
          variant="caption"
          sx={{ display: "block", lineHeight: 1.45 }}
        >
          Verificare la scadenza e proporre il rinnovo, come indicato nel
          documento.
        </Typography>
        <Typography
          fontSize={11}
          variant="caption"
          color="primary"
          sx={{ display: "block", mt: 0.5, fontWeight: 700 }}
        >
          Fonte · Knowledge Base
        </Typography>
      </Box>
    </Box>
  );
}

function DataScene() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1 }}
      >
        {[
          { label: "Volume", value: "128k" },
          { label: "Trend", value: "+18%" },
          { label: "Copertura", value: "24" },
        ].map((kpi) => (
          <Box
            key={kpi.label}
            sx={{
              px: 1,
              py: 0.9,
              borderRadius: 1.5,
              border: 1,
              borderColor: "divider",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              {kpi.label}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              {kpi.value}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          height: 92,
          px: 1,
          display: "flex",
          alignItems: "flex-end",
          gap: 0.75,
          borderRadius: 1.5,
          border: 1,
          borderColor: "divider",
          bgcolor: (t) => alpha(t.palette.text.primary, 0.02),
        }}
      >
        {[42, 68, 50, 84, 62, 96, 74].map((height, index) => (
          <Box
            key={index}
            sx={{
              flex: 1,
              height: `${height}%`,
              borderRadius: "6px 6px 0 0",
              bgcolor: (t) =>
                alpha(
                  t.palette.primary.main,
                  index === 5 ? 0.95 : 0.28 + index * 0.06,
                ),
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

function Panel({
  label,
  accent = false,
  children,
}: {
  label: string;
  accent?: boolean;
  children: ReactNode;
}) {
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        p: 1.1,
        borderRadius: 1.5,
        border: 1,
        borderColor: (t) =>
          accent ? alpha(t.palette.primary.main, 0.45) : t.palette.divider,
        bgcolor: (t) =>
          accent ? alpha(t.palette.primary.main, 0.08) : "transparent",
      }}
    >
      <Typography
        variant="caption"
        sx={{ fontWeight: 700, display: "block", mb: 0.75 }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  );
}

function SkeletonRows({ count }: { count: number }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.6, mt: 0.75 }}>
      {Array.from({ length: count }).map((_, index) => (
        <Box
          key={index}
          sx={{
            height: 7,
            width: `${88 - index * 14}%`,
            borderRadius: 99,
            bgcolor: (t) => alpha(t.palette.text.primary, 0.12),
          }}
        />
      ))}
    </Box>
  );
}

function StatusLine({ label }: { label: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          bgcolor: "primary.main",
        }}
      />
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );
}

function ToneChip({
  label,
  tone,
}: {
  label: string;
  tone: "primary" | "warning" | "success";
}) {
  return (
    <Typography
      variant="caption"
      sx={{
        px: 0.8,
        py: 0.25,
        borderRadius: 99,
        fontWeight: 700,
        flexShrink: 0,
        color: `${tone}.main`,
        bgcolor: (t) => alpha(t.palette[tone].main, 0.12),
      }}
    >
      {label}
    </Typography>
  );
}
