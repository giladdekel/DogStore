import Axios from "axios";
import {
  TICKET_CREATE_FAIL,
  TICKET_CREATE_REQUEST,
  TICKET_CREATE_SUCCESS,
  TICKET_DETAILS_FAIL,
  TICKET_DETAILS_REQUEST,
  TICKET_DETAILS_SUCCESS,
  STATICS_DETAILS_FAIL,
  STATICS_DETAILS_REQUEST,
  STATICS_DETAILS_SUCCESS,
  TICKET_PAY_REQUEST,
  TICKET_PAY_FAIL,
  TICKET_PAY_SUCCESS,
  TICKET_MINE_LIST_REQUEST,
  TICKET_MINE_LIST_FAIL,
  TICKET_MINE_LIST_SUCCESS,
  TICKET_LIST_REQUEST,
  TICKET_LIST_SUCCESS,
  TICKET_LIST_FAIL,
  TICKET_DELETE_REQUEST,
  TICKET_DELETE_SUCCESS,
  TICKET_DELETE_FAIL,
  TICKET_ANSWER_REQUEST,
  TICKET_ANSWER_SUCCESS,
  TICKET_ANSWER_FAIL,
  TICKET_ANSWER_CREATE_REQUEST,
  TICKET_ANSWER_CREATE_SUCCESS,
  TICKET_ANSWER_CREATE_FAIL,
  EMAIL_TICKET_CREATE_REQUEST,
  EMAIL_TICKET_CREATE_SUCCESS,
  EMAIL_TICKET_CREATE_FAIL,
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

// export const sendMailCreatTicket = (data) => {
//   // console.log("coolllldata :", data);
//   Axios.post(`/api/mails/sendMailCreatTicket/`, {
//     data,
//   });
// };

export const emailAnswerTicketComment = (id, answer) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: EMAIL_TICKET_ANSWER_COMMENT_REQUEST,
    payload: { id, answer },
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(
      "/api/mails/sendMailAnswerTicketComment/",
      { id, answer },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: EMAIL_TICKET_ANSWER_COMMENT_SUCCESS,
      payload: data.ticket,
    });
  } catch (error) {
    dispatch({
      type: EMAIL_TICKET_ANSWER_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const emailAnswerTicket = (answer, id) => async (dispatch, getState) => {
  dispatch({
    type: EMAIL_TICKET_ANSWER_REQUEST,
    payload: { answer, id },
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(
      "/api/mails/sendMailAnswerTicket/",
      { answer, id },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: EMAIL_TICKET_ANSWER_SUCCESS, payload: data.ticket });
  } catch (error) {
    dispatch({
      type: EMAIL_TICKET_ANSWER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const emailCreateTicket = (subject, email, phone, body, name) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: EMAIL_TICKET_CREATE_REQUEST,
    payload: { subject, email, phone, body },
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(
      "/api/mails/sendMailCreatTicket/",
      { subject, email, phone, body, name },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: EMAIL_TICKET_CREATE_SUCCESS, payload: data.ticket });
  } catch (error) {
    dispatch({
      type: EMAIL_TICKET_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const emailCreateTicketAdmin = (
  subject,
  email,
  phone,
  body,
  name
) => async (dispatch, getState) => {
  dispatch({
    type: EMAIL_TICKET_CREATE_REQUEST_ADMIN,
    payload: { subject, email, phone, body },
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(
      "/api/mails/emailCreateTicketAdmin/",
      { subject, email, phone, body, name },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: EMAIL_TICKET_CREATE_SUCCESS_ADMIN, payload: data.ticket });
  } catch (error) {
    dispatch({
      type: EMAIL_TICKET_CREATE_FAIL_ADMIN,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createTicket = (subject, email, phone, body, name) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: TICKET_CREATE_REQUEST,
    payload: { subject, email, phone, body },
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(
      "/api/tickets",
      { subject, email, phone, body },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: TICKET_CREATE_SUCCESS, payload: data.ticket });
    dispatch(emailCreateTicket(subject, email, phone, body, name));
    dispatch(emailCreateTicketAdmin(subject, email, phone, body, name));
  } catch (error) {
    dispatch({
      type: TICKET_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsTicket = (ticketId) => async (dispatch, getState) => {
  dispatch({ type: TICKET_DETAILS_REQUEST, payload: ticketId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/tickets/${ticketId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({ type: TICKET_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TICKET_DETAILS_FAIL, payload: message });
  }
};

export const detailsStatics = () => async (dispatch, getState) => {
  dispatch({ type: STATICS_DETAILS_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/products/static`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: STATICS_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: STATICS_DETAILS_FAIL, payload: message });
  }
};

export const payTicket = (ticket, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch({ type: TICKET_PAY_REQUEST, payload: { ticket, paymentResult } });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(
      `/api/tickets/${ticket._id}/pay`,
      paymentResult,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: TICKET_PAY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TICKET_PAY_FAIL, payload: message });
  }
};
export const listTicketMine = () => async (dispatch, getState) => {
  dispatch({ type: TICKET_MINE_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get("/api/tickets/mine", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: TICKET_MINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TICKET_MINE_LIST_FAIL, payload: message });
  }
};
export const listTickets = ({}) => async (dispatch, getState) => {
  dispatch({ type: TICKET_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/tickets`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    // console.log(data);
    dispatch({ type: TICKET_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TICKET_LIST_FAIL, payload: message });
  }
};
export const deleteTicket = (ticketId) => async (dispatch, getState) => {
  dispatch({ type: TICKET_DELETE_REQUEST, payload: ticketId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/tickets/${ticketId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TICKET_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TICKET_DELETE_FAIL, payload: message });
  }
};

export const answerTicket = (ticketId, answer) => async (
  dispatch,
  getState
) => {
  dispatch({ type: TICKET_ANSWER_REQUEST, payload: ticketId, answer });

  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = Axios.put(
      `/api/tickets/${ticketId}/answer`,
      { answer },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: TICKET_ANSWER_SUCCESS, payload: data });
    dispatch(emailAnswerTicket(answer, ticketId));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TICKET_ANSWER_FAIL, payload: message });
  }
};

export const createAnswer = (ticketId, answer) => async (
  dispatch,
  getState
) => {
  dispatch({ type: TICKET_ANSWER_CREATE_REQUEST });

  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await Axios.post(
      `/api/tickets/${ticketId}/answers`,
      answer,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: TICKET_ANSWER_CREATE_SUCCESS,
      payload: data.answer,
    });
    dispatch(emailAnswerTicketComment(ticketId, answer));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TICKET_ANSWER_CREATE_FAIL, payload: message });
  }
};
