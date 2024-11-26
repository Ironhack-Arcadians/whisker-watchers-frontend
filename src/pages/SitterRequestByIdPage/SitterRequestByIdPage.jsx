import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import "./SitterRequestByIdPage.css";

function SitterRequestByIdPage() {
  const { id } = useParams(); // Obtener el ID de la solicitud de cuidado desde la URL
  const [careRequest, setCareRequest] = useState(null);
  const [error, setError] = useState("");
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

        // Verificar si la solicitud está asignada al cuidador actual
        const currentUserId = JSON.parse(atob(storedToken.split(".")[1]))._id;
        if (response.data.data.selectedSitter !== currentUserId) {
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

  const handleAccept = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      // Actualizar la solicitud de cuidado a "accepted" y asignar al selectedSitter
      const updatedCareRequest = {
        status: "accepted",
        selectedSitter: JSON.parse(atob(storedToken.split(".")[1]))._id,
      };

      const response = await axiosInstance.put(
        `/api/care-requests/${id}`,
        updatedCareRequest,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      setCareRequest(response.data.data); // Actualizar los detalles de la solicitud
    } catch (err) {
      setError("Failed to accept the care request.");
      console.error(err);
    }
  };

  const handleReject = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      // Actualizar la solicitud de cuidado a "cancelled" y quitar el selectedSitter
      const updatedCareRequest = {
        status: "cancelled",
        selectedSitter: null,
      };

      const response = await axiosInstance.put(
        `/api/care-requests/${id}`,
        updatedCareRequest,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      setCareRequest(response.data.data); // Actualizar los detalles de la solicitud
    } catch (err) {
      setError("Failed to reject the care request.");
      console.error(err);
    }
  };

  const handleComplete = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      // Actualizar la solicitud de cuidado a "completed"
      const updatedCareRequest = {
        status: "completed",
      };

      const response = await axiosInstance.put(
        `/api/care-requests/${id}`,
        updatedCareRequest,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      setCareRequest(response.data.data); // Actualizar los detalles de la solicitud
    } catch (err) {
      setError("Failed to complete the care request.");
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");
      await axiosInstance.delete(`/api/care-requests/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      navigate("/care-requests"); // Redirigir a la página de solicitudes de cuidado
    } catch (err) {
      setError("Failed to delete the care request.");
      console.error(err);
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
        <p>Description: {careRequest.pet.description}</p>
        <p>Special cares: <strong>{careRequest.pet.specialCares}</strong></p>
        <p>Status: <strong>{careRequest.status}</strong></p>
        <p>
          From: <strong>{careRequest.startDate.split("T")[0]}</strong> to: <strong>{careRequest.endDate.split("T")[0]}</strong>
        </p>

        {/* Botones de acción */}
        <div className="care-request-actions">
          {careRequest.status === "pending" && (
            <>
              <button onClick={handleAccept} style={{ backgroundColor: "green" }}>
                Accept
              </button>
              <button onClick={handleReject} style={{ backgroundColor: "orange" }}>
                Reject
              </button>
            </>
          )}

          {careRequest.status === "accepted" && (
            <>
              <button onClick={handleComplete} style={{ backgroundColor: "blue" }}>
                Complete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SitterRequestByIdPage;