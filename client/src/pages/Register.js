import { useState } from "react";
import CreateAccount from "../components/register/CreateAccount";
import UpdateProfile from "../components/register/UpdateProfile";
import AddDog from "../components/register/AddDog";
import "../App.css";

function Register() {
  const [userId, setUserId] = useState();
  const [showCreateAccount, setCreateAccount] = useState(true);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [showAddDog, setShowAddDog] = useState(false);

  const registerNewUser = (data) => {
    setUserId(data._id);
    setCreateAccount(false);
    setShowUpdateProfile(true);
    console.log("registerNewUser,", data._id);
  };

  const updateProfile = () => {
    setShowUpdateProfile(false);
    setShowAddDog(true);
    console.log("user", userId, "updated");
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
        <UpdateProfile updateProfile={updateProfile} userId={userId} />
      ) : (
        ""
      )}
      {showAddDog ? <AddDog addDog={addDog} userId={userId} /> : ""}
    </div>
  );
}

export default Register;
