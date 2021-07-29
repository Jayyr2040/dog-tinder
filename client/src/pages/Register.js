import { useState } from "react";
import CreateAccount from "../components/register/CreateAccount";
import UpdateProfile from "../components/register/UpdateProfile";
import AddDog from "../components/register/AddDog";
import "../App.css";

function Register() {
  const [userData, setUserData] = useState();
  const [showCreateAccount, setCreateAccount] = useState(true);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [showAddDog, setShowAddDog] = useState(false);

  const registerNewUser = (data) => {
    setUserData(data);
    setCreateAccount(false);
    setShowUpdateProfile(true);
    console.log("registerNewUser,", data);
  };

  const updateProfile = () => {
    setShowUpdateProfile(false);
    setShowAddDog(true);
    console.log("user", userData, "updated");
  };

  const addDog = (dogData) => {
    setShowAddDog(false);
    console.log("dog", dogData.name, "created");
  };

  return (
    <div className="App">
      {showCreateAccount ? (
        <CreateAccount registerNewUser={registerNewUser} />
      ) : (
        ""
      )}
      {showUpdateProfile ? (
        <UpdateProfile updateProfile={updateProfile} userData={userData} />
      ) : (
        ""
      )}
      {showAddDog ? <AddDog addDog={addDog} userData={userData} /> : ""}
    </div>
  );
}

export default Register;
