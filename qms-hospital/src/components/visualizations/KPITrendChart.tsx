import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box,
  styled
} from '@mui/material';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { KPI } from '../../models/types';

interface KPITrendChartProps {
  kpi: KPI;
  height?: number | string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const KPITrendChart: React.FC<KPITrendChartProps> = ({ kpi, height = 300 }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  
  // Format the data for the chart
  const chartData = kpi.history?.map(item => ({
    date: new Date(item.date).toLocaleDateString(),
    value: item.value,
    target: kpi.target
  })) || [];

  // Add the current value to the chart data if it's not already included
  const lastDate = chartData.length > 0 ? chartData[chartData.length - 1].date : new Date().toLocaleDateString();
  if (chartData.length === 0 || chartData[chartData.length - 1].value !== kpi.actual) {
    chartData.push({
      date: lastDate,
      value: kpi.actual,
      target: kpi.target
    });
  }

  // Determine the color based on KPI status
  const getLineColor = () => {
    switch (kpi.status) {
      case 'onTrack':
        return theme.palette.success.main;
      case 'atRisk':
        return theme.palette.warning.main;
      case 'offTrack':
        return theme.palette.error.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return (
    <StyledCard>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom>
          {kpi.name} {t('kpi.trend')}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {kpi.description}
        </Typography>
        
        <Box sx={{ height: height, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
              <XAxis 
                dataKey="date" 
                stroke={theme.palette.text.secondary}
                tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
              />
              <YAxis 
                stroke={theme.palette.text.secondary}
                tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                domain={['auto', 'auto']}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 4,
                  color: theme.palette.text.primary
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                name={t('kpi.actual')}
                stroke={getLineColor()}
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="target"
                name={t('kpi.target')}
                stroke={theme.palette.grey[500]}
                strokeDasharray="5 5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="caption" color="text.secondary">
            {t('kpi.frequency')}: {t(`kpi.frequency.${kpi.frequency}`)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {t('kpi.unit')}: {kpi.unit}
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default KPITrendChart;