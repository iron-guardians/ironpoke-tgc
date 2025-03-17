import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/auth-context.jsx';
import NavBar from './components/layouts/page-layout/nav-bar.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <div className="app-container">
          
          <App />
          
        </div>
      </AuthProvider>
    </Router>
  </StrictMode>
)
