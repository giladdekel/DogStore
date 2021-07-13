import React, { useState } from "react";

import "./AnimatedButton.scss";

const [buttonClicked, setButtonClicked] = useState(false);

const AnimatedButton = () => (
  <>
    <div className="buttons cart-button-animation">
      {buttonClicked ? (
        <button
          className="cart-button clicked "
          onClick={() => setButtonClicked(true)}
        >
          <span className="add-to-cart ">Add to cart</span>
          <span className="added ">Item added</span>
          <i className="fa fa-shopping-cart " /> <i className="fa fa-square " />
        </button>
      ) : (
        <button className="cart-button " onClick={() => setButtonClicked(true)}>
          <span className="add-to-cart ">Add to cart</span>
          <span className="added ">Item added</span>
          <i className="fa fa-shopping-cart " /> <i className="fa fa-square " />
        </button>
      )}
    </div>
  </>
);

export default AnimatedButton;
