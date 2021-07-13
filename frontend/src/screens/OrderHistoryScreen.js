import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Alert } from "react-bootstrap";
import DashboardProfile from "../components/DashboardProfile/DashboardProfile";

export default function OrderHistoryScreen(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : orders.length > 0 ? (
        <>
          <>
            <DashboardProfile />

            <div className="listScreen">
              <div className="container rounded mt-5 bg-white p-md-5">
                <div className="h2 font-weight-bold">Order History</div>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">DATE</th>
                        <th scope="col">TOTAL</th>
                        <th scope="col">PAID</th>
                        <th scope="col">DELIVERED</th>
                        <th scope="col">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders &&
                        orders.map((order) => (
                          <>
                            <tr key={order._id} className="bg-blue">
                              <td
                                onClick={() => {
                                  props.history.push(`/order/${order._id}`);
                                }}
                                className="pt-3"
                              >
                                {order._id}
                              </td>
                              <td
                                onClick={() => {
                                  props.history.push(`/order/${order._id}`);
                                }}
                                className="pt-3 mt-1"
                              >
                                {order.createdAt.substring(0, 10)}
                              </td>
                              <td className="pt-3">
                                $
                                {order.totalPrice.toFixed(2) -
                                  Number(order.coupon)}
                              </td>

                              <td
                                onClick={() => {
                                  props.history.push(`/order/${order._id}`);
                                }}
                                className="pt-3"
                              >
                                {order.isPaid ? (
                                  <button
                                    className="btn btn-success btn-sm  deliver-btn"
                                    type="button"
                                    aria-expanded="false"
                                  >
                                    {order.paidAt.substring(0, 10)}
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-danger btn-sm no-btn "
                                    type="button"
                                    aria-expanded="false"
                                  >
                                    Not Payed
                                  </button>
                                )}
                              </td>

                              <td
                                onClick={() => {
                                  props.history.push(`/order/${order._id}`);
                                }}
                                className="pt-3"
                              >
                                {order.isDelivered ? (
                                  <button
                                    className="btn btn-success btn-sm  deliver-btn"
                                    type="button"
                                    aria-expanded="false"
                                  >
                                    {order.deliveredAt.substring(0, 10)}
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-danger btn-sm no-btn "
                                    type="button"
                                    aria-expanded="false"
                                  >
                                    Not Delivered
                                  </button>
                                )}
                              </td>
                              <td>
                                <a
                                  href="#"
                                  className="table-link text-warning searching-icon"
                                  onClick={() => {
                                    props.history.push(`/order/${order._id}`);
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
      ) : (
        <Alert variant="warning">You Have No Orders</Alert>
      )}
    </div>
  );
}
