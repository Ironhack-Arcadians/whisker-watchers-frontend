import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axiosInstance from "../../api/axios";
import './SitterDashboard.css';

function SitterDashboard() {
  const [careRequests, setCareRequests] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    const fetchCareRequests = async () => {
      const storedToken = localStorage.getItem("authToken");

      if (!storedToken) {
        setError("You must be logged in to view care requests.");
        return;
      }

      try {
        const response = await axiosInstance.get("/api/care-requests", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setCareRequests(response.data.data);
      } catch (err) {
        console.error("Error fetching care requests:", err);
        setError("Failed to fetch care requests. Please try again later.");
      }
    };

    fetchCareRequests();
  }, []);

  // Function to handle "See Details" button click
  const handleSeeDetails = (requestId) => {
    navigate(`/care-requests/sitter/${requestId}`); // Navigate to the details page for the selected care request
  };

  return (
    <div className="dashboard">
      <div className="content-wrapper">
        <main className="care-request-section">
          <h2>Care Requests Dashboard</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="care-requests-list">
            {careRequests.length > 0 ? (
              careRequests.map((request) => (
                <div key={request._id} className="care-request-card">
                  {/* Pet Name and Type */}
                  <h2>{request.comment}</h2>

                  {/* Pet Picture */}
                  <img
                    src={request.pet.pet_picture || "default-image.jpg"}
                    alt={request.pet.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />

                  {/* Request Details */}
                  <p>
                    <strong>{request.pet.owner.name}</strong> in{" "}
                    <strong>{request.pet.owner.location}</strong>
                  </p>
                  <p>
                    <strong>Status:</strong> {request.status}
                  </p>

                  {/* Apply Button */}
                  <button onClick={() => handleSeeDetails(request._id)}>
                    See Details
                  </button>
                </div>
              ))
            ) : (
              <p>No care requests found.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default SitterDashboard;