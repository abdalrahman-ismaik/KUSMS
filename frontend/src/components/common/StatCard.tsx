import { Card, CardContent, Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatCard({ 
  title, 
  value, 
  icon, 
  color = 'primary', 
  subtitle,
  trend 
}: StatCardProps) {
  const colorMap = {
    primary: { bg: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' },
    secondary: { bg: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' },
    success: { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' },
    error: { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' },
    warning: { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' },
    info: { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' },
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${colorMap[color].color}, ${colorMap[color].color}dd)`,
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                mb: 1.5,
                textTransform: 'uppercase',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                lineHeight: 1.4
              }}
            >
              {title}
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                mb: 0.5,
                fontSize: '2rem',
                lineHeight: 1.2
              }}
            >
              {value}
            </Typography>
            {subtitle && (
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ 
                  fontSize: '0.8125rem',
                  lineHeight: 1.5,
                  display: 'block'
                }}
              >
                {subtitle}
              </Typography>
            )}
            {trend && (
              <Box sx={{ mt: 1.5 }}>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: trend.isPositive ? 'success.main' : 'error.main',
                    fontWeight: 700,
                    fontSize: '0.8125rem'
                  }}
                >
                  {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                </Typography>
                <Typography 
                  variant="caption" 
                  color="text.secondary" 
                  sx={{ 
                    ml: 0.75,
                    fontSize: '0.75rem'
                  }}
                >
                  vs last month
                </Typography>
              </Box>
            )}
          </Box>
          <Box 
            sx={{ 
              p: 1.75,
              borderRadius: '12px',
              bgcolor: colorMap[color].bg,
              color: colorMap[color].color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
