import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

function ProfilePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserProfile = async () => {
            const storedToken = localStorage.getItem("authToken");

            if (!storedToken) {
                setError("You must be logged in to view your profile.");
                return;
            }

            try {
                const response = await axiosInstance.get(`/api/profile/${user}`, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                });
                setUser(response.data.user); // Assuming the response structure is { user: {...} }
            } catch (error) {
                console.error(error);
                setError("Failed to fetch user profile.");
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div className="profile-page-container">
            <button className="back-button" onClick={() => navigate(-1)}>
                &larr; Back to Dashboard
            </button>

            <div className="profile-card">
                {error && <p style={{ color: "red" }}>{error}</p>}
                {user ? (
                    <>
                        <div className="profile-header">
                            <img
                                src={user.profile_pic || "default-profile-pic.jpg"}
                                alt={user.name}
                                className="profile-pic"
                            />
                            <div className="profile-info">
                                <h1>{user.name}</h1>
                                <p>{user.location}</p>
                            </div>
                        </div>
                        <div className="profile-details">
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Role:</strong> {user.role}</p>
                            <p><strong>Bio:</strong> {user.bio || "No bio available."}</p>
                        </div>
                    </>
                ) : (
                    <p>Loading profile...</p>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;