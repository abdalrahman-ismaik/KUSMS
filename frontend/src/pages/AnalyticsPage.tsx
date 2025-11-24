import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, CircularProgress, Alert, Chip } from '@mui/material';
import { dashboardService } from '../services/dashboardService';
import type { AdminStats } from '../services/dashboardService';

export default function AnalyticsPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { stats } = await dashboardService.getStats();
        setStats(stats as AdminStats);
      } catch (err) {
        setError('Failed to load analytics data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Analytics & Reports
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Detailed insights into facility usage and system performance.
      </Typography>

      <Grid container spacing={3}>
        {/* Utilization Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Space Utilization Analysis
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {stats?.utilization?.map((item) => (
                <Grid item xs={12} md={6} key={item.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {item.name}
                        </Typography>
                        <Chip 
                          label={`${item.percentage}% Usage`} 
                          color={item.percentage > 80 ? 'error' : item.percentage < 20 ? 'warning' : 'success'}
                          size="small"
                        />
                      </Box>
                      <Box sx={{ width: '100%', bgcolor: 'grey.200', borderRadius: 1, height: 10, mb: 2 }}>
                        <Box sx={{ 
                          width: `${item.percentage}%`, 
                          bgcolor: item.percentage > 80 ? 'error.main' : item.percentage < 20 ? 'warning.main' : 'success.main',
                          height: '100%', 
                          borderRadius: 1,
                          transition: 'width 1s ease-in-out'
                        }} />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        <strong>AI Insight:</strong> {item.insight}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              {(!stats?.utilization || stats.utilization.length === 0) && (
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" align="center">
                    No utilization data available.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>

        {/* System Health (Mock) */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              System Health
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Server Uptime</Typography>
                <Typography variant="body2" color="success.main">99.9%</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Database Response</Typography>
                <Typography variant="body2" color="success.main">12ms</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Active Sessions</Typography>
                <Typography variant="body2">{Math.floor(Math.random() * 50) + 10}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Booking Trends (Mock) */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Booking Trends (Last 7 Days)
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', height: 150, gap: 2, mt: 2 }}>
              {[40, 65, 30, 80, 55, 90, 70].map((height, i) => (
                <Box key={i} sx={{ 
                  flex: 1, 
                  bgcolor: 'primary.main', 
                  height: `${height}%`, 
                  borderRadius: '4px 4px 0 0',
                  opacity: 0.7,
                  '&:hover': { opacity: 1 }
                }} />
              ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption">Mon</Typography>
              <Typography variant="caption">Tue</Typography>
              <Typography variant="caption">Wed</Typography>
              <Typography variant="caption">Thu</Typography>
              <Typography variant="caption">Fri</Typography>
              <Typography variant="caption">Sat</Typography>
              <Typography variant="caption">Sun</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
