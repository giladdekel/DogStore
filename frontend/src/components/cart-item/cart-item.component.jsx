import React from "react";
import { Link } from "react-router-dom";

import "./cart-item.styles.scss";

const CartItem = (props) => (
  <Link className="cart-item-link" to={`/product/${props.cartItem.product}`}>
    <div className="cart-item">
      <img src={props.cartItem.image} alt="item" />

      <div className="item-details">
        {" "}
        <span className="name">{props.cartItem.name}</span>
        <span className="price">
          {props.cartItem.qty} x ${props.cartItem.price}
        </span>
      </div>
    </div>{" "}
  </Link>
);

export default CartItem;
