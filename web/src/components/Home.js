import React from "react";

import TextSnippets from "./TextSnippets";

const Home = props => {
  const { loggedIn, clearState } = props;
  return loggedIn ? (
    <TextSnippets clearState={clearState} />
  ) : (
    <div className="info">
      <p>WELCOME to the Hompage</p>
    </div>
  );
};

export default Home;
