import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTicket, emailCreateTicket } from "../../actions/ticketActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { TICKET_CREATE_RESET } from "../../constants/ticketConstants";

import "./ContactScreen.scss";
export default function ContactScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;

  if (!userInfo) {
    props.history.push("/signin");
  }

  const [subject, setSubject] = useState("");

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [body, setBody] = useState("");

  const ticketCreate = useSelector((state) => state.ticketCreate);
  const { loading, success, error, ticket } = ticketCreate;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      validName === "green" &&
      validSubject === "green" &&
      validEmail === "green" &&
      validBody === "green"
    ) {
      dispatch(createTicket(subject, email, phone, body, name));
    }
    // dispatch(emailCreateTicket(subject, email, name, phone, body));

    // props.history.push("/");
  };

  useEffect(() => {
    if (success) {
      // console.log("order :", order);
      props.history.push(`/ticket/${ticket._id}`);
      dispatch({ type: TICKET_CREATE_RESET });
    }
  }, [dispatch, ticket, props.history, success]);

  ///////// Regex///////////////////////////////////

  const [validName, setValidName] = useState("blue");
  const [validSubject, setValidSubject] = useState("blue");
  const [validEmail, setValidEmail] = useState("blue");
  const [validPhone, setValidPhone] = useState("blue");

  const [validBody, setValidBody] = useState("blue");

  const patterns = {
    name: /^[\p{L} ,.'-]+$/u,

    subject: /(^.{2,})+$/i,

    email: /^\w+@[ a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,

    phone: /^\d{10,11}$/gim,
    body: /(^.{5,})+$/i,
  };

  const handleKey = (event) => {
    let typeOfInput = event.target.attributes.name.value;
    let value = event.target.value;
    // console.log("value :", value);

    // console.log("patterns[typeOfInput] :", patterns[typeOfInput]);
    // console.log("typeOfInput :", typeOfInput);

    validate(value, patterns[typeOfInput], typeOfInput);
  };

  function validate(value, regex, typeOfInput) {
    let validationState = regex.test(value);

    // console.log(validationState);

    switch (typeOfInput) {
      case "name":
        validationState ? setValidName("green") : setValidName("red");
        break;

      case "subject":
        validationState ? setValidSubject("green") : setValidSubject("red");
        break;
      case "email":
        validationState ? setValidEmail("green") : setValidEmail("red");
        break;
      case "phone":
        validationState ? setValidPhone("green") : setValidPhone("red");
        break;

      case "body":
        validationState ? setValidBody("green") : setValidBody("red");
        break;

      default:
        break;
    }
  }

  //////////////////////////////////////////////////////////

  return (
    <div className="ContactScreen">
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Contact</h1>
        </div>
        <div className="input-area">
          <label htmlFor="Name">Name</label>
          <input
            className="form-control"
            name="name"
            type="name"
            id="Name"
            placeholder="Enter Your Name"
            value={name}
            onKeyUp={handleKey}
            onChange={(e) => {
              setName(e.target.value);
            }}
            style={{
              border:
                validName === "green"
                  ? "0.2rem #24bb2c solid"
                  : "0.2rem #d11e08 solid",
            }}
            required
          ></input>
          {/* validation start */}
          {validName === "green" && (
            <>
              <div className="valid-feed">
                Looks good! <i className="far fa-smile"></i>
                <div className="valid-animation">
                  <div
                    className="swal2-icon swal2-success swal2-animate-success-icon"
                    style={{ display: "flex" }}
                  >
                    <div
                      className="swal2-success-circular-line-left"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    />
                    <span className="swal2-success-line-tip" />
                    <span className="swal2-success-line-long" />
                    <div className="swal2-success-ring" />
                    <div
                      className="swal2-success-fix"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    />
                    <div
                      className="swal2-success-circular-line-right"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    />
                  </div>
                </div>{" "}
              </div>
            </>
          )}
          {validName === "red" && (
            <>
              <div className="invalid-feed">
                Please provide a valid Name.
                <div className="valid-animation">
                  <div
                    className="swal2-icon swal2-error swal2-animate-error-icon"
                    style={{ display: "flex" }}
                  >
                    <span className="swal2-x-mark">
                      <span className="swal2-x-mark-line-left" />
                      <span className="swal2-x-mark-line-right" />
                    </span>
                  </div>
                </div>{" "}
              </div>{" "}
            </>
          )}

          {validName !== "red" && validName !== "green" && (
            <>
              <div className="invalid-feed blue-feed">
                Please provide a valid Name.
                <div className="valid-animation">
                  <div
                    className="swal2-icon swal2-error swal2-animate-error-icon blue-feed"
                    style={{ display: "flex" }}
                  >
                    <span className="swal2-x-mark"></span>
                  </div>
                </div>{" "}
              </div>{" "}
            </>
          )}
          {/* validation end */}
        </div>

        <div>
          <label htmlFor="Subject">Subject</label>
          <input
            className="form-control"
            onKeyUp={handleKey}
            name="subject"
            type="text"
            id="Subject"
            placeholder="Enter Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{
              border:
                validSubject === "green"
                  ? "0.2rem #24bb2c solid"
                  : "0.2rem #d11e08 solid",
            }}
            required
          ></input>
          {/* validation start */}
          {/* validation start */}
          {validSubject === "green" && (
            <>
              <div className="valid-feed">
                Looks good! <i className="far fa-smile"></i>
                <div className="valid-animation">
                  <div
                    className="swal2-icon swal2-success swal2-animate-success-icon"
                    style={{ display: "flex" }}
                  >
                    <div
                      className="swal2-success-circular-line-left"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    />
                    <span className="swal2-success-line-tip" />
                    <span className="swal2-success-line-long" />
                    <div className="swal2-success-ring" />
                    <div
                      className="swal2-success-fix"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    />
                    <div
                      className="swal2-success-circular-line-right"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    />
                  </div>
                </div>{" "}
              </div>
            </>
          )}
          {validSubject === "red" && (
            <>
              <div className="invalid-feed">
                Please provide a valid Subject.
                <div className="valid-animation">
                  <div
                    className="swal2-icon swal2-error swal2-animate-error-icon"
                    style={{ display: "flex" }}
                  >
                    <span className="swal2-x-mark">
                      <span className="swal2-x-mark-line-left" />
                      <span className="swal2-x-mark-line-right" />
                    </span>
                  </div>
                </div>{" "}
              </div>{" "}
            </>
          )}

          {validSubject !== "red" && validSubject !== "green" && (
            <>
              <div className="invalid-feed blue-feed">
                Please provide a valid Subject.
                <div className="valid-animation">
                  <div
                    className="swal2-icon swal2-error swal2-animate-error-icon blue-feed"
                    style={{ display: "flex" }}
                  >
                    <span className="swal2-x-mark"></span>
                  </div>
                </div>{" "}
              </div>{" "}
            </>
          )}
          {/* validation end */}
          {/* validation end */}
        </div>

        <div>
          <label htmlFor="Email">Email</label>
          <input
            className="form-control"
            onKeyUp={handleKey}
            name="email"
            type="email"
            id="Email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              border:
                validEmail === "green"
                  ? "0.2rem #24bb2c solid"
                  : "0.2rem #d11e08 solid",
            }}
            required
          ></input>
          {/* validation start */}
          {validEmail === "green" && (
            <>
              <div className="valid-feed">
                Looks good! <i className="far fa-smile"></i>
                <div className="valid-animation">
                  <div
                    className="swal2-icon swal2-success swal2-animate-success-icon"
                    style={{ display: "flex" }}
                  >
                    <div
                      className="swal2-success-circular-line-left"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    />
                    <span className="swal2-success-line-tip" />
                    <span className="swal2-success-line-long" />
                    <div className="swal2-success-ring" />
                    <div
                      className="swal2-success-fix"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    />
                    <div
                      className="swal2-success-circular-line-right"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    />
                  </div>
                </div>{" "}
              </div>
            </>
          )}
          {validEmail === "red" && (
            <>
              <div className="invalid-feed">
                Please provide a valid Email.
                <div className="valid-animation">
                  <div
                    className="swal2-icon swal2-error swal2-animate-error-icon"
                    style={{ display: "flex" }}
                  >
                    <span className="swal2-x-mark">
                      <span className="swal2-x-mark-line-left" />
                      <span className="swal2-x-mark-line-right" />
                    </span>
                  </div>
                </div>{" "}
              </div>{" "}
            </>
          )}

          {validEmail !== "red" && validEmail !== "green" && (
            <>
              <div className="invalid-feed blue-feed">
                Please provide a valid Email.
                <div className="valid-animation">
                  <div
                    className="swal2-icon swal2-error swal2-animate-error-icon blue-feed"
                    style={{ display: "flex" }}
                  >
                    <span className="swal2-x-mark"></span>
                  </div>
                </div>{" "}
              </div>{" "}
            </>
          )}
          {/* validation end */}
        </div>

        <div>
          <label htmlFor="Phone">Phone</label>
          <input
            className="form-control"
            onKeyUp={handleKey}
            name="phone"
            type="phone"
            id="Phone"
            placeholder="Enter full name"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              border:
                validPhone === "green"
                  ? "0.2rem #24bb2c solid"
                  : "0.2rem #d11e08 solid",
            }}
            required
          ></input>
          {/* validation start */}
          {validPhone === "green" && (
            <>
              <div className="valid-feed">
                Looks good! <i className="far fa-smile"></i>
                <div className="valid-animation">
                  <div
                    className="swal2-icon swal2-success swal2-animate-success-icon"
                    style={{ display: "flex" }}
                  >
                    <div
                      className="swal2-success-circular-line-left"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    />
                    <span className="swal2-success-line-tip" />
                    <span className="swal2-success-line-long" />
                    <div className="swal2-success-ring" />
                    <div
                      className="swal2-success-fix"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    />
                    <div
                      className="swal2-success-circular-line-right"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    />
                  </div>
                </div>{" "}
              </div>
            </>
          )}
          {validPhone === "red" && (
            <>
              <div className="invalid-feed">
                Please provide a valid Phone.
                <div className="valid-animation">
                  <div
                    className="swal2-icon swal2-error swal2-animate-error-icon"
                    style={{ display: "flex" }}
                  >
                    <span className="swal2-x-mark">
                      <span className="swal2-x-mark-line-left" />
                      <span className="swal2-x-mark-line-right" />
                    </span>
                  </div>
                </div>{" "}
              </div>{" "}
            </>
          )}

          {validPhone !== "red" && validPhone !== "green" && (
            <>
              <div className="invalid-feed blue-feed">
                Please provide a valid Phone.
                <div className="valid-animation">
                  <div
                    className="swal2-icon swal2-error swal2-animate-error-icon blue-feed"
                    style={{ display: "flex" }}
                  >
                    <span className="swal2-x-mark"></span>
                  </div>
                </div>{" "}
              </div>{" "}
            </>
          )}
          {/* validation end */}
        </div>

        <div>
          <label htmlFor="Body">Body</label>
          <textarea
            className=" form-control big-text-area"
            onKeyUp={handleKey}
            name="body"
            id="Body"
            placeholder="Enter your query"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{
              border:
                validBody === "green"
                  ? "0.2rem #24bb2c solid"
                  : "0.2rem #d11e08 solid",
            }}
            required
          ></textarea>
          {/* validation start */}
          {validBody === "green" && (
            <>
              <div className="valid-feed">
                Looks good! <i className="far fa-smile"></i>
                <div className="valid-animation">
                  <div
                    className="swal2-icon swal2-success swal2-animate-success-icon"
                    style={{ display: "flex" }}
                  >
                    <div
                      className="swal2-success-circular-line-left"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    />
                    <span className="swal2-success-line-tip" />
                    <span className="swal2-success-line-long" />
                    <div className="swal2-success-ring" />
                    <div
                      className="swal2-success-fix"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    />
                    <div
                      className="swal2-success-circular-line-right"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    />
                  </div>
                </div>{" "}
              </div>
            </>
          )}
          {validBody === "red" && (
            <>
              <div className="invalid-feed">
                Please provide a valid Content.
                <div className="valid-animation">
                  <div
                    className="swal2-icon swal2-error swal2-animate-error-icon"
                    style={{ display: "flex" }}
                  >
                    <span className="swal2-x-mark">
                      <span className="swal2-x-mark-line-left" />
                      <span className="swal2-x-mark-line-right" />
                    </span>
                  </div>
                </div>{" "}
              </div>{" "}
            </>
          )}

          {validBody !== "red" && validBody !== "green" && (
            <>
              <div className="invalid-feed blue-feed">
                Please provide a valid Content.
                <div className="valid-animation">
                  <div
                    className="swal2-icon swal2-error swal2-animate-error-icon blue-feed"
                    style={{ display: "flex" }}
                  >
                    <span className="swal2-x-mark"></span>
                  </div>
                </div>{" "}
              </div>{" "}
            </>
          )}
          {/* validation end */}
        </div>

        <div>
          <label />
          <button className="primary" type="submit">
            Submit
          </button>
        </div>
      </form>
      {loading && <LoadingBox></LoadingBox>}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
    </div>
  );
}
