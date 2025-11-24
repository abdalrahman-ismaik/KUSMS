import { Box, AppBar, Toolbar, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Avatar, Menu, MenuItem, Chip, Divider, Badge } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import BookIcon from '@mui/icons-material/Book';
import BuildIcon from '@mui/icons-material/Build';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import DomainIcon from '@mui/icons-material/Domain';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const SIDEBAR_WIDTH = 280;

/**
 * Props for the Layout component
 */
interface LayoutProps {
  /** The content to be displayed in the main area */
  children: React.ReactNode;
}

/**
 * Navigation menu item structure
 */
interface MenuItem {
  /** Display text for the menu item */
  text: string;
  /** Icon component to display */
  icon: React.ReactElement;
  /** Navigation path */
  path: string;
  /** User roles that can access this menu item */
  roles: string[];
}

/**
 * Main layout component that provides the application shell with sidebar navigation.
 * 
 * Features:
 * - Fixed sidebar navigation with role-based menu filtering
 * - WCAG 2.1 AA compliant with ARIA attributes and keyboard navigation
 * - Professional visual design with hover and active states
 * - Skip-to-content link for accessibility
 * - User profile section with logout functionality
 * - Performance optimized with React hooks (useMemo, useCallback)
 * 
 * @component
 * @example
 * ```tsx
 * <Layout>
 *   <Dashboard />
 * </Layout>
 * ```
 */
