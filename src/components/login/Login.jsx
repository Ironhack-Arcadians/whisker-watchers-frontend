import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { AuthContext } from "../../context/auth.context";

const LoginForm = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const { storeToken } = useContext(AuthContext);

    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Validation to check if email and password are provided
      const newErrors = {};
      if(!email) { newErrors.email = "Email is required"; }
      if(!password) { newErrors.password = "Password is required"; }
      setErrors(newErrors);
  
      if (Object.keys(newErrors).length === 0) {
          // Proceed with the login request to the backend
          axiosInstance.post('/auth/login', { email, password })
              .then(response => {
                  const token = response.data.authToken;
                  
                  // If login is successful, store the JWT token (here in localStorage, you can store it in HTTP-only cookies instead)
                  storeToken(token);
                  console.log("Token stored:", token);
                  // Optionally, you can set the user data in your state to update the UI
                  const role = response.data.role;

                  // Redirect based on role
                  if (role === "owner") {
                    navigate("/dashboard/owner"); // Redirect to the owner dashboard
                  } else if (role === "sitter") {
                    navigate("/dashboard/sitter"); // Redirect to the sitter dashboard
                  } else {
                    setError("Invalid role");
                  }
              })
              .catch(error => {
                  // Handle login failure, for example, incorrect credentials
                  console.error("Login failed", error.response?.data?.message || error.message);
                  // Optionally, set errors here or show a toast/notification
                  setErrors({ general: "Invalid credentials or error occurred." });
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
      
      <button type="submit">Log In</button>
    </form>
    );
};

export default LoginForm