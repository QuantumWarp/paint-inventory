import { CssBaseline, ThemeProvider } from "@mui/material";
import { HomePage } from "./HomePage";
import { theme } from "./utils/theme";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HomePage />
    </ThemeProvider>
  );
}
