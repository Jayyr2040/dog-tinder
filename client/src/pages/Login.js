import NewSessions from "../components/NewSessions";

function Login(props) {
  return (
    <div>
      <NewSessions
        loggedInUserData={(userData) => props.loggedInUserData(userData)}
      />
    </div>
  );
}

export default Login;
