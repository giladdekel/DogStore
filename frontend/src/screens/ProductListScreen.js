import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../constants/productConstants";
import { detailsStatics } from "../actions/orderActions";
import DashboardHeader from "../components/DashboardHeader/DashboardHeader";

export default function ProductListScreen(props) {
  const { pageNumber = 1 } = useParams();

  const sellerMode = props.match.path.indexOf("/seller") >= 0;

  const productList = useSelector((state) => state.productList);

  const { loading, error, products, page, pages } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(
      listProducts({ seller: sellerMode ? userInfo._id : "", pageNumber })
    );
  }, [
    createdProduct,
    dispatch,
    props.history,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
    pageNumber,
  ]);

  const deleteHandler = (product) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(product._id));
    }
  };
  const createHandler = () => {
    dispatch(createProduct());
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
    <div className="container">
      {loadingStatics ? (
        <LoadingBox></LoadingBox>
      ) : errorStatics ? (
        <MessageBox variant="danger">{errorStatics}</MessageBox>
      ) : (
        <DashboardHeader statics={statics} />
      )}

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <>
            <div className="listScreen">
              <div className="container rounded mt-5 bg-white p-md-5">
                <div className="h2 font-weight-bold">Products</div>
                <div className="table-responsive">
                  <button
                    type="button"
                    className="btn-success"
                    onClick={createHandler}
                  >
                    Create Product
                  </button>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">NAME</th>
                        <th scope="col">DATE</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">CATEGORY</th>
                        <th scope="col">STOCK</th>
                        <th scope="col">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products &&
                        products
                          .filter((product) => product.isActive)
                          .map((product) => (
                            <>
                              <tr key={product._id} className="bg-blue">
                                <td
                                  onClick={() => {
                                    props.history.push(
                                      `/product/${product._id}/edit`
                                    );
                                  }}
                                  className="pt-2"
                                >
                                  {product._id}
                                </td>

                                <td
                                  onClick={() => {
                                    props.history.push(
                                      `/product/${product._id}/edit`
                                    );
                                  }}
                                  className="pt-2"
                                >
                                  {product.image ? (
                                    <img
                                      src={product.image}
                                      className="square"
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
                                    {product.name
                                      ? `${product.name.slice(0, 15)}...`
                                      : ` the product deleted`}
                                  </div>
                                </td>
                                <td
                                  onClick={() => {
                                    props.history.push(
                                      `/product/${product._id}/edit`
                                    );
                                  }}
                                  className="pt-3 mt-1"
                                >
                                  {product.createdAt.substring(0, 10)}
                                </td>

                                <td
                                  onClick={() => {
                                    props.history.push(
                                      `/product/${product._id}/edit`
                                    );
                                  }}
                                  className="pt-3"
                                >
                                  ${product.price}
                                </td>

                                <td className="pt-3">{product.category}</td>

                                <td
                                  onClick={() => {
                                    props.history.push(
                                      `/product/${product._id}/edit`
                                    );
                                  }}
                                  className="pt-3"
                                >
                                  {product.countInStock > 0 ? (
                                    <button
                                      className="btn btn-success btn-sm  deliver-btn"
                                      type="button"
                                      aria-expanded="false"
                                    >
                                      {product.countInStock}
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
                                <td>
                                  <a
                                    href="#"
                                    class="table-link text-info icon-info"
                                    onClick={() => {
                                      props.history.push(
                                        `/product/${product._id}/edit`
                                      );
                                    }}
                                  >
                                    <span class="fa-stack">
                                      <i class="fa fa-square fa-stack-2x"></i>
                                      <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                    </span>
                                  </a>

                                  <a
                                    onClick={() => deleteHandler(product)}
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
                  <div className="row center pagination">
                    {[...Array(pages).keys()].map((x) => (
                      <Link
                        className={x + 1 === page ? "active" : ""}
                        key={x + 1}
                        to={`/productlist/pageNumber/${x + 1}`}
                      >
                        {x + 1}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        </>
      )}
    </div>
  );
}
