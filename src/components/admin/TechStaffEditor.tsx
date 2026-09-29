import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type Props = {
  value: string[];
  onChange: (next: string[]) => void;
};

export default function TechStaffEditor({ value, onChange }: Props) {
  const [draft, setDraft] = React.useState("");

  const addSkill = () => {
    const skill = draft.trim();
    if (!skill || value.includes(skill)) return;
    onChange([...value, skill]);
    setDraft("");
  };

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Aggiungi competenze una alla volta. Clicca una chip per rimuoverla.
      </Typography>
      <Box display="flex" gap={1} flexWrap="wrap" sx={{ mb: 2 }}>
        {value.map((skill) => (
          <Chip
            key={skill}
            label={skill}
            onDelete={() => onChange(value.filter((s) => s !== skill))}
          />
        ))}
      </Box>
      <Box display="flex" gap={1} alignItems="flex-start">
        <TextField
          label="Nuova competenza"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSkill();
            }
          }}
          fullWidth
          size="small"
        />
        <Button variant="outlined" onClick={addSkill} sx={{ flexShrink: 0 }}>
          Aggiungi
        </Button>
      </Box>
    </Box>
  );
}
