import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createComment,
  detailsPost,
  listTopPosts,
  listPosts,
} from "../../actions/postActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

import { Alert } from "react-bootstrap";

import Rating from "../../components/Rating/Rating";
import { POST_COMMENT_CREATE_RESET } from "../../constants/postConstants";

import "./PostScreen.scss";

export default function PostScreen(props) {
  const dispatch = useDispatch();

  const postId = props.match.params.id;

  const postDetails = useSelector((state) => state.postDetails);
  const { loading, error, post } = postDetails;
  // console.log("post :", post);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  ///// get the list of all posts/////////////////////

  const postList = useSelector((state) => state.postList);
  const { loadingPostList, errorPostList, posts } = postList;

  ///// get the Top Rating posts/////////////////////

  const postTopSellersList = useSelector((state) => state.postTopSellersList);

  const {
    loading: loadingTopPosts,
    error: errorTopPosts,
    topPosts: topPosts,
  } = postTopSellersList;

  /////////comments///////////////////////////

  const postCommentCreate = useSelector((state) => state.postCommentCreate);
  const {
    loading: loadingCommentCreate,
    error: errorCommentCreate,
    success: successCommentCreate,
  } = postCommentCreate;

  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [counter, setCounter] = useState(5);

  //////////////////////////////////////////////////// 1/////////
  useEffect(() => {
    if (successCommentCreate) {
      window.alert("Comment Submitted Successfully");
      setRating("");
      setContent("");
      dispatch({ type: POST_COMMENT_CREATE_RESET });
    }
    dispatch(detailsPost(postId));
    dispatch(listPosts({}));
    dispatch(listTopPosts());
  }, [dispatch, postId, successCommentCreate]);
  ///////////////////////////////////////////////////////////

  const submitHandler = (e) => {
    e.preventDefault();
    if (content && rating) {
      dispatch(
        createComment(postId, {
          rating,
          content,
          name: userInfo.name,
          image: userInfo.image,
        })
      );
    } else {
      alert("Please enter comment and rating");
    }
  };

  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className=" post-page">
          <Link to="/blog">Back to blog</Link>

          <div className="post-screen ">
            <div className="blog-single gray-bg">
              <div className="container">
                <div className="row align-items-start">
                  <div className="col-lg-8 m-15px-tb">
                    <article className="article">
                      <div className="article-img">
                        <img src={post.image} title alt />
                      </div>
                      <div className="article-title">
                        <h6>
                          <a href="#">{post.category}</a>
                        </h6>
                        <h2 className="post-title-main">{post.name}</h2>{" "}
                        <Rating rating={post.rating} caption=" "></Rating>
                        <div className="media">
                          <div className="avatar">
                            {post.authorImage ? (
                              <img src={post.authorImage} title alt />
                            ) : (
                              <img
                                src="https://cdn.pixabay.com/photo/2017/11/22/16/04/pug-2970825_960_720.png"
                                title
                                alt
                              />
                            )}
                          </div>
                          <div className="media-body">
                            <label>{post.author}</label>
                            <span>
                              <ul className=" list-unstyled list-inline media-detail pull-left row">
                                <li>
                                  <i className="heading-icons fa fa-calendar" />
                                  {post.createdAt.substring(0, 10)}
                                </li>

                                <li>
                                  <i className=" heading-icons fa fa-clock" />
                                  {post.createdAt.substring(11, 16)}
                                </li>
                                <li>
                                  <i className=" heading-icons fa fa-thumbs-up" />
                                  12
                                </li>
                              </ul>
                            </span>
                          </div>{" "}
                        </div>{" "}
                      </div>
                      <div className="article-content">
                        {post.description}
                        {/* <p>
                          Eget aenean tellus venenatis. Donec odio tempus. Felis
                          arcu pretium metus nullam quam aenean sociis quis sem
                          neque vici libero. Venenatis nullam fringilla pretium
                          magnis aliquam nunc vulputate integer augue ultricies
                          cras. Eget viverra feugiat cras ut. Sit natoque montes
                          tempus ligula eget vitae pede rhoncus maecenas
                          consectetuer commodo condimentum aenean.
                        </p>
                        <h4>What are my payment options?</h4>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                        <blockquote>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam.
                          </p>
                          <p className="blockquote-footer">
                            Someone famous in{" "}
                            <cite title="Source Title">Dick Grayson</cite>
                          </p>
                        </blockquote>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p> */}
                      </div>
                      <div className="nav tag-cloud">
                        <a href="#">Design</a>
                        <a href="#">Development</a>
                        <a href="#">Travel</a>
                        <a href="#">Web Design</a>
                        <a href="#">Marketing</a>
                        <a href="#">Research</a>
                        <a href="#">Managment</a>
                      </div>
                    </article>
                  </div>
                  <div className="col-lg-4 m-15px-tb blog-aside">
                    {/* Author */}
                    <div className="widget widget-author">
                      <div className="widget-title">
                        <h3>Author</h3>
                      </div>
                      <div className="widget-body">
                        <div className="media align-items-center">
                          <div className="avatar">
                            {post.authorImage ? (
                              <img src={post.authorImage} title alt />
                            ) : (
                              <img
                                src="https://cdn.pixabay.com/photo/2017/11/22/16/04/pug-2970825_960_720.png"
                                title
                                alt
                              />
                            )}
                          </div>
                          <div className="media-body">
                            <h6>
                              Hello, I'm
                              <br /> {post.author}
                            </h6>
                          </div>
                        </div>
                        <p>
                          I design and develop services for customers of all
                          sizes, specializing in creating stylish, modern
                          websites, web services and online stores
                        </p>
                      </div>
                    </div>
                    {/* End Author */}
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
            </div>

            <div className="comments">
              {/* ///////////////////////comments start///////////////////   */}

              <div>
                {/* <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" /> */}

                <section className="content-item" id="comments">
                  <div className="container">
                    <div className="row">
                      <div className="col-sm-8">
                        {userInfo ? (
                          <form onSubmit={submitHandler}>
                            <div>
                              <h3 htmlFor="rating">Rating:</h3>
                              <select
                                id="rating"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                              >
                                <option value="">Select...</option>
                                <option value="1">1- Poor</option>
                                <option value="2">2- Fair</option>
                                <option value="3">3- Good</option>
                                <option value="4">4- Very good</option>
                                <option value="5">5- Excelent</option>
                              </select>
                            </div>
                            <h3 className="pull-left">New Comment</h3>

                            <fieldset>
                              <div className="row">
                                <div className="col-sm-3 col-lg-2 hidden-xs">
                                  {userInfo && userInfo.image ? (
                                    <img
                                      className="img-responsive"
                                      src={userInfo.image}
                                      alt
                                    />
                                  ) : (
                                    <img
                                      className="img-responsive"
                                      src="https://placedog.net/1000?random"
                                      alt
                                    />
                                  )}
                                  <p>{userInfo.name}</p>
                                </div>
                                <div className="form-group col-xs-12 col-sm-9 col-lg-10">
                                  <textarea
                                    onChange={(e) => setContent(e.target.value)}
                                    className="form-control"
                                    id="message"
                                    placeholder="Your message"
                                    required
                                    defaultValue={""}
                                  />
                                </div>{" "}
                                <div className="col-md-3">
                                  <div className="send">
                                    <button className="px-btn theme">
                                      <span>Submit</span>{" "}
                                      <i className="arrow" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </fieldset>

                            {loadingCommentCreate && <LoadingBox></LoadingBox>}
                            {errorCommentCreate && (
                              <MessageBox variant="danger">
                                {errorCommentCreate}
                              </MessageBox>
                            )}
                          </form>
                        ) : (
                          <MessageBox>
                            Please <Link to="/signin">Sign In</Link> to write a
                            comment
                          </MessageBox>
                        )}
                        <h3>{post.numComments} Comments</h3>

                        {/* COMMENT 1 - START */}

                        {post.comments.length === 0 && (
                          <MessageBox>There is no Comments</MessageBox>
                        )}

                        {post.comments.map((comment) => (
                          <div key={comment._id} className="media">
                            <a className="pull-left" href="#">
                              {userInfo && comment.image ? (
                                <img
                                  className="media-object"
                                  src={comment.image}
                                  alt
                                />
                              ) : (
                                <img
                                  className="media-object"
                                  src="https://placedog.net/1000?random"
                                  alt
                                />
                              )}
                              <br />
                              <Rating
                                rating={comment.rating}
                                caption=" "
                              ></Rating>
                            </a>

                            <div className="media-body">
                              <h4 className="media-heading">{comment.name}</h4>
                              <p>{comment.content}</p>
                              <ul className="list-unstyled list-inline media-detail pull-left row">
                                <li>
                                  <i className="fa fa-calendar" />
                                  {comment.createdAt.substring(0, 10)}
                                </li>

                                <li>
                                  <i className="fa fa-clock" />
                                  {comment.createdAt.substring(11, 16)}
                                </li>
                                <li>
                                  <i className="fa fa-thumbs-up" />
                                  {counter}
                                </li>
                              </ul>
                              <ul className="list-unstyled list-inline media-detail pull-right row">
                                <li className>
                                  <a
                                    onClick={() => setCounter(counter + 1)}
                                    className="like-btn"
                                    href
                                  >
                                    Like
                                  </a>
                                </li>
                                <li className>
                                  <a className="like-btn" href>
                                    Reply
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        ))}

                        {/* COMMENT 1 - END */}
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* /////////////////////////////end comments */}
            </div>
          </div>
        </div>
      )}
      {/* //////////////////////////////////////////////////////////////////////////// */}
    </>
  );
}
