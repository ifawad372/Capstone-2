import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import { Box, Container, CssBaseline, ThemeProvider, createTheme, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { teal, deepOrange } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2B3445',    // Dark blue-gray for primary
      light: '#f8f9fa',   // Light background
      contrastText: '#fff',
    },
    secondary: {
      main: '#D23F57',    // Vibrant coral for secondary
      light: '#FFE6E9',   // Light coral tint
      contrastText: '#fff',
    },
    background: {
      default: '#9CAF88',  // Sage green background
      paper: '#ffffff',    // White cards/surfaces
    },
    text: {
      primary: '#2B3445',  // Dark text
      secondary: '#7D879C', // Muted text
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 24px',
        },
      },
    },
  },
});

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
          <Container maxWidth="xl">
            <Outlet />
          </Container>
        </Box>
        <Box 
          component="footer" 
          sx={{ 
            backgroundColor: 'primary.main',
            color: 'white',
            py: 4,
            mt: 'auto'
          }}
        >
          <Container maxWidth="xl">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>PickBazar</Typography>
                <Typography variant="body2">© {new Date().getFullYear()} All rights reserved.</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About Us</Link>
                <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link>
                <Link to="/privacy" style={{ color: 'white', textDecoration: 'none' }}>Privacy Policy</Link>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Layout
