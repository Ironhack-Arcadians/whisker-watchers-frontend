import { useState } from 'react';
import axiosInstance from "../../api/axios";
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:5005";

const SignupForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [location, setLocation] = useState("");
    const [bio, setBio] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    // Handlers for form fields
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleName = (e) => setName(e.target.value);
    const handlePhone = (e) => setPhone(e.target.value);
    const handleProfilePic = (e) => setProfilePic(e.target.value);
    const handleLocation = (e) => setLocation(e.target.value);
    const handleBio = (e) => setBio(e.target.value);
    
    // Submit handler
    const handleSignupSubmit = (e) => {
        e.preventDefault();

        const requestBody = {
            email,
            password,
            name,
            phone,
            profile_pic: profilePic,
            location,
            bio,
        };

        axiosInstance.post(`${API_URL}/auth/signup`, requestBody)
            .then((response) => {
                // Redirect to login after successful signup
                navigate('/');
            })
            .catch((error) => {
                const errorDescription = error.response?.data?.message;
                setErrorMessage(errorDescription || "An error occurred during signup.");
            });
    };

    return (
        <form onSubmit={handleSignupSubmit}>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={handleEmail} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={handlePassword} required />
            </div>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={handleName} required />
            </div>
            <div>
                <label>Phone:</label>
                <input type="text" value={phone} onChange={handlePhone} />
            </div>
            <div>
                <label>Profile Picture:</label>
                <input type="text" value={profilePic} onChange={handleProfilePic} />
            </div>
            <div>
                <label>Location:</label>
                <input type="text" value={location} onChange={handleLocation} />
            </div>
            <div>
                <label>Bio:</label>
                <textarea value={bio} onChange={handleBio}></textarea>
            </div>

            {errorMessage && <div>{errorMessage}</div>}

            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignupForm;