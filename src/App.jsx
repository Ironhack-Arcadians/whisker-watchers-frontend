import './App.css';
import Navbar from './components/navbar/Navbar';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import React, { useContext } from "react"
import { AuthContext } from './context/auth.context';

import Footer from './components/footer/Footer';
import SignupForm from './components/signup/signup';
import LoginForm from './components/login/Login';
import OwnerDashboard from './pages/ownerDashboard/OwnerDashboard';
import SitterDashboard from './pages/sitterDashboard/SitterDashboard';
import LandingDashboard from './pages/landingPage/LandingPage';
import About from './pages/About/About';
import HomePage from './pages/homepage/HomePage';
import Sidebar from './components/sidebar/Sidebar';
import OwnerRequestsPage from './pages/OwnerCareRequestsPage/OwnerRequestsPage';

import IsAnon from './components/isAnon';
import IsPrivate from './components/isPrivate';


function App() {
  const { user, isLoading, logOutUser } = useContext(AuthContext);
  const location = useLocation();

 
  const shouldShowSidebar = location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname!=='/'

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar user={user} />
      <div className="app-layout">
          {shouldShowSidebar  && <Sidebar handleLogout={logOutUser} />}
        <div className="main-content">
          <div className="content">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/login" element={<LoginForm />} />
              <Route exact path="/signup" element={<SignupForm />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/landing" element={<LandingDashboard user={user} />} />
              <Route path="/dashboard/owner" element={<IsPrivate requiredRole={"owner"}> <OwnerDashboard /> </IsPrivate>} />
              <Route path="/dashboard/sitter" element={<IsPrivate requiredRole={"sitter"}> <SitterDashboard /> </IsPrivate>} />
              <Route path="/my-care-requests" element={<IsPrivate requiredRole={"owner"}> <OwnerRequestsPage /> </IsPrivate>} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App;