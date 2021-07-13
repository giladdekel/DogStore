import React from "react";

import { withRouter } from "react-router";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { toggleCartHidden } from "./../../actions/cartActions";

const CartDropdown = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;

  const dispatch = useDispatch();

  const toggleCartHandler = () => {
    dispatch(toggleCartHidden());
  };

  return (
    <div className="cart-dropdown" onClick={toggleCartHandler}>
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <span className="empty-message"> your cart is empty</span>
        )}
      </div>
      {cartItems.length ? (
        <CustomButton
          onClick={() => {
            history.push("/cart");
            // toggleHidden();
          }}
        >
          GO TO SHOPPING CART
        </CustomButton>
      ) : (
        <CustomButton
          onClick={() => {
            history.push(
              "/search/category/all/name/all/min/0/max/0/rating/0/order/newest/pageNumber/1"
            );
            // toggleHidden();
          }}
        >
          GO SHOPPING
        </CustomButton>
      )}
      {/* <CustomButton
        onClick={() => {
          history.push("/checkout");
          // toggleHidden();
        }}
      >
        CHECKOUT
      </CustomButton> */}
    </div>
  );
};

export default withRouter(CartDropdown);
