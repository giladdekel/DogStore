import Axios from "axios";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createAnswer,
  answerTicket,
  detailsTicket,
} from "../actions/ticketActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  TICKET_ANSWER_CREATE_RESET,
  TICKET_ANSWER_RESET,
} from "../constants/ticketConstants";

export default function TicketScreen(props) {
  const ticketId = props.match.params.id;

  const ticketDetails = useSelector((state) => state.ticketDetails);

  const { ticket, loading, error } = ticketDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  // const ticketPay = useSelector((state) => state.ticketPay);
  // const {
  //   loading: loadingPay,
  //   error: errorPay,
  //   success: successPay,
  // } = ticketPay;

  const ticketAnswer = useSelector((state) => state.ticketAnswer);
  const {
    loading: loadingAnswer,
    error: errorAnswer,
    success: successAnswer,
  } = ticketAnswer;

  const dispatch = useDispatch();

  // const successPaymentHandler = (paymentResult) => {
  //   dispatch(payTicket(ticket, paymentResult));
  // };

  const [answer, setAnswer] = useState("Pending");
  const email = userInfo.email;
  const answerHandler = () => {
    dispatch(answerTicket(ticket._id, answer));
  };

  ///////////////////////////////////////Answer start//////////////////

  const ticketAnswerCreate = useSelector((state) => state.ticketAnswerCreate);
  const {
    loading: loadingAnswerCreate,
    error: errorAnswerCreate,
    success: successAnswerCreate,
  } = ticketAnswerCreate;

  const [content, setContent] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (content) {
      dispatch(
        createAnswer(ticketId, {
          content,
          name: userInfo.name,
          image: userInfo.image,
        })
      );
    } else {
      alert("Please enter answer and rating");
    }
  };
  useEffect(() => {
    if (!ticket || successAnswer || (ticket && ticket._id !== ticketId)) {
      // dispatch({ type: TICKET_PAY_RESET });
      dispatch({ type: TICKET_ANSWER_RESET });
      dispatch(detailsTicket(ticketId));
    }
    if (successAnswerCreate) {
      window.alert("Answer Submitted Successfully");
      setContent("");
      dispatch({ type: TICKET_ANSWER_CREATE_RESET });
      dispatch(detailsTicket(ticketId));
    }
  }, [dispatch, ticketId, successAnswer, ticket, successAnswerCreate]);

  ///////////////////////////////////////Answer end //////////////////

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="container">
      <h1>Ticket {ticket._id}</h1>
      <div className="ticket-area">
        <div className="">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Details:</h2>
                <p>
                  <strong>Name:</strong> {userInfo.name} <br />
                  <strong>subject: </strong> {ticket.subject}
                  <br />
                  <strong>email: </strong> {ticket.email}
                  <br />
                  <strong>phone: </strong> {ticket.phone}
                  <br />
                  <strong>body: </strong> {ticket.body}
                  <br />
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Status:</h2>

                {ticket.isAnswered === "Answered" && (
                  <MessageBox variant="success">
                    Answered at {ticket.answeredAt}
                  </MessageBox>
                )}

                {ticket.isAnswered === "Pending" && (
                  <MessageBox variant="info">Pending</MessageBox>
                )}

                {ticket.isAnswered === "Rejected" && (
                  <MessageBox variant="warning">Rejected</MessageBox>
                )}
              </div>
            </li>

            {userInfo.isAdmin && (
              <li>
                <div className="card card-body">
                  <h2>Admin:</h2>
                  {loadingAnswer && <LoadingBox></LoadingBox>}
                  {errorAnswer && (
                    <MessageBox variant="danger">{errorAnswer}</MessageBox>
                  )}

                  <>
                    <select
                      className="form-control"
                      value={answer}
                      onChange={(e) => {
                        setAnswer(e.target.value);
                      }}
                    >
                      <option value={"Pending"}>Pending</option>
                      <option value={"Answered"}>Answered</option>
                      <option value={"Rejected"}>Rejected</option>
                    </select>
                    <button
                      type="button"
                      className="primary block"
                      onClick={answerHandler}
                    >
                      Update Status
                    </button>
                  </>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="comments post-screen">
        {/* ///////////////////////answers start///////////////////   */}

        <div>
          {/* <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" /> */}

          <section className="content-item " id="comments">
            <div className="container">
              <div className="row">
                <div className="col-sm-8">
                  <h3>{ticket.numAnswers} Comments</h3>

                  {/* ANSWER 1 - START */}

                  {ticket.answers.map((answer) => (
                    <div key={answer._id} className="media">
                      <a className="pull-left" href="#">
                        {userInfo && answer.image ? (
                          <img
                            className="media-object"
                            src={answer.image}
                            alt
                          />
                        ) : (
                          <img
                            className="media-object"
                            src="https://placedog.net/1000?random"
                            alt
                          />
                        )}
                      </a>

                      <div className="media-body">
                        <h4 className="media-heading">{answer.name}</h4>
                        <p>{answer.content}</p>
                        <ul className="list-unstyled list-inline media-detail pull-left row">
                          <li>
                            <i className="fa fa-calendar" />
                            {answer.createdAt.substring(0, 10)}
                          </li>

                          <li>
                            <i className="fa fa-clock" />
                            {answer.createdAt.substring(11, 16)}
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}

                  {/* answer 1 - END */}
                </div>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <h3 className="pull-left">Write Comment</h3>

                    <fieldset>
                      <div className="row">
                        <div className="col-sm-3 col-lg-2 hidden-xs">
                          {userInfo && userInfo.image ? (
                            <img
                              className="img-responsive"
                              src={userInfo.image}
                              width="400px"
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
                            placeholder="Your comment..."
                            required
                            defaultValue={""}
                          />
                        </div>{" "}
                        <div className="col-md-3">
                          <div className="send">
                            <button className="px-btn theme">
                              <span>Submit</span> <i className="arrow" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </fieldset>

                    {loadingAnswerCreate && <LoadingBox></LoadingBox>}
                    {errorAnswerCreate && (
                      <MessageBox variant="danger">
                        {errorAnswerCreate}
                      </MessageBox>
                    )}
                  </form>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a Answer
                  </MessageBox>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* /////////////////////////////end answers */}
      </div>
    </div>
  );
}
