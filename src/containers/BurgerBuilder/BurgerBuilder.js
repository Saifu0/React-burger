import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Model";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios_order";
import Spinner from "../../components/UI/Spinnner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredient: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null
  };

  componentDidMount() {
    axios
      .get("https://react-burger-45c63.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({ ingredient: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  updatePurchaseState(ingredient) {
    const sum = Object.keys(ingredient)
      .map(igkey => {
        return ingredient[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredient[type];
    const updatedCount = oldCount + 1;

    const updatedIngredients = {
      ...this.state.ingredient
    };
    updatedIngredients[type] = updatedCount;
    const itemPrice = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + itemPrice;
    this.setState({ totalPrice: newPrice, ingredient: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredient[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;

    const updatedIngredients = {
      ...this.state.ingredient
    };
    updatedIngredients[type] = updatedCount;
    const itemPrice = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - itemPrice;
    this.setState({ totalPrice: newPrice, ingredient: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  puchaseContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredient: this.state.ingredient,
      price: this.state.totalPrice,
      customer: {
        name: "Saifur Rahman Khan",
        address: { street: "TestArea 05", zipCode: "5691", country: "Germany" },
        email: "saif@gmail.com"
      },
      deliveryMethod: "slowest"
    };
    axios
      .post("/order.json", order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredient
    };
    for (var key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    let burger = this.state.error ? (
      <p>Ingredient's cann't get loaded!</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredient) {
      burger = (
        <Aux>
          <Burger ingredient={this.state.ingredient} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredient={this.state.ingredient}
          purchased={this.puchaseContinueHandler}
          price={this.state.totalPrice}
          purchaseCancel={this.purchaseCancelHandler}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
