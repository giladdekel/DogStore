import React from "react";

import { Link } from "react-router-dom";

import "./DashboardProfile.scss";

function DashboardProfile() {
  return (
    <>
      <div className="dash1">
        {/* <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
            rel="stylesheet"
          /> */}
        <div className="container ">
          <div className="row">
            <div height="120px" className="col-lg-4 col-sm-6">
              <div className="card-box bg-primary">
                <div className="inner">
                  <br />
                  <br />
                  <br />
                </div>
                <div className="icon">
                  <i className="fa fa-user" aria-hidden="true" />
                </div>
                <Link to="/profile">
                  <a href="#" className="card-box-footer">
                    PROFILE <i className="fa fa-arrow-circle-right" />
                  </a>
                </Link>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6">
              <div className="card-box bg-red">
                <div className="inner">
                  <br />
                  <br />
                  <br />
                </div>
                <div className="icon">
                  <i className="fa fa-shopping-cart" />
                </div>
                <Link to="/orderhistory">
                  <a href="#" className="card-box-footer">
                    ORDERS <i className="fa fa-arrow-circle-right" />
                  </a>
                </Link>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6">
              <div className="card-box bg-secondary">
                <div className="inner">
                  <br />
                  <br />
                  <br />
                </div>
                <div className="icon">
                  <i className="fas fa-ticket-alt" aria-hidden="true" />
                </div>{" "}
                <Link to="/tickethistory">
                  <a href="#" className="card-box-footer">
                    TICKETS <i className="fa fa-arrow-circle-right" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardProfile;
