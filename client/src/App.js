import { Route, Link, Redirect, Switch } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <h1>Dog Tinder</h1>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
