import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";

import { Alert, Button, Modal } from "react-bootstrap";

import "./Product.scss";
import Rating from "../Rating/Rating";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./../../actions/cartActions";
import { addToWishlist } from "../../actions/wishlistActions";

const Product = (props) => {

  const { product } = props;
  // if (props.wishlist) {
  //   product.product = product._id;
  // }
  /// /// modal  ///////////////
  const [displayMessage, setDisplayMessage] = useState(false);
  const [displayInfo, setDisplayInfo] = useState(true);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  ///////////////  Cart     /////////////
  const [buttonClicked, setButtonClicked] = useState(false);
  const [button2Clicked, setButton2Clicked] = useState(false);

  const cart = useSelector((state) => state.cart);

  const { cartItems, error } = cart;
  // console.log("cartItems :", cartItems);
  let amountInCart = 1;
  let ItemsInCart = 0;

  const existItem = cartItems.find((x) => x.product === product._id);
  if (existItem) {
    // console.log("existItem :", existItem.qty);
    amountInCart = existItem.qty;

    ItemsInCart = existItem.qty;
  }

  const existWishlistItem = cartItems.find(
    (x) => x.product === product.product
  );
  if (existWishlistItem) {
    // console.log("existItem :", existItem.qty);
    amountInCart = existWishlistItem.qty;

    ItemsInCart = existWishlistItem.qty;
  }

  const [qty, setQty] = useState(amountInCart);
  const [itemQty, setItemQty] = useState(ItemsInCart);
  const [qtyChange, setQtyChange] = useState(false);

  const addToCartHandler = () => {
    setTimeout(() => {
      props.history.push(`/cart/${product._id}?qty=${qty}`);
    }, 2000);
  };

  const addToCartHandlerWish = () => {
    setTimeout(() => {
      props.history.push(`/cart/${product.product}?qty=${qty}`);
    }, 2000);
  };

  ///////// Wishlist  ////////////////////
  const [displayWishMessage, setDisplayWishMessage] = useState(false);

  const wishlist = useSelector((state) => state.wishlist);

  const { wishlistItems, wishlistError } = wishlist;
  // console.log("wishlistItems :", wishlistItems);
  let itemInWishlist = false;

  const existWishItem = wishlistItems.find((x) => x.product === product._id);
  if (existWishItem) {
    itemInWishlist = true;
  }

  const [wishlistItem, setWishlistItem] = useState(itemInWishlist);

  const handleWishBtnClick = () => {
    setDisplayWishMessage(true);

    setTimeout(() => {
      dispatch(addToWishlist(product._id));
      setWishlistItem(true);

      setDisplayWishMessage(false);
    }, 2000);
  };

  return (
    <>
      <div className="collection-item col-md-3 col-sm-12 item-area">
        <div className="product-grid6">
          <div className="product-image6">
            {props.wishlist ? (
              <Link to={`/product/${product.product}`}>
                <div
                  className="view-image"
                  src={product.image}
                  alt={product.name}
                >
                  <img className="pic-1" src={product.image} />
                </div>
              </Link>
            ) : (
              <Link to={`/product/${product._id}`}>
                <div
                  className="view-image"
                  src={product.image}
                  alt={product.name}
                >
                  <img className="pic-1" src={product.image} />
                </div>
              </Link>
            )}
          </div>
          <div className="product-content">
            <h3 className="title">
              <a href="#">{product.name}</a>
            </h3>
            {!props.wishlist && (
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            )}
            <div className="price">
              ${product.price}
              <span>${product.price + 10}</span>
            </div>
          </div>
          <ul className="social">
            {" "}
            {displayMessage && (
              <Alert variant="success">
                {qty === 1 ? (
                  <p> Item Of This Product Are Now At Your Shopping Cart </p>
                ) : (
                  <p>
                    {qty} Items Of This Product Are Now In Your Shopping Cart{" "}
                  </p>
                )}
              </Alert>
            )}
            {displayWishMessage && (
              <Alert variant="info">
                <p>Item Was Add To Your Wishlist </p>
              </Alert>
            )}
            {/* <Link to={`/product/${product._id}`}>
              <div className="add-to-cart text-view">VIEW PRODUCT</div>
            </Link> */}
            <div className="product_quantity">
              {" "}
              {/* <span>QTY: </span>{" "} */}
              <div>
                <select
                  className="form-control"
                  value={qty}
                  onChange={(e) => {
                    setQtyChange(true);

                    setQty(e.target.value);
                  }}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <li onClick={handleShow}>
              <a href data-tip="Quick View">
                <i className="fa fa-search" />
              </a>
            </li>
            {props.wishlist || wishlistItem ? (
              <li>
                <a href data-tip="The Item Is At Your Wishlist">
                  <i className="fa fa-heart" style={{ color: "red" }} />
                </a>
              </li>
            ) : (
              <li>
                <a onClick={handleWishBtnClick} href data-tip="Add to Wishlist">
                  <i className="fa fa-heart" />
                </a>
              </li>
            )}
            <li>
              {!qtyChange && props.wishlist && (
                <a
                  onClick={() => {
                    dispatch(addToCart(product.product, qty));
                    setDisplayMessage(true);
                    setItemQty(qty);
                    setTimeout(() => {
                      setDisplayMessage(false);

                      // props.history.push(`/cart/${product._id}?`);
                    }, 2000);
                  }}
                  href
                  data-tip="Add to Cart"
                >
                  {itemQty > 0 && (
                    <i
                      className="fa fa-shopping-cart"
                      style={{ color: "green" }}
                    />
                  )}
                  {itemQty === 0 && <i className="fa fa-shopping-cart" />}
                </a>
              )}
              {qtyChange && props.wishlist && (
                <a
                  onClick={() => {
                    dispatch(addToCart(product.product, qty));
                    setDisplayMessage(true);
                    setItemQty(qty);
                    setTimeout(() => {
                      setDisplayMessage(false);

                      // props.history.push(`/cart/${product._id}?`);
                    }, 2000);
                  }}
                  href
                  data-tip="Update Cart"
                >
                  {itemQty > 0 && (
                    <i
                      className="fa fa-shopping-cart"
                      style={{ color: "green" }}
                    />
                  )}
                  {itemQty === 0 && <i className="fa fa-shopping-cart" />}
                </a>
              )}
              {!qtyChange && !props.wishlist && (
                <a
                  onClick={() => {
                    dispatch(addToCart(product._id, qty));
                    setDisplayMessage(true);
                    setItemQty(qty);

                    setTimeout(() => {
                      setDisplayMessage(false);

                      // props.history.push(`/cart/${product._id}?`);
                    }, 2000);
                  }}
                  href
                  data-tip="Add to Cart"
                >
                  {itemQty > 0 && (
                    <i
                      className="fa fa-shopping-cart"
                      style={{ color: "green" }}
                    />
                  )}
                  {itemQty === 0 && <i className="fa fa-shopping-cart" />}{" "}
                </a>
              )}

              {qtyChange && !props.wishlist && (
                <a
                  onClick={() => {
                    dispatch(addToCart(product._id, qty));
                    setDisplayMessage(true);
                    setItemQty(qty);

                    setTimeout(() => {
                      setDisplayMessage(false);

                      // props.history.push(`/cart/${product._id}?`);
                    }, 2000);
                  }}
                  href
                  data-tip="Update Cart"
                >
                  {itemQty > 0 && (
                    <i
                      className="fa fa-shopping-cart"
                      style={{ color: "green" }}
                    />
                  )}
                  {itemQty === 0 && <i className="fa fa-shopping-cart" />}{" "}
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
      <Modal className="model-area" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <div className="col-md-7 col-sm-8 ">
            {props.wishlist ? (
              <Link to={`/product/${product.product}`}>
                <Modal.Title>{product.name} </Modal.Title>
              </Link>
            ) : (
              <Link to={`/product/${product._id}`}>
                <Modal.Title>{product.name} </Modal.Title>
              </Link>
            )}
          </div>
          <div className="col-md-3 col-sm-3 heart-row">
            {props.wishlist || wishlistItem ? (
              <div onClick={handleWishBtnClick} className="heartbox">
                <input type="checkbox" className="checkbox" id="checkbox" />
                <label htmlFor="checkbox">
                  <svg
                    id="heart-svg"
                    viewBox="467 392 58 57"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      id="Group"
                      fill="none"
                      fillRule="evenodd"
                      transform="translate(467 392)"
                    >
                      <path
                        d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
                        id="heart"
                        fill="#E2264D"
                      />
                      <circle
                        id="main-circ"
                        fill="#E2264D"
                        opacity={0}
                        cx="29.5"
                        cy="29.5"
                        r="1.5"
                      />
                    </g>
                  </svg>
                </label>
              </div>
            ) : (
              <div onClick={handleWishBtnClick} className="heartbox">
                <input type="checkbox" className="checkbox" id="checkbox" />
                <label htmlFor="checkbox">
                  <svg
                    id="heart-svg"
                    viewBox="467 392 58 57"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      id="Group"
                      fill="none"
                      fillRule="evenodd"
                      transform="translate(467 392)"
                    >
                      <path
                        d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
                        id="heart"
                        fill="#AAB8C2"
                      />
                      <circle
                        id="main-circ"
                        fill="#E2264D"
                        opacity={0}
                        cx="29.5"
                        cy="29.5"
                        r="1.5"
                      />
                      <g
                        id="heartgroup7"
                        opacity={0}
                        transform="translate(7 6)"
                      >
                        <circle
                          id="heart1"
                          fill="#9CD8C3"
                          cx={2}
                          cy={6}
                          r={2}
                        />
                        <circle
                          id="heart2"
                          fill="#8CE8C3"
                          cx={5}
                          cy={2}
                          r={2}
                        />
                      </g>
                      <g
                        id="heartgroup6"
                        opacity={0}
                        transform="translate(0 28)"
                      >
                        <circle
                          id="heart1"
                          fill="#CC8EF5"
                          cx={2}
                          cy={7}
                          r={2}
                        />
                        <circle
                          id="heart2"
                          fill="#91D2FA"
                          cx={3}
                          cy={2}
                          r={2}
                        />
                      </g>
                      <g
                        id="heartgroup3"
                        opacity={0}
                        transform="translate(52 28)"
                      >
                        <circle
                          id="heart2"
                          fill="#9CD8C3"
                          cx={2}
                          cy={7}
                          r={2}
                        />
                        <circle
                          id="heart1"
                          fill="#8CE8C3"
                          cx={4}
                          cy={2}
                          r={2}
                        />
                      </g>
                      <g
                        id="heartgroup2"
                        opacity={0}
                        transform="translate(44 6)"
                      >
                        <circle
                          id="heart2"
                          fill="#CC8EF5"
                          cx={5}
                          cy={6}
                          r={2}
                        />
                        <circle
                          id="heart1"
                          fill="#CC8EF5"
                          cx={2}
                          cy={2}
                          r={2}
                        />
                      </g>
                      <g
                        id="heartgroup5"
                        opacity={0}
                        transform="translate(14 50)"
                      >
                        <circle
                          id="heart1"
                          fill="#91D2FA"
                          cx={6}
                          cy={5}
                          r={2}
                        />
                        <circle
                          id="heart2"
                          fill="#91D2FA"
                          cx={2}
                          cy={2}
                          r={2}
                        />
                      </g>
                      <g
                        id="heartgroup4"
                        opacity={0}
                        transform="translate(35 50)"
                      >
                        <circle
                          id="heart1"
                          fill="#F48EA7"
                          cx={6}
                          cy={5}
                          r={2}
                        />
                        <circle
                          id="heart2"
                          fill="#F48EA7"
                          cx={2}
                          cy={2}
                          r={2}
                        />
                      </g>
                      <g id="heartgroup1" opacity={0} transform="translate(24)">
                        <circle
                          id="heart1"
                          fill="#9FC7FA"
                          cx="2.5"
                          cy={3}
                          r={2}
                        />
                        <circle
                          id="heart2"
                          fill="#9FC7FA"
                          cx="7.5"
                          cy={2}
                          r={2}
                        />
                      </g>
                    </g>
                  </svg>
                </label>
              </div>
            )}{" "}
          </div>
        </Modal.Header>

        {displayWishMessage && (
          <Alert variant="info">
            <p>The Item Is At Your Wishlist </p>
          </Alert>
        )}
        <Modal.Body>
          <div className="modal-content">
            {props.wishlist ? (
              <Link to={`/product/${product.product}`}>
                <img src={product.image} alt="modal" />
              </Link>
            ) : (
              <Link to={`/product/${product._id}`}>
                <img src={product.image} alt="modal" />
              </Link>
            )}
            <br />
            <p className="price">${product.price}</p>
            <p>{product.description}</p>
            {displayInfo && itemQty > 0 && (
              <Alert variant="info">
                {itemQty === 1 ? (
                  <p>You have 1 Item of of this product in the cart</p>
                ) : (
                  <p>You have {itemQty} Items of this product in the cart</p>
                )}
              </Alert>
            )}
            {displayMessage && (
              <Alert variant="success">
                {qty === 1 ? (
                  <p>Item of this product are now in your shopping cart</p>
                ) : (
                  <p>
                    {qty} Items of this product are now in your shopping cart
                  </p>
                )}
              </Alert>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <>
            {/* product_quantity */}
            <div className="product_quantity">
              {" "}
              <span className="product-qty">QTY: </span>{" "}
              <div>
                <select
                  className="form-control"
                  value={qty}
                  onChange={(e) => {
                    setQtyChange(true);

                    setQty(e.target.value);
                  }}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* add to cart animation btn start */}

            {!props.wishlist && (
              <div className="add-to-cart-animation">
                {!qtyChange && button2Clicked ? (
                  <div className=" col-xs-2 center animation-cart-2">
                    <div className="buttons d-flex flex-row add-cart-btn-1">
                      <div className="cart">
                        <i className="fa fa-shopping-cart" />
                      </div>
                      <button
                        onClick={() => {
                          dispatch(addToCart(product._id, qty));

                          setButton2Clicked(true);
                          setDisplayMessage(true);
                          setDisplayInfo(false);
                          setItemQty(qty);
                          setQtyChange(false);

                          setTimeout(() => {
                            setDisplayMessage(false);
                            setDisplayInfo(true);
                          }, 4000);
                        }}
                        className="btn btn-success cart-button px-5 clicked animated-btn-2"
                      >
                        {qtyChange && (
                          <>
                            <span className="dot">{qty} </span>
                            Click To Update Cart
                          </>
                        )}
                        {!qtyChange && (
                          <>
                            <span className="dot">{qty} </span>
                            {qty} Items In Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className=" col-xs-2 center animation-cart-2">
                    <div className="buttons d-flex flex-row add-cart-btn-1">
                      <div className="cart">
                        <i className="fa fa-shopping-cart" />
                      </div>
                      <button
                        onClick={() => {
                          dispatch(addToCart(product._id, qty));
                          setDisplayMessage(true);
                          setButton2Clicked(true);
                          setDisplayInfo(false);
                          setQtyChange(false);
                          setItemQty(qty);
                          setTimeout(() => {
                            setDisplayMessage(false);
                            setDisplayInfo(true);
                          }, 4000);
                        }}
                        className="btn btn-primary cart-button px-5 animated-btn-2 "
                      >
                        {qtyChange && (
                          <>
                            <span className="dot">{qty} </span>
                            Update Cart
                          </>
                        )}
                        {!qtyChange && (
                          <>
                            <span className="dot">{qty} </span>
                            {qty} items in cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* add to cart animation btn end */}

            {/* add to cart animation btn start  for wishlist*/}

            {props.wishlist && (
              <div className="add-to-cart-animation">
                {!qtyChange && button2Clicked ? (
                  <div className=" col-xs-2 center animation-cart-2">
                    <div className="buttons d-flex flex-row add-cart-btn-1">
                      <div className="cart">
                        <i className="fa fa-shopping-cart" />
                      </div>
                      <button
                        onClick={() => {
                          dispatch(addToCart(product.product, qty));

                          setButton2Clicked(true);
                          setDisplayMessage(true);
                          setDisplayInfo(false);
                          setItemQty(qty);
                          setQtyChange(false);

                          setTimeout(() => {
                            setDisplayMessage(false);
                            setDisplayInfo(true);
                          }, 4000);
                        }}
                        className="btn btn-success cart-button px-5 clicked animated-btn-2"
                      >
                        {qtyChange && (
                          <>
                            <span className="dot">{qty} </span>
                            Click To Update Cart
                          </>
                        )}
                        {!qtyChange && (
                          <>
                            <span className="dot">{qty} </span>
                            {qty} items in cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className=" col-xs-2 center animation-cart-2">
                    <div className="buttons d-flex flex-row add-cart-btn-1">
                      <div className="cart">
                        <i className="fa fa-shopping-cart" />
                      </div>
                      <button
                        onClick={() => {
                          dispatch(addToCart(product.product, qty));
                          setDisplayMessage(true);
                          setButton2Clicked(true);
                          setDisplayInfo(false);
                          setQtyChange(false);
                          setItemQty(qty);
                          setTimeout(() => {
                            setDisplayMessage(false);
                            setDisplayInfo(true);
                          }, 4000);
                        }}
                        className="btn btn-primary cart-button px-5 animated-btn-2 "
                      >
                        {qtyChange && (
                          <>
                            <span className="dot">{qty} </span>
                            Update Cart
                          </>
                        )}
                        {!qtyChange && (
                          <>
                            <span className="dot">{qty} </span>
                            {qty} items in cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* add to cart animation btn end for wishlist  */}

            {/* Buy Item  */}
            {!props.wishlist ? (
              <>
                {" "}
                <div
                  onClick={addToCartHandler}
                  className="buttons cart-button-animation"
                >
                  {buttonClicked ? (
                    <button
                      className="cart-button clicked "
                      onClick={() => setButtonClicked(true)}
                    >
                      <span className="add-to-cart ">Buy Now</span>
                      <span className="added ">Moving to Cart</span>
                      <i className="fa fa-shopping-cart " />{" "}
                      <i className="fa fa-square " />
                    </button>
                  ) : (
                    <button
                      className="cart-button "
                      onClick={() => setButtonClicked(true)}
                    >
                      <span className="add-to-cart ">Buy Now</span>
                      <span className="added ">Move to Cart</span>
                      <i className="fa fa-shopping-cart " />{" "}
                      <i className="fa fa-square " />
                    </button>
                  )}
                </div>
              </>
            ) : (
              <>
                {" "}
                <div
                  onClick={addToCartHandlerWish}
                  className="buttons cart-button-animation"
                >
                  {buttonClicked ? (
                    <button
                      className="cart-button clicked "
                      onClick={() => setButtonClicked(true)}
                    >
                      <span className="add-to-cart ">Buy Now</span>
                      <span className="added ">Move to Cart</span>
                      <i className="fa fa-shopping-cart " />{" "}
                      <i className="fa fa-square " />
                    </button>
                  ) : (
                    <button
                      className="cart-button "
                      onClick={() => setButtonClicked(true)}
                    >
                      <span className="add-to-cart ">Buy Now</span>
                      <span className="added ">Moving to Cart</span>
                      <i className="fa fa-shopping-cart " />{" "}
                      <i className="fa fa-square " />
                    </button>
                  )}
                </div>
              </>
            )}
          </>
        </Modal.Footer>
      </Modal>
    </>
  );
};

// <>
//   <div className="buttons cart-button-animation">
//     {buttonClicked ? (
//       <button
//         className="cart-button clicked "
//         onClick={() => setButtonClicked(true)}
//       >
//         <span className="add-to-cart ">Add to cart</span>
//         <span className="added ">Item added</span>
//         <i className="fa fa-shopping-cart " /> <i className="fa fa-square " />
//       </button>
//     ) : (
//       <button className="cart-button " onClick={() => setButtonClicked(true)}>
//         <span className="add-to-cart ">Add to cart</span>
//         <span className="added ">Item added</span>
//         <i className="fa fa-shopping-cart " /> <i className="fa fa-square " />
//       </button>
//     )}
//   </div>
// </>;
export default withRouter(Product);
