import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { Alert } from "react-bootstrap";

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;

  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;

  const [lat, setLat] = useState(shippingAddress.lat);

  const [lng, setLng] = useState(shippingAddress.lng);

  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap, successMap } = userAddressMap;

  if (!userInfo) {
    props.history.push("/signin");
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const [usingMap, setUsingMap] = useState(false);
  const [displayError, setDisplayError] = useState(false);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    const newLat = addressMap ? addressMap.lat : lat;
    const newLng = addressMap ? addressMap.lng : lng;

    if (addressMap) {
      setLat(addressMap.lat);
      setLng(addressMap.lng);
    }
    let moveOn = true;
    if (!newLat || !newLng) {
      moveOn = window.confirm(
        "You did not set your location on map. Continue?"
      );
    }
    if (
      moveOn &&
      validFullName !== "red" &&
      validAddress !== "red" &&
      validCity !== "red" &&
      validPostalCode !== "red" &&
      validCountry !== "red"
    ) {
      dispatch(
        saveShippingAddress({
          fullName,
          address,
          city,
          postalCode,
          country,
          lat: newLat,
          lng: newLng,
        })
      );
      props.history.push("/payment");
    } else {
      setDisplayError(true);
      setTimeout(() => {
        setDisplayError(false);
      }, 2000);
    }
  };
  const chooseOnMap = () => {
    dispatch(
      saveShippingAddress({
        fullName,
        address,
        city,
        postalCode,
        country,
        lat,
        lng,
      })
    );
    props.history.push("/map");
  };

  useEffect(() => {
    if (addressMap) {
      setAddress(addressMap.address);
      setCity("");
      setPostalCode("");
      setCountry("");
      setUsingMap(true);
    }
  }, [successMap]);

  //////// regex start/////////////////////////////
  const [validFullName, setValidFullName] = useState("blue");

  const [validAddress, setValidAddress] = useState("blue");

  const [validCity, setValidCity] = useState("blue");

  const [validPostalCode, setValidPostalCode] = useState("blue");

  const [validCountry, setValidCountry] = useState("blue");

  const patterns = {
    fullName: /^[\p{L} ,.'-]+$/u,

    address: /^[\p{L} \d ,.'-]+$/u,

    city: /^[\p{L} ,.'-]+$/u,
    postalCode: /^\d{5,7}(?:[-\s]\d{4})?$/i,
    country: /^[\p{L} ,.'-]+$/u,
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
      case "fullName":
        validationState ? setValidFullName("green") : setValidFullName("red");
        break;
      case "address":
        validationState ? setValidAddress("green") : setValidAddress("red");
        break;
      case "city":
        validationState ? setValidCity("green") : setValidCity("red");
        break;
      case "postalCode":
        validationState
          ? setValidPostalCode("green")
          : setValidPostalCode("red");
        break;
      case "country":
        validationState ? setValidCountry("green") : setValidCountry("red");
        break;

      default:
        break;
    }
  }

  ////////// regex end ///////////////////////////////

  return (
    <div className="ContactScreen">
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div className=" name-zone input-area">
          <label htmlFor="fullName">Full Name</label>
          <input
            className="form-control"
            name="fullName"
            type="text"
            id="fullName"
            placeholder="Enter full name"
            value={fullName}
            onKeyUp={handleKey}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            style={{
              border:
                validFullName === "green"
                  ? "0.2rem #24bb2c solid"
                  : "0.2rem #007bff solid",
            }}
            required
          ></input>
          {/* validation start */}
          {validFullName === "green" && (
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
          {validFullName === "red" && (
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

          {validFullName !== "red" && validFullName !== "green" && (
            <>
              <div className="invalid-feed blue-feed">
                Type here to update your Full Name.
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

        {addressMap && successMap && usingMap ? (
          <div className="google-address-zone">
            <label htmlFor="address">Full Address From Google Map</label>
            <input
              onKeyUp={handleKey}
              className="form-control"
              name="address"
              type="text"
              id="address"
              placeholder=">Full Address From Google Map"
              value={addressMap.address}
              onChange={(e) => setAddress(e.target.value)}
              style={{
                border:
                  validAddress === "green"
                    ? "0.2rem #24bb2c solid"
                    : "0.2rem #007bff solid",
              }}
              required
            ></input>
            {/* validation start */}
            {validAddress === "green" && (
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
            {validAddress === "red" && (
              <>
                <div className="invalid-feed">
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

            {validAddress !== "red" && validAddress !== "green" && (
              <>
                <div className="invalid-feed blue-feed">
                  Type here to update your Address.
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
            <button onClick={() => setUsingMap(false)}>
              Click to write your address instead of using google
            </button>
          </div>
        ) : (
          <>
            <div className="address-zone">
              <label htmlFor="address">Address</label>
              <input
                onKeyUp={handleKey}
                className="form-control"
                name="address"
                type="text"
                id="address"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                style={{
                  border:
                    validAddress === "green"
                      ? "0.2rem #24bb2c solid"
                      : "0.2rem #007bff solid",
                }}
              ></input>
              {/* validation start */}
              {validAddress === "green" && (
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
              {validAddress === "red" && (
                <>
                  <div className="invalid-feed">
                    Type here to update your Address.
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

              {validAddress !== "red" && validAddress !== "green" && (
                <>
                  <div className="invalid-feed blue-feed">
                    Type here to update your Address.
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

            <div className="city-zone">
              <label htmlFor="city">City</label>
              <input
                onKeyUp={handleKey}
                className="form-control"
                name="city"
                type="text"
                id="city"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                style={{
                  border:
                    validCity === "green"
                      ? "0.2rem #24bb2c solid"
                      : "0.2rem #007bff solid",
                }}
              ></input>
              {/* validation start */}
              {validCity === "green" && (
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
              {validCity === "red" && (
                <>
                  <div className="invalid-feed">
                    Type here to update your City.
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

              {validCity !== "red" && validCity !== "green" && (
                <>
                  <div className="invalid-feed blue-feed">
                    Type here to update your City.
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

            <div className="postalCode-zone">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                onKeyUp={handleKey}
                className="form-control"
                name="postalCode"
                type="text"
                id="postalCode"
                placeholder="Enter postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                style={{
                  border:
                    validPostalCode === "green"
                      ? "0.2rem #24bb2c solid"
                      : "0.2rem #007bff solid",
                }}
              ></input>
              {/* validation start */}
              {validPostalCode === "green" && (
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
              {validPostalCode === "red" && (
                <>
                  <div className="invalid-feed">
                    Type here to update your PostalCode.
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

              {validPostalCode !== "red" && validPostalCode !== "green" && (
                <>
                  <div className="invalid-feed blue-feed">
                    Type here to update your Postal Code.
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

            <div className="country-zone">
              <label htmlFor="country">Country</label>
              <input
                onKeyUp={handleKey}
                className="form-control"
                name="country"
                type="text"
                id="country"
                placeholder="Enter country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                style={{
                  border:
                    validCountry === "green"
                      ? "0.2rem #24bb2c solid"
                      : "0.2rem #007bff solid",
                }}
              ></input>
              {/* validation start */}
              {validCountry === "green" && (
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
              {validCountry === "red" && (
                <>
                  <div className="invalid-feed">
                    Type here to update your Country.
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

              {validCountry !== "red" && validCountry !== "green" && (
                <>
                  <div className="invalid-feed blue-feed">
                    Type here to update your Country.
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
          </>
        )}

        <div>
          <label htmlFor="chooseOnMap">Location</label>
          <button type="button" onClick={chooseOnMap}>
            Choose On Map
          </button>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
          {displayError && <Alert variant="warning">Invalid input</Alert>}
        </div>
      </form>
    </div>
  );
}
