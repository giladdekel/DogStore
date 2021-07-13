import Axios from "axios";
import {
  WISHLIST_ADD_ITEM,
  WISHLIST_REMOVE_ITEM,
  WISHLIST_EMPTY,
} from "../constants/wishlistConstants";

export const addToWishlist = (productId) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${productId}`);

  const {
    wishlist: { wishlistItems },
  } = getState();

  dispatch({
    type: WISHLIST_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
    },
  });
  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlistItems)
  );
};

export const removeFromWishlist = (productId) => (dispatch, getState) => {
  dispatch({ type: WISHLIST_REMOVE_ITEM, payload: productId });
  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlistItems)
  );
};

export const emptyWishlist = (productId) => (dispatch, getState) => {
  dispatch({ type: WISHLIST_EMPTY, payload: productId });
  localStorage.removeItem("wishlistItems");
};
