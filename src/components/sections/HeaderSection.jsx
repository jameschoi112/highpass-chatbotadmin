import React from 'react';

const HeaderSection = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="page-title">
          <span className="title-main">Chatbot Control Center</span>
          <span className="title-sub">Real-time Conversation Analytics & Management</span>
        </h1>
        <div className="header-actions">
          <button className="btn-cyber">
            <span className="btn-text">Deploy Bot Update</span>
            <div className="btn-glow"></div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;