import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

export const blackTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: grey[900],
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontSize: 13,
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: grey[200],
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontSize: 13,
  },
});

export default null;
