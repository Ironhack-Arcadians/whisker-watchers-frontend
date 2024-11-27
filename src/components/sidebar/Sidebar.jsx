import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Sidebar.css';
import AddPet from "../AddPet"
import { AuthContext } from "../../context/auth.context";

function Sidebar({ handleLogout }) {
    const { user } = useContext(AuthContext);
    const [showPetModal, setShowPetModal] = useState(false); // State for pet modal visibility
    const navigate = useNavigate();

    //AddPet modal

    const handleOpenPetModal = () => {
        setShowPetModal(true);
    };

    const handleClosePetModal = () => {
        setShowPetModal(false);
    };


    const handleLogoutAndRedirect = () => {
        handleLogout();  // Call your logout function
        navigate("/");    // Redirect to the homepage
    };

    return (
        <div className="sidebar">

            <div className="top-buttons">
                <button>My Pets</button>
                {/* Conditionally render buttons based on user role */}
                {user?.role === "owner" && (
                    <>
                        <Link to="/my-care-requests">
                            <button>My Care Requests</button>
                        </Link>
                        <div className="add-pet-button">
                            <button onClick={handleOpenPetModal}>+ Add a Pet</button>
                        </div>
                    </>
                )}
                <Link to={`/profile/${user}`}>
                    <button>Profile</button>
                </Link>
                <button onClick={handleLogoutAndRedirect}>Logout</button>
            </div>
            {/* Modal to display the AddPet form */}
            {showPetModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal" onClick={handleClosePetModal}>X</button>
                        <AddPet />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;