import './App.css';
import Navbar from './components/navbar/Navbar';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react"
import { AuthContext } from './context/auth.context';

import Footer from './components/footer/Footer';
import SignupForm from './components/signup/signup';
import LoginForm from './components/login/Login';
import OwnerDashboard from './pages/ownerDashboard/OwnerDashboard';
import SitterDashboard from './pages/sitterDashboard/SitterDashboard';
import LandingDashboard from './pages/landingPage/LandingPage';
import About from './pages/About/About';
import HomePage from './pages/homepage/HomePage';
import Sidebar from './components/sidebar/sidebar';

import IsAnon from './components/isAnon';
import IsPrivate from './components/isPrivate';


function App() {
  const { user, isLoading, logOutUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const showSidebar = user && location.pathname.includes('/dashboard/');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar user={user} />
      <div className="app-layout">
        <div className="main-content">
          {showSidebar && <Sidebar handleLogout={logOutUser} />}
          <div className="content">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/login" element={<LoginForm />} />
              <Route exact path="/signup" element={<SignupForm />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/landing" element={<LandingDashboard user={user} />} />
              <Route path="/dashboard/owner" element={<IsPrivate requiredRole={"owner"}> <OwnerDashboard /> </IsPrivate>} />
              <Route path="/dashboard/sitter" element={<IsPrivate requiredRole={"sitter"}> <SitterDashboard /> </IsPrivate>} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
