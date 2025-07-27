import { useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LightMode, DarkMode } from "@mui/icons-material";
import Home from "./pages/Home";
import Post from "./pages/Post";
import { Box, Grid, Typography, IconButton, CssBaseline, Container } from "@mui/material";
import { THEME } from "./shared/utils";

const App = () => {
  const [mode, setMode] = useState(THEME.DARK);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prev) => (prev === THEME.LIGHT ? THEME.DARK : THEME.LIGHT));
  };

  return (
    <Container sx={{ py: 4 }}>
      <ThemeProvider theme={theme}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Blog</Typography>
          <CssBaseline />
          <Box sx={{ p: 2 }}>
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === THEME.LIGHT ? <DarkMode /> : <LightMode />}
            </IconButton>
          </Box>
        </Grid>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Post />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Container>
  );
};

export default App;
