import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import type { TimelineEntry } from "../../lib/profileTypes";

type Props = {
  label: string;
  entries: TimelineEntry[];
  onChange: (next: TimelineEntry[]) => void;
  onAdd: () => void;
};

function updateEntry(
  entries: TimelineEntry[],
  index: number,
  patch: Partial<TimelineEntry>
): TimelineEntry[] {
  return entries.map((entry, i) =>
    i === index ? { ...entry, ...patch } : entry
  );
}

export default function TimelineEntryEditor({
  label,
  entries,
  onChange,
  onAdd,
}: Props) {
  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= entries.length) return;
    const next = [...entries];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <Box>
      {entries.map((entry, index) => (
        <Paper key={`${label}-${index}`} variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              {label} #{index + 1}
            </Typography>
            <Box>
              <IconButton
                size="small"
                aria-label="Sposta su"
                onClick={() => move(index, -1)}
                disabled={index === 0}
              >
                <ArrowUpwardIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                aria-label="Sposta giù"
                onClick={() => move(index, 1)}
                disabled={index === entries.length - 1}
              >
                <ArrowDownwardIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                aria-label="Elimina voce"
                onClick={() => onChange(entries.filter((_, i) => i !== index))}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Titolo"
              value={entry.title}
              onChange={(e) =>
                onChange(updateEntry(entries, index, { title: e.target.value }))
              }
              fullWidth
              size="small"
            />
            <TextField
              label="Organizzazione / istituto"
              value={entry.place}
              onChange={(e) =>
                onChange(updateEntry(entries, index, { place: e.target.value }))
              }
              fullWidth
              size="small"
            />
            <TextField
              label="URL organizzazione"
              value={entry.placeUrl}
              onChange={(e) =>
                onChange(
                  updateEntry(entries, index, { placeUrl: e.target.value })
                )
              }
              fullWidth
              size="small"
            />
            <TextField
              label="Percorso immagine (es. /images/logo.png)"
              value={entry.image}
              onChange={(e) =>
                onChange(updateEntry(entries, index, { image: e.target.value }))
              }
              fullWidth
              size="small"
            />
            <TextField
              label="Periodo"
              value={entry.timePeriod}
              onChange={(e) =>
                onChange(
                  updateEntry(entries, index, { timePeriod: e.target.value })
                )
              }
              fullWidth
              size="small"
            />

            <Typography variant="subtitle2">Paragrafi</Typography>
            {entry.contentParagraphs.map((paragraph, pIndex) => (
              <Box key={pIndex} display="flex" gap={1} alignItems="flex-start">
                <TextField
                  label={`Paragrafo ${pIndex + 1}`}
                  value={paragraph}
                  onChange={(e) => {
                    const paragraphs = [...entry.contentParagraphs];
                    paragraphs[pIndex] = e.target.value;
                    onChange(
                      updateEntry(entries, index, {
                        contentParagraphs: paragraphs,
                      })
                    );
                  }}
                  fullWidth
                  multiline
                  minRows={2}
                  size="small"
                />
                <IconButton
                  aria-label="Elimina paragrafo"
                  onClick={() => {
                    const paragraphs = entry.contentParagraphs.filter(
                      (_, i) => i !== pIndex
                    );
                    onChange(
                      updateEntry(entries, index, {
                        contentParagraphs:
                          paragraphs.length > 0 ? paragraphs : [""],
                      })
                    );
                  }}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
            <Button
              size="small"
              onClick={() =>
                onChange(
                  updateEntry(entries, index, {
                    contentParagraphs: [...entry.contentParagraphs, ""],
                  })
                )
              }
            >
              Aggiungi paragrafo
            </Button>
          </Box>
        </Paper>
      ))}

      <Button variant="outlined" onClick={onAdd}>
        Aggiungi voce
      </Button>
    </Box>
  );
}
