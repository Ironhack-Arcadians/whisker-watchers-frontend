import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axios";
import { useNavigate } from "react-router-dom";
import AddPet from "../../components/AddPet";
import "./PetListPage.css";

function PetListPage() {
    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch pets owned by the logged-in user
        const fetchPets = async () => {
            try {
                const response = await axiosInstance.get(`/api/pets`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });
                setPets(response.data.data);
            } catch (error) {
                console.error("Error fetching pets:", error);
                setError("Failed to load your pets.");
            }
        };
        fetchPets();
    }, []);

    const handleNewPet = (newPet) => {
        // Add a newly created pet to the list
        setPets((prevPets) => [...prevPets, newPet]);
    };

    return (
        <div>
            <button className="care-back-button" onClick={() => navigate(-1)}>
                &larr; Back to Dashboard
            </button>
            <div className="dashboard">
                <h1>Your Pet Dashboard</h1>
                <p>Manage your pets and keep track of their details here.</p>

                {/* Form to add a new pet */}
                <div className="add-pet-section">
                    <AddPet onNewPetAdded={handleNewPet} />
                </div>

                {/* Pet List */}
                <div className="pet-list-section">
                    <h2>Your Pets</h2>
                    <div className="pet-list">
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        {pets.length > 0 ? (
                            pets.map((pet) => (
                                <div
                                    key={pet._id}
                                    className="pet-card"
                                >
                                    {/* Pet picture and name */}
                                    {pet.pet_picture ? (
                                        <img
                                            src={pet.pet_picture}
                                            alt={`${pet.name}`}
                                            className="pet-avatar"
                                        />
                                    ) : (
                                        <div className="placeholder-avatar">No Image</div>
                                    )}
                                    <h3>{pet.name}</h3>

                                    {/* Action Buttons */}
                                    <div className="action-buttons">
                                        <button className="details-btn">More Details</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No pets added yet. Start by adding one!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PetListPage;