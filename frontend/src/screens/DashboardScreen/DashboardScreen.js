import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Pie, defaults, Bar, Line } from "react-chartjs-2";

import "./DashboardScreen.scss";
import { detailsStatics } from "./../../actions/orderActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { Link } from "react-router-dom";
import DashboardHeader from "./../../components/DashboardHeader/DashboardHeader";

defaults.global.tooltips.enabled = false;
defaults.global.legend.position = "bottom";

export default function DashboardScreen() {
  const dispatch = useDispatch();

  const staticsDetails = useSelector((state) => state.staticsDetails);

  const { statics, loading, error } = staticsDetails;
  console.log("statics :", statics);

  useEffect(() => {
    dispatch(detailsStatics());
  }, [dispatch, detailsStatics]);

  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="DashboardScreen">
          <DashboardHeader statics={statics} />

          <div className="chart">
            {/* {// setArrOfDays(statics.ordersByDay.map((day) => day._id));

    // setArrOfEarning(statics.ordersByDay.map((day) => day.sales));} */}

            <div>
              {statics.ordersByDay && (
                <Line
                  data={{
                    labels: statics.ordersByDay.map((day) => day._id),
                    datasets: [
                      {
                        label: "Earning in $",
                        data: statics.ordersByDay.map((day) => day.sales),
                        backgroundColor: [
                          "rgba(255, 99, 132, 0.2)",
                          "rgba(54, 162, 235, 0.2)",
                          "rgba(255, 206, 86, 0.2)",
                        ],
                        borderColor: [
                          "rgba(255, 99, 132, 1)",
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 206, 86, 1)",
                        ],
                        borderWidth: 1,
                      },
                      {
                        label: "Orders",
                        data: statics.ordersByDay.map((day) => day.orders),
                        backgroundColor: "orange",
                        borderColor: "orange",
                      },
                    ],
                  }}
                  height={450}
                  width={200}
                  options={{
                    title: {
                      display: true,
                      text: "Sales",
                    },
                    maintainAspectRatio: false,
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                            // stepSize: 1,
                          },
                        },
                      ],
                    },
                    legend: {
                      labels: {
                        fontSize: 25,
                      },
                    },
                  }}
                />
              )}
            </div>

            <div>
              {statics.productsStatic && (
                <Pie
                  data={{
                    labels: statics.productsStatic.map(
                      (product) => product._id
                    ),
                    datasets: [
                      {
                        label: "Amount of Products",
                        data: statics.productsStatic.map(
                          (product) => product.count
                        ),
                        backgroundColor: [
                          "rgba(255, 99, 132, 1)",
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 206, 86, 1)",
                          "rgba(5, 919, 132, 1)",
                          "rgba(524, 162, 235, 1)",
                          "rgba(55, 26, 286, 1)",
                          "rgba(255, 99, 12, 1)",
                          "rgba(14, 762, 235, 1)",
                          "rgba(255, 245, 6, 1)",
                          "rgba(111, 7, 722, 1)",
                          "rgba(153, 15, 55, 1)",
                          "rgba(255, 3, 34, 1)",
                          "rgba(255, 9, 2, 1)",
                          "rgba(54, 222, 5, 1)",
                          "rgba(255, 206, 826, 1)",
                        ],
                        borderColor: [
                          "rgba(255, 99, 132, 1)",
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 206, 86, 1)",
                          "rgba(5, 919, 132, 1)",
                          "rgba(524, 162, 235, 1)",
                          "rgba(55, 26, 286, 1)",
                          "rgba(255, 99, 12, 1)",
                          "rgba(14, 762, 235, 1)",
                          "rgba(255, 245, 6, 1)",
                          "rgba(111, 7, 722, 1)",
                          "rgba(153, 15, 55, 1)",
                          "rgba(255, 3, 34, 1)",
                          "rgba(255, 9, 2, 1)",
                          "rgba(54, 222, 5, 1)",
                          "rgba(255, 206, 826, 1)",
                        ],
                        borderWidth: 1,
                      },
                      // {
                      //   label: "Orders",
                      //   data: statics.ordersByDay.map((day) => day.orders),
                      //   backgroundColor: "orange",
                      //   borderColor: "red",
                      // },
                    ],
                  }}
                  height={450}
                  width={200}
                  options={{
                    title: {
                      display: true,
                      text: "Amount of Products",
                    },
                    maintainAspectRatio: false,
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                          },
                        },
                      ],
                    },
                    legend: {
                      labels: {
                        fontSize: 15,
                      },
                    },
                  }}
                />
              )}
            </div>
            {/* Users Line */}
            <div>
              {statics.usersByDay && (
                <Line
                  data={{
                    labels: statics.usersByDay.map((day) => day._id),
                    datasets: [
                      {
                        label: "New Users Par Day",
                        data: statics.usersByDay.map((day) => day.users),
                        backgroundColor: [
                          "rgba(624, 333, 2, 0.5)",
                          "rgba(54, 62, 235, 0.2)",
                          "rgba(255, 06, 86, 0.2)",
                          "rgba(255, 992, 12, 0.2)",
                          "rgba(54, 362, 235, 0.2)",
                          "rgba(255, 245, 633, 0.2)",
                          "rgba(75, 777, 192, 0.2)",
                          "rgba(153, 1, 255, 0.2)",
                          "rgba(245, 23, 34, 0.2)",
                        ],
                        borderColor: [
                          "rgba(624, 333, 2, 1)",
                          "rgba(54, 62, 235, 1)",
                          "rgba(255, 06, 86, 1)",
                          "rgba(255, 992, 12, 1)",
                          "rgba(54, 362, 235, 1)",
                          "rgba(255, 245, 633, 01)",
                          "rgba(75, 777, 192, 1)",
                          "rgba(153, 1, 255, 1)",
                          "rgba(245, 23, 34, 01)",
                        ],
                        borderWidth: 1,
                      },
                      // {
                      //   label: "Orders",
                      //   data: statics.ordersByDay.map((day) => day.orders),
                      //   backgroundColor: "orange",
                      //   borderColor: "red",
                      // },
                    ],
                  }}
                  height={450}
                  width={200}
                  options={{
                    title: {
                      display: true,
                      text: "Users",
                    },
                    maintainAspectRatio: false,
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                            stepSize: 1,
                          },
                        },
                      ],
                    },
                    legend: {
                      labels: {
                        fontSize: 15,
                      },
                    },
                  }}
                />
              )}
            </div>

            {/* Posts Line */}
            <div>
              {statics.postsByDay && (
                <Line
                  data={{
                    labels: statics.postsByDay.map((day) => day._id),
                    datasets: [
                      {
                        label: "New Posts Par Day",
                        data: statics.postsByDay.map((day) => day.posts),
                        backgroundColor: [
                          "rgba(2, 99, 132, 0.2)",
                          "rgba(545, 162, 235, 0.2)",
                          "rgba(55, 206, 86, 0.2)",
                          "rgba(255, 9, 12, 0.2)",
                          "rgba(54, 12, 235, 0.2)",
                          "rgba(255,445, 6, 0.2)",
                          "rgba(75, 737, 192, 0.2)",
                          "rgba(153, 145, 255, 0.2)",
                          "rgba(255, 33, 64, 0.2)",
                        ],
                        borderColor: [
                          "rgba(2, 99, 132, 1)",
                          "rgba(545, 162, 235, 0.2)",
                          "rgba(55, 206, 86, 0.2)",
                          "rgba(255, 9, 12, 0.2)",
                          "rgba(54, 12, 235, 0.2)",
                          "rgba(255,445, 6, 0.2)",
                          "rgba(75, 737, 192, 0.2)",
                          "rgba(153, 145, 255, 0.2)",
                          "rgba(255, 33, 64, 0.2)",
                        ],
                        borderWidth: 1,
                      },
                      // {
                      //   label: "Orders",
                      //   data: statics.ordersByDay.map((day) => day.orders),
                      //   backgroundColor: "orange",
                      //   borderColor: "red",
                      // },
                    ],
                  }}
                  height={450}
                  width={200}
                  options={{
                    title: {
                      display: true,
                      text: "Posts",
                    },
                    maintainAspectRatio: false,
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                            stepSize: 1,
                          },
                        },
                      ],
                    },
                    legend: {
                      labels: {
                        fontSize: 15,
                      },
                    },
                  }}
                />
              )}
            </div>
          </div>
          <div className="dash2">
            <link
              href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
              rel="stylesheet"
            />
            <div className="container bootstrap snippets bootdey">
              <h1>Summery</h1>
              <div className="row">
                <div className="col-md-2 col-sm-6 col-xs-12">
                  <div className="panel panel-dark panel-colorful bg-primary ">
                    <div className="panel-body text-center">
                      <p className="text-uppercase mar-btm text-sm">Users</p>
                      <i className="fa fa-users fa-5x" />
                      <hr />
                      <p className="h2 text-thin">
                        {statics.usersCount ? statics.usersCount : "No Users"}
                      </p>
                      <small>
                        <span className="text-semibold">
                          <i className="fa fa-users" />{" "}
                          {statics.usersCountThisMonth[0]
                            ? statics.usersCountThisMonth[0].users
                            : "No"}
                        </span>{" "}
                        New Users in this month
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 col-sm-6 col-xs-12">
                  <div className="panel panel-danger panel-colorful bg-orange">
                    <div className="panel-body text-center">
                      <p className="text-uppercase mar-btm text-sm">Posts</p>
                      <i className="fa fa-comment fa-5x" />
                      <hr />
                      <p className="h2 text-thin">
                        {statics.totalPosts[0]
                          ? statics.totalPosts[0].posts
                          : "No Posts"}
                      </p>
                      <small>
                        <span className="text-semibold">
                          <i className="fa fa-comment" />{" "}
                          {statics.postsCountThisMonth[0]
                            ? statics.postsCountThisMonth[0].posts
                            : ` No`}
                        </span>{" "}
                        New posts this month
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 col-sm-6 col-xs-12 ">
                  <div className="panel panel-primary panel-colorful  bg-red">
                    <div className="panel-body text-center">
                      <p className="text-uppercase mar-btm text-sm">Orders</p>
                      <i className="fa fa-shopping-cart fa-5x" />
                      <hr />

                      <p className="h2 text-thin">
                        {statics.ordersCount
                          ? statics.ordersCount
                          : "No Orders"}
                      </p>

                      <small>
                        <span className="text-semibold">
                          <i className="fa fa-shopping-cart fa-fw" />{" "}
                          {statics.totalOrdersThisMonth[0]
                            ? statics.totalOrdersThisMonth[0].orders
                            : ` No`}
                        </span>{" "}
                        Orders in this month
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 col-sm-6 col-xs-12">
                  <div className="panel panel-info panel-colorful  bg-success">
                    <div className="panel-body text-center">
                      <p className="text-uppercase mar-btm text-sm ">Earning</p>
                      <i className="fa fa-dollar fa-5x" />
                      <hr />
                      <p className="h2 text-thin">
                        {statics.totalEarning[0]
                          ? statics.totalEarning[0].sales
                          : 0}
                      </p>
                      <small>
                        <span className="text-semibold">
                          <i className="fa fa-dollar fa-fw" />
                          {statics.totalEarningThisMonth[0]
                            ? statics.totalEarningThisMonth[0].sales
                            : 0}
                        </span>{" "}
                        in this Month
                      </small>
                    </div>
                  </div>
                </div>

                <div className="col-md-2 col-sm-6 col-xs-12  ">
                  <div className="panel panel-info panel-colorful">
                    <div className="panel-body text-center  bg-info">
                      <p className="text-uppercase mar-btm text-sm ">
                        Products
                      </p>
                      <i className="fas fa-bone fa-5x" />
                      <hr />
                      <p className="h2 text-thin">
                        {statics.totalProducts[0]
                          ? statics.totalProducts[0].products
                          : "No Products"}
                      </p>
                      <small>
                        <span className="text-semibold">
                          <i className="fas fa-bone fa-fw" />
                          {statics.totalProductsThisMonth[0]
                            ? statics.totalProductsThisMonth[0].products
                            : ` No`}
                        </span>{" "}
                        New this Month
                      </small>
                    </div>
                  </div>
                </div>

                <div className="col-md-2 col-sm-6 col-xs-12">
                  <div className="panel panel-info panel-colorful  bg-secondary">
                    <div className="panel-body text-center">
                      <p className="text-uppercase mar-btm text-sm ">Tickets</p>
                      <i className="fas fa-ticket-alt fa-5x" />
                      <hr />
                      <p className="h2 text-thin">
                        {statics.totalTickets[0]
                          ? statics.totalTickets[0].tickets
                          : 0}
                      </p>
                      <small>
                        <span className="text-semibold">
                          <i className="fas fa-ticket-alt fa-fw" />
                          {statics.totalTicketsThisMonth[0]
                            ? statics.totalTicketsThisMonth[0].tickets
                            : "No"}
                        </span>{" "}
                        New Tickets in this Month
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>

    ///Pie
  );
}
