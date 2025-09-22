import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Container,
  Paper,
  Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

type UserRole = 'ceo' | 'qualityAdmin' | 'hod' | 'staff';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>('qualityAdmin');

  const handleRoleChange = (event: SelectChangeEvent) => {
    setSelectedRole(event.target.value as UserRole);
  };

  const handleLogin = () => {
    login(selectedRole);
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            width: '100%',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('auth.login')}
          </Typography>
          <Box sx={{ mt: 3, width: '100%' }}>
            <Typography variant="subtitle1" gutterBottom>
              {t('auth.roleSelection')}
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-select-label">{t('auth.loginAs')}</InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                value={selectedRole}
                label={t('auth.loginAs')}
                onChange={handleRoleChange}
              >
                <MenuItem value="ceo">{t('roles.ceo')}</MenuItem>
                <MenuItem value="qualityAdmin">{t('roles.qualityAdmin')}</MenuItem>
                <MenuItem value="hod">{t('roles.hod')}</MenuItem>
                <MenuItem value="staff">{t('roles.staff')}</MenuItem>
              </Select>
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
              sx={{ mt: 3, mb: 2 }}
            >
              {t('auth.login')}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;