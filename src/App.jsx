import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react"
import axiosInstance from './api/axios';

import Footer from './components/Footer';
import SignupForm from './components/Signup';
import LoginForm from './components/login';
import OwnerDashboard from './pages/ownerDashboard/OwnerDashboard';
import SitterDashboard from './pages/sitterDashboard/SitterDashboard';
import LandingDashboard from './pages/landingDashboard/LandingDashboard';
import About from './pages/About/About';

function App() {
  const [user, setUser] = useState(null); // Stores user data
  const [loading, setLoading] = useState(true); // For the loading state

  // Fetches user data from the backend
  useEffect(() => {
    const fetchUser = async () => {
    const token = localStorage.getItem("authToken");
      
    if(token){
      try {
        const response = await axiosInstance.get("/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null); // Resets user if the request fails
      } finally {
        setLoading(false); // Stops loading
      }
    } else {
      setLoading(false);
    }
    };

    fetchUser();
  }, []);

  if(loading) {
    return <div>Loading...</div>; // Can implement loading bar here or some css
  }

  return (
    <>
     <Navbar />

     <Routes>
      <Route exact path="/login" element={<LoginForm setUser={setUser} />} />
      <Route exact path="/signup" element={<SignupForm />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/landing" element={<LandingDashboard user={user} />} />
      <Route path="/dashboard/owner" element={user?.role === "owner" ?(<OwnerDashboard />) : (<Navigate to="/login" />)} />
      <Route path="/dashboard/sitter" element={user?.role === "sitter" ?(<SitterDashboard />) : (<Navigate to="/login" />)} />
     </Routes>
     <Footer />
    </>
  )
}

export default App
