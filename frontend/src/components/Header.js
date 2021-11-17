import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="text-center">
        <img
          src="https://image.shutterstock.com/shutterstock/photos/546937804/display_1500/stock-vector-hands-holding-heart-icon-illustration-isolated-vector-sign-symbol-546937804.jpg"
          width="100"
          className="img-thumbnail"
          style={{ marginTop: "20px" }}
        />
        <hr />
        <h5>
          <i>presents</i>
        </h5>
        <h1>Quality of Life Blog</h1>
      </div>
    );
  }
}

export default Header;