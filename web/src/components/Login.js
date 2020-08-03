import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const Login = props => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
    }

    const body = {
      email,
      password
    };

    props.login(body, (success, message) => {
      if (success) {
        setRedirectToReferrer(true);
      } else {
        setMessage(message);
      }
    });
  };

  let { from } = props.location.state || { from: { pathname: "/" } };

  if (redirectToReferrer) return <Redirect to={from} />;

  return (
    <fieldset className="signup-fieldset">
      <legend>Login</legend>
      <form className="signup-form" onSubmit={event => handleSubmit(event)}>
        <input
          type="text"
          name="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          placeholder="Password"
        />
        <input type="submit" value="Submit" />
      </form>
      <p>{message}</p>
    </fieldset>
  );
};

export default Login;
