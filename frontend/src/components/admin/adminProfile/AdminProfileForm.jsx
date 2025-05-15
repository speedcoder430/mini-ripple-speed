import React from "react";
import Tabs from "./Tabs";
import ProfileDetails from "./ProfileDetails";

function AdminProfileForm() {
    return (
        <div className="flex-1 mb-8">
            <Tabs />
            <ProfileDetails />
        </div>
    );
}

export default AdminProfileForm;
