import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as Logo } from "../../assets/pug.svg";

import "./Header.scss";

import "../../style.scss";

import { Route, NavLink } from "react-router-dom";

import SearchBox from "../SearchBox/SearchBox";
import { detailsUser, signout } from "./../../actions/userActions";
import { listProductCategories } from "../../actions/productActions";

// import "../../style.scss";
import LoadingBox from "./../LoadingBox";
import MessageBox from "./../MessageBox";

import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
// import { toggleCartHidden } from "./../../actions/cartActions";
const activeStyle = {
  color: "#ff8000",
};
function Header() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const [menuSidebarIsOpen, setMenuSidebarIsOpen] = useState(false);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  // console.log("userInfo :", userInfo);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const dispatch = useDispatch();

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success: successUpdateProfile } = userUpdateProfile;

  // useEffect(() => {
  //   dispatch(detailsUser(userInfo._id));
  // }, [successUpdateProfile]);

  console.log("user :", user);

  const signoutHandler = () => {
    dispatch(signout());
  };

  // const toggleCartHandler = () => {
  //   dispatch(toggleCartHidden());
  // };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  // const [buttonClicked, setButtonClicked] = useState(false);

  return (
    <>
      <div className="header-area">
        <header className="row">
          <div className="row">
            <button
              type="button"
              className="open-sidebar category-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>

            <button
              type="button"
              className="open-sidebar menu-sidebar"
              onClick={() => setMenuSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>

            <div className="logo-area">
              <NavLink className="logo-container" to="/">
                <Logo className="logo" />
              </NavLink>
            </div>
          </div>
          <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
          <div className="main-icons">
            {" "}
            <NavLink activeStyle={activeStyle} exact to="/">
              {" "}
              <i className="fas fa-home fa-2x icon"></i>{" "}
              <span className="header-title home-title">Home</span>
            </NavLink>
            {userInfo && userInfo.image ? (
              <div className="dropdown ">
                <NavLink activeStyle={activeStyle} to="/profile">
                  <img
                    className="avatar-img"
                    src={userInfo.image}
                    alt="Avatar"
                  />{" "}
                  <div className="header-title profile-title">
                    {userInfo.name}
                  </div>
                </NavLink>
                <ul className="dropdown-content avatar-drop">
                  <li>
                    <NavLink activeStyle={activeStyle} to="/profile">
                      Your Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeStyle={activeStyle} to="/orderhistory">
                      Order History
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeStyle={activeStyle} to="/tickethistory">
                      Ticket History
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </NavLink>
                  </li>
                </ul>
              </div>
            ) : userInfo ? (
              <div className="dropdown">
                <NavLink activeStyle={activeStyle} to="/profile">
                  {" "}
                  <i className="fas fa-user fa-2x icon"></i>
                  {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
                </NavLink>
                <ul className="dropdown-content">
                  <li>
                    <NavLink activeStyle={activeStyle} to="/profile">
                      User Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeStyle={activeStyle} to="/orderhistory">
                      Order History
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeStyle={activeStyle} to="/tickethistory">
                      Ticket History
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </NavLink>
                  </li>
                </ul>
              </div>
            ) : (
              <NavLink activeStyle={activeStyle} to="/signin">
                <i className="fas fa-sign-in-alt fa-2x icon"></i>
                <span className="header-title">Sign In</span>{" "}
              </NavLink>
            )}
            <NavLink
              activeStyle={activeStyle}
              to="/search/category/all/name/all/min/0/max/0/rating/0/order/newest/pageNumber/1"
            >
              {" "}
              <i class="fas fa-store fa-2x icon"></i>{" "}
              <span className="header-title shop-title">Shop</span>
            </NavLink>
            <NavLink activeStyle={activeStyle} to="/about">
              <i className="fas fa-lightbulb fa-2x icon"></i>
              <span className="header-title about-title">About</span>
            </NavLink>
            <NavLink activeStyle={activeStyle} to="/blog">
              <i className="fab fa-microblog  fa-2x icon"></i>{" "}
              <span className="header-title blog-title">Blog</span>
            </NavLink>
            <NavLink activeStyle={activeStyle} to="/contact-area">
              <i className="fab fa-facebook-messenger fa-2x "></i>{" "}
              <span className="header-title">Contact</span>
            </NavLink>{" "}
            <NavLink activeStyle={activeStyle} to="/wishlist">
              {" "}
              <i className="fas fa-heart fa-2x"></i>
              <span className="header-title">Wishlist</span>
              {wishlistItems.length > 0 && (
                <span className="badge">{wishlistItems.length}</span>
              )}
            </NavLink>
            <div className="dropdown">
              <NavLink activeStyle={activeStyle} to="/cart">
                <i className="fas fa-shopping-cart fa-2x cart-header-icon"></i>
                <span className="header-title cart-title">Cart</span>
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
                <i className="fa fa-caret-down"></i>
              </NavLink>
              <ul className="dropdown-content">
                <CartDropdown />
              </ul>
            </div>
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <NavLink to="#admin">
                  <i className="fas fa-handshake  fa-2x icon"></i>
                  <span className="header-title">Seller</span>
                  <i className="fa fa-caret-down"></i>
                </NavLink>
                <ul className="dropdown-content">
                  <li>
                    <NavLink to="/productlist/seller">Products</NavLink>
                  </li>
                  <li>
                    <NavLink to="/orderlist/seller">Orders</NavLink>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <NavLink activeStyle={activeStyle} to="/dashboard">
                  <i className="fas fa-th fa-2x icon"></i>{" "}
                  <span className="header-title">Admin</span>
                  <i className="fa fa-caret-down"></i>
                </NavLink>
                <ul activeStyle={activeStyle} className="dropdown-content">
                  <li>
                    <NavLink activeStyle={activeStyle} to="/dashboard">
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeStyle={activeStyle} to="/productlist">
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeStyle={activeStyle} to="/orderlist">
                      Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeStyle={activeStyle} to="/userlist">
                      Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeStyle={activeStyle} to="/ticketlist">
                      Tickets
                    </NavLink>
                  </li>

                  <li>
                    <NavLink activeStyle={activeStyle} to="/postlist">
                      Posts
                    </NavLink>
                  </li>

                  <li>
                    <NavLink activeStyle={activeStyle} to="/support">
                      Support
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
      </div>
      <aside className={sidebarIsOpen ? "open" : ""}>
        <ul className="categories">
          <li>
            <strong>Categories</strong>
            <button
              onClick={() => setSidebarIsOpen(false)}
              className="close-sidebar"
              type="button"
            >
              <i className="fa fa-close"></i>
            </button>
          </li>
          {loadingCategories ? (
            <LoadingBox></LoadingBox>
          ) : errorCategories ? (
            <MessageBox variant="danger">{errorCategories}</MessageBox>
          ) : (
            categories.map((c) => (
              <li key={c}>
                <NavLink
                  to={`/search/category/${c}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  {c}
                </NavLink>
              </li>
            ))
          )}
        </ul>{" "}
      </aside>
      <div className="menu-sidebar">
        <aside className={menuSidebarIsOpen ? "open" : ""}>
          <ul>
            <li>
              <strong>Menu</strong>
              <button
                onClick={() => setMenuSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>

            <li>
              <NavLink activeStyle={activeStyle} exact to="/">
                {" "}
                <i className="fas fa-home  icon"></i>{" "}
                <span className="header-title home-title">Home</span>
              </NavLink>
            </li>
            {userInfo ? (
              <li>
                <NavLink activeStyle={activeStyle} to="/profile">
                  {" "}
                  <i className="fas fa-user icon "></i>
                  {userInfo.name}{" "}
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink activeStyle={activeStyle} to="/signin">
                  <i className="fas fa-sign-in-alt icon"></i>
                  <span className="header-title">Sign In</span>{" "}
                </NavLink>
              </li>
            )}

            <li>
              <NavLink
                activeStyle={activeStyle}
                to="/search/category/all/name/all/min/0/max/0/rating/0/order/newest/pageNumber/1"
              >
                {" "}
                <i class="fas fa-store icon"></i>{" "}
                <span className="header-title shop-title">Shop</span>
              </NavLink>
            </li>
            <li>
              <NavLink activeStyle={activeStyle} to="/about">
                <i className="fas fa-lightbulb icon"></i>
                <span className="header-title about-title">About</span>
              </NavLink>
            </li>
            <li>
              <NavLink activeStyle={activeStyle} to="/blog">
                <i className="fab fa-microblog  icon"></i>{" "}
                <span className="header-title blog-title">Blog</span>
              </NavLink>
            </li>
            <li>
              <NavLink activeStyle={activeStyle} to="/contact-area">
                <i className="fab fa-facebook-messenger "></i>{" "}
                <span className="header-title">Contact</span>
              </NavLink>{" "}
            </li>
            <li>
              <NavLink activeStyle={activeStyle} to="/wishlist">
                {" "}
                <i className="fas fa-heart"></i>
                <span className="header-title  icon">Wishlist</span>
                {wishlistItems.length > 0 && (
                  <span className="badge">{wishlistItems.length}</span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink activeStyle={activeStyle} to="/cart">
                <i className="fas fa-shopping-cart  cart-header-icon"></i>
                <span className="header-title cart-title">Cart</span>
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
              </NavLink>
            </li>
            <li>
              {userInfo && userInfo.isAdmin && (
                <NavLink activeStyle={activeStyle} to="/dashboard">
                  <i className="fas fa-th  icon"></i>{" "}
                  <span className="header-title">Admin</span>
                </NavLink>
              )}
            </li>
          </ul>{" "}
        </aside>
      </div>{" "}
    </>
  );
}

export default Header;
