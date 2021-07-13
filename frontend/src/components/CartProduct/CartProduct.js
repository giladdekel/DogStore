import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../actions/cartActions";

import { Alert, Button, Modal } from "react-bootstrap";

import "./CartProduct.scss";
import { removeFromCart } from "../../actions/cartActions";
// import Rating from "./../Rating";

const CartProduct = (props) => {
  const { item } = props;
  // console.log("item :", item);

  //////cart

  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    // delete action

    setDisplayRemoveMessage(true);
    setTimeout(() => {
      setDisplayRemoveMessage(false);

      dispatch(removeFromCart(id));
    }, 4000);
  };

  // cart
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  let amountInCart = 0;
  let itemsInCart = 1;

  const existItem = cartItems.find((x) => x.product === item.product);
  if (existItem) {
    // console.log("existItem :", existItem.qty);
    amountInCart = existItem.qty;

    itemsInCart = existItem.qty;
  }

  const [displayRemoveMessage, setDisplayRemoveMessage] = useState(false);
  const [displayInfo, setDisplayInfo] = useState(true);
  const [displayMessage, setDisplayMessage] = useState(false);

  const [qty, setQty] = useState(amountInCart);

  const [itemQty, setItemQty] = useState(itemsInCart);

  const [qtyChange, setQtyChange] = useState(false);

  //// add to cart button

  const [buttonClicked, setButtonClicked] = useState(false);

  return (
    <tr key={item.product}>
      <td>
        <div className="product-item">
          <a className="product-thumb" href="#">
            {" "}
            <Link to={`/product/${item.product}`}>
              <img src={item.image} alt={item.name} />{" "}
            </Link>
          </a>

          <div className="product-info">
            <Link to={`/product/${item.product}`}>
              <h4 className="product-title">
                <a href="#">{item.name}</a>
              </h4>{" "}
            </Link>

            {/* <span>
                                <em>Size:</em> 10.5
                              </span>
                              <span>
                                <em>Color:</em> Dark Blue
                              </span> */}
          </div>
        </div>
      </td>
      <td className="text-center">
        <div className="count-input">
          {qty === 0 ? (
            <>
              <select
                className="form-control"
                value={1}
                onChange={(e) => {
                  setQtyChange(true);

                  setQty(e.target.value);
                }}
              >
                {[...Array(item.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <>
              <select
                className="form-control"
                value={qty}
                onChange={(e) => {
                  setQtyChange(true);

                  setQty(e.target.value);
                }}
              >
                {[...Array(item.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      </td>
      <td className="text-center text-lg text-medium">${item.price}</td>
      <td className="text-center text-lg text-medium add-to-cart-area">
        {/* <div className=" col-xs-2 buttons cart-button-animation">
          {buttonClicked ? (
            <button
              className="cart-button clicked "
              onClick={() => {
                setButtonClicked(true);
                setItemQty(qty);
                setItemInCart(true);
                dispatch(addToCart(item.product, qty));
              }}
            >
              <span className="add-to-cart ">Add to Cart</span>
              <span className="added ">add</span>
              <i className="fa fa-shopping-cart " />{" "}
              <i className="fa fa-square " />
            </button>
          ) : (
            <button
              className="cart-button "
              onClick={() => {
                setButtonClicked(true);
                setItemQty(qty);
                setItemInCart(true);

                dispatch(addToCart(item.product, qty));
              }}
            >
              <span className="add-to-cart ">Add to Cart</span>
              <span className="added ">add</span>
              <i className="fa fa-shopping-cart " />
              <i className="fa fa-square " />
            </button>
          )}
        </div> */}
        {(qty > 0 && !qtyChange) || (!qtyChange && buttonClicked) ? (
          <div className=" col-xs-2 center animation-cart-2">
            <div className="buttons d-flex flex-row">
              <div className="cart">
                <i className="fa fa-shopping-cart" />
              </div>
              <button
                onClick={() => {
                  dispatch(addToCart(item.product, qty));

                  setButtonClicked(true);
                  setDisplayMessage(true);
                  setDisplayInfo(false);
                  setItemQty(qty);
                  setQtyChange(false);

                  setTimeout(() => {
                    setDisplayMessage(false);
                    setDisplayInfo(true);
                  }, 4000);
                }}
                className="btn btn-success cart-button px-5 clicked animated-btn-2 btn-blue"
              >
                {qtyChange && (
                  <>
                    <span className="dot">{qty} </span>
                    Update Cart
                  </>
                )}
                {!qtyChange &&
                  (qty > 0 ? (
                    <>
                      <span className="dot">{qty} </span>
                      {qty} Items In Your Cart Now
                    </>
                  ) : (
                    <>
                      <span className="dot">{qty} </span>
                      Add Item To Cart
                    </>
                  ))}
              </button>
            </div>
          </div>
        ) : (
          <div className=" col-xs-2 center animation-cart-2">
            <div className="buttons d-flex flex-row">
              <div className="cart">
                <i className="fa fa-shopping-cart" />
              </div>
              <button
                onClick={() => {
                  setButtonClicked(true);
                  setItemQty(qty);
                  dispatch(addToCart(item.product, qty));
                  setDisplayMessage(true);
                  setDisplayInfo(false);
                  setQtyChange(false);
                  setTimeout(() => {
                    setDisplayMessage(false);
                    setDisplayInfo(true);
                  }, 4000);
                }}
                className="btn btn-primary cart-button px-5 animated-btn-2 btn-blue-add "
              >
                {qtyChange && (
                  <>
                    <span className="dot">{qty} </span>
                    Update Cart
                  </>
                )}
                {!qtyChange &&
                  (qty > 0 ? (
                    <>
                      <span className="dot">{qty} </span>
                      {qty} Items In Your Cart
                    </>
                  ) : (
                    <>
                      <span className="dot">{qty} </span>
                      Add Item To Cart
                    </>
                  ))}
              </button>
            </div>
          </div>
        )}
        {/* 
        {itemInCart && (
          <Alert variant="info">
            you have {itemQty} items of this product in the cart
          </Alert>
        )} */}
        {displayRemoveMessage && (
          <Alert variant="warning">
            the product is being removed from your cart
          </Alert>
        )}
        {displayMessage && (
          <Alert variant="success"> {qty} items are at your Cart now</Alert>
        )}
        {qtyChange && displayInfo && (
          <Alert variant="info">
            click the button to update the amount to {qty} items
          </Alert>
        )}
      </td>
      <td className="text-center">
        <a
          onClick={() => removeFromCartHandler(item.product)}
          className="remove-from-cart"
          data-toggle="tooltip"
          title
          data-original-title="Remove item"
        >
          <i className="fa fa-trash" />
        </a>
      </td>
    </tr>
  );
};

export default CartProduct;
