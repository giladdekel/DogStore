import React from "react";

import { Link } from "react-router-dom";

import "./DashboardHeader.scss";

function DashboardHeader(props) {
  const { statics } = props;

  return (
    <>
      <div className="dash1">
        {/* <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
            rel="stylesheet"
          /> */}
        <div className="container ">
          <div className="row">
            <div className="col-lg-2 col-sm-6">
              <div className="card-box bg-primary">
                <div className="inner">
                  <h3> {statics.usersCount ? statics.usersCount : 0} </h3>
                  <p> Users </p>
                </div>
                <div className="icon">
                  <i className="fa fa-users" aria-hidden="true" />
                </div>
                <Link to="/userlist">
                  <a href="#" className="card-box-footer">
                    View More <i className="fa fa-arrow-circle-right" />
                  </a>
                </Link>
              </div>
            </div>

            <div className="col-lg-2 col-sm-6">
              <div className="card-box bg-orange">
                <div className="inner">
                  <h3>
                    {statics.totalPosts[0] ? statics.totalPosts[0].posts : 0}
                  </h3>
                  <p>Posts </p>
                </div>
                <div className="icon">
                  <i className="fa fa-comment" aria-hidden="true" />
                </div>
                <Link to="/postlist">
                  <a href="#" className="card-box-footer">
                    View More <i className="fa fa-arrow-circle-right" />
                  </a>
                </Link>
              </div>
            </div>

            <div className="col-lg-2 col-sm-6">
              <div className="card-box bg-red">
                <div className="inner">
                  <h3> {statics.ordersCount ? statics.ordersCount : 0} </h3>
                  <p> Orders </p>
                </div>
                <div className="icon">
                  <i className="fa fa-shopping-cart" />
                </div>
                <Link to="/orderlist">
                  <a href="#" className="card-box-footer">
                    View More <i className="fa fa-arrow-circle-right" />
                  </a>
                </Link>
              </div>
            </div>

            <div className="col-lg-2 col-sm-6">
              <div className="card-box bg-success">
                <div className="inner">
                  <h3>
                    $
                    {statics.totalEarning[0]
                      ? statics.totalEarning[0].sales
                      : 0}
                  </h3>
                  <p> Sales </p>
                </div>
                <div className="icon">
                  <i className="fa fa-money" aria-hidden="true" />
                </div>
                <Link to="/orderlist">
                  <a href="#" className="card-box-footer">
                    View More <i className="fa fa-arrow-circle-right" />
                  </a>
                </Link>
              </div>
            </div>

            <div className="col-lg-2 col-sm-6">
              <div className="card-box bg-info">
                <div className="inner">
                  <h3>
                    {statics.totalProducts[0]
                      ? statics.totalProducts[0].products
                      : 0}
                  </h3>
                  <p> Products </p>
                </div>
                <div className="icon">
                  <i className="fas fa-bone" aria-hidden="true" />
                </div>{" "}
                <Link to="/productlist">
                  <a href="#" className="card-box-footer">
                    View More <i className="fa fa-arrow-circle-right" />
                  </a>
                </Link>
              </div>
            </div>

            <div className="col-lg-2 col-sm-6">
              <div className="card-box bg-secondary">
                <div className="inner">
                  <h3>
                    {statics.totalTickets[0]
                      ? statics.totalTickets[0].tickets
                      : 0}
                  </h3>
                  <p> Tickets </p>
                </div>
                <div className="icon">
                  <i className="fas fa-ticket-alt" aria-hidden="true" />
                </div>{" "}
                <Link to="/ticketlist">
                  <a href="#" className="card-box-footer">
                    View More <i className="fa fa-arrow-circle-right" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-6"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardHeader;
