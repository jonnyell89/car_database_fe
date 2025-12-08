import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./components/Login";

const queryClient = new QueryClient();

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {

  return (
    
    <Container maxWidth="xl">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Car Database
            </Typography>
          </Toolbar>
        </AppBar>
        <QueryClientProvider client={queryClient}>
          <Login />
        </QueryClientProvider>
      </ThemeProvider>
    </Container>
  )
}

export default App
