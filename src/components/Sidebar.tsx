import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Drawer from '@mui/material/Drawer';
import SidebarMenu from "./SidebarMenu";
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

const useStyles = makeStyles((theme) => ({
}))

export default function ApplicationBar({ isOpen = false, onClose = () => { } }) {
  const classes = useStyles();

  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <SidebarMenu onClose={onClose} />
    </Drawer>
  );
}
