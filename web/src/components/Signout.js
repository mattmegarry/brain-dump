import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { openRequest } from "../utils/http";

const Signout = props => {
  const [signoutSuccess, setSignoutSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const handleClick = async event => {
    event.preventDefault();
    localStorage.clear();

    try {
      const res = await openRequest("/users/auth/signout", "POST");
      console.log(res.status);
      if (res.status === 200) {
        setSignoutSuccess(true);
        props.clearState();
      } else {
        setMessage("Signout failed. Please check your internet connection.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return signoutSuccess ? (
    <Redirect to="/" />
  ) : (
    <>
      <div className="signout">
        <button onClick={handleClick}>Signout</button>
      </div>
      <p className="signout-message">{message}</p>
    </>
  );
};

export default Signout;
