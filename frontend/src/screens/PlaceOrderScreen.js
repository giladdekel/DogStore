import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Alert } from "react-bootstrap";
import { saveCoupon } from "./../actions/cartActions";

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);

  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }

  const orderCreate = useSelector((state) => state.orderCreate);

  const { loading, success, error, order } = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12

  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);

  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);

  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      // console.log("order :", order);
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);

  ///////coupon////////////////////////////////

  const [displayCouponSuccess, setDisplayCouponSuccess] = useState(false);

  const [displayCouponFailure, setDisplayCouponFailure] = useState(false);

  const [coupon, setCoupon] = useState(0);

  const couponPrice = 5;

  const [passwordCoupon, setPasswordCoupon] = useState(null);

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

  ////////////////////////////////////////

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-md-9  col-sm-12">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {cart.shippingAddress.address},
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  ,{cart.shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-md-3 col-sm-12">
          <div className="card card-body">
            {cart.coupon < 1 && (
              <div className="accordion promo-accordion" id="cart-accordion">
                <div className="card">
                  <div className="card-header">
                    <h3 className="accordion-heading font-weight-semibold">
                      <a
                        href="#promocode"
                        role="button"
                        data-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="promocode"
                      >
                        Apply promo code
                        <span className="accordion-indicator">
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
                            className="feather feather-chevron-up"
                          >
                            <polyline points="18 15 12 9 6 15" />
                          </svg>
                        </span>
                      </a>
                    </h3>
                  </div>
                  <div
                    className="collapse show"
                    id="promocode"
                    data-parent="#cart-accordion"
                  >
                    <div className="card-body">
                      <form className="needs-validation" noValidate>
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="text"
                            id="cart-promocode"
                            placeholder="Promo code"
                            value={passwordCoupon}
                            onChange={(e) => setPasswordCoupon(e.target.value)}
                            required
                          />
                          {displayCouponFailure && (
                            <Alert
                              className="place-order-alert"
                              variant="warning"
                            >
                              Please provide a valid coupon code!
                            </Alert>
                          )}
                          <div className="invalid-feedback">
                            Please provide a valid promo code!
                          </div>
                        </div>
                        <button
                          className="btn btn-outline-primary btn-block"
                          onClick={handleCoupon}
                        >
                          Apply promo code
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>

              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>

              {cart.coupon > 0 ? (
                <>
                  <li>
                    <div className="row">
                      <div>
                        <s>
                          <strong> Order Total</strong>
                        </s>
                      </div>
                      <div>
                        <s>${cart.totalPrice.toFixed(2)}</s>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>
                        <strong> Order Total</strong>
                      </div>
                      <div>
                        <strong>
                          ${Number(cart.totalPrice.toFixed(2)) - cart.coupon}
                        </strong>
                      </div>
                    </div>
                  </li>{" "}
                  <Alert className="place-order-alert" variant="success">
                    the coupon is applied successfully
                  </Alert>
                </>
              ) : (
                <>
                  <li>
                    <div className="row">
                      <div>
                        <strong> Order Total</strong>
                      </div>
                      <div>
                        <strong>${cart.totalPrice.toFixed(2)}</strong>
                      </div>
                    </div>
                  </li>
                </>
              )}

              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
