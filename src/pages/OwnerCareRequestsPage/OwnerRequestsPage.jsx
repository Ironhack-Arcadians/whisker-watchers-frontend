import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import "./OwnerRequestsPage.css"
import { Link, useNavigate } from "react-router-dom";
const OwnerRequestsPage = () => {

  const navigate = useNavigate();
  const [careRequests, setCareRequests] = useState([]);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchCareRequests = async () => {
      const storedToken = localStorage.getItem("authToken");

      if (!storedToken) {
        setError("You must be logged in to view your care requests.");
        return;
      }

      try {
        const response = await axiosInstance.get("/api/care-requests", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        console.log("Care requests fetched:", response.data.data);
        setCareRequests(response.data.data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch your care requests.");
      }
    };

    fetchCareRequests();
  }, []);

  return (
    <div className="my-care-requests-dashboard">
                <button className="care-back-button" onClick={() => navigate(-1)}>
                          &larr; Back to Dashboard
                      </button>

    <div className="my-care-requests-page">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="care-requests-container">
        {careRequests.length > 0 ? (
          careRequests.map((request) => (
            <div key={request._id} className="care-request-card">
              <h3>{request.comment}</h3>
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
              <p>
                Pet: <strong>{request.pet.name}</strong> ({request.pet.typeOfAnimal})
              </p>
              <p>
                Status: <strong>{request.status}</strong>
              </p>
              <p>
                Date: <strong>{new Date(request.startDate).toLocaleDateString()}</strong> -{" "}
                <strong>{new Date(request.endDate).toLocaleDateString()}</strong>
              </p>
              <Link to={`/care-requests/${request._id}`}>
                <button>More Details</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No care requests found.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default OwnerRequestsPage;