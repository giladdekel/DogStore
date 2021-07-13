import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { detailsStatics } from "../actions/orderActions";
import { createPost, deletePost, listPosts } from "../actions/postActions";
import DashboardHeader from "../components/DashboardHeader/DashboardHeader";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

import {
  POST_CREATE_RESET,
  POST_DELETE_RESET,
} from "../constants/postConstants";

export default function PostListScreen(props) {
  const { pageNumber = 1 } = useParams();

  const sellerMode = props.match.path.indexOf("/seller") >= 0;

  const postList = useSelector((state) => state.postList);

  const { loading, error, posts, page, pages } = postList;

  const postCreate = useSelector((state) => state.postCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    post: createdPost,
  } = postCreate;

  const postDelete = useSelector((state) => state.postDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = postDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: POST_CREATE_RESET });
      props.history.push(`/post/${createdPost._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: POST_DELETE_RESET });
    }
    dispatch(listPosts({ seller: sellerMode ? userInfo._id : "", pageNumber }));
  }, [
    createdPost,
    dispatch,
    props.history,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
    pageNumber,
  ]);

  const deleteHandler = (post) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deletePost(post._id));
    }
  };

  const createHandler = () => {
    dispatch(createPost());
  };

  ////////// DashboardHeader start//////////////////////

  const staticsDetails = useSelector((state) => state.staticsDetails);

  const {
    statics,
    loading: loadingStatics,
    error: errorStatics,
  } = staticsDetails;

  useEffect(() => {
    dispatch(detailsStatics());
  }, [dispatch, detailsStatics, successDelete]);

  ////////// DashboardHeader end//////////////////////

  return (
    <div>
      {loadingStatics ? (
        <LoadingBox></LoadingBox>
      ) : errorStatics ? (
        <MessageBox variant="danger">{errorStatics}</MessageBox>
      ) : (
        <DashboardHeader statics={statics} />
      )}

      <div className="row"></div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="DANGER">{error}</MessageBox>
      ) : (
        <>
          <>
            <div className="listScreen">
              <div className="container rounded mt-5 bg-white p-md-5">
                <div className="h2 font-weight-bold">Posts</div>
                <div className="table-responsive">
                  <button
                    type="button"
                    className="btn-success"
                    onClick={createHandler}
                  >
                    Create Post
                  </button>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">AUTHOR</th>
                        <th scope="col">DATE</th>
                        <th scope="col">TITLE</th>
                        <th scope="col">CATEGORY</th>
                        <th scope="col">BODY</th>
                        <th scope="col">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts &&
                        posts.map((post) => (
                          <>
                            <tr key={post._id} className="bg-blue">
                              <td
                                onClick={() => {
                                  props.history.push(`/post/${post._id}/edit`);
                                }}
                                className="pt-2"
                              >
                                {post._id}
                              </td>

                              <td
                                onClick={() => {
                                  props.history.push(`/post/${post._id}/edit`);
                                }}
                                className="pt-2"
                              >
                                {post.authorImage ? (
                                  <img
                                    src={post.authorImage}
                                    className="rounded-circle"
                                    alt
                                  />
                                ) : (
                                  <img
                                    src="https://placedog.net/1000?random"
                                    className="rounded-circle"
                                    alt
                                  />
                                )}

                                <div className="pl-lg-5 pl-md-3 pl-1 name">
                                  {post.author
                                    ? post.author
                                    : ` the user deleted`}
                                </div>
                              </td>
                              <td
                                onClick={() => {
                                  props.history.push(`/post/${post._id}/edit`);
                                }}
                                className="pt-3 mt-1"
                              >
                                {post.createdAt.substring(0, 10)}
                              </td>

                              <td
                                onClick={() => {
                                  props.history.push(`/post/${post._id}/edit`);
                                }}
                                className="pt-3"
                              >
                                {post.name.slice(0, 15)}...
                              </td>
                              <td className="pt-3">{post.category}</td>

                              <td
                                onClick={() => {
                                  props.history.push(`/post/${post._id}/edit`);
                                }}
                                className="pt-3"
                              >
                                {post.description.slice(0, 16)}...
                              </td>
                              <td>
                                <a
                                  href="#"
                                  class="table-link text-info icon-info"
                                  onClick={() => {
                                    props.history.push(
                                      `/post/${post._id}/edit`
                                    );
                                  }}
                                >
                                  <span class="fa-stack">
                                    <i class="fa fa-square fa-stack-2x"></i>
                                    <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                  </span>
                                </a>

                                <a
                                  onClick={() => deleteHandler(post)}
                                  href="#"
                                  class="table-link danger trash-icon"
                                >
                                  <span class="fa-stack">
                                    <i class="fa fa-square fa-stack-2x"></i>
                                    <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                  </span>
                                </a>
                              </td>
                            </tr>
                            <tr id="spacing-row">
                              <td />
                            </tr>
                          </>
                        ))}
                    </tbody>
                  </table>
                  <div className="row center pagination">
                    {[...Array(pages).keys()].map((x) => (
                      <Link
                        className={x + 1 === page ? "active" : ""}
                        key={x + 1}
                        to={`/postlist/pageNumber/${x + 1}`}
                      >
                        {x + 1}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        </>
      )}
    </div>
  );
}
