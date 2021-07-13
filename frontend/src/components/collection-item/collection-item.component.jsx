import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";

import { Alert, Button, Modal } from "react-bootstrap";

import "./collection-item.styles.scss";

import Rating from "../Rating/Rating";

const CollectionItem = (props) => {
  const { product } = props;

  const [displayMessage, setDisplayMessage] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const handleCartBtnClick = () => {
  //   // addItem({ id, name, price, imageUrl });

  //   addItem(item);

  //   setDisplayMessage(true);

  //   setTimeout(() => {
  //     setDisplayMessage(false);
  //   }, 3000);
  // };

  // const [displayWishMessage, setDisplayWishMessage] = useState(false);

  // const handleWishBtnClick = () => {
  //   addWishItem(item);

  //   setDisplayWishMessage(true);

  //   setTimeout(() => {
  //     setDisplayWishMessage(false);
  //   }, 3000);
  // };

  return (
    <div className="collection-item">
      <div className="col-md-3 col-sm-6">
        <div className="product-grid6">
          <div className="product-image6">
            <Link to={`/product/${product._id}`}>
              <div
                className="view-image"
                src={product.image}
                alt={product.name}
              >
                <img className="pic-1" src={product.image} />
              </div>
            </Link>
          </div>
          <div className="product-content">
            <Link to={`/product/${product._id}`}>
              <h3 className="title">
                <a href="#">{product.name}</a>
              </h3>
            </Link>
            <Rating
              rating={product.rating}
              numReviews={product.numReviews}
            ></Rating>
            <div className="price">
              ${product.price}
              <span>${product.price + 10}</span>
            </div>
          </div>
          <ul className="social">
            {" "}
            {/* {displayMessage && (
              <Alert variant="success">
                <p>Item was add to your shopping cart </p>
              </Alert>
            )}
            {displayWishMessage && (
              <Alert variant="success">
                <p>Item was add to your WishList </p>
              </Alert>
            )} */}
            <li onClick={handleShow}>
              <a href data-tip="Quick View">
                <i className="fa fa-search" />
              </a>
            </li>
            <li>
              <a href data-tip="Add to Wishlist">
                <i className="fa fa-shopping-bag" />
              </a>
            </li>
            <li>
              <a href data-tip="Add to Cart">
                <i className="fa fa-shopping-cart" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{product.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="modal-content">
            <img src={product.image} alt="modal" />
            <br />
            <p>${product.price}</p>
            <p>{product.description}</p>
            {displayMessage && (
              <Alert variant="success">
                <p>Item was add to your shopping cart </p>
              </Alert>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button className=" go-to-product-btn btn btn-success">
            Go to the product page
          </button>
          <Button variant="primary" className="add-to-cart-btn btn btn-primary">
            Add to Cart
            <i className="fas fa-shopping-cart"></i>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default withRouter(CollectionItem);
