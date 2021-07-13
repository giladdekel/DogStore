import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { cartReducer } from "./reducers/cartReducers";

import { wishlistReducer } from "./reducers/wishlistReducers";

import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  staticsDetailsReducer,
  orderListReducer,
  orderMineListReducer,
  orderPayReducer,
  orderEmailReducer,
  deliverEmailReducer,
} from "./reducers/orderReducers";

import {
  ticketCreateReducer,
  emailTicketCreateReducer,
  emailTicketCreateReducerAdmin,
  emailTicketAnswerReducer,
  emailTicketAnswerCommentReducer,
  ticketDeleteReducer,
  ticketAnswerReducer,
  ticketDetailsReducer,
  ticketListReducer,
  ticketMineListReducer,
  ticketPayReducer,
  ticketAnswerCreateReducer,
} from "./reducers/ticketReducers";

import {
  productCategoryListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewCreateReducer,
  productTopSellerListReducer,
  productUpdateReducer,
} from "./reducers/productReducers";

import {
  postCategoryListReducer,
  postCreateReducer,
  postDeleteReducer,
  postDetailsReducer,
  postListReducer,
  postCommentCreateReducer,
  postTopSellerListReducer,
  postUpdateReducer,
} from "./reducers/postReducers";

import {
  userAddressMapReducer,
  userDeleteReducer,
  userDetailsReducer,
  userFindByEmailReducer,
  userListReducer,
  userRegisterReducer,
  userSigninReducer,
  userTopSellerListReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
  userEmailReducer,
} from "./reducers/userReducers";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
    coupon: localStorage.getItem("coupon")
      ? JSON.parse(localStorage.getItem("coupon"))
      : 0,
  },
  wishlist: {
    wishlistItems: localStorage.getItem("wishlistItems")
      ? JSON.parse(localStorage.getItem("wishlistItems"))
      : [],
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  postList: postListReducer,
  postDetails: postDetailsReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userEmail: userEmailReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  staticsDetails: staticsDetailsReducer,
  orderPay: orderPayReducer,
  orderEmail: orderEmailReducer,
  deliverEmail: deliverEmailReducer,

  orderMineList: orderMineListReducer,

  ticketCreate: ticketCreateReducer,
  emailTicketCreate: emailTicketCreateReducer,
  emailTicketCreateAdmin: emailTicketCreateReducerAdmin,
  emailTicketAnswer: emailTicketAnswerReducer,
  emailTicketAnswerComment: emailTicketAnswerCommentReducer,

  ticketDetails: ticketDetailsReducer,
  ticketPay: ticketPayReducer,
  ticketMineList: ticketMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  postCreate: postCreateReducer,
  postUpdate: postUpdateReducer,
  postDelete: postDeleteReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  ticketList: ticketListReducer,
  ticketDelete: ticketDeleteReducer,
  ticketAnswer: ticketAnswerReducer,
  ticketAnswerCreate: ticketAnswerCreateReducer,

  userList: userListReducer,
  userDelete: userDeleteReducer,
  userTopSellersList: userTopSellerListReducer,
  productCategoryList: productCategoryListReducer,
  productReviewCreate: productReviewCreateReducer,
  postCategoryList: postCategoryListReducer,
  postCommentCreate: postCommentCreateReducer,
  userAddressMap: userAddressMapReducer,
  productTopSellersList: productTopSellerListReducer,
  postTopSellersList: postTopSellerListReducer,

  userFindByEmail: userFindByEmailReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
