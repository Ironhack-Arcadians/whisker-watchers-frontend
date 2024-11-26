import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import "./CareRequestDetailsPage.css";

function CareRequestDetailsPage() {
  const { id } = useParams(); // Extract request ID from URL parameters
  const [careRequest, setCareRequest] = useState(null); // Store care request data
  const [error, setError] = useState(""); // Store any errors
  const navigate = useNavigate(); // For navigation if needed

  useEffect(() => {
    const fetchCareRequestDetails = async () => {
      try {
        const storedToken = localStorage.getItem("authToken");

        if (!storedToken) {
          setError("You must be logged in to view this request.");
          return;
        }

        // Fetch request details by ID
        const response = await axiosInstance.get(`/api/care-requests/${id}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        // Check if the current user is the creator of the request
        const currentUserId = JSON.parse(atob(storedToken.split(".")[1]))._id;
        if (response.data.data.creator !== currentUserId) {
          setError("You are not authorized to view this request.");
          return;
        }

        setCareRequest(response.data.data);
      } catch (err) {
        console.error("Error fetching care request details:", err);
        setError("Failed to fetch care request details.");
      }
    };

    fetchCareRequestDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");
      await axiosInstance.delete(`/api/care-requests/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      navigate("/care-requests"); // Redirect back to the care requests page after deletion
    } catch (error) {
      setError("Failed to delete the care request.");
      console.error(error);
    }
  };

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!careRequest) {
    return <p>Loading care request details...</p>;
  }

  return (
    <div className="care-request-details-page">
      <h1>Care Request Details</h1>
      <div className="care-request-card">
        <img
          src={careRequest.pet.pet_picture || "default-image.jpg"}
          alt={careRequest.pet.name}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        />
        <h3>Comment: {careRequest.comment}</h3>
        <p>
          Pet: <strong>{careRequest.pet.name}</strong> ({careRequest.pet.typeOfAnimal})
        </p>
        <p>
          Status: <strong>{careRequest.status}</strong>
        </p>
        <p>
          Date: <strong>{new Date(careRequest.startDate).toLocaleDateString()}</strong> -{" "}
          <strong>{new Date(careRequest.endDate).toLocaleDateString()}</strong>
        </p>

        {/* Sitter information */}
        {careRequest.selectedSitter && (
          <div className="sitter-info">
            <h4>Sitter Information</h4>
            <p>Name: <strong>{careRequest.selectedSitter.name}</strong></p>
            <p>Email: <strong>{careRequest.selectedSitter.email}</strong></p>
            <p>Location: <strong>{careRequest.selectedSitter.location}</strong></p>
          </div>
        )}

        {/* Buttons for Edit and Delete */}
        <div className="buttons">
          <button onClick={() => navigate(`/care-requests/edit/${id}`)}>Edit</button>
          <button onClick={handleDelete}>Cancel (Delete)</button>
        </div>

        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
}

export default CareRequestDetailsPage;