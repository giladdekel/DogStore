const {
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_RESET,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
  POST_UPDATE_FAIL,
  POST_UPDATE_RESET,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_RESET,
  POST_CATEGORY_LIST_REQUEST,
  POST_CATEGORY_LIST_SUCCESS,
  POST_CATEGORY_LIST_FAIL,
  POST_CATEGORY_LIST_SUCCESS_3,
  POST_CATEGORY_LIST_REQUEST_3,
  POST_CATEGORY_LIST_FAIL_3,
  POST_COMMENT_CREATE_REQUEST,
  POST_COMMENT_CREATE_SUCCESS,
  POST_COMMENT_CREATE_FAIL,
  POST_COMMENT_CREATE_RESET,
  POST_TOPSELLERS_LIST_REQUEST,
  POST_TOPSELLERS_LIST_SUCCESS,
  POST_TOPSELLERS_LIST_FAIL,
} = require("../constants/postConstants");

export const postListReducer = (
  state = { loading: true, posts: [] },
  action
) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return { loading: true };
    case POST_LIST_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
        // action.payload.posts,
        // pages: action.payload.pages,
        // page: action.payload.page,
        // count: action.payload.count,
      };
    case POST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postCategoryListReducer = (
  state = {
    loading: true,
    categories: [],
    posts: [],
    categoriesProducts: [],
  },
  action
) => {
  switch (action.type) {
    case POST_CATEGORY_LIST_REQUEST:
      return { ...state, loading: true };
    case POST_CATEGORY_LIST_SUCCESS:
      return { ...state, loading: false, categories: action.payload };
    case POST_CATEGORY_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    case POST_CATEGORY_LIST_SUCCESS_3:
      return { ...state, loading: false, categoriesProducts: action.payload };
    default:
      return state;
  }
};

export const postDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case POST_DETAILS_REQUEST:
      return { loading: true };
    case POST_DETAILS_SUCCESS:
      return { loading: false, post: action.payload };
    case POST_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const postCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return { loading: true };
    case POST_CREATE_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case POST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case POST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const postUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_UPDATE_REQUEST:
      return { loading: true };
    case POST_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case POST_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case POST_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const postDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_DELETE_REQUEST:
      return { loading: true };
    case POST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case POST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case POST_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const postCommentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_COMMENT_CREATE_REQUEST:
      return { loading: true };
    case POST_COMMENT_CREATE_SUCCESS:
      return { loading: false, success: true, comment: action.payload };
    case POST_COMMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case POST_COMMENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const postTopSellerListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case POST_TOPSELLERS_LIST_REQUEST:
      return { loading: true };
    case POST_TOPSELLERS_LIST_SUCCESS:
      return { loading: false, topPosts: action.payload };
    case POST_TOPSELLERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
