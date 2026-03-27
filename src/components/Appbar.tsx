import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { alpha, useTheme } from "@mui/material/styles";
import Sidebar from "./Sidebar";
import ThemeSwitcher from "./ThemeSwitcher";
import { Typography } from "@mui/material";

export default function ApplicationBar({ parent = null }) {
  const router = useRouter();
  const theme = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const logoSrc =
    theme.palette.mode === "light"
      ? "/images/ddn_logo_light.png"
      : "/images/ddn_logo_dark.png";

  const onIconClick = () => {
    if (parent) {
      router.push(parent);
      return;
    }
    onSidebarOpen();
  };
  const onSidebarClose = () => setIsSidebarOpen(false);
  const onSidebarOpen = () => setIsSidebarOpen(true);

  const Icon = parent ? ArrowBack : MenuIcon;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="inherit"
      sx={{
        top: 0,
        zIndex: (t) => t.zIndex.appBar,
        bgcolor: (t) => alpha(t.palette.background.default, 0.78),
        color: "text.primary",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: { xs: 56, sm: 64 },
          color: "text.primary",
        }}
      >
        <IconButton
          edge="start"
          aria-label="menu"
          onClick={onIconClick}
          size="large"
          sx={{ color: "text.primary" }}
        >
          <Icon />
        </IconButton>
        <IconButton
          aria-label="Home"
          onClick={() => router.push("/")}
          size="large"
          sx={{ color: "text.primary" }}
        >
          <Image
            src={logoSrc}
            alt=""
            width={28}
            height={28}
            style={{ display: "block" }}
          />
        </IconButton>

        <ThemeSwitcher />
      </Toolbar>
      <Sidebar isOpen={isSidebarOpen} onClose={onSidebarClose} />
    </AppBar>
  );
}
