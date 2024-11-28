import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsPrivate({ children, requiredRole }) {
  const { user, isLoggedIn, isLoading } = useContext(AuthContext);

  // If the authentication is still loading
  if (isLoading) return <p>Loading ...</p>;

  if (!user) {
    return <Navigate to="/" />;
  }else if (user.role!==requiredRole){
    return <Navigate to="/dashboard/owner"/>
  } else if (user.role !== requiredRole) {
    return <Navigate to={`/dashboard/${user.role}`} />;
  }
  // If the user is logged in, allow to see the page
  else return children;
}

export default IsPrivate;
