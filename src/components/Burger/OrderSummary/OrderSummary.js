import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  render() {
    const ingrdientSummary = Object.keys(this.props.ingredient).map(igkey => {
      return (
        <li>
          <span style={{ textTransform: "capitalize" }}>{igkey}</span>:{" "}
          {this.props.ingredient[igkey]}
        </li>
      );
    });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicios burger with following ingrdients: </p>
        <ul>{ingrdientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancel}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchased}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
