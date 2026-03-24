import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ExpandButton from "./ExpandButton";
import Collapse from '@mui/material/Collapse';

export default function SectionItem({
  title = "",
  initiallyExpanded = false,
  children,
}) {
  const [expanded, setExpanded] = React.useState(initiallyExpanded);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      minWidth={0}
      alignSelf="stretch"
      sx={{ boxSizing: "border-box" }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        onClick={toggleExpanded}
        sx={{
          cursor: "pointer",
          borderRadius: 2,
          px: { xs: 1, sm: 1.5 },
          py: 1,
          mb: 0.5,
          transition: "background-color 0.2s ease",
          "&:hover": {
            bgcolor: "action.hover",
          },
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: 600, letterSpacing: "-0.02em" }}
        >
          {title}
        </Typography>
        <ExpandButton expanded={expanded} />
      </Box>
      <Divider
        sx={{
          opacity: 0.85,
          background: (t) =>
            `linear-gradient(90deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
          height: 2,
          border: 0,
          borderRadius: 1,
        }}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ mt: 2.5, mb: 1, width: "100%", minWidth: 0 }}>{children}</Box>
      </Collapse>
    </Box>
  );
}