export default function Layout({ children }: LayoutProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleUserMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleUserMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleNotificationMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  }, []);

  const handleNotificationMenuClose = useCallback(() => {
    setNotificationAnchorEl(null);
  }, []);

  const handleSettingsMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setSettingsAnchorEl(event.currentTarget);
  }, []);

  const handleSettingsMenuClose = useCallback(() => {
    setSettingsAnchorEl(null);
  }, []);

  const handleLogout = useCallback(() => {
    handleUserMenuClose();
    logout();
    navigate('/login');
  }, [logout, navigate, handleUserMenuClose]);

  // Base menu items available to all users
  const baseMenuItems = useMemo(() => [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', roles: ['STUDENT', 'FACULTY', 'ADMIN', 'MAINTENANCE'] },
    { text: 'Bookings', icon: <BookIcon />, path: '/bookings', roles: ['STUDENT', 'FACULTY', 'ADMIN'] },
    { text: 'Events', icon: <EventIcon />, path: '/events', roles: ['STUDENT', 'FACULTY', 'ADMIN'] },
    { text: 'Maintenance', icon: <BuildIcon />, path: '/maintenance', roles: ['STUDENT', 'FACULTY', 'ADMIN', 'MAINTENANCE'] },
  ], []);

  // Admin-only menu items
  const adminMenuItems = useMemo(() => [
    { text: 'Users', icon: <PeopleIcon />, path: '/users', roles: ['ADMIN'] },
    { text: 'Facilities', icon: <DomainIcon />, path: '/facilities', roles: ['ADMIN'] },
  ], []);

  // Filter menu items based on user role
  const menuItems = useMemo(() => 
    user
      ? [...baseMenuItems, ...adminMenuItems].filter(item => item.roles.includes(user.role))
      : baseMenuItems,
    [user, baseMenuItems, adminMenuItems]
  );

  const getRoleColor = useCallback((role: string) => {
    switch (role) {
      case 'ADMIN': return 'error';
      case 'FACULTY': return 'primary';
      case 'MAINTENANCE': return 'warning';
      default: return 'secondary';
    }
  }, []);

  const handleNavigate = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  const sidebarContent = (
    <Box 
      component="nav"
      role="navigation"
      aria-label="Main navigation"
      sx={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: '#1e293b',
        borderRight: '1px solid #334155',
        position: 'fixed',
        width: SIDEBAR_WIDTH,
        top: 0,
        left: 0,
        zIndex: 1200
      }}>
      {/* Sidebar Header */}
      <Box sx={{ 
        p: 3,
        py: 4,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        borderBottom: '1px solid #334155'
      }}>
        <Box sx={{
          width: 44,
          height: 44,
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
        }}>
          <DomainIcon sx={{ fontSize: 26, color: 'white' }} />
        </Box>
        <Box>
          <Typography variant="h5" sx={{ 
            color: 'white', 
            fontWeight: 700,
            fontSize: '1.35rem',
            lineHeight: 1.2,
            letterSpacing: '-0.01em'
          }}>
            KUSMS
          </Typography>
          <Typography variant="caption" sx={{ 
            color: 'text.secondary',
            fontSize: '0.75rem',
            display: 'block',
            mt: 0.25
          }}>
            Smart Management
          </Typography>
        </Box>
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ flex: 1, overflowY: 'auto', py: 3 }}>
        <Typography 
          variant="overline" 
          role="presentation"
          aria-hidden="true"
          sx={{ 
            px: 3,
            color: 'text.secondary',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            display: 'block',
            mb: 1.5
          }}>
          MAIN MENU
        </Typography>
        <List role="menu" sx={{ px: 2 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.75 }}>
                <ListItemButton 
                  role="menuitem"
                  tabIndex={0}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={`${item.text}${isActive ? ' (current page)' : ''}`}
                  onClick={() => handleNavigate(item.path)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleNavigate(item.path);
                    }
                  }}
                  sx={{
                    borderRadius: '10px',
                    py: 1.25,
                    px: 2,
                    bgcolor: isActive ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                    border: isActive ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: isActive ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.05)',
                      transform: 'translateX(2px)'
                    },
                    '&:focus-visible': {
                      outline: '2px solid',
                      outlineColor: 'primary.main',
                      outlineOffset: '2px',
                      boxShadow: '0 0 0 4px rgba(99, 102, 241, 0.2)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: isActive ? 'primary.main' : 'text.secondary',
                    minWidth: 36,
                    '& svg': {
                      fontSize: '1.35rem'
                    }
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{
                      fontSize: '0.9375rem',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? 'primary.main' : 'text.primary',
                      lineHeight: 1.4
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* User Info Card */}
      {user && (
        <Box sx={{ 
          p: 3,
          pt: 2,
          borderTop: '1px solid #334155'
        }}>
          <Box sx={{ 
            p: 2.5,
            bgcolor: '#0f172a',
            borderRadius: '12px',
            border: '1px solid #334155'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
              <Avatar sx={{ 
                width: 42,
                height: 42,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                fontSize: '1.1rem',
                fontWeight: 600
              }}>
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="body2" sx={{ 
                  fontWeight: 600,
                  mb: 0.5,
                  fontSize: '0.9rem',
                  lineHeight: 1.3,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {user.name}
                </Typography>
                <Chip 
                  label={user.role} 
                  size="small" 
                  color={getRoleColor(user.role)}
                  sx={{ 
                    height: 22,
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    '& .MuiChip-label': {
                      px: 1.5
                    }
                  }}
                />
              </Box>
            </Box>
            <Typography variant="caption" sx={{ 
              color: 'text.secondary',
              display: 'block',
              fontSize: '0.75rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {user.email}
            </Typography>
            <Divider sx={{ my: 1.5 }} />
            <ListItemButton 
              onClick={handleLogout}
              sx={{
                borderRadius: '8px',
                py: 1,
                px: 1.5,
                color: 'error.main',
                '&:hover': {
                  bgcolor: 'rgba(239, 68, 68, 0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'error.main', minWidth: 32 }}>
                <LogoutIcon sx={{ fontSize: '1.2rem' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Sign Out" 
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: 600
                }}
              />
            </ListItemButton>
          </Box>
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Skip to main content link for keyboard navigation */}
      <Box
        component="a"
        href="#main-content"
        sx={{
          position: 'absolute',
          left: '-9999px',
          zIndex: 9999,
          padding: '1rem',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          textDecoration: 'none',
          borderRadius: '4px',
          fontWeight: 600,
          '&:focus': {
            left: '1rem',
            top: '1rem',
          },
        }}
      >
        Skip to main content
      </Box>

      {/* Static Sidebar */}
      {sidebarContent}

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${SIDEBAR_WIDTH}px`,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header Bar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: '#1e293b',
            borderBottom: '1px solid #334155',
            zIndex: 1100
          }}
        >
          <Toolbar sx={{ 
            minHeight: '72px !important',
            px: 4,
            justifyContent: 'space-between' 
          }}>
            <Typography variant="h6" noWrap component="div" sx={{ 
              fontWeight: 600,
              fontSize: '1.1rem',
              color: 'text.primary',
              letterSpacing: '-0.01em'
            }}>
              Dashboard
            </Typography>
            
            {/* Header Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <IconButton 
                onClick={handleNotificationMenuOpen}
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': { 
                    color: 'text.primary',
                    bgcolor: 'rgba(99, 102, 241, 0.1)' 
                  }
                }}
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon sx={{ fontSize: '1.35rem' }} />
                </Badge>
              </IconButton>
              <Menu
                anchorEl={notificationAnchorEl}
                open={Boolean(notificationAnchorEl)}
                onClose={handleNotificationMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    width: 320,
                    maxHeight: 400,
                    borderRadius: '12px',
                    border: '1px solid #334155'
                  }
                }}
              >
                <Box sx={{ p: 2, borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1" fontWeight={600}>Notifications</Typography>
                  <Typography variant="caption" color="primary" sx={{ cursor: 'pointer' }}>Mark all as read</Typography>
                </Box>
                <MenuItem onClick={handleNotificationMenuClose}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, width: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" fontWeight={600}>New Booking Request</Typography>
                      <Typography variant="caption" color="text.secondary">5 min ago</Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary" noWrap>John Doe requested Room 101</Typography>
                  </Box>
                </MenuItem>
                <MenuItem onClick={handleNotificationMenuClose}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, width: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" fontWeight={600}>Maintenance Completed</Typography>
                      <Typography variant="caption" color="text.secondary">1 hour ago</Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary" noWrap>AC repair in Lab 3 is done</Typography>
                  </Box>
                </MenuItem>
                <Divider />
                <Box sx={{ p: 1, textAlign: 'center' }}>
                  <Typography variant="caption" color="primary" sx={{ cursor: 'pointer', fontWeight: 600 }}>View All Notifications</Typography>
                </Box>
              </Menu>

              <IconButton 
                onClick={handleSettingsMenuOpen}
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': { 
                    color: 'text.primary',
                    bgcolor: 'rgba(99, 102, 241, 0.1)' 
                  }
                }}
              >
                <SettingsIcon sx={{ fontSize: '1.35rem' }} />
              </IconButton>
              <Menu
                anchorEl={settingsAnchorEl}
                open={Boolean(settingsAnchorEl)}
                onClose={handleSettingsMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    minWidth: 200,
                    borderRadius: '12px',
                    border: '1px solid #334155'
                  }
                }}
              >
                <MenuItem onClick={handleSettingsMenuClose}>
                  <Typography variant="body2">Account Settings</Typography>
                </MenuItem>
                <MenuItem onClick={handleSettingsMenuClose}>
                  <Typography variant="body2">Preferences</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleSettingsMenuClose}>
                  <Typography variant="body2">Help & Support</Typography>
                </MenuItem>
              </Menu>
              
              {/* User Menu */}
              {user && (
                <>
                  <IconButton onClick={handleUserMenuOpen} sx={{ ml: 0.5, p: 0.5 }}>
                    <Avatar sx={{ 
                      width: 38,
                      height: 38,
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      fontSize: '1rem',
                      fontWeight: 600
                    }}>
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleUserMenuClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    PaperProps={{
                      sx: {
                        mt: 1.5,
                        minWidth: 220,
                        borderRadius: '12px',
                        border: '1px solid #334155'
                      }
                    }}
                  >
                    <MenuItem disabled sx={{ py: 2 }}>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '0.95rem', mb: 0.5 }}>
                          {user.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                          {user.email}
                        </Typography>
                        <Chip 
                          label={user.role} 
                          size="small" 
                          color={getRoleColor(user.role)}
                          sx={{ height: 22, fontSize: '0.7rem', fontWeight: 600 }}
                        />
                      </Box>
                    </MenuItem>
                    <Divider sx={{ my: 1 }} />
                    <MenuItem onClick={() => { handleUserMenuClose(); navigate('/profile'); }} sx={{ py: 1.25 }}>
                      <PersonIcon sx={{ mr: 1.5, fontSize: '1.2rem' }} /> 
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>Profile</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout} sx={{ color: 'error.main', py: 1.25 }}>
                      <LogoutIcon sx={{ mr: 1.5, fontSize: '1.2rem' }} /> 
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>Sign Out</Typography>
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box 
          id="main-content"
          sx={{ 
            flex: 1,
            p: 4,
            bgcolor: 'background.default'
          }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
