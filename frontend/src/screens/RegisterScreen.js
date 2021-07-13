import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  findByEmail,
  findFacebookByEmail,
  register,
} from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
// import dotenv from "dotenv";
// dotenv.config();
export default function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordsNotMatch, setPasswordsNotMatch] = useState(false);

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const userSignin = useSelector((state) => state.userSignin);
  const {
    userInfo: userInfoSignIn,
    loading: loadingSignIn,
    error: errorSignIn,
  } = userSignin;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordsNotMatch("Password and confirm password are not match");
    } else if (
      validName === "green" &&
      validEmail === "green" &&
      validPassword === "green"
    ) {
      dispatch(register(name, email, password));
    }
  };

  const responseGoogle = (response) => {
    dispatch(findByEmail(response));
  };

  const responseFacebook = (response) => {
    dispatch(findFacebookByEmail(response));
  };

  useEffect(() => {
    if (userInfo || userInfoSignIn) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo, userInfoSignIn]);

  //////// regex start/////////////////////////////
  const [validName, setValidName] = useState("blue");

  const [validEmail, setValidEmail] = useState("blue");
  const [validPassword, setValidPassword] = useState("blue");
  const [validConfirmPassword, setValidConfirmPassword] = useState("blue");

  const patterns = {
    name: /^[\p{L} ,.'-]+$/u,

    email: /^\w+@[ a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,

    password: /^[0-9a-zA-Z]{4,}$/,
    confirmPassword: /^[0-9a-zA-Z]{4,}$/,
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

    switch (typeOfInput) {
      case "name":
        validationState ? setValidName("green") : setValidName("red");
        break;
      case "email":
        validationState ? setValidEmail("green") : setValidEmail("red");
        break;
      case "password":
        validationState ? setValidPassword("green") : setValidPassword("red");
        break;
      case "confirmPassword":
        validationState
          ? setValidConfirmPassword("green")
          : setValidConfirmPassword("red");
        break;

      default:
        break;
    }
  }

  ////////// regex end ///////////////////////////////

  return (
    <div className="signin-screen ContactScreen">
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create Account</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {passwordsNotMatch && (
          <MessageBox variant="danger">
            Password and confirm password are not match
          </MessageBox>
        )}

        <div className=" name-zone input-area">
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

        <div className="email-zone">
          <label htmlFor="email">Email address</label>
          <input
            className="form-control"
            onKeyUp={handleKey}
            name="email"
            type="email"
            id="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              border:
                validEmail === "green"
                  ? "0.2rem #24bb2c solid"
                  : "0.2rem #d11e08 solid",
            }}
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

        <div className="password-zone">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            onKeyUp={handleKey}
            name="password"
            type="password"
            id="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              border:
                validPassword === "green"
                  ? "0.2rem #24bb2c solid"
                  : "0.2rem #d11e08 solid",
            }}
          ></input>
          {/* validation start */}
          {validPassword === "green" && (
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
          {validPassword === "red" && (
            <>
              <div className="invalid-feed">
                Please provide a valid Password.
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

          {validPassword !== "red" && validPassword !== "green" && (
            <>
              <div className="invalid-feed blue-feed">
                Please provide a valid Password.
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

        <div className="confirm-password-zone">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="form-control"
            onKeyUp={handleKey}
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            placeholder="Confirm you password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              border:
                password === confirmPassword && confirmPassword > 0
                  ? "0.2rem #24bb2c solid"
                  : "0.2rem #d11e08 solid",
            }}
          ></input>
          {/* validation start */}
          {password === confirmPassword && confirmPassword > 0 && (
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
          {password !== confirmPassword && confirmPassword > 0 && (
            <>
              <div className="invalid-feed">
                Please confirm your password.
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

          {confirmPassword < 1 && (
            <>
              <div className="invalid-feed blue-feed">
                Please confirm your password.
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
            Register
          </button>
        </div>
        <div>
          <div>
            Already have an account?{" "}
            <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </div>
          <label />
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_ID}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            theme="dark"
          />
          <FacebookLogin
            icon="fa-facebook"
            appId={process.env.REACT_APP_FACEBOOK_ID}
            // autoLoad={true}
            fields="name,email,picture"
            // onClick={componentClicked}
            // onSuccess={responseFacebook}
            callback={responseFacebook}
          />
        </div>
      </form>
    </div>
  );
}
