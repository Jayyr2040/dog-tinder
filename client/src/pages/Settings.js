import React from "react";
import AccountSettings from "../components/home/AccountSettings";

const Settings = (props) => {
  return (
    <div>
      <AccountSettings currentUser={props.currentUser} currentUserDog={props.currentUserDog} />
    </div>
  );
};

export default Settings;
