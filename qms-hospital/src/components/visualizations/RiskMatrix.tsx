import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid,
  Tooltip,
  styled
} from '@mui/material';
import { Risk, RiskLikelihood, RiskSeverity } from '../../models/types';

interface RiskMatrixProps {
  risks: Risk[];
  onCellClick?: (likelihood: RiskLikelihood, severity: RiskSeverity, risks: Risk[]) => void;
}

const MatrixCell = styled(Paper)<{ riskLevel: string }>(({ theme, riskLevel }) => {
  const getRiskColor = () => {
    switch (riskLevel) {
      case 'low':
        return theme.palette.success.light;
      case 'medium':
        return theme.palette.warning.light;
      case 'high':
        return theme.palette.warning.main;
      case 'critical':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[300];
    }
  };

  return {
    padding: theme.spacing(2),
    height: '100%',
    minHeight: 80,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: getRiskColor(),
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: theme.shadows[4],
    },
  };
});

const RiskCounter = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: '50%',
  width: 24,
  height: 24,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'bold',
  fontSize: '0.75rem',
  marginTop: theme.spacing(1),
}));

const RiskMatrix: React.FC<RiskMatrixProps> = ({ risks, onCellClick }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Define likelihood and severity levels
  const likelihoodLevels: RiskLikelihood[] = ['rare', 'unlikely', 'possible', 'likely', 'almostCertain'];
  const severityLevels: RiskSeverity[] = ['low', 'medium', 'high', 'critical'];

  // Function to determine risk level based on likelihood and severity
  const getRiskLevel = (likelihood: RiskLikelihood, severity: RiskSeverity): string => {
    const likelihoodIndex = likelihoodLevels.indexOf(likelihood);
    const severityIndex = severityLevels.indexOf(severity);
    
    const riskScore = (likelihoodIndex + 1) * (severityIndex + 1);
    
    if (riskScore <= 3) return 'low';
    if (riskScore <= 8) return 'medium';
    if (riskScore <= 12) return 'high';
    return 'critical';
  };

  // Count risks for each cell in the matrix
  const getRisksForCell = (likelihood: RiskLikelihood, severity: RiskSeverity): Risk[] => {
    return risks.filter(risk => risk.likelihood === likelihood && risk.severity === severity);
  };

  // Handle cell click
  const handleCellClick = (likelihood: RiskLikelihood, severity: RiskSeverity) => {
    const cellRisks = getRisksForCell(likelihood, severity);
    if (onCellClick) {
      onCellClick(likelihood, severity, cellRisks);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        {t('risk.matrix.title')}
      </Typography>
      
      <Box sx={{ display: 'flex', mb: 2 }}>
        <Box sx={{ width: 120 }} /> {/* Empty space for alignment */}
        <Grid container spacing={1} sx={{ flexGrow: 1 }}>
          {severityLevels.map((severity) => (
            <Grid item xs={3} key={severity}>
              <Paper 
                sx={{ 
                  p: 1, 
                  textAlign: 'center',
                  backgroundColor: theme.palette.grey[100],
                  fontWeight: 'bold'
                }}
              >
                {t(`risk.severity.${severity}`)}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      
      {likelihoodLevels.map((likelihood, likelihoodIndex) => (
        <Box sx={{ display: 'flex', mb: 1 }} key={likelihood}>
          <Box 
            sx={{ 
              width: 120, 
              p: 1, 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'flex-end',
              pr: 2,
              backgroundColor: theme.palette.grey[100],
              fontWeight: 'bold'
            }}
          >
            {t(`risk.likelihood.${likelihood}`)}
          </Box>
          
          <Grid container spacing={1} sx={{ flexGrow: 1 }}>
            {severityLevels.map((severity, severityIndex) => {
              const cellRisks = getRisksForCell(likelihood, severity);
              const riskLevel = getRiskLevel(likelihood, severity);
              
              return (
                <Grid item xs={3} key={`${likelihood}-${severity}`}>
                  <Tooltip 
                    title={cellRisks.length > 0 
                      ? `${cellRisks.length} ${t('risk.count')} - ${t(`risk.level.${riskLevel}`)}` 
                      : t(`risk.level.${riskLevel}`)}
                  >
                    <MatrixCell 
                      riskLevel={riskLevel}
                      onClick={() => handleCellClick(likelihood, severity)}
                    >
                      <Typography variant="subtitle2">
                        {t(`risk.level.${riskLevel}`)}
                      </Typography>
                      {cellRisks.length > 0 && (
                        <RiskCounter>
                          {cellRisks.length}
                        </RiskCounter>
                      )}
                    </MatrixCell>
                  </Tooltip>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ))}
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-around' }}>
        {['low', 'medium', 'high', 'critical'].map((level) => (
          <Box 
            key={level} 
            sx={{ 
              display: 'flex', 
              alignItems: 'center'
            }}
          >
            <Box 
              sx={{ 
                width: 16, 
                height: 16, 
                borderRadius: 1,
                backgroundColor: level === 'low' 
                  ? theme.palette.success.light 
                  : level === 'medium' 
                    ? theme.palette.warning.light 
                    : level === 'high' 
                      ? theme.palette.warning.main 
                      : theme.palette.error.main,
                mr: 1
              }} 
            />
            <Typography variant="caption">
              {t(`risk.level.${level}`)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RiskMatrix;