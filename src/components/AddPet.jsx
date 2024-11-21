import { useState } from "react";
import axiosInstance from "../api/axios";

const API_URL = "http://localhost:5005";

function AddPet() {
    const [name, setName] = useState("");
    const [typeOfAnimal, setTypeOfAnimal] = useState("");
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState("");
    const [description, setDescription] = useState("");
    const [specialCares, setSpecialCares] = useState("");
    const [pet_picture, setPet_picture] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();

        const storedToken = localStorage.getItem("token"); // Fetch the token from localStorage
        if (!storedToken) {
            console.log("No token found");
            return; // Handle case where token is missing
        }

        const requestBody = { name, typeOfAnimal, breed, age, description, specialCares, pet_picture };

        axiosInstance
            .post(`${API_URL}/api/pets`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                setName("");
                setTypeOfAnimal("");
                setBreed("");
                setAge("");
                setDescription("");
                setSpecialCares("");
                setPet_picture("")
            })
            .catch((error) => console.log(error))
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
                    <input
                        type="text"
                        id="typeOfAnimal"
                        value={typeOfAnimal}
                        onChange={(e) => setTypeOfAnimal(e.target.value)}
                        required
                    />
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
                        onChange={(e) => setAge(e.target.value)}
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