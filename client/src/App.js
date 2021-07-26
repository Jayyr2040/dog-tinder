import { Route, Link, Redirect, Switch } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  return (
    <div>
      <h1>Dog Tinder</h1>
      <Link to="/register">Register</Link>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
