import React, { useState } from 'react';
import './Meetings.css';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Tabs,
  Tab,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  IconButton,
  Card,
  CardContent,
  CardActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';

// Icons
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
      id={`meetings-tabpanel-${index}`}
      aria-labelledby={`meetings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

interface Committee {
  id: string;
  name: string;
  description: string;
  members: number;
  nextMeeting?: string;
}

interface Meeting {
  id: string;
  title: string;
  committee: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface DecisionItem {
  id: string;
  title: string;
  committee: string;
  meeting: string;
  status: 'open' | 'inProgress' | 'submitted' | 'ceoApproval' | 'closed';
  dueDate: string;
  owner: string;
}

// Mock data
const mockCommittees: Committee[] = [
  { id: '1', name: 'Quality Committee', description: 'Oversees quality improvement initiatives', members: 8, nextMeeting: '2023-06-15' },
  { id: '2', name: 'Patient Safety Committee', description: 'Reviews safety incidents and preventive measures', members: 6, nextMeeting: '2023-06-18' },
  { id: '3', name: 'Infection Control Committee', description: 'Monitors infection rates and control measures', members: 5, nextMeeting: '2023-06-20' },
  { id: '4', name: 'Executive Committee', description: 'Hospital leadership decision-making body', members: 7, nextMeeting: '2023-06-12' },
];

const mockMeetings: Meeting[] = [
  { id: '1', title: 'Monthly Quality Review', committee: 'Quality Committee', date: '2023-06-15', time: '10:00', status: 'scheduled' },
  { id: '2', title: 'Safety Incident Analysis', committee: 'Patient Safety Committee', date: '2023-06-18', time: '14:00', status: 'scheduled' },
  { id: '3', title: 'Infection Rate Review', committee: 'Infection Control Committee', date: '2023-06-20', time: '11:00', status: 'scheduled' },
  { id: '4', title: 'Strategic Planning', committee: 'Executive Committee', date: '2023-06-12', time: '09:00', status: 'scheduled' },
  { id: '5', title: 'Quality Metrics Review', committee: 'Quality Committee', date: '2023-05-15', time: '10:00', status: 'completed' },
];

const mockDecisions: DecisionItem[] = [
  { id: '1', title: 'Implement new hand hygiene protocol', committee: 'Infection Control Committee', meeting: 'Infection Rate Review', status: 'inProgress', dueDate: '2023-07-15', owner: 'Dr. Ahmed' },
  { id: '2', title: 'Update patient fall prevention policy', committee: 'Patient Safety Committee', meeting: 'Safety Incident Analysis', status: 'submitted', dueDate: '2023-07-20', owner: 'Nurse Sara' },
  { id: '3', title: 'Approve new quality dashboard', committee: 'Quality Committee', meeting: 'Monthly Quality Review', status: 'ceoApproval', dueDate: '2023-06-30', owner: 'Quality Manager' },
  { id: '4', title: 'Finalize annual strategic plan', committee: 'Executive Committee', meeting: 'Strategic Planning', status: 'open', dueDate: '2023-08-01', owner: 'CEO' },
];

const Meetings: React.FC = () => {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);
  const [selectedCommittee, setSelectedCommittee] = useState<string>('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Chip size="small" label={t('common.pending')} color="primary" />;
      case 'completed':
        return <Chip size="small" label={t('common.completed')} color="success" />;
      case 'cancelled':
        return <Chip size="small" label={t('common.cancelled')} color="error" />;
      case 'open':
        return <Chip size="small" label={t('meetings.decisionStatus.open')} color="default" />;
      case 'inProgress':
        return <Chip size="small" label={t('meetings.decisionStatus.inProgress')} color="primary" />;
      case 'submitted':
        return <Chip size="small" label={t('meetings.decisionStatus.submitted')} color="info" />;
      case 'ceoApproval':
        return <Chip size="small" label={t('meetings.decisionStatus.ceoApproval')} color="warning" />;
      case 'closed':
        return <Chip size="small" label={t('meetings.decisionStatus.closed')} color="success" />;
      default:
        return <Chip size="small" label={status} />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('meetings.title')}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        {t('meetings.description')}
      </Typography>

      <Paper sx={{ borderRadius: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab icon={<CalendarMonthIcon />} label={t('meetings.meetingCalendar')} iconPosition="start" />
          <Tab icon={<GroupsIcon />} label={t('meetings.committeesDirectory')} iconPosition="start" />
          <Tab icon={<ListAltIcon />} label={t('meetings.agendaBuilder')} iconPosition="start" />
          <Tab icon={<AssignmentIcon />} label={t('meetings.decisionItems')} iconPosition="start" />
        </Tabs>

        {/* Meeting Calendar Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    {t('meetings.meetingCalendar')}
                  </Typography>
                  <Button variant="contained" startIcon={<AddIcon />}>
                    {t('common.create')}
                  </Button>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <List>
                  {mockMeetings.map((meeting) => (
                    <ListItem
                      key={meeting.id}
                      className="meeting-list-item"
                      secondaryAction={
                        <IconButton edge="end">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 1 }}
                    >
                      <ListItemIcon>
                        <CalendarMonthIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={meeting.title}
                        secondary={
                          <React.Fragment>
                            <Typography component="span" variant="body2" color="text.primary">
                              {meeting.committee}
                            </Typography>
                            {` — ${meeting.date}, ${meeting.time}`}
                          </React.Fragment>
                        }
                      />
                      {getStatusChip(meeting.status)}
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {t('common.filter')}
                </Typography>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="committee-filter-label">{t('common.committee')}</InputLabel>
                  <Select
                    labelId="committee-filter-label"
                    id="committee-filter"
                    value={selectedCommittee}
                    label={t('common.committee')}
                    onChange={(e) => setSelectedCommittee(e.target.value)}
                  >
                    <MenuItem value="">{t('common.all')}</MenuItem>
                    {mockCommittees.map((committee) => (
                      <MenuItem key={committee.id} value={committee.id}>{committee.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="status-filter-label">{t('common.status')}</InputLabel>
                  <Select
                    labelId="status-filter-label"
                    id="status-filter"
                    value=""
                    label={t('common.status')}
                  >
                    <MenuItem value="">{t('common.all')}</MenuItem>
                    <MenuItem value="scheduled">{t('common.pending')}</MenuItem>
                    <MenuItem value="completed">{t('common.completed')}</MenuItem>
                    <MenuItem value="cancelled">{t('common.cancelled')}</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label={t('common.from')}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label={t('common.to')}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </FormControl>
                <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                  {t('common.filter')}
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Committees Directory Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {mockCommittees.map((committee) => (
              <Grid item xs={12} md={6} lg={4} key={committee.id}>
                <Card className="committee-card" sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {committee.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {committee.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2">
                        <strong>{t('common.members')}:</strong> {committee.members}
                      </Typography>
                      {committee.nextMeeting && (
                        <Typography variant="body2">
                          <strong>{t('common.nextMeeting')}:</strong> {committee.nextMeeting}
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button size="small" startIcon={<EditIcon />}>
                      {t('common.edit')}
                    </Button>
                    <Button size="small" startIcon={<CalendarMonthIcon />}>
                      {t('meetings.meetingCalendar')}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
            <Grid item xs={12} md={6} lg={4}>
              <Card className="add-button-container" sx={{ 
                borderRadius: 2, 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 3,
                border: '2px dashed',
                borderColor: 'divider'
              }}>
                <IconButton color="primary" sx={{ mb: 2, bgcolor: 'action.hover', p: 2 }}>
                  <AddIcon fontSize="large" />
                </IconButton>
                <Typography variant="h6" align="center">
                  {t('common.create')} {t('common.committee')}
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Agenda Builder Tab */}
        <TabPanel value={tabValue} index={2}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              {t('meetings.agendaBuilder')}
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
                {t('common.comingSoon')}
              </Typography>
            </Box>
          </Paper>
        </TabPanel>

        {/* Decision Items Tab */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    {t('meetings.decisionItems')}
                  </Typography>
                  <Button variant="contained" startIcon={<AddIcon />}>
                    {t('common.create')}
                  </Button>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <List>
                  {mockDecisions.map((decision) => (
                    <ListItem
                      key={decision.id}
                      className="meeting-list-item"
                      secondaryAction={
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {getStatusChip(decision.status)}
                          <IconButton edge="end">
                            <MoreVertIcon />
                          </IconButton>
                        </Box>
                      }
                      sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 1 }}
                    >
                      <ListItemIcon>
                        {decision.status === 'closed' ? <CheckCircleIcon color="success" /> : <PendingIcon color="action" />}
                      </ListItemIcon>
                      <ListItemText
                        primary={decision.title}
                        secondary={
                          <React.Fragment>
                            <Typography component="span" variant="body2" color="text.primary">
                              {decision.committee}
                            </Typography>
                            {` — ${t('common.dueDate')}: ${decision.dueDate} — ${t('common.owner')}: ${decision.owner}`}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default Meetings;