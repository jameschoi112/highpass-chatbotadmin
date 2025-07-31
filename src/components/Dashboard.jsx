import React, { useState } from 'react';
import ParticleCanvas from './effects/ParticleCanvas';
import Sidebar from './Sidebar';
import HeaderSection from './sections/HeaderSection';
import StatsSection from './sections/StatsSection';
import ChartsSection from './sections/ChartsSection';
import ActivitySection from './sections/ActivitySection';
import ConversationsView from './sections/ConversationsView';
import { Menu } from 'lucide-react';

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return (
          <>
            <StatsSection />
            <div className="main-content-grid">
              <ChartsSection />
              <ActivitySection />
            </div>
          </>
        );
      case 'conversations':
        return <ConversationsView />;
      default:
        return <div className="placeholder-content">{activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)} View</div>;
    }
  };

  return (
    <div className="dashboard-container">
      <ParticleCanvas />
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} sidebarOpen={sidebarOpen} />
      <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu size={24} />
        </button>
        <HeaderSection />
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;