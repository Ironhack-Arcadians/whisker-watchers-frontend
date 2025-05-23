import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axios";
import AddCareRequest from "../../components/AddCareRequest";
import "./ownerDashboard.css";

function OwnerDashboard() {
    const [sitters, setSitters] = useState([]);
    const [selectedSitter, setSelectedSitter] = useState(null);

    useEffect(() => {
        // Fetch all sitters from the server
        const fetchSitters = async () => {
            try {
                const response = await axiosInstance.get("/api/sitters", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });
                setSitters(response.data.data);
            } catch (error) {
                console.error("Error fetching sitters:", error);
            }
        };
        fetchSitters();
    }, []);

    const toggleSitterSelection = (sitterId) => {
        setSelectedSitter((prevSelectedSitter) =>
            prevSelectedSitter === sitterId ? null : sitterId
        );
    };

    return (
        <div className="dashboard">
            <h1>Welcome fellow pet parent!</h1>
            <p>Here you can create your pet care requests and select the best sitter for your pets.</p>

            {/* Form to add a new Request */}
            <div className="add-care-request-section">
                <AddCareRequest selectedSitter={selectedSitter} />
            </div>

            {/* Sitters List */}
            <div className="sitter-list-section">
                <h2>Select a Sitter</h2>
                <p>Choose the best sitter for your beloved pets from our trusted community.</p>
                <div className="sitter-list">
                    {sitters.length > 0 ? (
                        sitters.map((sitter) => (
                            <div
                                key={sitter._id}
                                className={`sitter-card ${selectedSitter === sitter._id ? "selected" : ""}`}
                            >
                                {/* Profile picture and name */}
                                <img
                                    src={sitter.profile_pic || "default-avatar.png"}
                                    alt={`${sitter.name}'s profile`}
                                    className="sitter-avatar"
                                />
                                <h3>{sitter.name}</h3>
                                
                                {/* Rating */}
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star"></span>

                                {/* Location */}
                                <p><strong>Location:</strong> {sitter.location || "Not specified"}</p>

                                {/* Bio */}
                                <p><strong>Bio:</strong> {sitter.bio || "No bio available"}</p>

                                {/* Experience */}
                                <p><strong>Experience:</strong> {sitter.experience || "No experience specified"}</p>


                                {/* Accept and Decline Buttons */}
                                <div className="action-buttons">
                                    <button className="accept-btn" onClick={() => toggleSitterSelection(sitter._id)}>
                                        {selectedSitter === sitter._id ? "Deselect Sitter" : "Select Sitter"}
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No sitters available at the moment.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OwnerDashboard;