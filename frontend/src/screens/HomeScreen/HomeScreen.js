import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Product from "../../components/Product/Product";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import {
  listProducts,
  listProductCategoriesThreeProducts,
} from "../../actions/productActions";
import { listTopProducts } from "../../actions/productActions";

// import { listTopSellers } from "../../actions/userActions";
import { Link } from "react-router-dom";

import "./HomeScreen.scss";
import Rating from "../../components/Rating/Rating";
import { listPosts, listTopPosts } from "./../../actions/postActions";
export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // const userTopSellersList = useSelector((state) => state.userTopSellersList);
  // const {
  //   loading: loadingSellers,
  //   error: errorSellers,
  //   users: sellers,
  // } = userTopSellersList;

  const { productTopSellersList } = useSelector((state) => state);

  const {
    loading: loadingTopProducts,
    error: errorTopProducts,
    topProducts: topProducts,
  } = productTopSellersList;

  const { productCategoryList } = useSelector((state) => state);

  const { categoriesProducts } = productCategoryList;

  const wishlist = useSelector((state) => state.wishlist);
  // console.log("wishlist :", wishlist);
  const {
    loading: loadingWishlist,
    error: errorWishlist,
    wishlistItems,
  } = wishlist;

  const postList = useSelector((state) => state.postList);
  const { loading: loadingPosts, error: errorPosts, posts } = postList;

  useEffect(() => {
    dispatch(listProducts({}));
    // dispatch(listTopSellers());
    dispatch(listTopProducts());
    dispatch(listProductCategoriesThreeProducts());

    dispatch(listPosts({}));
  }, [dispatch]);

  const [counter, setCounter] = useState(11);
  return (
    <>
      <div className="home-screen">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <>
              <div className="row cool-animation">
                <div className="container moving-item">
                  <div className="card1">
                    <div className="circle" />
                    <div className="content">
                      <h5>Dog Best Friends</h5>
                      <p>
                        Welcome to "Dog Best Friends" Store - The Best Products
                        for Our Best Friends
                      </p>
                      <Link to="/search/category/all/name/all/min/0/max/0/rating/0/order/newest/pageNumber/1">
                        <button>Go Shopping</button>
                      </Link>
                    </div>{" "}
                    <img width={130} src="./images/pugTrans.jpg" />
                  </div>
                </div>
              </div>
            </>

            <>
              <div className="movie-view">
                {/* <h1>Top Rating</h1> */}
                <div className="container">
                  <div id="carousel">
                    {topProducts &&
                      topProducts.map((product) => (
                        <figure key={product._id}>
                          <Link to={`/product/${product._id}`}>
                            <img src={product.image} />
                            <Rating
                              rating={product.rating}
                              numReviews={product.numReviews}
                            ></Rating>
                          </Link>{" "}
                        </figure>
                      ))}
                  </div>
                </div>
              </div>
            </>

            <div className="top-brands">
              <div className="container">
                <h1>Categories</h1>
                {Object.entries(categoriesProducts).map(
                  ([category, array], index1) => (
                    <div className="cardList" key={index1}>
                      {array.map(({ image, _id }, index2) => (
                        <div className="card" key={index2}>
                          <Link to={`/product/${_id}`}>
                            <div
                              className="card__bg"
                              style={{
                                backgroundImage: `url(${image})`,
                                height:
                                  "300px" /* You must set a specified height */,
                                backgroundPosition:
                                  "center" /* Center the image */,
                                backgroundRepeat:
                                  "no-repeat" /* Do not repeat the image */,
                                backgroundSize:
                                  "cover" /* Resize the background image to cover the entire container */,
                              }}
                            />
                          </Link>
                        </div>
                      ))}
                      <Link to={`/${category}`}>
                        <span className="cardList__title">{category}</span>
                      </Link>
                    </div>
                  )
                )}
              </div>
            </div>
          </>
        )}
        <div className="products-home-display">
          <Link to="search/category/all/name/all/min/0/max/0/rating/0/order/newest/pageNumber/1">
            <h2>
              New <b>Products</b>
            </h2>
          </Link>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <div className="margin-left-image">
                <div className="row center">
                  {products
                    .map((product) => (
                      <Product key={product._id} product={product} />
                    ))
                    .filter((p, i) => i < 3)}
                </div>
              </div>
            </>
          )}
          <Link to="search/category/all/name/all/min/0/max/0/rating/0/order/toprated/pageNumber/1">
            <h2>
              Top <b>Rating</b>
            </h2>
          </Link>
          {loadingTopProducts ? (
            <LoadingBox></LoadingBox>
          ) : errorTopProducts ? (
            <MessageBox variant="danger">{errorTopProducts}</MessageBox>
          ) : (
            <>
              {topProducts.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <div className="margin-left-image">
                <div className="row center">
                  {topProducts
                    .map((product) => (
                      <Product key={product._id} product={product} />
                    ))
                    .filter((p, i) => i < 3)}
                </div>
              </div>
            </>
          )}

          {loadingWishlist ? (
            <LoadingBox></LoadingBox>
          ) : errorWishlist ? (
            <MessageBox variant="danger">{errorWishlist}</MessageBox>
          ) : (
            <>
              {wishlistItems.length > 0 && (
                <div className="margin-left-image">
                  {" "}
                  <Link to="/wishlist">
                    <h2>
                      Products <b>You Like</b>
                    </h2>
                  </Link>
                  <div className="row center">
                    {wishlistItems
                      .map((product) => (
                        <Product key={product._id} product={product} wishlist />
                      ))
                      .filter((p, i) => i < 3)}
                  </div>
                </div>
              )}
            </>
          )}
        </div>{" "}
        {loadingPosts ? (
          <LoadingBox></LoadingBox>
        ) : errorPosts ? (
          <MessageBox variant="danger">{errorPosts}</MessageBox>
        ) : (
          <>
            <div className="blog-area-home">
              <div>
                <link
                  rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css"
                  integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc="
                  crossOrigin="anonymous"
                />
                <div className="container mt-100 mt-60">
                  <div className="row">
                    <div className="col-12 text-center">
                      <div className="section-title mb-4 pb-2">
                        <Link to="/blog">
                          <h4 className="title mb-4">Latest Blog &amp; News</h4>
                        </Link>
                        <p className="text-muted para-desc mx-auto mb-0">
                          Enjoy the interesting posts and news of our blog, from
                          the most experienced and interesting authors.
                        </p>
                      </div>
                    </div>
                    {/*end col*/}
                  </div>
                  {/*end row*/}
                  <div className="row">
                    {posts &&
                      posts
                        .reverse()
                        .filter((post, id) => id < 3)
                        .map((post) => (
                          <div
                            key={post._id}
                            className="col-lg-4 col-md-6 mt-4 pt-2"
                          >
                            <div className="blog-post rounded border">
                              <div className="blog-img d-block overflow-hidden position-relative">
                                <img
                                  src={post.image}
                                  className="img-fluid rounded-top"
                                  alt
                                />
                                <div className="overlay rounded-top bg-dark" />{" "}
                                <div className="post-meta">
                                  <a
                                    href="javascript:void(0)"
                                    className="text-light d-block text-right like"
                                  >
                                    <i
                                      onClick={() => setCounter(counter + 1)}
                                      className="mdi mdi-heart"
                                    />{" "}
                                    {counter}
                                  </a>
                                  <Link to={`/post/${post._id}`}>
                                    <a
                                      href="javascript:void(0)"
                                      className="text-light read-more"
                                    >
                                      Read More{" "}
                                      <i className="mdi mdi-chevron-right" />
                                    </a>
                                  </Link>
                                </div>
                              </div>
                              <div className="content p-3">
                                <small className="text-muted p float-right">
                                  {post.createdAt.slice(0, 10)}
                                </small>
                                <small>
                                  <a
                                    href="javascript:void(0)"
                                    className="text-primary"
                                  >
                                    {post.category}
                                  </a>
                                </small>
                                <h4 className="mt-2">
                                  <Link to={`/post/${post._id}`}>
                                    <a
                                      href="javascript:void(0)"
                                      className="text-dark title"
                                    >
                                      {post.name}
                                    </a>
                                  </Link>
                                </h4>
                                <p className="text-muted mt-2">
                                  {post.description.slice(0, 150)}...
                                </p>{" "}
                                <Rating
                                  rating={post.rating}
                                  numComments={post.numComments}
                                  blog={"blog"}
                                ></Rating>
                                <div className="pt-3 mt-3 border-top d-flex">
                                  <img
                                    src={post.authorImage}
                                    className="img-fluid avatar avatar-ex-sm rounded-pill mr-3 shadow"
                                    alt
                                  />

                                  <div className="author mt-2">
                                    <h6 className="mb-0">
                                      <a
                                        href="javascript:void(0)"
                                        className="text-dark name"
                                      >
                                        {post.author}
                                      </a>
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/*end blog post*/}
                          </div>
                        ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
