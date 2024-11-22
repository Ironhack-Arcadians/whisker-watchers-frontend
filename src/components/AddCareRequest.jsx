import { useState, useEffect } from "react";
import axiosInstance from "../api/axios";

function AddCareRequest() {
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

    if (!startDate || !endDate || !pet) {
      setError("All fields are required.");
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

    const requestBody = { startDate, endDate, pet, comment };

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

  // Provides a real-time notification to user if they choose an invalid end date
  const handleEndDateChange = (e) => {
    const selectedEndDate = e.target.value;

    if (new Date(selectedEndDate) <= new Date(startDate)) {
      setError("End date and time must be after the start date and time.");
    } else {
      setError("");
    }

    setEndDate(selectedEndDate);
  };
  return (
    <div>
      <h2>Add New Care Request</h2>
      <form onSubmit={handleSubmit}>
        <div>
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

        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="datetime-local"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
            min={startDate} // Prevents selecting a time before the starting date
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div>
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

        <div>
          <label htmlFor="comment">Comment:</label>
          <input
            type="text"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Care Request</button>
      </form>
    </div>
  );
}

export default AddCareRequest;
