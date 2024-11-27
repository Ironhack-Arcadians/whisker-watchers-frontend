import { useState, useEffect } from "react";
import axiosInstance from "../api/axios";

function AddPet() {
    const [name, setName] = useState("");
    const [typeOfAnimal, setTypeOfAnimal] = useState("");
    const [animalTypes, setAnimalTypes] = useState([]); // Holds the animal types (e.g., "Dog", "Cat")
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState("");
    const [description, setDescription] = useState("");
    const [specialCares, setSpecialCares] = useState("");
    const [pet_picture, setPet_picture] = useState("");
    const [loading, setLoading] = useState(true); // For handling loading state

    useEffect(() => {
        // Fetch available animal types dynamically
        axiosInstance
            .get("/api/animal-types") 
            .then((response) => {
                setAnimalTypes(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error fetching animal types:", error);
                setLoading(false);
            });
    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const storedToken = localStorage.getItem("authToken"); // Fetch the token from localStorage
        if (!storedToken) {
            console.log("No token found");
            alert("You must be logged in to add a pet."); // -> for debugging
            return; // Handle case where token is missing
        }

        const requestBody = { name, typeOfAnimal, breed, age, description, specialCares, pet_picture };

        axiosInstance
            .post('/api/pets', requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                // Clear form fields after successful submission
                setName("");
                setTypeOfAnimal("");
                setBreed("");
                setAge("");
                setDescription("");
                setSpecialCares("");
                setPet_picture("");
            })
            .catch((error) => console.log(error));
    };

    return (
        <div>
            <h2>Add New Pet</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="typeOfAnimal">Type of Animal:</label>
                    <select
                        id="typeOfAnimal"
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

                <div>
                    <label htmlFor="breed">Breed:</label>
                    <input
                        type="text"
                        id="breed"
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="specialCares">Special Cares:</label>
                    <textarea
                        id="specialCares"
                        value={specialCares}
                        onChange={(e) => setSpecialCares(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="pet_picture">Pet Picture URL:</label>
                    <input
                        type="text"
                        id="pet_picture"
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
