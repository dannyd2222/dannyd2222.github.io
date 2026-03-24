import React, { useState } from 'react';
import { useRouter } from 'next/router'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Sidebar from "./Sidebar";
import ThemeSwitcher from "./ThemeSwitcher";

export default function ApplicationBar({ parent = null }) {
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <AppBar position="static" color="transparent">
      <Toolbar style={{justifyContent: 'space-between'}}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onIconClick}
          size="large">
          <Icon />
        </IconButton>
        <ThemeSwitcher />
      </Toolbar>
      <Sidebar isOpen={isSidebarOpen} onClose={onSidebarClose} />
    </AppBar>
  );
}
