import React from "react";
import "./NavigationItems.css";
import NavigationItem from "../NavigationItem/NavigationItem";

const navigationItems = () => (
  <ul className="NavigationItems">
    <NavigationItem link="/" active>
      Burger
    </NavigationItem>
    <NavigationItem link="/">Burger Builder</NavigationItem>
  </ul>
);

export default navigationItems;
