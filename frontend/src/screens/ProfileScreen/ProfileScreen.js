import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Alert } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../../actions/userActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import "./ProfileScreen.scss";
import DashboardProfile from "../../components/DashboardProfile/DashboardProfile";

export default function ProfileScreen() {
  const [image, setImage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerLogo, setSellerLogo] = useState("");
  const [sellerDescription, setSellerDescription] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setImage(user.image);
      setEmail(user.email);
      if (user.seller) {
        setSellerName(user.seller.name);
        setSellerLogo(user.seller.logo);
        setSellerDescription(user.seller.description);
      }
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert("Password and Confirm Password Are Not Matched");
    } else if (
      (validName !== "red" || name.length < 1) &&
      (validEmail !== "red" || email.length < 1) &&
      (validPassword !== "red" || password.length < 1)
    ) {
      dispatch(
        updateUserProfile({
          userId: user._id,
          image,
          name,
          email,
          password,
          sellerName,
          sellerLogo,
          sellerDescription,
        })
      );
    } else {
      setDisplayError(true);
      setTimeout(() => {
        setDisplayError(false);
      }, 2000);
    }
  };

  useEffect(() => {
    dispatch(detailsUser(userInfo._id));
  }, [successUpdate]);

  ////////////// upload image start//////

  const [loadingUpload, setLoadingUpload] = useState(false);

  const [errorUpload, setErrorUpload] = useState("");

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  ////////////// upload image end///////

  //////// regex start/////////////////////////////
  const [validName, setValidName] = useState("blue");

  const [validEmail, setValidEmail] = useState("blue");
  const [validPassword, setValidPassword] = useState("blue");
  const [validConfirmPassword, setValidConfirmPassword] = useState("blue");

  const [displayError, setDisplayError] = useState(false);

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
    <div className="profile-screen ContactScreen">
      <DashboardProfile />

      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1 className="title">User Profile</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Profile Updated Successfully
              </MessageBox>
            )}
            <div>
              {image && <img className="avatar-img" src={image} alt="Avatar" />}
              <div>
                <label htmlFor="image">Photo</label>
                <input
                  id="image"
                  type="text"
                  placeholder="Enter Profile Photo"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="imageFile"> Profile Image File</label>
                <input
                  type="file"
                  id="imageFile"
                  label="Choose Image"
                  onChange={uploadFileHandler}
                ></input>
                {loadingUpload && <LoadingBox></LoadingBox>}
                {errorUpload && (
                  <MessageBox variant="danger">{errorUpload}</MessageBox>
                )}
              </div>
            </div>

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
                      : "0.2rem #007bff solid",
                }}
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
                    Type here to update your Name.
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
                    Type here to update your Name.
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  border:
                    validEmail === "green"
                      ? "0.2rem #24bb2c solid"
                      : "0.2rem #007bff solid",
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
                    Type here to update your Email.
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
                    Type here to update your Email.
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  border:
                    validPassword === "green"
                      ? "0.2rem #24bb2c solid"
                      : "0.2rem #007bff solid",
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
                    Type here to update your Password.
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
                    Type here to update your Password.
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  border:
                    password === confirmPassword && confirmPassword > 0
                      ? "0.2rem #24bb2c solid"
                      : "0.2rem #007bff solid",
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

            {/* {user.isSeller && (
              <>
                <h2>Seller</h2>
                <div>
                  <label htmlFor="sellerName">Seller Name</label>
                  <input
                    id="sellerName"
                    type="text"
                    placeholder="Enter Seller Name"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="sellerLogo">Seller Logo</label>
                  <input
                    id="sellerLogo"
                    type="text"
                    placeholder="Enter Seller Logo"
                    value={sellerLogo}
                    onChange={(e) => setSellerLogo(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="sellerDescription">Seller Description</label>
                  <input
                    id="sellerDescription"
                    type="text"
                    placeholder="Enter Seller Description"
                    value={sellerDescription}
                    onChange={(e) => setSellerDescription(e.target.value)}
                  ></input>
                </div>
              </>
            )} */}
            <div>
              <label />
              <button className="primary" type="submit">
                Update
              </button>
              {displayError && <Alert variant="warning">Invalid input</Alert>}
            </div>
          </>
        )}
      </form>
    </div>
  );
}
