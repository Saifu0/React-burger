import React from "react";
import "./Button.css";

const button = props => {
  return (
    <div
      className={["Button", props.btnType].join(" ")}
      onClick={props.clicked}
    >
      {props.children}
    </div>
  );
};

export default button;
