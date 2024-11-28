import { StrictMode } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App.jsx';
import { AuthProviderWrapper } from './context/auth.context.jsx';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <AuthProviderWrapper>
      <Router>
        <App />
      </Router>
    </AuthProviderWrapper>
  </StrictMode>
);