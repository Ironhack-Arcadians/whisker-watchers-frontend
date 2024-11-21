import {Link} from "react-router-dom"
import { useContext } from "react";
// Auth ->

function Navbar() {
    // -> isLoggedIn?


    //We have to add here, conditional rendering for logged users/ type of user
    //with a logout button
    //and not logged in users

return (
    <nav>
        <Link to="/">
            <button>Home</button>
        </Link>
        <>
          <Link to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
        </>
    </nav>
)
}

export default Navbar;