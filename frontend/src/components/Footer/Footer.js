import React from "react";
// const year = new Date().getFullYear();
// <p>Copyright ⓒ {year}</p>
import "./Footer.scss";
import { NavLink } from "react-router-dom";

const activeStyle = {
  color: "#f7a116",
};
function Footer() {
  return (
    <>
      <div className="footer-component">
        <footer id="dk-footer" className="dk-footer">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-4">
                <div className="dk-footer-box-info">
                  <a href="index.html" className="footer-logo">
                    <img
                      src="https://cdn.pixabay.com/photo/2017/12/27/14/02/friends-3042751_960_720.jpg"
                      alt="footer_logo"
                      className="img-fluid"
                    />
                  </a>
                  <p className="footer-info-text">
                    The best products to our best friends
                  </p>
                  <div className="footer-social-link">
                    <h3>Follow us</h3>
                    <ul>
                      <li>
                        <a href="https://www.facebook.com/">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.twitter.com/">
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.google.com/">
                          <i className="fa fa-google-plus" />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.linkedin.com/">
                          <i className="fa fa-linkedin" />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.instagram.com/">
                          <i className="fa fa-instagram" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* End Social link */}
                </div>
                {/* End Footer info */}
              </div>
              {/* End Col */}
              <div className="col-md-12 col-lg-8 Down-footer">
                <div className="row">
                  <div className="col-md-6">
                    <div className="contact-us">
                      <div className="contact-icon">
                        <i className="fa fa-map-o" aria-hidden="true" />
                      </div>
                      {/* End contact Icon */}
                      <div className="contact-info">
                        <h3>Rehovot, Israel</h3>
                        <p>Moskovich 19</p>
                      </div>
                      {/* End Contact Info */}
                    </div>
                    {/* End Contact Us */}
                  </div>
                  {/* End Col */}
                  <div className="col-md-6">
                    <div className="contact-us contact-us-last">
                      <div className="contact-icon">
                        <i
                          className="fa fa-volume-control-phone"
                          aria-hidden="true"
                        />
                      </div>
                      {/* End contact Icon */}
                      <div className="contact-info">
                        <h3>08 111 1 1111</h3>
                        <p>Contact Us</p>
                      </div>
                      {/* End Contact Info */}
                    </div>
                    {/* End Contact Us */}
                  </div>
                  {/* End Col */}
                </div>
                {/* End Contact Row */}
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <div className="footer-widget footer-left-widget">
                      <div className="section-heading">
                        <h3>Useful Links</h3>
                        <span className="animate-border border-black" />
                      </div>
                      <ul>
                        <li>
                          <NavLink
                            className="option"
                            activeStyle={activeStyle}
                            to="/about"
                          >
                            About
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="option"
                            activeStyle={activeStyle}
                            to="/shop"
                          >
                            Collections
                          </NavLink>{" "}
                        </li>
                        <li>
                          <NavLink
                            className="option"
                            activeStyle={activeStyle}
                            to="/store"
                          >
                            Store
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="option"
                            activeStyle={activeStyle}
                            to="/blog"
                          >
                            Blog
                          </NavLink>{" "}
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <NavLink
                            className="option"
                            activeStyle={activeStyle}
                            to="/contact"
                          >
                            Contact
                          </NavLink>{" "}
                        </li>
                        <li>
                          <NavLink
                            className="option"
                            activeStyle={activeStyle}
                            to="/signin"
                          >
                            Sign In
                          </NavLink>{" "}
                        </li>
                        <li>
                          <NavLink
                            className="option"
                            activeStyle={activeStyle}
                            to="/signout"
                          >
                            Sign Out
                          </NavLink>{" "}
                        </li>
                        <li>
                          <NavLink
                            className="option"
                            activeStyle={activeStyle}
                            to="/shop"
                          >
                            <i className="fa fa-cart-plus mr-2"></i>{" "}
                          </NavLink>{" "}
                        </li>
                      </ul>
                    </div>
                    {/* End Footer Widget */}
                  </div>
                  {/* End col */}
                  <div className="col-md-12 col-lg-6">
                    <div className="footer-widget">
                      <div className="section-heading">
                        <h3>Subscribe</h3>
                        <span className="animate-border border-black" />
                      </div>
                      <p>
                        {/* Don’t miss to subscribe to our new feeds, kindly fill the form below. */}
                        Subscribe to get more promotions and discounts
                      </p>
                      <form action="#">
                        <div className="form-row">
                          <div className="col dk-footer-form">
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Email Address"
                            />
                            <button type="submit">
                              <i className="fa fa-send" />
                            </button>
                          </div>
                        </div>
                      </form>
                      {/* End form */}
                    </div>
                    {/* End footer widget */}
                  </div>
                  {/* End Col */}
                </div>
                {/* End Row */}
              </div>
              {/* End Col */}
            </div>
            {/* End Widget Row */}{" "}
            <span className="copyright">
              Copyright © {new Date().getFullYear()}, All Right Reserved Dog
              best friends
            </span>
          </div>
          {/* End Contact Container */}

          {/* End Copyright */}
          {/* Back to top */}

          {/* End Copyright Container */}
          {/* End Back to top */}
        </footer>
      </div>
    </>
  );
}

export default Footer;
