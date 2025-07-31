import React from 'react';

const StatCard = ({ title, value, delay }) => (
  <div
    className="stat-card"
    style={{
      animation: `slideInUp 0.8s ease-out ${delay}s both`
    }}
  >
    <div className="stat-inner">
      <div className="stat-front">
        <div className="stat-glow"></div>
        <h3>{title}</h3>
        <div className="stat-value">{value}</div>
      </div>
      <div className="stat-back">
        <div className="hologram-effect"></div>
      </div>
    </div>
  </div>
);

const StatsSection = () => {
  const statsData = [
    { title: "Total Conversations", value: "48.2K" },
    { title: "Active Sessions", value: "1,847" },
    { title: "Response Accuracy", value: "96.8%" },
    { title: "Avg Response Time", value: "0.8s" },
  ];

  return (
    <div className="stats-grid">
      {statsData.map((stat, index) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
};

export default StatsSection;