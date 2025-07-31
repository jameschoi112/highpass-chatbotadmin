import React from 'react';
import {
  Bot,
  MessageSquare,
  TrendingUp,
  Users,
  Brain,
  FileText,
  Plug,
  Settings,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Sidebar = ({ activeMenu, setActiveMenu, sidebarOpen }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  const menuItems = [
    { id: 'dashboard', icon: <Bot size={20} />, label: 'Dashboard' },
    { id: 'conversations', icon: <MessageSquare size={20} />, label: 'Conversations' },
    { id: 'analytics', icon: <TrendingUp size={20} />, label: 'Analytics' },
    { id: 'users', icon: <Users size={20} />, label: 'Users' },
    { id: 'intents', icon: <Brain size={20} />, label: 'Intents & NLU' },
    { id: 'responses', icon: <FileText size={20} />, label: 'Responses' },
    { id: 'integrations', icon: <Plug size={20} />, label: 'Integrations' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="logo">
        <span className="logo-text">HIGHPASS</span>
        <div className="logo-subtitle">CHATBOT ADMIN</div>
      </div>

      <nav className="nav-menu">
        {menuItems.map((item, index) => (
          <div
            key={item.id}
            className={`nav-item ${activeMenu === item.id ? 'active' : ''}`}
            onClick={() => setActiveMenu(item.id)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            <div className="nav-glow"></div>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar-glow">
            <div className="avatar">
              <Users size={24} />
            </div>
          </div>
          <div className="user-info">
            <div className="user-name">Bot Admin</div>
            <div className="user-role">System Administrator</div>
          </div>
        </div>

        <div className="theme-toggle" onClick={toggleTheme}>
          <div className="theme-toggle-wrapper">
            <div className="theme-icon">
              <Sun size={20} />
            </div>
            <div className={`theme-switch ${isDarkMode ? 'active' : ''}`}>
              <div className="theme-switch-handle" />
            </div>
            <div className="theme-icon">
              <Moon size={20} />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;