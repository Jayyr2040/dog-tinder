import { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Browse from "./pages/Browse";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Matches from "./pages/Matches";
import NavBar from "./components/home/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import "./App.css";
import Footer from "./components/home/Footer";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FF9B01",
    },
    secondary: {
      main: "#d4524d",
    },
  },
  typography: {
    fontFamily: "Poppins",
    fontWeightLight: 100,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

const useStyles = makeStyles((theme) => ({
  toolbar: {
    marginTop: 70,
  },
}));

function App() {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState();
  const [loggedInStatus, setLoggedInStatus] = useState(false);
  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/sessions/check", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("check useEffect server response", data);
      if (data.currentUser === undefined) {
        setLoggedInStatus(false);
      } else {
        setCurrentUser(data.currentUser);
        setLoggedInStatus(true);
      }
    };
    fetchSession();
  }, []);

  const loggedInUserData = (userData) => {
    console.log("loggedInUserData", userData);
    setCurrentUser(userData);
    setLoggedInStatus(true);
  };

  return (
    <div className={classes.toolbar}>
      <ThemeProvider theme={theme}>
        {loggedInStatus && <NavBar currentUser={currentUser} />}
        <Container maxWidth="md">
          <Switch>
            <Route exact path="/">
              {loggedInStatus ? (
                <Redirect to="/browse" />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/register">
              <Register />
              {loggedInStatus && <Redirect to="/browse" />}
            </Route>
            <Route path="/login">
              <Login loggedInUserData={loggedInUserData} />
              {loggedInStatus && <Redirect to="/browse" />}
            </Route>
            <Route path="/browse">
              {loggedInStatus ? <Browse /> : <Redirect to="/login" />}
            </Route>
            <Route path="/matches">
              {loggedInStatus ? <Matches /> : <Redirect to="/login" />}
            </Route>
            <Redirect to="/" />
          </Switch>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
