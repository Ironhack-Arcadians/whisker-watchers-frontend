import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import CareRequestEditModal from "../../components/Modal/Modal";  // Import the modal
import "./CareRequestDetailsPage.css";

function CareRequestDetailsPage() {
  const { id } = useParams();
  const [careRequest, setCareRequest] = useState(null);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCareRequestDetails = async () => {
      try {
        const storedToken = localStorage.getItem("authToken");

        if (!storedToken) {
          setError("You must be logged in to view this request.");
          return;
        }

        const response = await axiosInstance.get(`/api/care-requests/${id}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        const currentUserId = JSON.parse(atob(storedToken.split(".")[1]))._id;
        if (response.data.data.creator !== currentUserId && response.data.data.selectedSitter !== currentUserId) {
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
      navigate("/care-requests");
    } catch (error) {
      setError("Failed to delete the care request.");
      console.error(error);
    }
  };

  const handleSaveCareRequest = async (updatedCareRequest) => {
    try {
      const storedToken = localStorage.getItem("authToken");

      if (!storedToken) {
        setError("You must be logged in to save changes.");
        return;
      }

      // Send the updated care request data to the backend
      await axiosInstance.put(`/api/care-requests/${id}`, updatedCareRequest, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      setCareRequest(updatedCareRequest); // Update the local state with the new values
      setIsModalOpen(false); // Close the modal
    } catch (err) {
      console.error("Error saving care request:", err);
      setError("Failed to update care request.");
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
        <h3>{careRequest.comment}</h3>
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
        <p>
          Pet: <strong>{careRequest.pet.name}</strong> ({careRequest.pet.typeOfAnimal})
        </p>
        <p>
         {careRequest.pet.description}
        </p>
        <p>
          Special cares: <strong>{careRequest.pet.specialCares}</strong>
        </p>
        <p>
          Status: <strong>{careRequest.status}</strong>
        </p>
        <p>
          From: <strong>{careRequest.startDate.split("T")[0]}</strong>
           {" "}to: <strong>{careRequest.endDate.split("T")[0]}</strong>
        </p>
       
       <div className="care-request-actions">
          <button onClick={() => setIsModalOpen(true)}>Edit</button>
          <button onClick={handleDelete} style={{ backgroundColor: "red" }}>Delete</button>
        </div>
      </div>

      {/* Render the modal */}
      <CareRequestEditModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCareRequest}
        careRequest={careRequest}
      />
    </div>
  );
}

export default CareRequestDetailsPage;