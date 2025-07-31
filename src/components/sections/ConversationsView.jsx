import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';

const ConversationsView = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [adminMode, setAdminMode] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const activeChats = [
    {
      id: 1,
      user: "John Kim",
      status: "active",
      duration: "5:23",
      lastMessage: "I need help with my account settings",
      sentiment: "neutral",
      priority: "medium",
      agent: null
    },
    {
      id: 2,
      user: "Sarah Lee",
      status: "active",
      duration: "12:45",
      lastMessage: "The payment process is not working",
      sentiment: "negative",
      priority: "high",
      agent: "Bot Admin"
    },
    {
      id: 3,
      user: "Mike Park",
      status: "active", 
      duration: "2:10",
      lastMessage: "How do I reset my password?",
      sentiment: "neutral",
      priority: "low",
      agent: null
    },
    {
      id: 4,
      user: "Emma Wilson",
      status: "waiting",
      duration: "8:30",
      lastMessage: "Thank you for your help!",
      sentiment: "positive",
      priority: "low",
      agent: null
    }
  ];

  const chatMessages = [
    { id: 1, sender: "user", message: "Hello, I need help with my account", time: "10:23 AM" },
    { id: 2, sender: "bot", message: "Hello! I'd be happy to help you with your account. What specific issue are you experiencing?", time: "10:23 AM" },
    { id: 3, sender: "user", message: "I can't seem to change my password. The reset link isn't working", time: "10:24 AM" },
    { id: 4, sender: "bot", message: "I understand you're having trouble with the password reset. Let me help you with that.", time: "10:24 AM" },
    { id: 5, sender: "admin", message: "Hi John, I'm taking over this conversation to assist you better. Let me send you a new password reset link.", time: "10:25 AM" },
  ];

  const aiSuggestions = [
    {
      type: "user_info",
      title: "User Profile Detected",
      content: "Account created: 3 months ago\nPrevious issues: 2 (resolved)\nSubscription: Premium",
      confidence: 95
    },
    {
      type: "solution",
      title: "Recommended Solution",
      content: "Send manual password reset link via verified email. User's email is verified and active.",
      confidence: 88
    },
    {
      type: "sentiment",
      title: "Sentiment Analysis",
      content: "User showing mild frustration. Recommend empathetic response and quick resolution.",
      confidence: 82
    },
    {
      type: "context",
      title: "Similar Issues",
      content: "247 similar cases this week. 92% resolved with manual reset link.",
      confidence: 90
    }
  ];

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (selectedChat) {
      scrollToBottom();
    }
  }, [selectedChat, chatMessages]);

  useEffect(() => {
    let timer;
    if (adminMode && selectedChat) {
      setAiLoading(true);
      timer = setTimeout(() => {
        setAiLoading(false);
      }, 3000);
    } else {
      setAiLoading(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [adminMode, selectedChat]);

  return (
    <>
      <style>{conversationsStyles}</style>
      <div className="conversations-container">
        {/* Active Chats List */}
        <div className="chats-sidebar">
          <div className="chats-header">
            <h3>Active Conversations</h3>
            <div className="chat-stats">
              <span className="stat-badge">{activeChats.length} Active</span>
              <span className="stat-badge warning">2 Waiting</span>
            </div>
          </div>
          <div className="chats-list">
            {activeChats.map((chat) => (
              <div
                key={chat.id}
                className={`chat-item ${selectedChat?.id === chat.id ? 'active' : ''} ${chat.priority}`}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="chat-avatar">
                  <div className={`status-indicator ${chat.status}`}></div>
                  {chat.user.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="chat-info">
                  <div className="chat-header-info">
                    <h4>{chat.user}</h4>
                    <span className="chat-duration">{chat.duration}</span>
                  </div>
                  <p className="last-message">{chat.lastMessage}</p>
                  <div className="chat-meta">
                    <span className={`sentiment ${chat.sentiment}`}>
                      {chat.sentiment === 'positive' ? '😊' : chat.sentiment === 'negative' ? '😟' : '😐'}
                    </span>
                    {chat.agent && <span className="agent-badge">👤 {chat.agent}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="chat-window">
          {selectedChat ? (
            <>
              <div className="chat-window-header">
                <div className="chat-user-info">
                  <h3>{selectedChat.user}</h3>
                  <span className={`priority-badge ${selectedChat.priority}`}>
                    {selectedChat.priority} priority
                  </span>
                </div>
                <div className="chat-actions">
                  <button 
                    className={`admin-toggle ${adminMode ? 'active' : ''}`}
                    onClick={() => setAdminMode(!adminMode)}
                  >
                    {adminMode ? 'Exit Admin Mode' : 'Take Over Chat'}
                  </button>
                </div>
              </div>
              
              <div className="messages-container">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`message ${msg.sender}`}>
                    <div className="message-content">
                      {msg.sender === 'admin' && <span className="admin-label">Admin</span>}
                      <p>{msg.message}</p>
                      <span className="message-time">{msg.time}</span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {adminMode && (
                <div className="admin-input-area">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Type your message..."
                    className="admin-input"
                  />
                  <button className="send-button">Send</button>
                </div>
              )}
            </>
          ) : (
            <div className="no-chat-selected">
              <MessageSquare size={48} />
              <p>Select a conversation to view details</p>
            </div>
          )}
        </div>

        {/* AI Assistant Panel */}
        <div className={`ai-assistant-panel ${selectedChat && adminMode ? 'active' : ''}`}>
          {aiLoading ? (
            <div className="ai-loading-container">
              <div className="ai-spinner"></div>
              <p>Analyzing... Please wait a moment.</p>
            </div>
          ) : (
            <>
              <div className="ai-header">
                <h3>AI Assistant</h3>
                <span className="ai-status">🤖 Active</span>
              </div>
              
              <div className="ai-suggestions">
                {aiSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`suggestion-card ${suggestion.type}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="suggestion-header">
                      <h4>{suggestion.title}</h4>
                      <span className="confidence">{suggestion.confidence}%</span>
                    </div>
                    <p>{suggestion.content}</p>
                    <div className="suggestion-actions">
                      <button className="use-suggestion">Use This</button>
                      <button className="more-info">More</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="quick-actions">
                <h4>Quick Actions</h4>
                <div className="action-buttons">
                  <button className="quick-action">📧 Send Email</button>
                  <button className="quick-action">🔗 Share Link</button>
                  <button className="quick-action">📋 View History</button>
                  <button className="quick-action">🏷️ Add Tag</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const conversationsStyles = `
/* Conversations View Styles */
.conversations-container {
  display: grid;
  grid-template-columns: 320px 1fr 350px;
  gap: 1.5rem;
  height: calc(100vh - 4rem);
  animation: fadeIn 0.5s ease-out;
}

/* Chats Sidebar */
.chats-sidebar {
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.chats-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-secondary);
  background: rgba(99, 102, 241, 0.05);
}

.chats-header h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--text-primary), var(--accent-primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.chat-stats {
  display: flex;
  gap: 0.5rem;
}

.stat-badge {
  padding: 0.25rem 0.75rem;
  background: rgba(99, 102, 241, 0.2);
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.stat-badge.warning {
  background: rgba(245, 158, 11, 0.2);
  color: var(--warning);
}

.chats-list {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
}

.chat-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
}

.chat-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: transparent;
  transition: all 0.3s ease;
}

.chat-item.high::before {
  background: var(--danger);
}

.chat-item.medium::before {
  background: var(--warning);
}

.chat-item.low::before {
  background: var(--success);
}

.chat-item:hover {
  background: rgba(99, 102, 241, 0.1);
  border-color: rgba(99, 102, 241, 0.3);
  transform: translateX(5px);
}

.chat-item.active {
  background: rgba(99, 102, 241, 0.2);
  border-color: var(--accent-primary);
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
}

.chat-avatar {
  position: relative;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  flex-shrink: 0;
}

.status-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid var(--bg-card);
  background: var(--success);
}

.status-indicator.waiting {
  background: var(--warning);
}

.chat-info {
  flex: 1;
  min-width: 0;
}

.chat-header-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.chat-info h4 {
  font-weight: 600;
  font-size: 0.875rem;
}

.chat-duration {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.last-message {
  font-size: 0.8rem;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.5rem;
}

.chat-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sentiment {
  font-size: 1rem;
}

.agent-badge {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  background: rgba(6, 182, 212, 0.2);
  color: var(--accent-tertiary);
  border-radius: 10px;
}

/* Chat Window */
.chat-window {
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-window-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-secondary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(99, 102, 241, 0.05);
}

.chat-user-info h3 {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

.priority-badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  text-transform: uppercase;
  font-weight: 600;
}

.priority-badge.high {
  background: rgba(239, 68, 68, 0.2);
  color: var(--danger);
}

.priority-badge.medium {
  background: rgba(245, 158, 11, 0.2);
  color: var(--warning);
}

.priority-badge.low {
  background: rgba(16, 185, 129, 0.2);
  color: var(--success);
}

.admin-toggle {
  padding: 0.75rem 1.5rem;
  background: transparent;
  color: var(--accent-tertiary);
  border: 2px solid var(--accent-tertiary);
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.admin-toggle:hover {
  background: var(--accent-tertiary);
  color: var(--bg-primary);
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
}

.admin-toggle.active {
  background: var(--accent-tertiary);
  color: var(--bg-primary);
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message {
  display: flex;
  animation: fadeIn 0.3s ease-out;
}

.message.user {
  justify-content: flex-end;
}

.message.bot,
.message.admin {
  justify-content: flex-start;
}

.message-content {
  max-width: 70%;
  padding: 1rem;
  border-radius: 12px;
  position: relative;
}

.message.user .message-content {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: white;
}

.message.bot .message-content {
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
}

.message.admin .message-content {
  background: rgba(6, 182, 212, 0.1);
  border: 1px solid rgba(6, 182, 212, 0.3);
}

.admin-label {
  display: inline-block;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  background: var(--accent-tertiary);
  color: white;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  font-weight: 600;
}

.message-time {
  font-size: 0.7rem;
  color: var(--text-muted);
  margin-top: 0.5rem;
  display: block;
}

.admin-input-area {
  padding: 1.5rem;
  border-top: 1px solid var(--border-secondary);
  display: flex;
  gap: 1rem;
  align-items: center;
  background: rgba(6, 182, 212, 0.05);
}

.typing-indicator {
  display: flex;
  gap: 0.3rem;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background: var(--accent-tertiary);
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.7;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}

.admin-input {
  flex: 1;
  padding: 0.75rem 1rem;
  background: var(--bg-primary);
  border: 1px solid var(--accent-tertiary);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.admin-input:focus {
  outline: none;
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
}

.send-button {
  padding: 0.75rem 1.5rem;
  background: var(--accent-tertiary);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.send-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
}

.no-chat-selected {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-muted);
  gap: 1rem;
}

/* AI Assistant Panel */
.ai-assistant-panel {
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transform: translateX(100%);
  opacity: 0;
  transition: all 0.3s ease;
  overflow-y: auto;
}

.ai-assistant-panel.active {
  transform: translateX(0);
  opacity: 1;
}

.ai-loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1rem;
  color: var(--text-muted);
}

.ai-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(99, 102, 241, 0.2);
  border-left-color: var(--accent-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.ai-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-secondary);
}

.ai-header h3 {
  font-size: 1.25rem;
  background: linear-gradient(135deg, var(--text-primary), var(--accent-tertiary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.ai-status {
  font-size: 0.875rem;
  color: var(--success);
}

.ai-suggestions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.suggestion-card {
  padding: 1rem;
  background: rgba(99, 102, 241, 0.05);
  border: 1px solid var(--border-secondary);
  border-radius: 12px;
  animation: slideInRight 0.5s ease-out both;
  transition: all 0.3s ease;
}

.suggestion-card:hover {
  transform: translateX(-5px);
  border-color: var(--accent-primary);
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.2);
}

.suggestion-card.user_info {
  border-left: 3px solid var(--accent-primary);
}

.suggestion-card.solution {
  border-left: 3px solid var(--success);
}

.suggestion-card.sentiment {
  border-left: 3px solid var(--warning);
}

.suggestion-card.context {
  border-left: 3px solid var(--accent-tertiary);
}

.suggestion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.suggestion-header h4 {
  font-size: 0.875rem;
  font-weight: 600;
}

.confidence {
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  background: rgba(16, 185, 129, 0.2);
  color: var(--success);
  border-radius: 20px;
  font-weight: 600;
}

.suggestion-card p {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.5;
  white-space: pre-line;
}

.suggestion-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.use-suggestion,
.more-info {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.use-suggestion {
  background: var(--accent-primary);
  color: white;
  border: none;
}

.use-suggestion:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
}

.more-info {
  background: transparent;
  color: var(--accent-primary);
  border: 1px solid var(--accent-primary);
}

.more-info:hover {
  background: rgba(99, 102, 241, 0.1);
}

.quick-actions {
  padding-top: 1rem;
  border-top: 1px solid var(--border-secondary);
}

.quick-actions h4 {
  font-size: 0.875rem;
  margin-bottom: 1rem;
  color: var(--text-secondary);
}

.action-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.quick-action {
  padding: 0.75rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid var(--border-secondary);
  border-radius: 8px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--text-primary);
}

.quick-action:hover {
  background: rgba(99, 102, 241, 0.2);
  border-color: var(--accent-primary);
  transform: translateY(-2px);
}

/* Light mode adjustments for conversations */
.light-mode .suggestion-card {
  background: rgba(99, 102, 241, 0.03);
}

.light-mode .admin-input-area {
  background: rgba(6, 182, 212, 0.03);
}

.light-mode .message.user .message-content {
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.2);
}

/* Responsive for conversations */
@media (max-width: 1400px) {
  .conversations-container {
    grid-template-columns: 280px 1fr;
  }
  
  .ai-assistant-panel {
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    width: 350px;
    border-radius: 0;
    z-index: 100;
    box-shadow: -5px 0 20px rgba(0, 0, 0, 0.1);
  }
}

@media (max-width: 768px) {
  .conversations-container {
    grid-template-columns: 1fr;
  }
  
  .chats-sidebar {
    display: none;
  }
  
  .ai-assistant-panel {
    width: 100%;
  }
}

/* Animations needed for this component */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
`;

export default ConversationsView;