import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  PORTFOLIO_VISUALS,
  type PortfolioService,
} from "../../lib/profileTypes";

type Props = {
  enabled: boolean;
  services: PortfolioService[];
  onEnabledChange: (enabled: boolean) => void;
  onChange: (services: PortfolioService[]) => void;
  onAdd: () => void;
};

function editService(
  services: PortfolioService[],
  index: number,
  patch: Partial<PortfolioService>
) {
  return services.map((service, i) =>
    i === index ? { ...service, ...patch } : service
  );
}

function uniqueId(title: string, services: PortfolioService[], index: number) {
  const base =
    title
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "progetto";
  let id = base;
  let suffix = 2;
  while (services.some((service, i) => i !== index && service.id === id)) {
    id = `${base}-${suffix++}`;
  }
  return id;
}

function StringListEditor({
  label,
  values,
  disabled,
  onChange,
}: {
  label: string;
  values: string[];
  disabled: boolean;
  onChange: (values: string[]) => void;
}) {
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography variant="subtitle2">{label}</Typography>
      {values.map((value, index) => (
        <Box key={index} display="flex" gap={1}>
          <TextField
            label={`${label} ${index + 1}`}
            value={value}
            onChange={(event) => {
              const next = [...values];
              next[index] = event.target.value;
              onChange(next);
            }}
            fullWidth
            size="small"
            disabled={disabled}
          />
          <IconButton
            aria-label={`Elimina ${label.toLowerCase()}`}
            disabled={disabled}
            onClick={() => onChange(values.filter((_, i) => i !== index))}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}
      <Button
        size="small"
        disabled={disabled}
        onClick={() => onChange([...values, ""])}
      >
        Aggiungi {label.toLowerCase()}
      </Button>
    </Box>
  );
}

export default function PortfolioEditor({
  enabled,
  services,
  onEnabledChange,
  onChange,
  onAdd,
}: Props) {
  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= services.length) return;
    const next = [...services];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <Box>
      <FormControlLabel
        control={
          <Checkbox
            checked={enabled}
            onChange={(event) => onEnabledChange(event.target.checked)}
          />
        }
        label="Mostra sezione"
      />
      {services.map((service, index) => {
        const disabled = !enabled || !service.enabled;
        const mediaMode = service.image ? "image" : service.visual ? "visual" : "none";

        return (
          <Paper key={service.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              gap={1}
              sx={{ mb: 2 }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                Progetto #{index + 1} · {service.id}
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={service.enabled}
                    disabled={!enabled}
                    onChange={(event) =>
                      onChange(
                        editService(services, index, {
                          enabled: event.target.checked,
                        })
                      )
                    }
                  />
                }
                label="Mostra"
              />
              <Box>
                <IconButton
                  size="small"
                  aria-label="Sposta su"
                  onClick={() => move(index, -1)}
                  disabled={!enabled || index === 0}
                >
                  <ArrowUpwardIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  aria-label="Sposta giù"
                  onClick={() => move(index, 1)}
                  disabled={!enabled || index === services.length - 1}
                >
                  <ArrowDownwardIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  aria-label="Elimina progetto"
                  onClick={() => onChange(services.filter((_, i) => i !== index))}
                  disabled={!enabled}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              sx={{ opacity: disabled ? 0.55 : 1 }}
            >
              <TextField
                label="Titolo"
                value={service.title}
                onChange={(event) => {
                  const title = event.target.value;
                  onChange(
                    editService(services, index, {
                      title,
                      ...(service.title === "Nuovo progetto"
                        ? { id: uniqueId(title, services, index) }
                        : {}),
                    })
                  );
                }}
                fullWidth
                size="small"
                disabled={disabled}
                required
              />
              <TextField
                label="Eyebrow"
                value={service.eyebrow}
                onChange={(event) =>
                  onChange(editService(services, index, { eyebrow: event.target.value }))
                }
                fullWidth
                size="small"
                disabled={disabled}
              />
              <TextField
                label="Sommario"
                value={service.summary}
                onChange={(event) =>
                  onChange(editService(services, index, { summary: event.target.value }))
                }
                fullWidth
                size="small"
                disabled={disabled}
              />
              <TextField
                label="Descrizione"
                value={service.description}
                onChange={(event) =>
                  onChange(editService(services, index, { description: event.target.value }))
                }
                fullWidth
                multiline
                minRows={3}
                size="small"
                disabled={disabled}
              />
              <StringListEditor
                label="Risultato"
                values={service.outcomes}
                disabled={disabled}
                onChange={(outcomes) =>
                  onChange(editService(services, index, { outcomes }))
                }
              />
              <StringListEditor
                label="Tag"
                values={service.tags}
                disabled={disabled}
                onChange={(tags) => onChange(editService(services, index, { tags }))}
              />
              <FormControl size="small" fullWidth disabled={disabled}>
                <InputLabel id={`media-mode-${service.id}`}>Media</InputLabel>
                <Select
                  labelId={`media-mode-${service.id}`}
                  label="Media"
                  value={mediaMode}
                  onChange={(event) => {
                    const mode = event.target.value;
                    onChange(
                      editService(services, index, {
                        visual: mode === "visual" ? service.visual ?? "ads" : undefined,
                        image:
                          mode === "image"
                            ? service.image ?? { src: "", alt: "" }
                            : undefined,
                      })
                    );
                  }}
                >
                  <MenuItem value="none">Nessuno</MenuItem>
                  <MenuItem value="visual">Visual</MenuItem>
                  <MenuItem value="image">Immagine</MenuItem>
                </Select>
              </FormControl>
              {mediaMode === "visual" ? (
                <FormControl size="small" fullWidth disabled={disabled}>
                  <InputLabel id={`visual-${service.id}`}>Visual</InputLabel>
                  <Select
                    labelId={`visual-${service.id}`}
                    label="Visual"
                    value={service.visual ?? "ads"}
                    onChange={(event) =>
                      onChange(
                        editService(services, index, {
                          visual: event.target.value as PortfolioService["visual"],
                        })
                      )
                    }
                  >
                    {PORTFOLIO_VISUALS.map((visual) => (
                      <MenuItem key={visual} value={visual}>
                        {visual}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : null}
              {mediaMode === "image" ? (
                <>
                  <TextField
                    label="URL o percorso immagine"
                    value={service.image?.src ?? ""}
                    onChange={(event) =>
                      onChange(
                        editService(services, index, {
                          image: { src: event.target.value, alt: service.image?.alt ?? "" },
                        })
                      )
                    }
                    fullWidth
                    size="small"
                    disabled={disabled}
                  />
                  <TextField
                    label="Testo alternativo"
                    value={service.image?.alt ?? ""}
                    onChange={(event) =>
                      onChange(
                        editService(services, index, {
                          image: { src: service.image?.src ?? "", alt: event.target.value },
                        })
                      )
                    }
                    fullWidth
                    size="small"
                    disabled={disabled}
                  />
                </>
              ) : null}
              <TextField
                label="Link (URL https://)"
                value={service.href ?? ""}
                onChange={(event) =>
                  onChange(editService(services, index, { href: event.target.value }))
                }
                fullWidth
                size="small"
                disabled={disabled}
              />
              <TextField
                label="Etichetta link"
                value={service.hrefLabel ?? ""}
                onChange={(event) =>
                  onChange(editService(services, index, { hrefLabel: event.target.value }))
                }
                fullWidth
                size="small"
                disabled={disabled}
              />
            </Box>
          </Paper>
        );
      })}
      <Button variant="outlined" onClick={onAdd} disabled={!enabled}>
        Aggiungi progetto
      </Button>
    </Box>
  );
}
