import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { detailsPost, updatePost } from "../actions/postActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { POST_UPDATE_RESET } from "../constants/postConstants";

export default function PostEditScreen(props) {
  const postId = props.match.params.id;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [authorImage, setAuthorImage] = useState("");

  const postDetails = useSelector((state) => state.postDetails);
  const { loading, error, post } = postDetails;

  const postUpdate = useSelector((state) => state.postUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = postUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      props.history.push("/postlist");
    }
    if (!post || post._id !== postId || successUpdate) {
      dispatch({ type: POST_UPDATE_RESET });
      dispatch(detailsPost(postId));
    } else {
      setName(post.name);
      setImage(post.image);
      setCategory(post.category);
      setDescription(post.description);
      setAuthor(post.author);
      setAuthorImage(post.authorImage);
    }
  }, [post, dispatch, postId, successUpdate, props.history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updatePost({
        _id: postId,
        name,
        image,
        category,
        description,
        author,
        authorImage,
      })
    );
  };

  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;

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

  ////////////// upload Author image start//////

  const [loadingUploadAuthor, setLoadingUploadAuthor] = useState(false);

  const [errorUploadAuthor, setErrorUploadAuthor] = useState("");

  const uploadFileHandlerAuthor = async (e) => {
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
      setAuthorImage(data);
      setLoadingUploadAuthor(false);
    } catch (error) {
      setErrorUploadAuthor(error.message);
      setLoadingUploadAuthor(false);
    }
  };

  ////////////// upload Author image end///////

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Post {postId}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="text"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="imageFile">Image File</label>
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
            <div>
              <label htmlFor="name">Title</label>
              <input
                id="name"
                type="text"
                placeholder="Enter Title"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="author">Author</label>
              <input
                id="author"
                type="text"
                placeholder="Enter author name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="image"> Author Image</label>
              <input
                id="image"
                type="text"
                placeholder="Enter Author image"
                value={authorImage}
                onChange={(e) => setAuthorImage(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="imageFile"> Author Image File</label>
              <input
                type="file"
                id="imageFile"
                label="Choose Author Image"
                onChange={uploadFileHandlerAuthor}
              ></input>
              {loadingUploadAuthor && <LoadingBox></LoadingBox>}
              {errorUploadAuthor && (
                <MessageBox variant="danger">{errorUploadAuthor}</MessageBox>
              )}
            </div>

            <div>
              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="description">Text</label>
              <textarea
                id="description"
                rows="20"
                type="text"
                placeholder="Enter content"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div>
              <label></label>
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
