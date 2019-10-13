import React from "react";
import "./Order.css";

const order = props => {
  const ingredient = [];
  for (let ingredientName in props.ingredient) {
    ingredient.push({
      name: ingredientName,
      amount: props.ingredient[ingredientName]
    });
  }

  const ingredientOutput = ingredient.map(ig => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: "capitalize",
          display: "inline-blocks",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px"
        }}
      >
        {ig.name}({ig.amount})
      </span>
    );
  });

  return (
    <div className="Order">
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};
export default order;
