import { useState } from "react";
import NewSessions from "../components/NewSessions";
import "../App.css";

function Login() {

  const [currentData,setCurrentData] = useState();

  return (
    <div className="App">
        <NewSessions setCurrentData={setCurrentData} currentData={currentData}/>
    </div>
  );
}

export default Login;
