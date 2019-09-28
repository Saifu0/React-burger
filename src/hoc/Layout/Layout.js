import React, { Component } from "react";
import Aux from "../Aux/Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import "./Layout.css";

class Layout extends Component {
  state = {
    showSidebar: false
  };

  sideBarHandler = () => {
    this.setState({ showSidebar: false });
  };

  drawerClickedHandlers = () => {
    this.setState(prevState => {
      return { showSidebar: !prevState.showSidebar };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar drawerClickedHandler={this.drawerClickedHandlers} />
        <SideDrawer
          open={this.state.showSidebar}
          closed={this.sideBarHandler}
        />
        <main className="Content" style={{ marginTop: "72px" }}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

export default Layout;
