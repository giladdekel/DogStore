import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_DETAILS_RESET } from "../constants/userConstants";
import { detailsStatics } from "../actions/orderActions";
import DashboardHeader from "../components/DashboardHeader/DashboardHeader";

export default function UserListScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch({
      type: USER_DETAILS_RESET,
    });
  }, [dispatch, successDelete]);

  const deleteHandler = (user) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(user._id));
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
      {successDelete && (
        <MessageBox variant="success">User Deleted Successfully</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <>
            <>
              <div className="listScreen">
                <div className="container rounded mt-5 bg-white p-md-5">
                  <div className="h2 font-weight-bold">Users</div>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">NAME</th>
                          <th scope="col">DATE</th>
                          <th scope="col">EMAIL</th>
                          <th scope="col">IS ADMIN</th>
                          <th scope="col">IS ACTIVE</th>
                          <th scope="col">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users &&
                          users.map((user) => (
                            <>
                              <tr key={user._id} className="bg-blue">
                                <td
                                  onClick={() => {
                                    props.history.push(
                                      `/user/${user._id}/edit`
                                    );
                                  }}
                                  className="pt-3"
                                >
                                  {user._id}
                                </td>

                                <td
                                  onClick={() => {
                                    props.history.push(
                                      `/user/${user._id}/edit`
                                    );
                                  }}
                                  className="pt-2"
                                >
                                  {user.image ? (
                                    <img
                                      src={user.image}
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
                                    {user.name
                                      ? user.name
                                      : ` the user deleted`}
                                  </div>
                                </td>
                                <td
                                  onClick={() => {
                                    props.history.push(
                                      `/user/${user._id}/edit`
                                    );
                                  }}
                                  className="pt-3 mt-1"
                                >
                                  {user.createdAt.substring(0, 10)}
                                </td>
                                <td className="pt-3">{user.email}</td>

                                <td
                                  onClick={() => {
                                    props.history.push(
                                      `/user/${user._id}/edit`
                                    );
                                  }}
                                  className="pt-3"
                                >
                                  {user.isAdmin ? (
                                    <button
                                      className="btn btn-success btn-sm  deliver-btn"
                                      type="button"
                                      aria-expanded="false"
                                    >
                                      Yes
                                    </button>
                                  ) : (
                                    <button
                                      className="btn btn-danger btn-sm no-btn "
                                      type="button"
                                      aria-expanded="false"
                                    >
                                      No
                                    </button>
                                  )}
                                </td>

                                <td
                                  onClick={() => {
                                    props.history.push(
                                      `/user/${user._id}/edit`
                                    );
                                  }}
                                  className="pt-3"
                                >
                                  {user.isActive ? (
                                    <button
                                      className="btn btn-success btn-sm  deliver-btn"
                                      type="button"
                                      aria-expanded="false"
                                    >
                                      Yes{" "}
                                    </button>
                                  ) : (
                                    <button
                                      className="btn btn-danger btn-sm no-btn "
                                      type="button"
                                      aria-expanded="false"
                                    >
                                      No{" "}
                                    </button>
                                  )}
                                </td>
                                <td>
                                  <a
                                    href="#"
                                    class="table-link text-info icon-info"
                                    onClick={() => {
                                      props.history.push(
                                        `/user/${user._id}/edit`
                                      );
                                    }}
                                  >
                                    <span class="fa-stack">
                                      <i class="fa fa-square fa-stack-2x"></i>
                                      <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                    </span>
                                  </a>

                                  {user.isActive ? (
                                    <a
                                      onClick={() => deleteHandler(user)}
                                      href="#"
                                      class="table-link danger trash-icon"
                                    >
                                      <span class="fa-stack">
                                        <i class="fa fa-square fa-stack-2x"></i>
                                        <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                      </span>
                                    </a>
                                  ) : (
                                    <button
                                      className="btn btn-success btn-sm  deliver-btn activate-btn"
                                      type="button"
                                      aria-expanded="false"
                                      onClick={() => deleteHandler(user)}
                                    >
                                      Activate
                                    </button>
                                  )}
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
        </>
      )}
    </div>
  );
}
