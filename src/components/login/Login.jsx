import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { AuthContext } from "../../context/auth.context";

const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { storeToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();



  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    const newErrors = {};

    // Validate fields
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);

    // Only submit if no errors
    if (Object.keys(newErrors).length === 0) {
      axiosInstance.post('/auth/login', { email, password })
        .then(response => {
          const token = response.data.authToken;

          // Store token securely (localStorage or cookies)
          storeToken(token);
          console.log("Token stored:", token);

          // Set user data
          setUser(response.data);

          const role = response.data.role;

          if (role === "owner") {
            navigate("/dashboard/owner"); // Navigate to the owner's dashboard
          } else if (role === "sitter") {
            navigate("/dashboard/sitter"); // Navigate to the sitter's dashboard
          } else {
            console.error("Invalid role detected");
            setErrors(prevErrors => ({
              ...prevErrors,
              general: "Invalid credentials or an error occurred."
            }));
          }

          // Closes popup after successful login
          onClose();
        })
        .catch(error => {
          console.error("Login failed", error.response?.data?.message || error.message);
          setErrors(prevErrors => ({
            ...prevErrors,
            general: "Invalid credentials or an error occurred."
          }));
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <span>{errors.password}</span>}
      </div>

      {errors.general && <div className="error-message">{errors.general}</div>}

      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginForm;