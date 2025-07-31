import React from 'react';
import {
  AreaChart, Area, RadarChart, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

const ChartsSection = () => {
  const { isDarkMode } = useTheme();

  const lineData = [
    { name: 'Mon', conversations: 4000, satisfaction: 92 },
    { name: 'Tue', conversations: 3000, satisfaction: 89 },
    { name: 'Wed', conversations: 2000, satisfaction: 95 },
    { name: 'Thu', conversations: 2780, satisfaction: 91 },
    { name: 'Fri', conversations: 1890, satisfaction: 88 },
    { name: 'Sat', conversations: 2390, satisfaction: 93 },
    { name: 'Sun', conversations: 3490, satisfaction: 94 },
  ];

  const radarData = [
    { subject: 'Intent Recognition', A: 120, B: 110, fullMark: 150 },
    { subject: 'Response Quality', A: 98, B: 130, fullMark: 150 },
    { subject: 'Context Retention', A: 86, B: 130, fullMark: 150 },
    { subject: 'Error Handling', A: 99, B: 100, fullMark: 150 },
    { subject: 'Language Support', A: 85, B: 90, fullMark: 150 },
    { subject: 'API Performance', A: 65, B: 85, fullMark: 150 },
  ];

  const gridColor = isDarkMode ? '#333' : '#e5e7eb';
  const axisColor = isDarkMode ? '#666' : '#9ca3af';
  const tooltipBg = isDarkMode ? '#1a1a1a' : '#ffffff';
  const tooltipBorder = isDarkMode ? '#6366f1' : '#e5e7eb';

  return (
    <div className="charts-section">
      <div className="chart-container main-chart">
        <div className="chart-header">
          <h2 className="chart-title">Conversation Analytics</h2>
          <div className="chart-controls">
            <button className="control-btn active">7D</button>
            <button className="control-btn">30D</button>
            <button className="control-btn">90D</button>
          </div>
        </div>
        <div className="chart-content">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={lineData}>
              <defs>
                <linearGradient id="colorConversations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSatisfaction" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={gridColor}
                strokeOpacity={isDarkMode ? 1 : 0.5}
              />
              <XAxis
                dataKey="name"
                stroke={axisColor}
                style={{ fontSize: '0.875rem' }}
              />
              <YAxis
                stroke={axisColor}
                style={{ fontSize: '0.875rem' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBg,
                  border: `1px solid ${tooltipBorder}`,
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
                labelStyle={{
                  color: isDarkMode ? '#fff' : '#0f172a'
                }}
              />
              <Area
                type="monotone"
                dataKey="conversations"
                stroke="#8b5cf6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorConversations)"
              />
              <Area
                type="monotone"
                dataKey="satisfaction"
                stroke="#06b6d4"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSatisfaction)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-container radar-chart">
        <div className="chart-header">
          <h2 className="chart-title">Bot Performance Metrics</h2>
        </div>
        <div className="chart-content">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid
                stroke={gridColor}
                strokeOpacity={isDarkMode ? 1 : 0.4}
                radialLines={true}
              />
              <PolarAngleAxis
                dataKey="subject"
                stroke={axisColor}
                style={{ fontSize: '0.75rem' }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 150]}
                stroke={axisColor}
                strokeOpacity={isDarkMode ? 1 : 0.6}
                tick={false}
              />
              <Radar
                name="Current"
                dataKey="A"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={isDarkMode ? 0.6 : 0.4}
                strokeWidth={2}
              />
              <Radar
                name="Target"
                dataKey="B"
                stroke="#06b6d4"
                fill="#06b6d4"
                fillOpacity={isDarkMode ? 0.6 : 0.3}
                strokeWidth={2}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBg,
                  border: `1px solid ${tooltipBorder}`,
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
                labelStyle={{
                  color: isDarkMode ? '#fff' : '#0f172a'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;