import React from "react";
import AddPet from './components/AddPet';

function OwnerDashboard() {
    return(
        <div>
            <h1>Welcome fellow pet parent!</h1>
            <p>Lorum ipsum lorum ipsum</p>
            <AddPet />
        </div>
    )
}

export default OwnerDashboard;