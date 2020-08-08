import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { openRequest } from "../utils/http";

const Nav = () => {
  return (
    <>
      <NavLink to="/snippets" activeClassName="selected-nav">
        Snippets
      </NavLink>
      <NavLink to="/collections" activeClassName="selected-nav">
        Collections
      </NavLink>
    </>
  );
};

export default Nav;
