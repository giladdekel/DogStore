import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  findFacebookByEmail,
  signin,
  signWithGoogle,
} from "../../actions/userActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { GoogleLogin } from "react-google-login";
import GitHubLogin from "react-github-login";

import "./SigninScreen.scss";
import { findByEmail } from "./../../actions/userActions";
import ReactFacebookLogin from "react-facebook-login";

export default function SigninScreen(props) {
  console.log("props :", props);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  const responseFacebook = (response) => {
    // console.log("response :", response);
    // console.log("response :", response.accessToken);
    dispatch(findFacebookByEmail(response));
  };

  const onSuccess = (response) => console.log(response);
  const onFailure = (response) => console.error(response);

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  const responseGoogle = (response) => {
    // console.log("response :", response);
    // console.log("response :", response.tokenId);

    dispatch(findByEmail(response));
  };
  return (
    <div className="signin-screen">
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          {" "}
          <div>
            New customer?{" "}
            <Link to={`/register?redirect=${redirect}`}>
              Create your account
            </Link>
          </div>
          <label />
          {/* <button
            className="btn btn-lg btn-google btn-block text-uppercase"
            type="button"
          >
            <i className="fab fa-google mr-2" /> Sign in with Google
          </button>
          <button
            className="btn btn-lg btn-facebook btn-block text-uppercase"
            type="button"
          >
            <i className="fab fa-facebook-f mr-2" /> Sign in with Facebook
          </button> */}
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_ID}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            // cookiePolicy="single_host_origin"
            theme="dark"
          />
          <ReactFacebookLogin
            icon="fa-facebook"
            appId={process.env.REACT_APP_FACEBOOK_ID}
            // autoLoad={true}
            fields="name,email,picture"
            // onClick={componentClicked}
            // onSuccess={responseFacebook}
            callback={responseFacebook}
          />
          {/* <GitHubLogin
            clientId="603a2ad4134171bc96a4"
            onSuccess={onSuccess}
            onFailure={onFailure}
          /> */}
        </div>
      </form>
    </div>
  );
}
