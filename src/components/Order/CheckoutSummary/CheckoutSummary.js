import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import "./CheckoutSummary.css";

const checkoutSummary = props => {
  return (
    <div className="CheckoutSummary">
      <h1>We hope it will taste well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredient={props.ingredient} />
      </div>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        Continue
      </Button>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        Cancel
      </Button>
    </div>
  );
};

export default checkoutSummary;
