import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route
} from "react-router-dom";

import Login from "./components/Login";
import Signout from "./components/Signout";
import Home from "./components/Home";
import { openRequest } from "./utils/http";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (email && token && token.length > 9) {
      // i.e. token is not "undefined" or "null"
      setEmail(email);
      setLoggedIn(true);
    } else {
      localStorage.clear();
    }
  }, []);

  const login = (body, callback) => {
    openRequest("/users/auth/login", "POST", body)
      .then(res => {
        if (res && res.status === 200) {
          const { token, email } = res.data;
          localStorage.setItem("token", token);
          localStorage.setItem("email", email);
          setLoggedIn(true);
          setEmail(email);
          callback(true, null);
        } else {
          const { message } = res.data;
          localStorage.clear();
          setLoggedIn(false);
          setEmail("");
          callback(false, message);
        }
      })
      .catch(() => {
        console.log("An error occurred.");
      });
  };

  const clearState = () => {
    setLoggedIn(false);
    setEmail("");
  };

  return (
    <Router>
      <div className="header-outer">
        <div className="header">
          <h1>My App</h1>
          {loggedIn ? (
            <div className="user-signout">
              <Signout clearState={clearState} />
              <p>{email}</p>
            </div>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </div>
      </div>
      <div className="main-outer">
        <div className="main">
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Home {...props} loggedIn={loggedIn} clearState={clearState} />
              )}
            />
            <Route
              exact
              path="/login"
              render={props => (
                <Login {...props} loggedIn={loggedIn} login={login} />
              )}
            />
          </Switch>
        </div>
      </div>
      <div className="footer-outer">
        <div className="footer">
          <div>Footer info left</div>
          <div>Footer info right</div>
        </div>
      </div>
    </Router>
  );
}

export default App;
