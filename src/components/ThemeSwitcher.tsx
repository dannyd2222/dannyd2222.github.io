import React from 'react';
import { useTheme } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { MUIWrapperContext } from "../contexts/MUIWrapper";

export default function ThemeSwitcher () {
  const theme = useTheme();
  const muiUtils = React.useContext(MUIWrapperContext);

  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={muiUtils.toggleColorMode}
      color="inherit">
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};
