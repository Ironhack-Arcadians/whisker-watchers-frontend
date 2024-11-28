import { useState, useEffect } from "react";
import axiosInstance from "../api/axios";

function AddPet({ onNewPetAdded }) {
    const [name, setName] = useState("");
    const [typeOfAnimal, setTypeOfAnimal] = useState("");
    const [animalTypes, setAnimalTypes] = useState([]);
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState("");
    const [description, setDescription] = useState("");
    const [specialCares, setSpecialCares] = useState("");
    const [pet_picture, setPet_picture] = useState("");

    useEffect(() => {
        // Fetch available animal types dynamically
        axiosInstance
            .get("/api/animal-types")
            .then((response) => {
                setAnimalTypes(response.data.data || []); // Ensure valid data
            })
            .catch((error) => console.error("Error fetching animal types:", error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedToken = localStorage.getItem("authToken");
        if (!storedToken) {
            alert("You must be logged in to add a pet.");
            return;
        }

        const requestBody = { name, typeOfAnimal, breed, age, description, specialCares, pet_picture };

        axiosInstance
            .post("/api/pets", requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                onNewPetAdded(response.data);
                setName("");
                setTypeOfAnimal("");
                setBreed("");
                setAge("");
                setDescription("");
                setSpecialCares("");
                setPet_picture("");
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="add-pet-container">
            <h2 className="add-pet-title">Add New Pet</h2>
            <form onSubmit={handleSubmit} className="add-pet-form">
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input
                        type="text"
                        id="name"
                        className="form-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="typeOfAnimal" className="form-label">Type of Animal:</label>
                    <select
                        id="typeOfAnimal"
                        className="form-select"
                        value={typeOfAnimal}
                        onChange={(e) => setTypeOfAnimal(e.target.value)}
                        required
                    >
                        <option value="">Select Animal Type</option>
                        {animalTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="breed" className="form-label">Breed:</label>
                    <input
                        type="text"
                        id="breed"
                        className="form-input"
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="age" className="form-label">Age:</label>
                    <input
                        type="number"
                        id="age"
                        className="form-input"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea
                        id="description"
                        className="form-textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="specialCares" className="form-label">Special Cares:</label>
                    <textarea
                        id="specialCares"
                        className="form-textarea"
                        value={specialCares}
                        onChange={(e) => setSpecialCares(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="pet_picture" className="form-label">Pet Picture URL:</label>
                    <input
                        type="text"
                        id="pet_picture"
                        className="form-input"
                        value={pet_picture}
                        onChange={(e) => setPet_picture(e.target.value)}
                    />
                </div>

                <button type="submit">Add Pet</button>
            </form>
        </div>
    );
}

export default AddPet;