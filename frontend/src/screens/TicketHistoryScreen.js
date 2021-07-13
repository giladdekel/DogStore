import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTicketMine } from "../actions/ticketActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Alert } from "react-bootstrap";
import DashboardProfile from "../components/DashboardProfile/DashboardProfile";

export default function TicketHistoryScreen(props) {
  const ticketMineList = useSelector((state) => state.ticketMineList);

  const { loading, error, tickets } = ticketMineList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listTicketMine());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <DashboardProfile />

          <>
            <div className="listScreen">
              <div className="container rounded mt-5 bg-white p-md-5">
                <div className="h2 font-weight-bold">Ticket History</div>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
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
                                {ticket.subject.slice(0, 20)}...
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
                                  className="table-link text-warning searching-icon"
                                  onClick={() => {
                                    props.history.push(`/ticket/${ticket._id}`);
                                  }}
                                >
                                  <span className="fa-stack">
                                    <i className="fa fa-square fa-stack-2x" />
                                    <i className="fa fa-search-plus fa-stack-1x fa-inverse" />
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
