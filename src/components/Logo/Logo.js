import React from "react";
import logoImage from "../../assests/images/logo.png";
import "./Logo.css";

const logo = props => (
  <div className="Logo">
    <img className="image" src={logoImage} alt="My burger" />
  </div>
);

export default logo;
