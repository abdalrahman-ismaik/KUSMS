import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Alert, Container, Paper } from '@mui/material';
import DomainIcon from '@mui/icons-material/Domain';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authService.login(email, password);
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
          top: '-250px',
          right: '-250px',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          bottom: '-250px',
          left: '-250px',
        }
      }}
    >
      <Container maxWidth="sm">
        <Card 
          sx={{ 
            maxWidth: 480, 
            width: '100%',
            mx: 'auto',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box sx={{ 
            p: 4, 
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}>
            <DomainIcon sx={{ fontSize: 48, color: 'white' }} />
            <Typography variant="h4" component="h1" sx={{ color: 'white', fontWeight: 700 }}>
              KUSMS
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
              KU Smart Management System
            </Typography>
          </Box>
          
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
              Sign In to Your Account
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                sx={{ mb: 2 }}
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                loading={loading}
                sx={{ 
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <Paper sx={{ mt: 3, p: 2.5, bgcolor: '#0f172a', border: '1px solid #334155' }}>
              <Typography variant="caption" color="text.secondary" display="block" gutterBottom sx={{ fontWeight: 600, mb: 1.5 }}>
                Demo Accounts
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>Student:</Typography>
                  <Typography variant="caption" color="text.secondary">student@ku.ac.ae / password123</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>Faculty:</Typography>
                  <Typography variant="caption" color="text.secondary">faculty@ku.ac.ae / password123</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>Admin:</Typography>
                  <Typography variant="caption" color="text.secondary">admin@ku.ac.ae / password123</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>Maintenance:</Typography>
                  <Typography variant="caption" color="text.secondary">maintenance@ku.ac.ae / password123</Typography>
                </Box>
              </Box>
            </Paper>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
