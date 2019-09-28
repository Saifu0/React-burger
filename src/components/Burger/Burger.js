import React from "react";
import "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  //Transforming object with key value pair into array
  let tranformedIngredient = Object.keys(props.ingredient)
    .map(igKey => {
      return [...Array(props.ingredient[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (tranformedIngredient.length === 0) {
    tranformedIngredient = <p> Please start adding ingredients </p>;
  }
  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {tranformedIngredient}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
