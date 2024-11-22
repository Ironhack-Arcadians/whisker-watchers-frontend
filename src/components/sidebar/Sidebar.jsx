import './Sidebar.css';

function Sidebar({handleLogout}) {
    
    return (
        <div className="sidebar">
            <h1>Sidebar</h1>
            <div className="top-buttons">
                <button>My Care Requests</button>
                <button>My Pets</button>
                <button>Profile</button>
            </div>
            <div className="bottom-button">
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default Sidebar;