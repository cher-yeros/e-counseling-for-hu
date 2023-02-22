import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../redux/apiCalls";
import Sidebar from "./Sidebar";

export default function Post() {
  const [Posts, setPosts] = useState([]);
  const [showPostForm, setshowPostForm] = useState(false);
  const counselor = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [Post, setPost] = useState({
    title: "",
    content: "",
    category: "",
  });
  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/v1/api/counselor/get-posts/${counselor.id}`
      );
      console.log(res.data);
      setPosts(res.data);
    } catch (err) {}
  };

  return (
    <>
      <Sidebar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <div className="col-11 mt-4 ">
          <div className="mb-5 ps-3">
            <div className="row justify-content-between">
              <h6 className="mb-1 w-10">Projects</h6>
              <button
                onClick={() => setshowPostForm(true)}
                className="w-15 btn btn-primary btn-sm"
              >
                Add Posts
              </button>
            </div>
          </div>
          <div className="row">
            {Posts?.map((p, i) => (
              <div className="p-3 col-lg-4 col-md-6 mb-xl-0 mb-4" key={i}>
                <div className="card ">
                  <div className="card-header pb-0 p-3">
                    <div className="row">
                      <div className="col-md-8 d-flex align-items-center">
                        <h6 className="mb-0">{p.title}</h6>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-3">
                    <img
                      style={{
                        height: "10rem",
                        width: "100%",
                      }}
                      src={`http://localhost:5000/${p.image}`}
                    />
                    <strong className="mb-0 text-sm">{p.category}</strong>
                    {/*<a href="#">
                      <h5>{p.title}</h5>
                    </a>*/}
                    <p className="mb-4 text-sm">{p.content}</p>
                    <div className="d-flex align-items-center justify-content-between">
                      {p.approved ? (
                        <button
                          type="button"
                          className="btn btn-outline-success btn-sm mb-0"
                        >
                          Approved
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm mb-0"
                        >
                          Pending
                        </button>
                      )}

                      <div className="avatar-group mt-2">
                        <a
                          href="#"
                          className="avatar avatar-xs rounded-circle"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="Elena Morison"
                        ></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <PostForm
        show={showPostForm}
        onHide={() => setshowPostForm(false)}
        onAdded={() => getPosts()}
      />
    </>
  );
}

function PostForm(props) {
  const counselor = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [Post, setPost] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
  });

  const handleInputs = (e) => {
    e.preventDefault();
    setPost((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handlePost = async (e) => {
    e.preventDefault();
    Post.CounselorId = counselor.id;

    const formdata = new FormData();
    formdata.append("title", Post.title);
    formdata.append("content", Post.content);
    formdata.append("category", Post.category);
    formdata.append("image", Post.image);
    formdata.append("CounselorId", counselor.id);

    var a = await addPost(formdata, dispatch);
    props.onAdded();
  };

  return (
    <>
      <Modal
        {...props}
        backdrop="static"
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="add-product-modal"
        style={{ backgroundColor: "transparent" }}
      >
        <div className="card border-0">
          <div
            style={{ background: "#2483c7 !important" }}
            className="card-header bg-secondary text-center p-4"
          >
            <h3 className="text-white m-0">Create New Post</h3>

            <button
              onClick={() => props.onHide()}
              style={{
                position: "absolute",
                right: "1rem",
                top: ".8rem",
                fontSize: "2rem",
              }}
              type="button"
              class="close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div
            style={{ background: " #d5d5d5 !important" }}
            className="card-body rounded-bottom bg-success p-3"
          >
            <form>
              <div className="form-group">
                <strong className="form-label">Title</strong>

                <input
                  name="title"
                  value={Post.title}
                  onChange={handleInputs}
                  type="text"
                  className="form-control border-0 p-4"
                  placeholder="Title"
                  required="required"
                />
              </div>
              <div className="form-group">
                <strong className="form-label">Image</strong>

                <input
                  name="image"
                  onChange={(e) => {
                    Post.image = e.target.files[0];
                  }}
                  type="file"
                  className="form-control border-0 p-4"
                  placeholder="Title"
                  required="required"
                />
              </div>

              <div className="form-group">
                <strong className="form-label">Category</strong>

                <select
                  className="custom-select border-0 px-4"
                  style={{ height: "47px" }}
                  name="category"
                  value={Post.category}
                  onChange={handleInputs}
                >
                  <option disabled>Select Category</option>

                  <option value="economical">Economical</option>
                  <option value="acadamical">Acadamical</option>
                  <option value="phycological">Psycological</option>
                </select>
              </div>
              <div className="form-group">
                <strong className="form-label">Post</strong>
                <textarea
                  name="content"
                  value={Post.content}
                  onChange={handleInputs}
                  type="text"
                  className="form-control border-0 px-4"
                  placeholder="Post content"
                  required="required"
                  rows={4}
                />
              </div>

              <div>
                <button
                  onClick={handlePost}
                  className="btn btn-secondary btn-block border-0 py-3"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}
