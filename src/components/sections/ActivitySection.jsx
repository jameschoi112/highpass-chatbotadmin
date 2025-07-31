import React from 'react';

const ActivityItem = ({ type, message, time, delay }) => (
  <div
    className={`activity-item ${type}`}
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="activity-indicator"></div>
    <div className="activity-content">
      <p className="activity-message">{message}</p>
      <span className="activity-time">{time}</span>
    </div>
  </div>
);

const ActivitySection = () => {
  const activities = [
    { type: 'success', message: 'New chatbot version deployed successfully', time: '2 min ago' },
    { type: 'warning', message: 'High fallback rate detected in Korean conversations', time: '5 min ago' },
    { type: 'info', message: 'Training data updated with 500 new intents', time: '12 min ago' },
    { type: 'success', message: 'API integration test completed - All endpoints operational', time: '18 min ago' },
  ];

  return (
    <div className="activity-section">
      <h2 className="section-title">Bot Activity Stream</h2>
      <div className="activity-feed">
        {activities.map((activity, index) => (
          <ActivityItem
            key={index}
            type={activity.type}
            message={activity.message}
            time={activity.time}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivitySection;