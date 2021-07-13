import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../actions/cartActions";
import { createReview, detailsProduct } from "../../actions/productActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

import { Alert } from "react-bootstrap";

import Rating from "../../components/Rating/Rating";
import { PRODUCT_REVIEW_CREATE_RESET } from "../../constants/productConstants";

import "./ProductScreen.scss";
import { addToWishlist } from "./../../actions/wishlistActions";
import WishlistProduct from "./../../components/WishlistProduct/WishlistProduct";
import Product from "../../components/Product/Product";

export default function ProductScreen(props) {
  console.log("ProductScreen :", props);
  const dispatch = useDispatch();

  const productId = props.match.params.id;

  // const [qty, setQty] = useState(1);

  const [displayMessage, setDisplayMessage] = useState(false);
  const [displayInfo, setDisplayInfo] = useState(true);

  const [buttonClicked, setButtonClicked] = useState(false);
  const [button2Clicked, setButton2Clicked] = useState(false);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  // console.log(" productScreen-product:", product);
  // console.log("productScreen-props:", props);

  const [mainImage, setMainImage] = useState(null);

  const changeImage = (event) => {
    setMainImage(event.target.src);
  };

  //////////////////////////cart start/////////////////////////////////

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;
  // console.log("cartItems :", cartItems);
  let amountInCart = 1;
  let ItemsInCart = 0;

  const existItem = cartItems.find((x) => x.product === productId);
  if (existItem) {
    // console.log("existItem :", existItem.qty);
    amountInCart = existItem.qty;

    ItemsInCart = existItem.qty;
  }

  const [qty, setQty] = useState(amountInCart);
  const [itemQty, setItemQty] = useState(ItemsInCart);
  const [qtyChange, setQtyChange] = useState(false);

  const addToCartHandler = () => {
    setTimeout(() => {
      props.history.push(`/cart/${productId}?qty=${qty}`);
    }, 2000);
  };

  ///////////////////////// cart end /////////////////////////////////

  //////////// review start//////////////////////////////////

  const [counter, setCounter] = useState(5);

  useEffect(() => {
    if (successReviewCreate) {
      window.alert("Review Submitted Successfully");
      setRating("");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, {
          rating,
          comment,
          name: userInfo.name,
          image: userInfo.image,
        })
      );
    } else {
      alert("Please enter comment and rating");
    }
  };

  //////////// review end///////////////////////////////////////

  //////////////////////// wishlist  start/////////////////////////////
  const [displayWishMessage, setDisplayWishMessage] = useState(false);

  const wishlist = useSelector((state) => state.wishlist);

  const {
    loading: loadingWishlist,
    error: errorWishlist,
    wishlistItems,
  } = wishlist;

  // let wishlistItemsArr = wishlistItems.reverse();
  // console.log("wishlistItemsArr :", wishlistItemsArr);

  let itemInWishlist = false;

  // const [wishlistProducts, setWishlistProducts] = useState(itemInWishlist);

  const existWishItem = wishlistItems.find((x) => x.product === productId);
  if (existWishItem) {
    itemInWishlist = true;
  }

  const [wishlistItem, setWishlistItem] = useState(itemInWishlist);

  const handleWishBtnClick = () => {
    setDisplayWishMessage(true);

    setTimeout(() => {
      dispatch(addToWishlist(productId));
      setWishlistItem(true);

      setDisplayWishMessage(false);
    }, 3000);
  };

  //////////////////// wish list end ////////////////////////////////
  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="product-page">
            <Link
              className="container"
              to="/search/category/all/name/all/min/0/max/0/rating/0/order/newest/pageNumber/1"
            >
              Back to Shop
            </Link>

            <div className="super_container ">
              <div className="single_product">
                <div
                  className="container-fluid"
                  style={{ backgroundColor: "#fff", padding: 11 }}
                >
                  <div className="row">
                    <div className="col-lg-2 order-lg-1 order-2">
                      <ul className="image_list">
                        <li data-image="https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg">
                          <img
                            onClick={changeImage}
                            src={product.image}
                            alt={product.name}
                          />
                        </li>
                        <li data-image={product.image}>
                          <img
                            onClick={changeImage}
                            src={`/images/p15.jpg`}
                            alt={product.name}
                          />
                        </li>
                        <li data-image={product.image}>
                          <img
                            onClick={changeImage}
                            src={`/images/p17.jpg`}
                            alt={product.name}
                          />
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-4 order-lg-2 order-1">
                      <div className="image_selected img-hover-zoom">
                        <img
                          className="main-img"
                          src={mainImage ? mainImage : product.image}
                          alt="product image"
                        />{" "}
                      </div>
                    </div>
                    <div className="col-lg-6 order-3 main-content">
                      <div className="product_description">
                        <nav>
                          <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                              <Link to="/">
                                <a href="#">Home</a>
                              </Link>
                            </li>
                            <li className="breadcrumb-item">
                              <Link to="/search/category/all/name/all/min/0/max/0/rating/0/order/newest/pageNumber/1">
                                <a>Store</a>
                              </Link>
                            </li>
                            <li className="breadcrumb-item active">
                              {product.name}{" "}
                            </li>
                          </ol>
                        </nav>
                        <div className="product_name">
                          <h1>{product.name} </h1>
                        </div>
                        <div className="product-rating">
                          <Rating
                            rating={product.rating}
                            numReviews={product.numReviews}
                          ></Rating>
                        </div>
                        <div>
                          {" "}
                          <span className="product_price">
                            {" "}
                            {product.price}$
                          </span>{" "}
                          <strike className="product_discount">
                            {" "}
                            <span style={{ color: "black" }}>
                              {product.price + 10}$<span> </span>
                            </span>
                          </strike>{" "}
                        </div>
                        <div>
                          {" "}
                          <span className="product_saved">You Saved:</span>{" "}
                          <span style={{ color: "black" }}>
                            10$ <span> </span>
                          </span>
                          <div>
                            {product.countInStock > 0 ? (
                              <span className="success">In Stock</span>
                            ) : (
                              <span className="danger">Unavailable</span>
                            )}
                          </div>
                        </div>
                        <hr className="singleline" />
                        <div>
                          {" "}
                          <p className="product_info">{product.description}</p>
                        </div>
                        <hr className="singleline" />
                        <div className="order_info d-flex flex-row">
                          <form action="#"></form>
                        </div>
                        <div className="heart-productscreen"></div>

                        <div className="row">
                          <div className="qty-input">
                            <div className="product_quantity">
                              {" "}
                              <span>QTY: </span>{" "}
                              <div>
                                <select
                                  value={qty}
                                  onChange={(e) => {
                                    setQty(e.target.value);
                                    setQtyChange(true);
                                  }}
                                >
                                  {[...Array(product.countInStock).keys()].map(
                                    (x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    )
                                  )}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="add-to-cart-animation">
                            {!qtyChange && button2Clicked ? (
                              <div className=" col-xs-2 center animation-cart-2">
                                <div className="buttons d-flex flex-row add-cart-btn-1">
                                  <div className="cart">
                                    <i className="fa fa-shopping-cart" />
                                  </div>
                                  <button
                                    onClick={() => {
                                      dispatch(addToCart(productId, qty));

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
                                      dispatch(addToCart(productId, qty));
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
                            )}
                          </div>

                          <div
                            className=" buy-now-animation  buttons cart-button-animation"
                            onClick={addToCartHandler}
                          >
                            {buttonClicked ? (
                              <button
                                className="cart-button clicked animated-btn-buy "
                                onClick={() => setButtonClicked(true)}
                              >
                                <span className="add-to-cart ">Buy Now</span>
                                <span className="added ">Moving</span>
                                <i className="fa fa-shopping-cart " />
                                <i className="fa fa-square " />
                              </button>
                            ) : (
                              <button
                                className="cart-button  animated-btn-buy "
                                onClick={() => setButtonClicked(true)}
                              >
                                <span className="add-to-cart ">Buy Now</span>
                                <span className="added "></span>
                                <i className="fa fa-shopping-cart " />{" "}
                                <i className="fa fa-square " />
                              </button>
                            )}
                          </div>
                        </div>
                        {displayInfo && itemQty > 0 && (
                          <Alert variant="info">
                            {itemQty === 1 ? (
                              <p>
                                You Have One Item Of Of This Product In The Cart
                              </p>
                            ) : (
                              <p>
                                You Have {itemQty} Items Of This Product In The
                                Cart
                              </p>
                            )}
                          </Alert>
                        )}
                        {displayWishMessage && (
                          <Alert variant="success">
                            <p>The Item Is At Your Wishlist</p>
                          </Alert>
                        )}
                        {displayMessage && (
                          <Alert variant="success">
                            {qty === 1 ? (
                              <p>
                                One Item Of This Product Are Now In Your
                                Shopping Cart
                              </p>
                            ) : (
                              <p>
                                {qty} Items Of This Product Are Now In Your
                                Shopping Cart
                              </p>
                            )}
                          </Alert>
                        )}
                      </div>
                      {/* heartboxStyle  */}
                      <div className="wishlistItemHeart">
                        {wishlistItem ? (
                          <div
                            onClick={handleWishBtnClick}
                            className="heartbox"
                          >
                            <input
                              type="checkbox"
                              className="checkbox"
                              id="checkbox"
                            />
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
                          <div
                            onClick={handleWishBtnClick}
                            className="heartbox"
                          >
                            <input
                              type="checkbox"
                              className="checkbox"
                              id="checkbox"
                            />
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
                                  <g
                                    id="heartgroup1"
                                    opacity={0}
                                    transform="translate(24)"
                                  >
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
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="product-home-display wish-product-area">
            {loadingWishlist ? (
              <LoadingBox></LoadingBox>
            ) : errorWishlist ? (
              <MessageBox variant="danger">{errorWishlist}</MessageBox>
            ) : (
              <>
                {wishlistItems.length > 0 && (
                  <div className="margin-left-image">
                    {" "}
                    <Link to="/wishlist">
                      <h2>
                        Products <b>You Like</b>
                      </h2>
                    </Link>
                    <div className="row center">
                      {wishlistItems
                        .map((product) => (
                          <Product
                            key={product._id}
                            product={product}
                            wishlist
                          />
                        ))
                        .filter((p, i) => i < 3)}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="comments post-screen">
            {/* ///////////////////////comments start///////////////////   */}

            <div>
              {/* <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" /> */}

              <section className="content-item" id="comments">
                <div className="container">
                  <div className="row">
                    <div className="col-sm-8">
                      {userInfo ? (
                        <form onSubmit={submitHandler}>
                          <div>
                            <h3 htmlFor="rating">Rating:</h3>
                            <select
                              id="rating"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value="">Select...</option>
                              <option value="1">1- Poor</option>
                              <option value="2">2- Fair</option>
                              <option value="3">3- Good</option>
                              <option value="4">4- Very good</option>
                              <option value="5">5- Excelent</option>
                            </select>
                          </div>
                          <h3 className="pull-left">New Review</h3>

                          <fieldset>
                            <div className="row">
                              <div className="col-sm-3 col-lg-2 hidden-xs">
                                {userInfo && userInfo.image ? (
                                  <img
                                    className="img-responsive"
                                    src={userInfo.image}
                                    alt
                                  />
                                ) : (
                                  <img
                                    className="img-responsive"
                                    src="https://placedog.net/1000?random"
                                    alt
                                  />
                                )}
                                <p>{userInfo.name}</p>
                              </div>
                              <div className="form-group col-xs-12 col-sm-9 col-lg-10">
                                <textarea
                                  onChange={(e) => setComment(e.target.value)}
                                  className="form-control"
                                  id="message"
                                  placeholder="Your review"
                                  required
                                  defaultValue={""}
                                />
                              </div>{" "}
                              <div className="col-md-3">
                                <div className="send">
                                  <button className="px-btn theme">
                                    <span>Submit</span> <i className="arrow" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </fieldset>

                          {loadingReviewCreate && <LoadingBox></LoadingBox>}
                          {errorReviewCreate && (
                            <MessageBox variant="danger">
                              {errorReviewCreate}
                            </MessageBox>
                          )}
                        </form>
                      ) : (
                        <MessageBox>
                          Please <Link to="/signin">Sign In</Link> to write a
                          review
                        </MessageBox>
                      )}
                      <h3>{product.numReviews} Reviews</h3>

                      {/* COMMENT 1 - START */}

                      {product.reviews.length === 0 && (
                        <MessageBox>There is no Comments</MessageBox>
                      )}

                      {product.reviews.map((review) => (
                        <div key={review._id} className="media">
                          <a className="pull-left" href="#">
                            {userInfo && review.image ? (
                              <img
                                className="media-object"
                                src={review.image}
                                alt
                              />
                            ) : (
                              <img
                                className="media-object"
                                src="https://placedog.net/1000?random"
                                alt
                              />
                            )}
                            <br />
                            <Rating rating={review.rating} caption=" "></Rating>
                          </a>

                          <div className="media-body">
                            <h4 className="media-heading">{review.name}</h4>
                            <p>{review.comment}</p>
                            <ul className="list-unstyled list-inline media-detail pull-left row">
                              <li>
                                <i className="fa fa-calendar" />
                                {review.createdAt.substring(0, 10)}
                              </li>

                              <li>
                                <i className="fa fa-clock" />
                                {review.createdAt.substring(11, 16)}
                              </li>
                              <li>
                                <i className="fa fa-thumbs-up" />
                                {counter}
                              </li>
                            </ul>
                            <ul className="list-unstyled list-inline media-detail pull-right row">
                              <li className>
                                <a
                                  onClick={() => setCounter(counter + 1)}
                                  className="like-btn"
                                  href
                                >
                                  Like
                                </a>
                              </li>
                              {/* <li className>
                                <a className="like-btn" href>
                                  Reply
                                </a>
                              </li> */}
                            </ul>
                          </div>
                        </div>
                      ))}

                      {/* COMMENT 1 - END */}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* /////////////////////////////end comments */}
          </div>
        </>
      )}
    </>
  );
}
