import {
  TICKET_CREATE_FAIL,
  TICKET_CREATE_REQUEST,
  TICKET_CREATE_RESET,
  TICKET_CREATE_SUCCESS,
  TICKET_DETAILS_FAIL,
  TICKET_DETAILS_REQUEST,
  TICKET_DETAILS_SUCCESS,
  STATICS_DETAILS_FAIL,
  STATICS_DETAILS_REQUEST,
  STATICS_DETAILS_SUCCESS,
  TICKET_MINE_LIST_FAIL,
  TICKET_MINE_LIST_REQUEST,
  TICKET_MINE_LIST_SUCCESS,
  TICKET_PAY_FAIL,
  TICKET_PAY_REQUEST,
  TICKET_PAY_RESET,
  TICKET_PAY_SUCCESS,
  TICKET_LIST_REQUEST,
  TICKET_LIST_SUCCESS,
  TICKET_LIST_FAIL,
  TICKET_DELETE_REQUEST,
  TICKET_DELETE_SUCCESS,
  TICKET_DELETE_FAIL,
  TICKET_DELETE_RESET,
  TICKET_ANSWER_REQUEST,
  TICKET_ANSWER_SUCCESS,
  TICKET_ANSWER_FAIL,
  TICKET_ANSWER_RESET,
  TICKET_ANSWER_CREATE_REQUEST,
  TICKET_ANSWER_CREATE_SUCCESS,
  TICKET_ANSWER_CREATE_FAIL,
  TICKET_ANSWER_CREATE_RESET,
  EMAIL_TICKET_CREATE_REQUEST,
  EMAIL_TICKET_CREATE_SUCCESS,
  EMAIL_TICKET_CREATE_FAIL,
  EMAIL_TICKET_CREATE_RESET,
  EMAIL_TICKET_CREATE_REQUEST_ADMIN,
  EMAIL_TICKET_CREATE_SUCCESS_ADMIN,
  EMAIL_TICKET_CREATE_FAIL_ADMIN,
  EMAIL_TICKET_ANSWER_REQUEST,
  EMAIL_TICKET_ANSWER_SUCCESS,
  EMAIL_TICKET_ANSWER_FAIL,
  EMAIL_TICKET_ANSWER_COMMENT_REQUEST,
  EMAIL_TICKET_ANSWER_COMMENT_SUCCESS,
  EMAIL_TICKET_ANSWER_COMMENT_FAIL,
} from "../constants/ticketConstants";

export const emailTicketAnswerCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case EMAIL_TICKET_ANSWER_COMMENT_REQUEST:
      return { loading: true };
    case EMAIL_TICKET_ANSWER_COMMENT_SUCCESS:
      return { loading: false, success: true, ticket: action.payload };
    case EMAIL_TICKET_ANSWER_COMMENT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const emailTicketAnswerReducer = (state = {}, action) => {
  switch (action.type) {
    case EMAIL_TICKET_ANSWER_REQUEST:
      return { loading: true };
    case EMAIL_TICKET_ANSWER_SUCCESS:
      return { loading: false, success: true, ticket: action.payload };
    case EMAIL_TICKET_ANSWER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const emailTicketCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EMAIL_TICKET_CREATE_REQUEST:
      return { loading: true };
    case EMAIL_TICKET_CREATE_SUCCESS:
      return { loading: false, success: true, ticket: action.payload };
    case EMAIL_TICKET_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case EMAIL_TICKET_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const emailTicketCreateReducerAdmin = (state = {}, action) => {
  switch (action.type) {
    case EMAIL_TICKET_CREATE_REQUEST_ADMIN:
      return { loading: true };
    case EMAIL_TICKET_CREATE_SUCCESS_ADMIN:
      return { loading: false, success: true, ticket: action.payload };
    case EMAIL_TICKET_CREATE_FAIL_ADMIN:
      return { loading: false, error: action.payload };
    case EMAIL_TICKET_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const ticketCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TICKET_CREATE_REQUEST:
      return { loading: true };
    case TICKET_CREATE_SUCCESS:
      return { loading: false, success: true, ticket: action.payload };
    case TICKET_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TICKET_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const ticketDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case TICKET_DETAILS_REQUEST:
      return { loading: true };
    case TICKET_DETAILS_SUCCESS:
      return { loading: false, ticket: action.payload };
    case TICKET_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const staticsDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case STATICS_DETAILS_REQUEST:
      return { loading: true };
    case STATICS_DETAILS_SUCCESS:
      return { loading: false, statics: action.payload };
    case STATICS_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ticketPayReducer = (state = {}, action) => {
  switch (action.type) {
    case TICKET_PAY_REQUEST:
      return { loading: true };
    case TICKET_PAY_SUCCESS:
      return { loading: false, success: true };
    case TICKET_PAY_FAIL:
      return { loading: false, error: action.payload };
    case TICKET_PAY_RESET:
      return {};
    default:
      return state;
  }
};
export const ticketMineListReducer = (state = { tickets: [] }, action) => {
  switch (action.type) {
    case TICKET_MINE_LIST_REQUEST:
      return { loading: true };
    case TICKET_MINE_LIST_SUCCESS:
      return { loading: false, tickets: action.payload };
    case TICKET_MINE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const ticketListReducer = (state = { tickets: [] }, action) => {
  switch (action.type) {
    case TICKET_LIST_REQUEST:
      return { loading: true };
    case TICKET_LIST_SUCCESS:
      return { loading: false, tickets: action.payload };
    case TICKET_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const ticketDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TICKET_DELETE_REQUEST:
      return { loading: true };
    case TICKET_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TICKET_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case TICKET_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const ticketAnswerReducer = (state = {}, action) => {
  switch (action.type) {
    case TICKET_ANSWER_REQUEST:
      return { loading: true };
    case TICKET_ANSWER_SUCCESS:
      return { loading: false, success: true };
    case TICKET_ANSWER_FAIL:
      return { loading: false, error: action.payload };
    case TICKET_ANSWER_RESET:
      return {};
    default:
      return state;
  }
};

export const ticketAnswerCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TICKET_ANSWER_CREATE_REQUEST:
      return { loading: true };
    case TICKET_ANSWER_CREATE_SUCCESS:
      return { loading: false, success: true, answer: action.payload };
    case TICKET_ANSWER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TICKET_ANSWER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
