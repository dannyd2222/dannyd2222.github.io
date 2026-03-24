import { alpha, createTheme } from "@mui/material/styles";

const fontFamily =
  '"Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", sans-serif';

function createAppTheme(mode: "light" | "dark") {
  const isLight = mode === "light";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isLight ? "#0d9488" : "#5eead4",
        dark: isLight ? "#0f766e" : "#2dd4bf",
        light: isLight ? "#14b8a6" : "#99f6e4",
        contrastText: isLight ? "#ffffff" : "#042f2e",
      },
      secondary: {
        main: isLight ? "#4f46e5" : "#a5b4fc",
        contrastText: "#ffffff",
      },
      background: {
        default: isLight ? "#eef1f7" : "#080b10",
        paper: isLight ? "#ffffff" : "#111820",
      },
      text: {
        primary: isLight ? "#0f172a" : "#e8eef6",
        secondary: isLight ? alpha("#0f172a", 0.58) : alpha("#e8eef6", 0.62),
      },
      divider: isLight ? alpha("#0f172a", 0.09) : alpha("#e8eef6", 0.1),
    },
    shape: {
      borderRadius: 14,
    },
    typography: {
      fontFamily,
      fontSize: 15,
      h4: {
        fontWeight: 700,
        letterSpacing: "-0.035em",
        lineHeight: 1.15,
      },
      h5: {
        fontWeight: 600,
        letterSpacing: "-0.02em",
      },
      h6: {
        fontWeight: 600,
        letterSpacing: "-0.015em",
      },
      subtitle1: {
        fontWeight: 500,
      },
      body1: {
        lineHeight: 1.65,
      },
      body2: {
        lineHeight: 1.6,
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
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundAttachment: "fixed",
            backgroundImage: isLight
              ? `radial-gradient(1200px 600px at 0% 0%, ${alpha("#0d9488", 0.12)}, transparent 55%),
                 radial-gradient(1200px 600px at 100% 0%, ${alpha("#0d9488", 0.12)}, transparent 55%)`
              : `radial-gradient(1200px 500px at 0% 0%, ${alpha("#5eead4", 0.12)}, transparent 55%),
                 radial-gradient(1200px 500px at 100% 0%, ${alpha("#5eead4", 0.12)}, transparent 55%)`,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 12,
            paddingInline: 20,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiChip: {
        defaultProps: {
          variant: "outlined",
        },
        styleOverrides: {
          root: {
            fontWeight: 500,
            borderRadius: 10,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
      },
    },
  });
}

export const lightTheme = createAppTheme("light");
export const blackTheme = createAppTheme("dark");
