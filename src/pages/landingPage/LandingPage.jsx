import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = ({ user }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(user === null) return; // Waits for user to be fetched
        if (!user) {
            navigate("/login"); // Redirect to login if user is not authenticated
        } else if (user.role === "owner") {
            navigate("/dashboard/owner"); // Redirect to Owner Dashboard
        } else if (user.role === "sitter") {
            navigate("/dashboard/sitter"); // Redirect to Sitter Dashboard
        }
    }, [user, navigate]);

    return (
        <div>
            <p>Loading your dashboard...</p>
        </div>
    );
};

export default LandingPage;