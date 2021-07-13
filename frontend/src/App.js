import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {  useSelector } from "react-redux";

import ScrollToTop from "./components/scroll-to-top/scroll-to-top.component";

import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import CartScreen from "./screens/CartScreen/CartScreen";
import WishlistScreen from "./screens/WishlistScreen/WishlistScreen";

import HomeScreen from "./screens/HomeScreen/HomeScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderScreen from "./screens/OrderScreen";

/////////////////////////////tickeys////////////////

import TicketHistoryScreen from "./screens/TicketHistoryScreen";
////////////////////////////////////////

import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductListScreen from "./screens/ProductListScreen";
import PostListScreen from "./screens/PostListScreen";

import ProductScreen from "./screens/ProductScreen/ProductScreen";
import PostScreen from "./screens/PostScreen/PostScreen";

import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen/SigninScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import PostEditScreen from "./screens/PostEditScreen";

import OrderListScreen from "./screens/OrderListScreen/OrderListScreen";
import TicketListScreen from "./screens/TicketListScreen";

import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import SellerRoute from "./components/SellerRoute";
import SellerScreen from "./screens/SellerScreen";
import SearchScreen from "./screens/SearchScreen/SearchScreen";

import MapScreen from "./screens/MapScreen";

import SupportScreen from "./screens/SupportScreen";
import ChatBox from "./components/ChatBox";

import NotFoundPage from "./screens/notfound/notfound.component";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AboutPage from "./screens/about/about.component";
import ContactPage from "./screens/contact/contact.component";
import DashboardScreen from "./screens/DashboardScreen/DashboardScreen";
import BlogScreen from "./screens/BlogScreen/BlogScreen";
import ContactScreen from "./screens/ContactScreen/ContactScreen";
import TicketScreen from "./screens/TicketScreen";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <Router>
      <ScrollToTop />

      <div className="grid-container">
        <Header />{" "}
        <Switch>
          <Route path="/seller/:id" component={SellerScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/wishlist" component={WishlistScreen}></Route>

          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/post/:id" component={PostScreen} exact></Route>

          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>

          <Route path="/post/:id/edit" component={PostEditScreen} exact></Route>

          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>

          <Route path="/ticket/:id" component={TicketScreen}></Route>
          <Route path="/tickethistory" component={TicketHistoryScreen}></Route>

          <Route path="/contact-area" component={ContactScreen}></Route>

          <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          ></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <PrivateRoute path="/map" component={MapScreen}></PrivateRoute>

          <AdminRoute
            path="/dashboard"
            component={DashboardScreen}
            exact
          ></AdminRoute>

          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/postlist"
            component={PostListScreen}
            exact
          ></AdminRoute>

          <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/postlist/pageNumber/:pageNumber"
            component={PostListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
            exact
          ></AdminRoute>

          <AdminRoute
            path="/ticketlist"
            component={TicketListScreen}
            exact
          ></AdminRoute>

          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>

          <AdminRoute path="/support" component={SupportScreen}></AdminRoute>

          <SellerRoute
            path="/productlist/seller"
            component={ProductListScreen}
          ></SellerRoute>
          <SellerRoute
            path="/orderlist/seller"
            component={OrderListScreen}
          ></SellerRoute>

          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/blog" component={BlogScreen}></Route>

          <Route path="/about" component={AboutPage} />

          <Route path="/contact" component={ContactPage} />

          <Route component={NotFoundPage} />
        </Switch>
        <footer className="row center">
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
        </footer>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
