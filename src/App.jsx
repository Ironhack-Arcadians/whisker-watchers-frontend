import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "./context/auth.context";

import Footer from "./components/footer/Footer";
import SignupForm from "./components/signup/signup";
import LoginForm from "./components/login/Login";
import OwnerDashboard from "./pages/ownerDashboard/OwnerDashboard";
import SitterDashboard from "./pages/sitterDashboard/SitterDashboard";
import LandingDashboard from "./pages/landingPage/LandingPage";
import About from "./pages/About/About";
import HomePage from "./pages/homepage/HomePage";
import Sidebar from "./components/sidebar/Sidebar";
import OwnerRequestsPage from "./pages/OwnerCareRequestsPage/OwnerRequestsPage";
import CareRequestDetailsPage from "./pages/CareRequestDetailsPage/CareRequestDetailsPage";
import SitterRequestByIdPage from "./pages/SitterRequestByIdPage/SitterRequestByIdPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

import IsAnon from "./components/isAnon";
import IsPrivate from "./components/isPrivate";

function App() {
  const { user, isLoading, logOutUser } = useContext(AuthContext);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const [isLoginModelOpen, setLoginModelOpen] = useState(false);
  const location = useLocation();

  const toggleSignupModal = () => {
    setSignupModalOpen(!isSignupModalOpen);
  };

  const toggleLoginModel = () => {
    console.log("Toggling login modal", isLoginModelOpen);
    setLoginModelOpen(!isLoginModelOpen);
  };

  const shouldShowSidebar =
    location.pathname !== "/login" &&
    location.pathname !== "/signup" &&
    location.pathname !== "/";

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar
        user={user}
        toggleSignupModal={toggleSignupModal}
        toggleLoginModel={toggleLoginModel}
      />
      <div className="app-layout">
        {shouldShowSidebar && <Sidebar handleLogout={logOutUser} />}
        <div className="main-content">
          <div className="content">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/signup" element={<SignupForm />} />
              <Route exact path="/about" element={<About />} />
              <Route
                exact
                path="/landing"
                element={<LandingDashboard user={user} />}
              />
              <Route
                path="/dashboard/owner"
                element={
                  <IsPrivate requiredRole={"owner"}>
                    {" "}
                    <OwnerDashboard />{" "}
                  </IsPrivate>
                }
              />
              <Route
                path="/dashboard/sitter"
                element={
                  <IsPrivate requiredRole={"sitter"}>
                    {" "}
                    <SitterDashboard />{" "}
                  </IsPrivate>
                }
              />
              <Route path="/care-requests/sitter/:id" element={<IsPrivate requiredRole={"sitter"}> <SitterRequestByIdPage /> </IsPrivate>} />
              <Route path="/my-care-requests" element={<IsPrivate requiredRole={"owner"}> {" "} <OwnerRequestsPage />{" "} </IsPrivate>} />
              <Route
                path="/care-requests/:id"
                element={
                  <IsPrivate requiredRole={"owner"}>
                    <CareRequestDetailsPage />
                  </IsPrivate>
                }
              />
             <Route path="/profile/:id" element={<ProfilePage />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>

      {/* Signup Modal */}
      {isSignupModalOpen && (
        <div className="signup-modal-overlay">
          <div className="signup-modal">
            <button className="close-button" onClick={toggleSignupModal}>
              &times;
            </button>
            <SignupForm onClose={toggleSignupModal} />
          </div>
        </div>
      )}

      {isLoginModelOpen && (
        <div className="signup-modal-overlay">
          <div className="signup-modal">
            <button className="close-button" onClick={toggleLoginModel}>
              &times;
            </button>
            <LoginForm onClose={toggleLoginModel} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
