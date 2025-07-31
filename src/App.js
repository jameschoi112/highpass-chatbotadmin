// src/App.js
import Dashboard from './components/Dashboard';
import { ThemeProvider } from './contexts/ThemeContext';
import './components/Dashboard.css';

function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;