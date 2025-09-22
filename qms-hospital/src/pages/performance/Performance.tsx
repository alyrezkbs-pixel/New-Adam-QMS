import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Paper, Tabs, Tab } from '@mui/material';

const Performance: React.FC = () => {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('performance.title')}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        {t('performance.description')}
      </Typography>

      <Paper sx={{ width: '100%', mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label={t('performance.kpis')} />
          <Tab label={t('performance.okrs')} />
          <Tab label={t('performance.cfrSessions')} />
        </Tabs>
        <Box sx={{ p: 3 }}>
          <Typography variant="body1">
            {tabValue === 0 && t('performance.kpisPlaceholder')}
            {tabValue === 1 && t('performance.okrsPlaceholder')}
            {tabValue === 2 && t('performance.cfrSessionsPlaceholder')}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Performance;