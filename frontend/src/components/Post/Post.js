import React, { useEffect } from "react";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

import { withRouter, Link } from "react-router-dom";

import "./Post.scss";
import Rating from "../Rating/Rating";
import { useDispatch, useSelector } from "react-redux";

const Post = (props) => {
  const { post } = props;
  //   console.log("post :", post);

  return (
    <div className="col-sm-6">
      <div className="blog-grid">
        <div className="blog-img">
          <div className="date">
            <span>{post.createdAt.slice(5, 10)}</span>
            <label>{post.createdAt.slice(0, 4)}</label>
          </div>
          <a href="#">
            <img width="400" height="200" src={post.image} title alt />
          </a>
        </div>
        <div className="blog-info">
          <h5>
            <a href="#">{post.name}</a>
          </h5>
          <p>{post.description.slice(0, 110)}...</p>
          <div className="btn-bar">
            <a href="#" className="px-btn-arrow">
              <Rating
                rating={post.rating}
                numComments={post.numComments}
                blog={"blog"}
              ></Rating>
              <Link to={`/post/${post._id}`}>
                <span>Read More</span>
              </Link>
              <i className="arrow" />
            </a>
          </div>
        </div>
      </div>
    </div>

    // <>
    //   <div className="collection-item col-md-3 col-sm-6">
    //     <div className="product-grid6">
    //       <div className="product-image6">
    //         <Link to={`/post/${post._id}`}>
    //           <div className="view-image" src={post.image} alt={post.name}>
    //             <img className="pic-1" src={post.image} />
    //           </div>
    //         </Link>
    //       </div>
    //       <div className="product-content">
    //         <Link to={`/post/${post._id}`}>
    //           <h3 className="title">
    //             <a href="#">{post.name}</a>
    //           </h3>
    //         </Link>
    //         <Rating rating={post.rating} numReviews={post.numReviews}></Rating>
    //         <div className="price">
    //           ${post.price}
    //           <span>${post.price + 10}</span>
    //         </div>
    //       </div>
    //       <ul className="social">
    //         {" "}
    //         {displayMessage && (
    //           <Alert variant="success">
    //             {qty === 1 ? (
    //               <p> Item of this post are now in your shopping cart </p>
    //             ) : (
    //               <p>{qty} Items of this post are now in your shopping cart </p>
    //             )}
    //           </Alert>
    //         )}
    //         {displayWishMessage && (
    //           <Alert variant="info">
    //             <p>Item was add to your wishlist </p>
    //           </Alert>
    //         )}
    //         {/* <Link to={`/post/${post._id}`}>
    //           <div className="add-to-cart text-view">VIEW PRODUCT</div>
    //         </Link> */}
    //         <div className="post_quantity">
    //           {" "}
    //           <span>QTY: </span>{" "}
    //           <div>
    //             <select value={qty} onChange={(e) => setQty(e.target.value)}>
    //               {[...Array(post.countInStock).keys()].map((x) => (
    //                 <option key={x + 1} value={x + 1}>
    //                   {x + 1}
    //                 </option>
    //               ))}
    //             </select>
    //           </div>
    //         </div>
    //         <li onClick={handleShow}>
    //           <a href data-tip="Quick View">
    //             <i className="fa fa-search" />
    //           </a>
    //         </li>
    //         {wishlistItem ? (
    //           <li>
    //             <a href data-tip="The item is in your wishlist">
    //               <i className="fa fa-heart" style={{ color: "red" }} />
    //             </a>
    //           </li>
    //         ) : (
    //           <li>
    //             <a onClick={handleWishBtnClick} href data-tip="Add to Wishlist">
    //               <i className="fa fa-heart" />
    //             </a>
    //           </li>
    //         )}
    //         <li>
    //           <a
    //             onClick={() => {
    //               dispatch(addToCart(post._id, qty));
    //               setDisplayMessage(true);

    //               setTimeout(() => {
    //                 setDisplayMessage(false);

    //                 // props.history.push(`/cart/${post._id}?`);
    //               }, 2000);
    //             }}
    //             href
    //             data-tip="Add to Cart"
    //           >
    //             <i className="fa fa-shopping-cart" />
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    //   <Modal show={show} onHide={handleClose}>
    //     <Modal.Header closeButton>
    //       <Link to={`/post/${post._id}`}>
    //         <Modal.Title></Modal.Title>
    //       </Link>
    //     </Modal.Header>

    //     <Modal.Body>
    //       <div className="modal-content">
    //         <Link to={`/post/${post._id}`}>
    //           <img src={post.image} alt="modal" />
    //         </Link>

    //         <br />
    //         <p>${post.price}</p>
    //         <p>{post.description}</p>
    //         {displayMessage && (
    //           <Alert variant="success">
    //             {qty === 1 ? (
    //               <p> Item of this post are now in your shopping cart </p>
    //             ) : (
    //               <p>{qty} Items of this post are now in your shopping cart </p>
    //             )}
    //           </Alert>
    //         )}
    //       </div>{" "}
    //     </Modal.Body>
    //     <Modal.Footer>
    //       {" "}
    //       {post.name}{" "}
    //       {wishlistItem ? (
    //         <li>
    //           <a href data-tip="The item is in your wishlist">
    //             <i className="fa fa-heart" style={{ color: "red" }} />
    //           </a>
    //         </li>
    //       ) : (
    //         <li>
    //           <a onClick={handleWishBtnClick} href data-tip="Add to Wishlist">
    //             <i className="fa fa-heart" />
    //           </a>
    //         </li>
    //       )}
    //       {/* <Button variant="secondary" onClick={handleClose}>
    //         Close
    //       </Button> */}
    //       {/*
    //       <Link to={`/post/${post._id}`}>
    //         <button className=" go-to-post-btn btn btn-success  ">
    //           Go to the post page
    //         </button>
    //       </Link> */}
    //       <>
    //         <div className="product_quantity">
    //           {" "}
    //           <span>QTY: </span>{" "}
    //           <div>
    //             <select value={qty} onChange={(e) => setQty(e.target.value)}>
    //               {[...Array(post.countInStock).keys()].map((x) => (
    //                 <option key={x + 1} value={x + 1}>
    //                   {x + 1}
    //                 </option>
    //               ))}
    //             </select>
    //           </div>
    //         </div>

    //         {button2Clicked ? (
    //           <div className="center animation-cart-2">
    //             <div className="buttons d-flex flex-row">
    //               <div className="cart">
    //                 <i className="fa fa-shopping-cart" />
    //               </div>
    //               <button
    //                 onClick={() => {
    //                   dispatch(addToCart(post._id, qty));

    //                   setButton2Clicked(true);
    //                   setDisplayMessage(true);
    //                   setTimeout(() => {
    //                     setDisplayMessage(false);
    //                   }, 2000);
    //                 }}
    //                 className="btn btn-success cart-button px-5 clicked animated-btn-2"
    //               >
    //                 <span className="dot">{qty} </span>Add to cart
    //               </button>
    //             </div>
    //           </div>
    //         ) : (
    //           <div className="center animation-cart-2">
    //             <div className="buttons d-flex flex-row">
    //               <div className="cart">
    //                 <i className="fa fa-shopping-cart" />
    //               </div>
    //               <button
    //                 onClick={() => {
    //                   dispatch(addToCart(post._id, qty));
    //                   setDisplayMessage(true);
    //                   setButton2Clicked(true);

    //                   setTimeout(() => {
    //                     setDisplayMessage(false);
    //                   }, 2000);
    //                 }}
    //                 className="btn btn-primary cart-button px-5 animated-btn-2 "
    //               >
    //                 <span className="dot">{qty} </span>Add to cart
    //               </button>
    //             </div>
    //           </div>
    //         )}

    //         <div
    //           onClick={addToCartHandler}
    //           className="buttons cart-button-animation"
    //         >
    //           {buttonClicked ? (
    //             <button
    //               className="cart-button clicked "
    //               onClick={() => setButtonClicked(true)}
    //             >
    //               <span className="add-to-cart ">Buy Now</span>
    //               <span className="added ">Move to Cart</span>
    //               <i className="fa fa-shopping-cart " />{" "}
    //               <i className="fa fa-square " />
    //             </button>
    //           ) : (
    //             <button
    //               className="cart-button "
    //               onClick={() => setButtonClicked(true)}
    //             >
    //               <span className="add-to-cart ">Buy Now</span>
    //               <span className="added ">Move to Cart</span>
    //               <i className="fa fa-shopping-cart " />{" "}
    //               <i className="fa fa-square " />
    //             </button>
    //           )}
    //         </div>
    //       </>
    //     </Modal.Footer>
    //   </Modal>
    // </>
  );
};

export default withRouter(Post);
