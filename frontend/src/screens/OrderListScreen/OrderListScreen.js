import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, listOrders } from "../../actions/orderActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { ORDER_DELETE_RESET } from "../../constants/orderConstants";
import { detailsStatics } from "../../actions/orderActions";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import "./OrderListScreen.scss";
import { Alert } from "react-bootstrap";

export default function OrderListScreen(props) {
  const sellerMode = props.match.path.indexOf("/seller") >= 0;
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrders({ seller: sellerMode ? userInfo._id : "" }));
  }, [dispatch, sellerMode, successDelete, userInfo._id]);
  const deleteHandler = (order) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteOrder(order._id));
    }
  };

  ////////// DashboardHeader start//////////////////////

  const staticsDetails = useSelector((state) => state.staticsDetails);

  const {
    statics,
    loading: loadingStatics,
    error: errorStatics,
  } = staticsDetails;

  useEffect(() => {
    dispatch(detailsStatics());
  }, [dispatch, detailsStatics, successDelete]);

  ////////// DashboardHeader end//////////////////////
  return (
    <>
      <div>
        {loadingStatics ? (
          <LoadingBox></LoadingBox>
        ) : errorStatics ? (
          <MessageBox variant="danger">{errorStatics}</MessageBox>
        ) : (
          <DashboardHeader statics={statics} />
        )}
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div className="listScreen">
              <div className="container rounded mt-5 bg-white p-md-5">
                <div className="h2 font-weight-bold">Orders</div>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">USER</th>
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
                                className="pt-2"
                              >
                                {order.user.image ? (
                                  <img
                                    src={order.user.image}
                                    className="rounded-circle"
                                    alt
                                  />
                                ) : (
                                  <img
                                    src="https://placedog.net/1000?random"
                                    className="rounded-circle"
                                    alt
                                  />
                                )}

                                <div className="pl-lg-5 pl-md-3 pl-1 name">
                                  {order.user.name
                                    ? order.user.name
                                    : ` the user deleted`}
                                </div>
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
                                  class="table-link text-info icon-info"
                                  onClick={() => {
                                    props.history.push(`/order/${order._id}`);
                                  }}
                                >
                                  <span class="fa-stack">
                                    <i class="fa fa-square fa-stack-2x"></i>
                                    <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                  </span>
                                </a>

                                <a
                                  onClick={() => deleteHandler(order)}
                                  href="#"
                                  class="table-link danger trash-icon"
                                >
                                  <span class="fa-stack">
                                    <i class="fa fa-square fa-stack-2x"></i>
                                    <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
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
        )}
      </div>
    </>
  );
}
