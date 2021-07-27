import NewSessions from "../components/NewSessions";
import "../App.css";

function Login(props) {
  return (
    <div className="App">
      <NewSessions
        loggedInUserData={(userData) => props.loggedInUserData(userData)}
      />
    </div>
  );
}

export default Login;
