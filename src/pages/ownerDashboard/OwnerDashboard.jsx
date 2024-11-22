import React from "react";
import AddPet from '../../components/AddPet';
import AddCareRequest from "../../components/AddCareRequest";

function OwnerDashboard() {
    return(
        <div>
            <h1>Welcome fellow pet parent!</h1>
            <p>Lorum ipsum lorum ipsum</p>
            <AddPet />
            <AddCareRequest />
        </div>
    )
}

export default OwnerDashboard;