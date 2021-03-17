/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const NavBar = (props) => {
  console.log("Navbar render");

  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Number of
        <span className="font-weight-bold n1"> grades </span>to buy:{" "}
        <span className="badge badge-pill badge-secondary ml-1 mr-3">
          {props.totalCounters}
        </span>
        <div className="w-100 my-1"></div>Number of
        <span className="font-weight-bold n2">{"  "} products </span>
        to buy:{" "}
        <span className="badge badge-pill badge-primary ml-1">
          {props.onSumup}
        </span>
        <div className="w-100 my-1"></div>
        <span className="font-weight-bold total-price n3">Total price: </span>
        <span className="badge badge-pill badge-success ml-1 py-2">
          ${props.onPrice}
        </span>
      </a>
    </nav>
  );
};

export default NavBar;
