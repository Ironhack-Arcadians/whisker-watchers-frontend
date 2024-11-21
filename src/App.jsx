import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react"
import axiosInstance from './api/axios';

import Footer from './components/Footer';
import SignupForm from './components/signup';
import LoginForm from './components/login';
import About from './pages/About/about';
import OwnerDashboard from './pages/ownerDashboard/OwnerDashboard';
import SitterDashboard from './pages/sitterDashboard/SitterDashboard';
import About from './pages/About/About'

function App() {
  const [user, setUser] = useState(null); // Stores user data
  const [loading, setLoading] = useState(true); // For the loading state

  // Fetches user data from the backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/profile");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null); // Resets user if the request fails
      } finally {
        setLoading(false); // Stops loading
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
      <Route exact path="/login" element={<LoginForm />} />
      <Route exact path="/signup" element={<SignupForm />} />
      <Route exact path="/about" element={<About />} />
      <Route path="/dashboard" element={user?.role === "owner" ?(<OwnerDashboard />) : user?.role === "sitter" ? (<SitterDashboard />) : (<Navigate to="/login" />)} />
      <Route exact path="/about" element={<About />} />
     </Routes>
     <Footer />
    </>
  )
}

export default App
