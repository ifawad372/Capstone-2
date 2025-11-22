import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
  Search as SearchIcon,
  AccountCircle,
  FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'inherit',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { label: 'Home', path: '/', icon: '🏠' },
    { label: 'Shop', path: '/shop', icon: '🛍️' },
    { label: 'Categories', path: '/categories', icon: '📦' },
    { label: 'Deals', path: '/deals', icon: '🔥' },
    { label: 'Contact', path: '/contact', icon: '📞' },
  ];

  const { totalQuantity = 0 } = useSelector((state) => state.cart || {});

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: '#9CAF88',
          color: 'white',
          borderBottom: 'none',
          py: 1,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Mobile menu button */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2, display: { md: 'none' }, color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                <Typography
                  variant="h4"
                  noWrap
                  component="div"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '1.5rem', sm: '2rem' },
                    color: theme.palette.primary.main,
                    position: 'relative',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      width: '100%',
                      height: '3px',
                      background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      borderRadius: '3px',
                    },
                  }}
                >
                  Pick
                  <Box component="span" sx={{ color: theme.palette.secondary.main }}>Bazar</Box>
                </Typography>
              </Box>
            </Link>

            {/* Search */}
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', px: 2 }}>
              <form onSubmit={handleSearch} style={{ width: '100%', maxWidth: '600px' }}>
                <Search sx={{ 
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    boxShadow: `0 2px 8px ${theme.palette.primary.light}`,
                  },
                  '&:focus-within': {
                    borderColor: theme.palette.primary.main,
                    boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
                  },
                }}>
                  <SearchIconWrapper>
                    <SearchIcon sx={{ color: 'text.secondary' }} />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search products..."
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ width: '100%', color: 'text.primary' }}
                  />
                </Search>
              </form>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, ml: 4 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  color="inherit"
                  sx={{ 
                    mx: 1,
                    color: 'text.primary',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Right side icons */}
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, gap: 1 }}>
              <IconButton 
                size="large" 
                color="inherit" 
                aria-label="wishlist"
                component={Link}
                to="/wishlist"
                sx={{ color: 'white' }}
              >
                <Badge 
                  badgeContent={0} 
                  color="secondary"
                  sx={{
                    '& .MuiBadge-badge': {
                      right: -2,
                      top: 8,
                      padding: '0 4px',
                      height: 16,
                      minWidth: 16,
                      backgroundColor: '#ff6b6b',
                    },
                  }}
                >
                  <FavoriteBorderIcon />
                </Badge>
              </IconButton>
              
              <IconButton
                size="large"
                aria-label={`show ${totalQuantity} cart items`}
                color="inherit"
                component={Link}
                to="/auth/cart"
                sx={{ color: 'white' }}
              >
                <Badge 
                  badgeContent={totalQuantity} 
                  color="secondary"
                  sx={{
                    '& .MuiBadge-badge': {
                      right: -2,
                      top: 8,
                      padding: '0 4px',
                      height: 16,
                      minWidth: 16,
                      backgroundColor: '#ff6b6b',
                    },
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              <IconButton
                size="large"
                aria-label="user account"
                color="inherit"
                component={Link}
                to="/account"
                sx={{ 
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': { 
            width: 280,
            boxSizing: 'border-box',
            pt: 8,
          },
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton 
                component={Link} 
                to={item.path} 
                onClick={() => setDrawerOpen(false)}
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                    color: 'primary.main',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    color: 'primary.main',
                    '& .MuiListItemIcon-root': {
                      color: 'primary.main',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>{item.icon}</ListItemIcon>
                <ListItemText 
                  primary={item.label} 
                  primaryTypographyProps={{
                    fontWeight: 500,
                    variant: 'body1',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Header;
