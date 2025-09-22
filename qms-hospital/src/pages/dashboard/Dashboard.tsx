import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Tab,
  Tabs,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import KPIDashboard from '../../components/visualizations/KPIDashboard';
import KPICard from '../../components/visualizations/KPICard';
import RiskMatrix from '../../components/visualizations/RiskMatrix';
import { mockKPIs, mockRisks } from '../../models/mockData';

// Mock dashboard widgets
const DashboardWidget: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 3 }}>
      <CardHeader title={title} />
      <Divider />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [dashboardType, setDashboardType] = useState<string>('executive');

  const handleDashboardChange = (event: SelectChangeEvent) => {
    setDashboardType(event.target.value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('dashboard.title')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="dashboard-type-label">{t('dashboard.viewType')}</InputLabel>
            <Select
              labelId="dashboard-type-label"
              id="dashboard-type"
              value={dashboardType}
              label={t('dashboard.viewType')}
              onChange={handleDashboardChange}
            >
              <MenuItem value="executive">{t('dashboard.executiveView')}</MenuItem>
              <MenuItem value="clinical">{t('dashboard.clinicalView')}</MenuItem>
              <MenuItem value="department">{t('dashboard.departmentView')}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Typography variant="subtitle1" color="text.secondary" paragraph>
        {t('dashboard.description')}
      </Typography>

      <Grid container spacing={3}>
        {/* KPI Summary Widget */}
        <Grid item xs={12} md={6} lg={4}>
          <DashboardWidget title={t('dashboard.kpiSummary')}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'space-between' }}>
              <KPICard 
                kpi={mockKPIs[0]} 
                compact 
              />
              <KPICard 
                kpi={mockKPIs[1]} 
                compact 
              />
              <KPICard 
                kpi={mockKPIs[2]} 
                compact 
              />
            </Box>
            <Button 
              fullWidth 
              variant="outlined" 
              size="small" 
              sx={{ mt: 2 }}
              onClick={() => console.log('View all KPIs')}
            >
              {t('common.viewAll')}
            </Button>
          </DashboardWidget>
        </Grid>

        {/* Risk Summary Widget */}
        <Grid item xs={12} md={6} lg={4}>
          <DashboardWidget title={t('dashboard.riskSummary')}>
            <Typography variant="body1" sx={{ mb: 2 }}>{t('dashboard.riskDistribution')}</Typography>
            <RiskMatrix 
              risks={mockRisks} 
              compact 
              height={180}
              onCellClick={(severity, likelihood) => console.log(`Cell clicked: ${severity}, ${likelihood}`)}
            />
            <Button 
              fullWidth 
              variant="outlined" 
              size="small" 
              sx={{ mt: 2 }}
              onClick={() => console.log('View risk register')}
            >
              {t('common.viewRiskRegister')}
            </Button>
          </DashboardWidget>
        </Grid>

        {/* Compliance Widget */}
        <Grid item xs={12} md={6} lg={4}>
          <DashboardWidget title={t('dashboard.complianceSummary')}>
            <Typography variant="body1">{t('dashboard.standardsCompliance')}</Typography>
            <Box sx={{ mt: 2, height: 200, bgcolor: 'action.hover', borderRadius: 1, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {t('common.chartPlaceholder')}
              </Typography>
            </Box>
            <ButtonGroup size="small" sx={{ mt: 2 }}>
              <Button>{t('common.gaugeChart')}</Button>
              <Button>{t('common.barChart')}</Button>
            </ButtonGroup>
          </DashboardWidget>
        </Grid>

        {/* Patient Satisfaction Widget */}
        <Grid item xs={12} md={6} lg={4}>
          <DashboardWidget title={t('dashboard.patientSatisfaction')}>
            <Typography variant="body1">{t('dashboard.satisfactionTrend')}</Typography>
            <Box sx={{ mt: 2, height: 200, bgcolor: 'action.hover', borderRadius: 1, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {t('common.chartPlaceholder')}
              </Typography>
            </Box>
            <ButtonGroup size="small" sx={{ mt: 2 }}>
              <Button>{t('common.lineChart')}</Button>
              <Button>{t('common.barChart')}</Button>
            </ButtonGroup>
          </DashboardWidget>
        </Grid>

        {/* Projects Widget */}
        <Grid item xs={12} md={6} lg={4}>
          <DashboardWidget title={t('dashboard.projectStatus')}>
            <Typography variant="body1">{t('dashboard.projectProgress')}</Typography>
            <Box sx={{ mt: 2, height: 200, bgcolor: 'action.hover', borderRadius: 1, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {t('common.chartPlaceholder')}
              </Typography>
            </Box>
            <ButtonGroup size="small" sx={{ mt: 2 }}>
              <Button>{t('common.ganttChart')}</Button>
              <Button>{t('common.progressBars')}</Button>
            </ButtonGroup>
          </DashboardWidget>
        </Grid>

        {/* AI Insights Widget */}
        <Grid item xs={12} md={6} lg={4}>
          <DashboardWidget title={t('dashboard.aiInsights')}>
            <Typography variant="body1">{t('dashboard.insightsSummary')}</Typography>
            <Paper sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="body2">
                {t('dashboard.mockInsight1')}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {t('dashboard.mockInsight2')}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {t('dashboard.mockInsight3')}
              </Typography>
            </Paper>
            <Button size="small" sx={{ mt: 2 }}>
              {t('common.generateInsights')}
            </Button>
          </DashboardWidget>
        </Grid>
      </Grid>

      {/* Full KPI Dashboard */}
      <Paper sx={{ mt: 4, p: 2, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          {t('dashboard.kpiDashboard')}
        </Typography>
        <KPIDashboard kpis={mockKPIs} />
      </Paper>
    </Box>
  );
};

export default Dashboard;