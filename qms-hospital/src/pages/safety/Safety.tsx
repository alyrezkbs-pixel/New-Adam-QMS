import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Paper, Grid } from '@mui/material';

const Safety: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('safety.title')}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        {t('safety.description')}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              {t('safety.safetyMetrics')}
            </Typography>
            <Box 
              sx={{ 
                height: 300, 
                bgcolor: 'action.hover', 
                borderRadius: 1, 
                p: 2, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {t('safety.safetyPlaceholder')}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Safety;