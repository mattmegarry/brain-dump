import React from "react";

import Snippets from "./Snippets";

const Home = props => {
  const { loggedIn, clearState } = props;
  return loggedIn ? (
    <Snippets clearState={clearState} />
  ) : (
    <div className="info">
      <p>WELCOME to the Hompage</p>
    </div>
  );
};

export default Home;
