import { useState, useEffect } from "react";
import axiosInstance from "../api/axios";

function AddCareRequest({ selectedSitter }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pet, setPet] = useState(""); // This should be the pet ID
  const [pets, setPets] = useState([]); // This will be the list of pets fetched from the server
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch pets belonging to the logged-in owner
    axiosInstance
      .get("/api/pets", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => setPets(response.data.data))
      .catch((err) => console.error("Error fetching pets:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!startDate || !endDate || !pet || !selectedSitter) {
      setError("All fields, including sitter selection, are required.");
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      setError("End date and time must be after the start date and time."); // This error message is for after submission
      return;
    }

    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      console.log("No token found");
      alert("You must be logged in to add a care request.");
      return;
    }

    const requestBody = { startDate, endDate, pet, comment, selectedSitter };

    axiosInstance
      .post("/api/care-requests", requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Clears form fields after successful submission
        setStartDate("");
        setEndDate("");
        setPet("");
        setComment("");
        setError("");
        console.log("Care request added successfully", response.data); // For debugging purposes
      })
      .catch((error) => console.log("Error adding care request:", error));
  };

  return (
    <div className="add-care-request">

      <h2>Add New Care Request</h2>
      <p>Enter the start and end dates, choose your pet, and provide additional details to create a care request  <br></br> Don’t forget to select one of our sitters!</p>
      <form onSubmit={handleSubmit} className="care-request-form">
      <div className="form-inputs">
        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="datetime-local"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={new Date().toISOString().slice(0, 16)}
            required
            />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="datetime-local"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate}
            required
            />
        </div>

        <div className="form-group">
          <label htmlFor="pet">Pet:</label>
          <select
            id="pet"
            value={pet}
            onChange={(e) => setPet(e.target.value)}
            required
            >
            <option value="">Select a pet</option>
            {pets.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} ({p.typeOfAnimal})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <input
            type="text"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
            <div className="form-buttons">

        <button type="submit" className="submit-btn">Add Care Request</button>
            </div>
      </form>
    </div>
  );
}

export default AddCareRequest