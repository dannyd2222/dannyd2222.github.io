import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const CV_WITH_PHOTO = "/cv/CV-Daniele-DalleNogare-2026.pdf";
const CV_NO_PHOTO = "/cv/CV-Daniele-DalleNogare-2026-nf.pdf";

export default function CvDownloadButton() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="cv-download-button"
        aria-controls={open ? "cv-download-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        color="primary"
        size="medium"
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleOpen}
        sx={{
          px: 2.5,
          py: 1,
          borderRadius: 2,
          fontWeight: 600,
          textTransform: "none",
          boxShadow: "none",
          "&:hover": { boxShadow: (t) => `0 6px 20px ${t.palette.primary.main}40` },
        }}
      >
        Scarica CV
      </Button>
      <Menu
        id="cv-download-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "cv-download-button" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 260,
            borderRadius: 2,
          },
        }}
      >
        <MenuItem
          component="a"
          href={CV_WITH_PHOTO}
          download
          onClick={handleClose}
        >
          <ListItemText
            primary="PDF con foto"
            secondary="Versione completa"
            primaryTypographyProps={{ fontWeight: 600 }}
            secondaryTypographyProps={{ variant: "caption" }}
          />
        </MenuItem>
        <MenuItem
          component="a"
          href={CV_NO_PHOTO}
          download
          onClick={handleClose}
        >
          <ListItemText
            primary="PDF senza foto"
            secondary="Ideale per ATS e candidature"
            primaryTypographyProps={{ fontWeight: 600 }}
            secondaryTypographyProps={{ variant: "caption" }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
