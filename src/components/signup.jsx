import React, { useState } from "react";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        role: '',
        phone: '',
        profile_pic: '',
        location: '',
        bio: '',
      });

      const [errors, setErrors] = useState({});

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };

      // Checks if fields are filled, if not then displays an error message
      const validateForm = () => {
        const newErrors = {};
        if(!formData.email) {newErrors.email = 'Email is required'};
        if(!formData.password) {newErrors.password = 'Password is required'};
        if(!formData.name) {newErrors.name = 'Name is required'};
        if(!formData.role) {newErrors.role = 'Role is required'};
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if(validateForm()) {
            console.log('Form submitted successfully:', formData);
            // Add in any additional form features such as toast
        }
      };

      return (
        <form onSubmit={handleSubmit} className="signup-form">
            <div>
                <label>Email</label>
                <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required 
                />
                {errors.email && <span>{errors.email}</span>}
            </div>

            <div>
                <label>Password</label>
                <input 
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required 
                />
                {errors.password && <span>{errors.password}</span>}
            </div>

            <div>
                <label>Name</label>
                <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required 
                />
                {errors.name && <span>{errors.name}</span>}
            </div>

            <div>
                <label>Role</label>
                <div>
                    <label>
                    <input
                    type="radio"
                    name="role"
                    value="owner"
                    checked={formData.role === 'owner'}
                    onChange={handleChange}
                    required
                    />
                    Owner
                    </label>
                    
                    <label>
                    <input
                    type="radio"
                    name="role"
                    value="sitter"
                    checked={formData.role === 'sitter'}
                    onChange={handleChange}
                    required
                    />
                    Sitter
                    </label>
                </div>
                {errors.role && <span>{errors.role}</span>}
            </div>

            <div>
                <label>Phone</label>
                <input 
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                />
            </div>

            <div>
                <label>Profile Picture</label>
                <input 
                type="url"
                name="profile_pic"
                value={formData.profile_pic}
                onChange={handleChange}
                />
            </div>

            <div>
                <label>Location</label>
                <input 
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                />
            </div>

            <div>
                <label>Bio</label>
                <input 
                type="text"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                />
            </div>

            <button type="submit">Sign Up</button>
        </form>
      );
};

export default SignupForm