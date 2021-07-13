import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTicket, listTickets } from "../actions/ticketActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { TICKET_DELETE_RESET } from "../constants/ticketConstants";
import { detailsStatics } from "../actions/ticketActions";
import DashboardHeader from "../components/DashboardHeader/DashboardHeader";
import { Alert } from "react-bootstrap";

import "../screens/OrderListScreen/OrderListScreen.scss";

export default function TicketListScreen(props) {
  const ticketList = useSelector((state) => state.ticketList);

  const { loading, error, tickets } = ticketList;

  const ticketDelete = useSelector((state) => state.ticketDelete);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = ticketDelete;

  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: TICKET_DELETE_RESET });

    dispatch(listTickets({}));
  }, [dispatch, successDelete, userInfo._id]);

  const deleteHandler = (ticket) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteTicket(ticket._id));
    }
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
    <div className="container">
      {loadingStatics ? (
        <LoadingBox></LoadingBox>
      ) : errorStatics ? (
        <MessageBox variant="danger">{errorStatics}</MessageBox>
      ) : (
        <DashboardHeader statics={statics} />
      )}
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <>
            <div className="listScreen">
              <div className="container rounded mt-5 bg-white p-md-5">
                <div className="h2 font-weight-bold">Tickets</div>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">USER</th>
                        <th scope="col">DATE</th>
                        <th scope="col">SUBJECT</th>
                        <th scope="col">BODY</th>
                        <th scope="col">STATE</th>
                        <th scope="col">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets &&
                        tickets.map((ticket) => (
                          <>
                            <tr key={ticket._id} className="bg-blue">
                              <td
                                onClick={() => {
                                  props.history.push(`/ticket/${ticket._id}`);
                                }}
                                className="pt-3"
                              >
                                {ticket._id}
                              </td>

                              <td
                                onClick={() => {
                                  props.history.push(`/ticket/${ticket._id}`);
                                }}
                                className="pt-2"
                              >
                                {ticket.user.image ? (
                                  <img
                                    src={ticket.user.image}
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
                                  {ticket.user.name
                                    ? ticket.user.name
                                    : ` the user deleted`}
                                </div>
                              </td>
                              <td
                                onClick={() => {
                                  props.history.push(`/ticket/${ticket._id}`);
                                }}
                                className="pt-3 mt-1"
                              >
                                {ticket.createdAt.substring(0, 10)}
                              </td>
                              <td
                                onClick={() => {
                                  props.history.push(`/ticket/${ticket._id}`);
                                }}
                                className="pt-3 mt-1"
                              >
                                {ticket.subject}
                              </td>

                              <td
                                onClick={() => {
                                  props.history.push(`/ticket/${ticket._id}`);
                                }}
                                className="pl-lg-5 pl-md-3 pl-1"
                              >
                                {ticket.body.slice(0, 50)}...
                              </td>

                              <td
                                onClick={() => {
                                  props.history.push(`/ticket/${ticket._id}`);
                                }}
                                className="pt-3"
                              >
                                {ticket.isAnswered === "Answered" ? (
                                  <button
                                    className="btn btn-success btn-sm  deliver-btn"
                                    type="button"
                                    aria-expanded="false"
                                  >
                                    Answered
                                  </button>
                                ) : ticket.isAnswered === "Rejected" ? (
                                  <button
                                    className="btn btn-danger btn-sm no-btn "
                                    type="button"
                                    aria-expanded="false"
                                  >
                                    Rejected
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-primary btn-sm  pending-btn"
                                    type="button"
                                    aria-expanded="false"
                                  >
                                    Pending
                                  </button>
                                )}
                              </td>
                              <td>
                                <a
                                  href="#"
                                  class="table-link text-info icon-info"
                                  onClick={() => {
                                    props.history.push(`/ticket/${ticket._id}`);
                                  }}
                                >
                                  <span class="fa-stack">
                                    <i class="fa fa-square fa-stack-2x"></i>
                                    <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                  </span>
                                </a>

                                <a
                                  onClick={() => deleteHandler(ticket)}
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
                </div>
              </div>
            </div>
          </>
        </>
      )}
    </div>
  );
}
