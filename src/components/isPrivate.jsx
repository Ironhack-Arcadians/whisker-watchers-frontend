import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsPrivate( { children, requiredRole } ) {
  
  const { user, isLoggedIn, isLoading } = useContext(AuthContext);

  // If the authentication is still loading 
  if (isLoading) return <p>Loading ...</p>;

  if (!isLoggedIn) {
  // If the user is not logged in 
    return <Navigate to="/login" />;
  }

  if(!user) {
    return <Navigate to="/"/>
  }
  
  if ((requiredRole && user.role !== requiredRole)) {
    return <Navigate to={`/dashboard/${user?.role || 'default'}`} />;
  }
   
  // If the user is logged in, allow to see the page 
    return children;
}

export default IsPrivate;