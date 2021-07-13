import React, { useEffect } from "react";
import Post from "../../components/Post/Post";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listPosts, listTopPosts } from "../../actions/postActions";

import Rating from "../../components/Rating/Rating";

// import { listTopSellers } from "../../actions/userActions";

import { Link } from "react-router-dom";

import "./BlogScreen.scss";
export default function BlogScreen() {
  const dispatch = useDispatch();

  const postList = useSelector((state) => state.postList);
  const { loading: loadingPostList, error: errorPostList, posts } = postList;

  const postTopSellersList = useSelector((state) => state.postTopSellersList);

  const {
    loading: loadingTopPosts,
    error: errorTopPosts,
    topPosts: topPosts,
  } = postTopSellersList;

  // const { postTopSellersList } = useSelector((state) => state);

  // const {
  //   loading: loadingTopPosts,
  //   error: errorTopPosts,
  //   topPosts: topPosts,
  // } = postTopSellersList;

  // const { postCategoryList } = useSelector((state) => state);

  // const { categoriesPosts } = postCategoryList;

  useEffect(() => {
    dispatch(listPosts({}));
    dispatch(listTopPosts());
  }, [dispatch]);
  return (
    <>
      <div className="blog-screen">
        {loadingPostList ? (
          <LoadingBox></LoadingBox>
        ) : errorPostList ? (
          <MessageBox variant="danger">{errorPostList}</MessageBox>
        ) : (
          <>
            {posts.length === 0 && <MessageBox>No Post Found</MessageBox>}

            <div className="blog-screen">
              {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css" integrity="sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk=" crossOrigin="anonymous" /> */}
              <section className="blog-listing gray-bg">
                <div className="container">
                  <div className="row align-items-start">
                    <div className="col-lg-8 m-15px-tb">
                      <div className="row">
                        {posts.map((post) => (
                          <Post
                            className="col-sm-6"
                            key={post._id}
                            post={post}
                          />
                        ))}

                        <div className="col-12">
                          <ul className="pagination justify-content-center">
                            <li className="page-item disabled">
                              <a className="page-link" href="#" tabIndex={-1}>
                                <i className="fas fa-chevron-left" />
                              </a>
                            </li>
                            <li className="page-item">
                              <a className="page-link" href="#">
                                1
                              </a>
                            </li>
                            <li className="page-item active">
                              <a className="page-link" href="#">
                                2 <span className="sr-only">(current)</span>
                              </a>
                            </li>
                            <li className="page-item">
                              <a className="page-link" href="#">
                                3
                              </a>
                            </li>
                            <li className="page-item">
                              <a className="page-link" href="#">
                                <i className="fas fa-chevron-right" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 m-15px-tb blog-aside">
                      {/* Trending Post */}
                      <div className="widget widget-latest-post">
                        <div className="widget-title">
                          <h3>Top Rating</h3>
                        </div>
                        <div className="widget-body">
                          {loadingTopPosts ? (
                            <LoadingBox></LoadingBox>
                          ) : errorTopPosts ? (
                            <MessageBox variant="danger">
                              {errorTopPosts}
                            </MessageBox>
                          ) : (
                            <>
                              {!topPosts && (
                                <MessageBox>No Post Found</MessageBox>
                              )}
                              {topPosts &&
                                topPosts.map((post) => (
                                  <div
                                    key={post._id}
                                    className="latest-post-aside media"
                                  >
                                    <div className="lpa-left media-body">
                                      <div className="lpa-title">
                                        <h5>
                                          <Link to={`/post/${post._id}`}>
                                            <a href="#">{post.name}</a>
                                          </Link>
                                        </h5>
                                      </div>
                                      <div className="lpa-meta">
                                        <a className="name" href="#">
                                          {post.author}
                                        </a>
                                        <br />
                                        <a className="date" href="#">
                                          {post.createdAt.slice(0, 10)}
                                        </a>
                                        <Rating
                                          rating={post.rating}
                                          caption=" "
                                        ></Rating>
                                      </div>
                                    </div>
                                    <div className="lpa-right">
                                      <Link to={`/post/${post._id}`}>
                                        <a href="#">
                                          <img src={post.image} title alt />
                                        </a>
                                      </Link>
                                    </div>
                                  </div>
                                ))}
                            </>
                          )}
                        </div>
                      </div>
                      {/* End Trending Post */}
                      {/* Latest Post */}
                      <div className="widget widget-latest-post">
                        <div className="widget-title">
                          <h3>Latest Post</h3>
                        </div>
                        <div className="widget-body">
                          {loadingPostList ? (
                            <LoadingBox></LoadingBox>
                          ) : errorPostList ? (
                            <MessageBox variant="danger">
                              {errorPostList}
                            </MessageBox>
                          ) : (
                            <>
                              {!posts && <MessageBox>No Post Found</MessageBox>}
                              {posts &&
                                posts

                                  .filter((post, i) => i < 5)
                                  .map((post) => (
                                    <div
                                      key={post._id}
                                      className="latest-post-aside media"
                                    >
                                      <div className="lpa-left media-body">
                                        <div className="lpa-title">
                                          <h5>
                                            <Link to={`/post/${post._id}`}>
                                              <a href="#">{post.name}</a>
                                            </Link>
                                          </h5>
                                        </div>
                                        <div className="lpa-meta">
                                          <a className="name" href="#">
                                            {post.author}
                                          </a>
                                          <br />
                                          <a className="date" href="#">
                                            {post.createdAt.slice(0, 10)}
                                          </a>
                                        </div>
                                      </div>
                                      <div className="lpa-right">
                                        <Link to={`/post/${post._id}`}>
                                          <a href="#">
                                            <img src={post.image} title alt />
                                          </a>
                                        </Link>
                                      </div>
                                    </div>
                                  ))}
                            </>
                          )}
                        </div>
                      </div>
                      {/* End Latest Post */}
                      {/* widget Tags */}
                      <div className="widget widget-tags">
                        <div className="widget-title">
                          <h3>Latest Tags</h3>
                        </div>
                        <div className="widget-body">
                          <div className="nav tag-cloud">
                            <a href="#">Design</a>
                            <a href="#">Development</a>
                            <a href="#">Travel</a>
                            <a href="#">Web Design</a>
                            <a href="#">Marketing</a>
                            <a href="#">Research</a>
                            <a href="#">Managment</a>
                          </div>
                        </div>
                      </div>
                      {/* End widget Tags */}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* <div className="row center">
              {posts.map((post) => (
                <Post key={post._id} post={post} />
              ))}
            </div> */}
          </>
        )}

        {/* <h2>Top Posts</h2>
        {loadingTopPosts ? (
          <LoadingBox></LoadingBox>
        ) : errorTopPosts ? (
          <MessageBox variant="danger">{errorTopPosts}</MessageBox>
        ) : (
          <>
            {topPosts.length === 0 && <MessageBox>No Post Found</MessageBox>}
            <div className="row center">
              {topPosts.map((post) => (
                <Post key={post._id} post={post} />
              ))}
            </div>
          </>
        )} */}
      </div>
    </>
  );
}
