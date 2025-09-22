import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Grid, 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Divider
} from '@mui/material';
import KPICard from './KPICard';
import KPITrendChart from './KPITrendChart';
import { KPI } from '../../models/types';
import { mockKPIs } from '../../models/mockData';

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
      id={`kpi-tabpanel-${index}`}
      aria-labelledby={`kpi-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `kpi-tab-${index}`,
    'aria-controls': `kpi-tabpanel-${index}`,
  };
}

const KPIDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);
  const [department, setDepartment] = useState('all');
  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);

  // Filter KPIs by department
  const filteredKPIs = department === 'all' 
    ? mockKPIs 
    : mockKPIs.filter(kpi => kpi.department === department);

  // Get unique departments from KPIs
  const departments = ['all', ...Array.from(new Set(mockKPIs.map(kpi => kpi.department)))];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDepartmentChange = (event: SelectChangeEvent) => {
    setDepartment(event.target.value);
  };

  const handleKPIClick = (kpi: KPI) => {
    setSelectedKPI(kpi);
  };

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', px: 2 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="KPI dashboard tabs"
          sx={{ flexGrow: 1 }}
        >
          <Tab label={t('kpi.overview')} {...a11yProps(0)} />
          <Tab label={t('kpi.details')} {...a11yProps(1)} disabled={!selectedKPI} />
        </Tabs>
        <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
          <InputLabel id="department-select-label">{t('kpi.department')}</InputLabel>
          <Select
            labelId="department-select-label"
            id="department-select"
            value={department}
            label={t('kpi.department')}
            onChange={handleDepartmentChange}
          >
            {departments.map((dept) => (
              <MenuItem key={dept} value={dept}>
                {dept === 'all' ? t('common.all') : dept}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Box mb={3}>
          <Typography variant="h5" gutterBottom>
            {t('kpi.dashboard.title')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('kpi.dashboard.description')}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {filteredKPIs.map((kpi) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={kpi.id}>
              <KPICard kpi={kpi} onClick={() => handleKPIClick(kpi)} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {selectedKPI && (
          <>
            <Box mb={3}>
              <Typography variant="h5" gutterBottom>
                {selectedKPI.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedKPI.description}
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <KPITrendChart kpi={selectedKPI} height={400} />
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, height: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    {t('kpi.details')}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ '& > div': { mb: 2 } }}>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {t('kpi.department')}
                      </Typography>
                      <Typography variant="body1">
                        {selectedKPI.department}
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {t('kpi.owner')}
                      </Typography>
                      <Typography variant="body1">
                        {selectedKPI.owner}
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {t('kpi.target')}
                      </Typography>
                      <Typography variant="body1">
                        {selectedKPI.target} {selectedKPI.unit}
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {t('kpi.actual')}
                      </Typography>
                      <Typography variant="body1">
                        {selectedKPI.actual} {selectedKPI.unit}
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {t('kpi.status')}
                      </Typography>
                      <Typography variant="body1">
                        {t(`kpi.status.${selectedKPI.status}`)}
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {t('kpi.frequency')}
                      </Typography>
                      <Typography variant="body1">
                        {t(`kpi.frequency.${selectedKPI.frequency}`)}
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {t('kpi.startDate')}
                      </Typography>
                      <Typography variant="body1">
                        {new Date(selectedKPI.startDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </TabPanel>
    </Paper>
  );
};

export default KPIDashboard;