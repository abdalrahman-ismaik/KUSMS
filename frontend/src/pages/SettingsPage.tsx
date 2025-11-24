import { useState } from 'react';
import { Box, Typography, Paper, Switch, FormControlLabel, Divider, Button, TextField, Alert, Snackbar } from '@mui/material';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    autoApprove: false,
    maintenanceAlerts: true,
    systemName: 'KU Smart Management System',
    supportEmail: 'support@ku.edu.kw'
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // In a real app, this would save to backend
    setSaved(true);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        System Settings
      </Typography>
      
      <Paper sx={{ p: 3, maxWidth: 800 }}>
        <Typography variant="h6" gutterBottom>
          General Configuration
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          <TextField 
            label="System Name" 
            value={settings.systemName}
            onChange={(e) => setSettings({...settings, systemName: e.target.value})}
            fullWidth
          />
          <TextField 
            label="Support Email" 
            value={settings.supportEmail}
            onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
            fullWidth
          />
        </Box>

        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h6" gutterBottom>
          Notifications & Automation
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <FormControlLabel 
            control={
              <Switch 
                checked={settings.emailNotifications} 
                onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
              />
            } 
            label="Enable Email Notifications" 
          />
          <FormControlLabel 
            control={
              <Switch 
                checked={settings.autoApprove} 
                onChange={(e) => setSettings({...settings, autoApprove: e.target.checked})}
              />
            } 
            label="Auto-approve Low Priority Requests (Classrooms)" 
          />
          <FormControlLabel 
            control={
              <Switch 
                checked={settings.maintenanceAlerts} 
                onChange={(e) => setSettings({...settings, maintenanceAlerts: e.target.checked})}
              />
            } 
            label="High Priority Maintenance Alerts" 
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined">Reset Defaults</Button>
          <Button variant="contained" onClick={handleSave}>Save Changes</Button>
        </Box>
      </Paper>

      <Snackbar open={saved} autoHideDuration={3000} onClose={() => setSaved(false)}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Settings saved successfully
        </Alert>
      </Snackbar>
    </Box>
  );
}
