import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../actions/cartActions";

import { Alert, Button, Modal } from "react-bootstrap";

import "./WishlistProduct.scss";
import { removeFromWishlist } from "../../actions/wishlistActions";
// import Rating from "./../Rating";

const WishlistProduct = (props) => {
  const { item } = props;
  // console.log("item :", item);

  //////wishlist

  const dispatch = useDispatch();

  const removeFromWishlistHandler = (id) => {
    // delete action
    setDisplayMessage(false);
    setDisplayInfo(false);
    setDisplayRemoveMessage(true);
    setTimeout(() => {
      setDisplayRemoveMessage(false);

      dispatch(removeFromWishlist(id));
    }, 4000);
  };

  // cart
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  let amountInCart = 1;
  let itemsInCart = 0;

  const existItem = cartItems.find((x) => x.product === item.product);
  if (existItem) {
    // console.log("existItem :", existItem.qty);
    amountInCart = existItem.qty;

    itemsInCart = existItem.qty;
  }

  const [displayRemoveMessage, setDisplayRemoveMessage] = useState(false);
  const [displayInfo, setDisplayInfo] = useState(true);
  const [displayMessage, setDisplayMessage] = useState(true);

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
          <select
            className="form-control"
            value={itemQty}
            onChange={(e) => {
              setQtyChange(true);
              setItemQty(e.target.value);
              setQty(e.target.value);
            }}
          >
            {[...Array(item.countInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>
        </div>
      </td>
      <td className="text-center text-lg text-medium">${item.price}</td>
      <td className="text-center text-lg text-medium add-to-cart-area">
        <div className=" buy-now-animation  buttons cart-button-animation">
          {(itemQty > 0 && !qtyChange) || (!qtyChange && buttonClicked) ? (
            <button
              className="cart-button clicked animated-btn-buy "
              onClick={() => {
                dispatch(addToCart(item.product, qty));

                setButtonClicked(true);
                setDisplayMessage(true);
                setDisplayInfo(true);
                setItemQty(qty);
                setQtyChange(false);
              }}
            >
              {qtyChange && (
                <>
                  <span className="add-to-cart">Update Cart</span>
                  <span className="added "></span>
                  <i className="fa fa-shopping-cart " />
                  <i className="fa fa-square " />
                </>
              )}

              {!qtyChange &&
                (qty > 1 ? (
                  <>
                    <span className="add-to-cart">Update Cart </span>
                    <span className="added ">{qty} items</span>
                    <i className="fa fa-shopping-cart " />
                    <i className="fa fa-square " />
                  </>
                ) : (
                  <>
                    <span className="add-to-cart">Adding Item </span>

                    <span className="added ">1 item in cart</span>
                    <i className="fa fa-shopping-cart " />
                    <i className="fa fa-square " />
                  </>
                ))}
            </button>
          ) : (
            <button
              className="cart-button  animated-btn-buy "
              onClick={() => {
                setButtonClicked(true);
                setItemQty(qty);
                dispatch(addToCart(item.product, qty));
                setDisplayMessage(true);
                setDisplayInfo(true);
                setQtyChange(false);
              }}
            >
              {qtyChange && (
                <>
                  <span className="add-to-cart ">Update Cart </span>
                  <span className="added ">Updating</span>
                  <i className="fa fa-shopping-cart " />{" "}
                  <i className="fa fa-square " />
                </>
              )}
              {!qtyChange &&
                (itemQty > 0 ? (
                  <>
                    <span className="add-to-cart "></span>
                    <span className="added "></span>
                    <i className="fa fa-shopping-cart " />{" "}
                    <i className="fa fa-square " />
                  </>
                ) : (
                  <>
                    <span className="add-to-cart ">Add to Cart</span>
                    <span className="added "> {qty} items in cart</span>
                    <i className="fa fa-shopping-cart " />{" "}
                    <i className="fa fa-square " />
                  </>
                ))}
            </button>
          )}
        </div>

        {displayRemoveMessage && (
          <Alert variant="warning">
            the product is being removed from your wishlist
          </Alert>
        )}
        {itemQty > 0 && displayMessage && !qtyChange && (
          <Alert variant="success"> {qty} items are at your Cart now</Alert>
        )}
        {qtyChange && displayInfo && (
          <Alert variant="info">
            click to update the amount to {qty} items
          </Alert>
        )}
      </td>
      <td className="text-center">
        <a
          onClick={() => removeFromWishlistHandler(item.product)}
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

export default WishlistProduct;
