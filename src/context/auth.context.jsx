import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axios";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);


    const storeToken = (token) => {
        localStorage.setItem('authToken', token);
    }


    const authenticateUser = () => { 
        // Get the stored token from the localStorage
        const storedToken = localStorage.getItem('authToken');

        // If the token exists in the localStorage
        if (storedToken) {
            // We must send the JWT token in the request's "Authorization" Headers
            axiosInstance.get(
                '/auth/verify',
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
                .then((response) => {
                    // If the server verifies that the JWT token is valid  
                    const user = response.data;
                    // Update state variables        
                    setIsLoggedIn(true);
                    setUser(user);
                })
                .catch((error) => {
                    // If the server sends an error response (invalid token) 
                    // Update state variables         
                    setIsLoggedIn(false);
                    setUser(null);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            // If the token is not available (or is removed)
            setIsLoading(false);
            
        }
    }

    const removeToken = () => {
        localStorage.removeItem("authToken");
    }

    const logOutUser = () => {
        removeToken();
        authenticateUser();
        setUser(null);
    }


    useEffect(() => {                                   
        authenticateUser();
    }, []);


    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                isLoading,
                user,
                setUser,
                storeToken,
                authenticateUser,
                logOutUser,
            }}
        >
            {props.children}
        </AuthContext.Provider >
    )
}

export { AuthProviderWrapper, AuthContext };
