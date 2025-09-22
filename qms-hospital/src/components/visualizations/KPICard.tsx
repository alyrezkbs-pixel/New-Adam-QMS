import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  LinearProgress, 
  Chip,
  Tooltip,
  IconButton,
  styled
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { KPI, KPIStatus } from '../../models/types';

interface KPICardProps {
  kpi: KPI;
  onClick?: () => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
  cursor: 'pointer',
}));

const StatusChip = styled(Chip)<{ status: KPIStatus }>(({ theme, status }) => {
  const statusColors = {
    onTrack: theme.palette.success.main,
    atRisk: theme.palette.warning.main,
    offTrack: theme.palette.error.main,
    notStarted: theme.palette.grey[500],
    completed: theme.palette.success.dark,
  };

  return {
    backgroundColor: statusColors[status],
    color: theme.palette.getContrastText(statusColors[status]),
    fontWeight: 500,
    fontSize: '0.75rem',
  };
});

const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
  const { t } = useTranslation();
  
  if (trend === 'up') {
    return (
      <Tooltip title={t('kpi.trend.up')}>
        <TrendingUpIcon color="success" />
      </Tooltip>
    );
  } else if (trend === 'down') {
    return (
      <Tooltip title={t('kpi.trend.down')}>
        <TrendingDownIcon color="error" />
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title={t('kpi.trend.stable')}>
        <TrendingFlatIcon color="info" />
      </Tooltip>
    );
  }
};

const KPICard: React.FC<KPICardProps> = ({ kpi, onClick }) => {
  const { t } = useTranslation();
  
  // Calculate progress percentage
  const progressPercentage = Math.min(Math.round((kpi.actual / kpi.target) * 100), 100);
  
  // Determine progress color based on status
  const getProgressColor = (status: KPIStatus) => {
    switch (status) {
      case 'onTrack':
        return 'success';
      case 'atRisk':
        return 'warning';
      case 'offTrack':
        return 'error';
      case 'completed':
        return 'success';
      default:
        return 'primary';
    }
  };

  return (
    <StyledCard onClick={onClick}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight="bold" noWrap>
            {kpi.name}
          </Typography>
          <Tooltip title={kpi.description || ''}>
            <IconButton size="small">
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="body2" color="text.secondary">
            {t('kpi.department')}: {kpi.department}
          </Typography>
          <StatusChip 
            label={t(`kpi.status.${kpi.status}`)} 
            size="small" 
            status={kpi.status} 
          />
        </Box>
        
        <Box mt={2} mb={1}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
            <Typography variant="body2">
              {t('kpi.actual')}: {kpi.actual} {kpi.unit}
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="body2" mr={0.5}>
                {t('kpi.target')}: {kpi.target} {kpi.unit}
              </Typography>
              <TrendIcon trend={kpi.trend} />
            </Box>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={progressPercentage} 
            color={getProgressColor(kpi.status) as 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
        
        <Box display="flex" justifyContent="space-between" mt="auto">
          <Typography variant="caption" color="text.secondary">
            {t('kpi.frequency')}: {t(`kpi.frequency.${kpi.frequency}`)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {progressPercentage}%
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default KPICard;