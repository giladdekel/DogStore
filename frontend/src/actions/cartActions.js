import Axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_COUPON,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_ADD_ITEM_FAIL,
  TOGGLE_CART_HIDDEN,
  CART_EMPTY,
} from "../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  // console.log("qty :", qty);
  // console.log("productId :", productId);
  const { data } = await Axios.get(`/api/products/${productId}`);

  const {
    cart: { cartItems },
  } = getState();

  if (cartItems.length > 0 && data.seller._id !== cartItems[0].seller._id) {
    dispatch({
      type: CART_ADD_ITEM_FAIL,
      payload: `Can't Add To Cart. Buy only from ${cartItems[0].seller.seller.name} in this order`,
    });
  } else {
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        name: data.name,
        category: data.category,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        product: data._id,
        seller: data.seller,
        qty: Number(qty),
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  }
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};

export const saveCoupon = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_COUPON, payload: data });
  localStorage.setItem("coupon", JSON.stringify(data));
};

export const toggleCartHidden = () => (dispatch) => {
  dispatch({ type: TOGGLE_CART_HIDDEN });
};

export const emptyCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_EMPTY, payload: productId });
  localStorage.removeItem("cartItems");
};
