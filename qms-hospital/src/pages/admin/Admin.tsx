import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SettingsIcon from '@mui/icons-material/Settings';
import StorageIcon from '@mui/icons-material/Storage';
import SecurityIcon from '@mui/icons-material/Security';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WarningIcon from '@mui/icons-material/Warning';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GroupsIcon from '@mui/icons-material/Groups';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const AdminCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ 
  title, 
  icon, 
  children 
}) => {
  return (
    <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
      <CardHeader
        avatar={icon}
        title={title}
      />
      <Divider />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

const Admin: React.FC = () => {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleGenerateDemoData = () => {
    // In a real app, this would call an API to generate demo data
    alert(t('admin.demoDataGenerated'));
  };

  const handleResetDemoData = () => {
    // In a real app, this would call an API to reset demo data
    alert(t('admin.demoDataReset'));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('admin.title')}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        {t('admin.description')}
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
          <Tab label={t('admin.masterData')} />
          <Tab label={t('admin.kpiSetup')} />
          <Tab label={t('admin.riskMatrix')} />
          <Tab label={t('admin.certifications')} />
          <Tab label={t('admin.committees')} />
          <Tab label={t('admin.imports')} />
          <Tab label={t('admin.connectors')} />
          <Tab label={t('admin.demoData')} />
        </Tabs>

        {/* Master Data Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <AdminCard title={t('admin.departments')} icon={<BusinessIcon color="primary" />}>
                <Typography variant="body2" paragraph>
                  {t('admin.departmentsDescription')}
                </Typography>
                <Button startIcon={<AddIcon />} variant="contained" size="small">
                  {t('common.add')}
                </Button>
              </AdminCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <AdminCard title={t('admin.users')} icon={<GroupIcon color="primary" />}>
                <Typography variant="body2" paragraph>
                  {t('admin.usersDescription')}
                </Typography>
                <Button startIcon={<AddIcon />} variant="contained" size="small">
                  {t('common.add')}
                </Button>
              </AdminCard>
            </Grid>
          </Grid>
        </TabPanel>

        {/* KPI Setup Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <AdminCard title={t('admin.kpiDefinitions')} icon={<AssessmentIcon color="primary" />}>
                <Typography variant="body2" paragraph>
                  {t('admin.kpiDefinitionsDescription')}
                </Typography>
                <Button startIcon={<AddIcon />} variant="contained" size="small">
                  {t('common.add')}
                </Button>
              </AdminCard>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Risk Matrix Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <AdminCard title={t('admin.riskMatrixSetup')} icon={<WarningIcon color="primary" />}>
                <Typography variant="body2" paragraph>
                  {t('admin.riskMatrixDescription')}
                </Typography>
                <Button startIcon={<SettingsIcon />} variant="contained" size="small">
                  {t('common.configure')}
                </Button>
              </AdminCard>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Certifications Tab */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <AdminCard title={t('admin.certificationsCatalog')} icon={<VerifiedUserIcon color="primary" />}>
                <Typography variant="body2" paragraph>
                  {t('admin.certificationsDescription')}
                </Typography>
                <Button startIcon={<AddIcon />} variant="contained" size="small">
                  {t('common.add')}
                </Button>
              </AdminCard>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Committees Tab */}
        <TabPanel value={tabValue} index={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <AdminCard title={t('admin.committeesSetup')} icon={<GroupsIcon color="primary" />}>
                <Typography variant="body2" paragraph>
                  {t('admin.committeesDescription')}
                </Typography>
                <Button startIcon={<AddIcon />} variant="contained" size="small">
                  {t('common.add')}
                </Button>
              </AdminCard>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Imports Tab */}
        <TabPanel value={tabValue} index={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <AdminCard title={t('admin.kpiImport')} icon={<UploadFileIcon color="primary" />}>
                <Typography variant="body2" paragraph>
                  {t('admin.kpiImportDescription')}
                </Typography>
                <Button startIcon={<UploadFileIcon />} variant="contained" size="small">
                  {t('common.importCsv')}
                </Button>
              </AdminCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <AdminCard title={t('admin.surveyImport')} icon={<UploadFileIcon color="primary" />}>
                <Typography variant="body2" paragraph>
                  {t('admin.surveyImportDescription')}
                </Typography>
                <Button startIcon={<UploadFileIcon />} variant="contained" size="small">
                  {t('common.importCsv')}
                </Button>
              </AdminCard>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Connectors Tab */}
        <TabPanel value={tabValue} index={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <AdminCard title={t('admin.sqlConnector')} icon={<StorageIcon color="primary" />}>
                <Typography variant="body2" paragraph>
                  {t('admin.sqlConnectorDescription')}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" color="error" sx={{ mr: 1 }}>
                    ● {t('common.disconnected')}
                  </Typography>
                </Box>
                <Button startIcon={<SettingsIcon />} variant="contained" size="small">
                  {t('common.configure')}
                </Button>
              </AdminCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <AdminCard title={t('admin.apiConnector')} icon={<SecurityIcon color="primary" />}>
                <Typography variant="body2" paragraph>
                  {t('admin.apiConnectorDescription')}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" color="error" sx={{ mr: 1 }}>
                    ● {t('common.disconnected')}
                  </Typography>
                </Box>
                <Button startIcon={<SettingsIcon />} variant="contained" size="small">
                  {t('common.configure')}
                </Button>
              </AdminCard>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Demo Data Tab */}
        <TabPanel value={tabValue} index={7}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {t('admin.demoDataManagement')}
                </Typography>
                <Typography variant="body2" paragraph>
                  {t('admin.demoDataDescription')}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleGenerateDemoData}
                  >
                    {t('admin.generateDemoData')}
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    onClick={handleResetDemoData}
                  >
                    {t('admin.resetDemoData')}
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default Admin;