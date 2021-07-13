import Axios from "axios";
import {
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_DETAILS_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_LIST_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
  POST_UPDATE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_FAIL,
  POST_DELETE_SUCCESS,
  POST_CATEGORY_LIST_SUCCESS,
  POST_CATEGORY_LIST_REQUEST,
  POST_CATEGORY_LIST_FAIL,
  POST_CATEGORY_LIST_SUCCESS_3,
  POST_CATEGORY_LIST_REQUEST_3,
  POST_CATEGORY_LIST_FAIL_3,
  POST_COMMENT_CREATE_REQUEST,
  POST_COMMENT_CREATE_SUCCESS,
  POST_COMMENT_CREATE_FAIL,
  POST_TOPSELLERS_LIST_REQUEST,
  POST_TOPSELLERS_LIST_SUCCESS,
  POST_TOPSELLERS_LIST_FAIL,
} from "../constants/postConstants";

export const listPosts = ({
  pageNumber = "",
  seller = "",
  name = "",
  category = "",
  order = "",
  min = 0,
  max = 0,
  rating = 0,
}) => async (dispatch) => {
  dispatch({
    type: POST_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/posts/`);
    dispatch({ type: POST_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: POST_LIST_FAIL, payload: error.message });
  }
};

export const listPostCategories = () => async (dispatch) => {
  dispatch({
    type: POST_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/posts/categories`);
    dispatch({ type: POST_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: POST_CATEGORY_LIST_FAIL, payload: error.message });
  }
};

export const detailsPost = (postId) => async (dispatch) => {
  dispatch({ type: POST_DETAILS_REQUEST, payload: postId });
  try {
    const { data } = await Axios.get(`/api/posts/${postId}`);
    dispatch({ type: POST_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createPost = () => async (dispatch, getState) => {
  dispatch({ type: POST_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      "/api/posts",
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: POST_CREATE_SUCCESS,
      payload: data.post,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: POST_CREATE_FAIL, payload: message });
  }
};
export const updatePost = (post) => async (dispatch, getState) => {
  dispatch({ type: POST_UPDATE_REQUEST, payload: post });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/posts/${post._id}`, post, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: POST_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: POST_UPDATE_FAIL, error: message });
  }
};
export const deletePost = (postId) => async (dispatch, getState) => {
  dispatch({ type: POST_DELETE_REQUEST, payload: postId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/posts/${postId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: POST_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: POST_DELETE_FAIL, payload: message });
  }
};
export const createComment = (postId, comment) => async (
  dispatch,
  getState
) => {
  dispatch({ type: POST_COMMENT_CREATE_REQUEST });

  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await Axios.post(
      `/api/posts/${postId}/comments`,
      comment,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: POST_COMMENT_CREATE_SUCCESS,
      payload: data.comment,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: POST_COMMENT_CREATE_FAIL, payload: message });
  }
};

export const listTopPosts = () => async (dispatch) => {
  dispatch({ type: POST_TOPSELLERS_LIST_REQUEST });
  try {
    const { data } = await Axios.get("/api/posts/top-posts");
    dispatch({ type: POST_TOPSELLERS_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: POST_TOPSELLERS_LIST_FAIL, payload: message });
  }
};
