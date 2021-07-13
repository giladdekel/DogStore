import { Alert } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  emptyCart,
  removeFromCart,
  saveCoupon,
} from "../../actions/cartActions";
import CartProduct from "../../components/CartProduct/CartProduct";
import MessageBox from "../../components/MessageBox";

import "./CartScreen.scss";

export default function CartScreen(props) {
  // console.log(" CartScreen - props:", props);
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);

  const { cartItems, error } = cart;

  const [displayCouponSuccess, setDisplayCouponSuccess] = useState(false);

  const [displayCouponFailure, setDisplayCouponFailure] = useState(false);

  const [coupon, setCoupon] = useState(0);

  const couponPrice = 5;

  const [passwordCoupon, setPasswordCoupon] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  const handleCoupon = (e) => {
    e.preventDefault();
    if (passwordCoupon === "1234") {
      setCoupon(couponPrice);
      dispatch(saveCoupon(couponPrice));
      setDisplayCouponSuccess(true);
      setDisplayCouponFailure(false);
    } else {
      dispatch(saveCoupon(0));
      setDisplayCouponSuccess(false);
      setDisplayCouponFailure(true);
      setCoupon(0);

      setTimeout(() => {
        setDisplayCouponFailure(false);
      }, 3000);
    }
  };

  return (
    <>
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {cartItems.length === 0 ? (
        <MessageBox>
          Cart is empty.
          <Link to="/">Go Shopping</Link>
        </MessageBox>
      ) : (
        <>
          <>
            <div className="wishlist-screen">
              {/* <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
          rel="stylesheet"
        /> */}
              <div className="container padding-bottom-3x mb-1">
                {/* Alert*/}
                {/* <div
            className="alert alert-info alert-dismissible fade show text-center"
            style={{ marginBottom: 30 }}
          >
            <span className="alert-close" data-dismiss="alert" />
            <img
              className="d-inline align-center"
              src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIuMDAzIDUxMi4wMDMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMi4wMDMgNTEyLjAwMzsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiPgo8Zz4KCTxnPgoJCTxnPgoJCQk8cGF0aCBkPSJNMjU2LjAwMSw2NGMtNzAuNTkyLDAtMTI4LDU3LjQwOC0xMjgsMTI4czU3LjQwOCwxMjgsMTI4LDEyOHMxMjgtNTcuNDA4LDEyOC0xMjhTMzI2LjU5Myw2NCwyNTYuMDAxLDY0eiAgICAgIE0yNTYuMDAxLDI5OC42NjdjLTU4LjgxNiwwLTEwNi42NjctNDcuODUxLTEwNi42NjctMTA2LjY2N1MxOTcuMTg1LDg1LjMzMywyNTYuMDAxLDg1LjMzM1MzNjIuNjY4LDEzMy4xODQsMzYyLjY2OCwxOTIgICAgIFMzMTQuODE3LDI5OC42NjcsMjU2LjAwMSwyOTguNjY3eiIgZmlsbD0iIzUwYzZlOSIvPgoJCQk8cGF0aCBkPSJNMzg1LjY0NCwzMzMuMjA1YzM4LjIyOS0zNS4xMzYsNjIuMzU3LTg1LjMzMyw2Mi4zNTctMTQxLjIwNWMwLTEwNS44NTYtODYuMTIzLTE5Mi0xOTItMTkycy0xOTIsODYuMTQ0LTE5MiwxOTIgICAgIGMwLDU1Ljg1MSwyNC4xMjgsMTA2LjA2OSw2Mi4zMzYsMTQxLjE4NEw2NC42ODQsNDk3LjZjLTEuNTM2LDQuMTE3LTAuNDA1LDguNzI1LDIuODM3LDExLjY2OSAgICAgYzIuMDI3LDEuNzkyLDQuNTY1LDIuNzMxLDcuMTQ3LDIuNzMxYzEuNjIxLDAsMy4yNDMtMC4zNjMsNC43NzktMS4xMDlsNzkuNzg3LTM5Ljg5M2w1OC44NTksMzkuMjMyICAgICBjMi42ODgsMS43OTIsNi4xMDEsMi4yNCw5LjE5NSwxLjI4YzMuMDkzLTEuMDAzLDUuNTY4LTMuMzQ5LDYuNjk5LTYuNGwyMy4yOTYtNjIuMTQ0bDIwLjU4Nyw2MS43MzkgICAgIGMxLjA2NywzLjE1NywzLjU0MSw1LjYzMiw2LjY3Nyw2LjcyYzMuMTM2LDEuMDY3LDYuNTkyLDAuNjQsOS4zNjUtMS4yMTZsNTguODU5LTM5LjIzMmw3OS43ODcsMzkuODkzICAgICBjMS41MzYsMC43NjgsMy4xNTcsMS4xMzEsNC43NzksMS4xMzFjMi41ODEsMCw1LjEyLTAuOTM5LDcuMTI1LTIuNzUyYzMuMjY0LTIuOTIzLDQuMzczLTcuNTUyLDIuODM3LTExLjY2OUwzODUuNjQ0LDMzMy4yMDV6ICAgICAgTTI0Ni4wMTcsNDEyLjI2N2wtMjcuMjg1LDcyLjc0N2wtNTIuODIxLTM1LjJjLTMuMi0yLjExMi03LjMxNy0yLjM4OS0xMC42ODgtMC42NjFMOTQuMTg4LDQ3OS42OGw0OS41NzktMTMyLjIyNCAgICAgYzI2Ljg1OSwxOS40MzUsNTguNzk1LDMyLjIxMyw5My41NDcsMzUuNjA1TDI0Ni43LDQxMS4yQzI0Ni40ODcsNDExLjU2MywyNDYuMTY3LDQxMS44NCwyNDYuMDE3LDQxMi4yNjd6IE0yNTYuMDAxLDM2Mi42NjcgICAgIEMxNjEuOSwzNjIuNjY3LDg1LjMzNSwyODYuMTAxLDg1LjMzNSwxOTJTMTYxLjksMjEuMzMzLDI1Ni4wMDEsMjEuMzMzUzQyNi42NjgsOTcuODk5LDQyNi42NjgsMTkyICAgICBTMzUwLjEwMywzNjIuNjY3LDI1Ni4wMDEsMzYyLjY2N3ogTTM1Ni43NTksNDQ5LjEzMWMtMy40MTMtMS43MjgtNy41MDktMS40NzItMTAuNjg4LDAuNjYxbC01Mi4zNzMsMzQuOTIzbC0zMy42NDMtMTAwLjkyOCAgICAgYzQwLjM0MS0wLjg1Myw3Ny41ODktMTQuMTg3LDEwOC4xNi0zNi4zMzFsNDkuNTc5LDEzMi4yMDNMMzU2Ljc1OSw0NDkuMTMxeiIgZmlsbD0iIzUwYzZlOSIvPgoJCTwvZz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"
              width={18}
              height={18}
              alt="Medal icon"
            />
            &nbsp;&nbsp;With this purchase you will earn <strong>290</strong>{" "}
            Reward Points.
          </div>
          Shopping Cart */}
                <div className="table-responsive shopping-cart">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-center">Subtotal</th>
                        <th className="text-center">Update Cart</th>
                        <th className="text-center">
                          <a
                            onClick={() => dispatch(emptyCart())}
                            className="btn btn-sm btn-outline-danger"
                            href="#"
                          >
                            Clear Cart
                          </a>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <CartProduct key={item.product} item={item} />
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="shopping-cart-footer">
                  <div className="column">
                    <form className="coupon-form" method="post">
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        placeholder="Coupon code"
                        required
                        value={passwordCoupon}
                        onChange={(e) => setPasswordCoupon(e.target.value)}
                      />
                      <button
                        onClick={handleCoupon}
                        className="btn btn-outline-primary btn-sm"
                      >
                        Apply Coupon
                      </button>{" "}
                      {displayCouponSuccess && (
                        <Alert className="coupon-alert" variant="success">
                          the coupon is applied successfully
                        </Alert>
                      )}
                      {displayCouponFailure && (
                        <Alert className="coupon-alert" variant="warning">
                          the code is invalid
                        </Alert>
                      )}
                    </form>{" "}
                  </div>{" "}
                  <div className="column text-lg">
                    items:
                    <span className="text-medium">
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </span>
                  </div>
                  <div className="column text-lg">
                    {coupon > 0 ? (
                      <>
                        <span className="text-medium">
                          <s>
                            $
                            {Number(
                              cartItems.reduce((a, c) => a + c.price * c.qty, 0)
                            )}
                          </s>
                        </span>
                        <br />
                        Subtotal:
                        <span className="text-medium">
                          $
                          {Number(
                            cartItems.reduce((a, c) => a + c.price * c.qty, 0)
                          ) - coupon}
                        </span>
                      </>
                    ) : (
                      <>
                        Subtotal: $
                        <span className="text-medium">
                          {Number(
                            cartItems.reduce((a, c) => a + c.price * c.qty, 0)
                          )}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="row shopping-cart-footer">
                  <div className=" column col-4">
                    <Link to="/search/category/all/name/all/min/0/max/0/rating/0/order/newest/pageNumber/1">
                      <a className="btn btn-outline-secondary" href="#">
                        <i className="icon-arrow-left" />
                        &nbsp;Back to Shopping
                      </a>
                    </Link>
                  </div>
                  <div className=" column col-4">
                    <a
                      className="btn btn-primary btn-block"
                      href=""
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-credit-card mr-2"
                      >
                        <rect
                          x={1}
                          y={4}
                          width={22}
                          height={16}
                          rx={2}
                          ry={2}
                        />
                        <line x1={1} y1={10} x2={23} y2={10} />
                      </svg>
                      Proceed to Checkout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        </>
      )}
    </>
  );
}
