import React, { useState } from "react";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Checks if email and password are provided, if not then displays an error message
        const newErrors = {};
        if(!email) {newErrors.email = "Email is required"};
        if(!password) {newErrors.password = "Password is required"};
        setErrors(newErrors);

        if (object.keys(newErrors).length === 0) {
            console.log({ email, password });
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