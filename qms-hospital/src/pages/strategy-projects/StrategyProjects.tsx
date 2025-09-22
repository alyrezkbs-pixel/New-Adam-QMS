import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Paper, Grid, Tabs, Tab } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`strategy-tabpanel-${index}`}
      aria-labelledby={`strategy-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const StrategyProjects: React.FC = () => {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('strategyProjects.title')}
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="strategy projects tabs">
          <Tab label={t('strategyProjects.strategicPlanning')} />
          <Tab label={t('strategyProjects.projects')} />
          <Tab label={t('strategyProjects.initiatives')} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            {t('strategyProjects.strategicGoals')}
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
              {t('strategyProjects.strategyPlaceholder')}
            </Typography>
          </Box>
        </Paper>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            {t('strategyProjects.activeProjects')}
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
              {t('strategyProjects.projectsPlaceholder')}
            </Typography>
          </Box>
        </Paper>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            {t('strategyProjects.currentInitiatives')}
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
              {t('strategyProjects.initiativesPlaceholder')}
            </Typography>
          </Box>
        </Paper>
      </TabPanel>
    </Box>
  );
};

export default StrategyProjects;