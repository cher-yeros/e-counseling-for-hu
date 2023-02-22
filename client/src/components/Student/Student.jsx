import { useEffect, useState } from "react";
import { userRequest as api } from "../../requestmethods";
import Sidebar from "./Sidebar";

function Register() {
  const [Posts, setPosts] = useState([]);
  const [FilteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  function getPosts() {
    api.get("/student/approved-posts").then(({ data }) => {
      setPosts(data);
      setFilteredPosts(data);
    });
  }

  return (
    <>
      <Sidebar />

      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <nav
          style={{
            position: "fixed",
            zIndex: "1000",
            background: "white",
            width: "100%",
            top: "0",
          }}
          className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
          id="navbarBlur"
          navbar-scroll="true"
        >
          <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              <h6 className="font-weight-bolder mb-0">Filter Post By :</h6>
            </nav>

            <div
              className="collapse navbar-collapse  justify-content-center"
              id="navbar"
            >
              <ul
                className="navbar-nav d-flex justify-content-end mx-2"
                style={{ gap: "1rem" }}
              >
                <li>
                  <button
                    onClick={() => {
                      setFilteredPosts(Posts);
                    }}
                    className="btn btn-success btn-sm"
                  >
                    All Posts
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => {
                      setFilteredPosts(
                        Posts.filter((c) => c.category == "economical")
                      );
                    }}
                    className="btn btn-success btn-sm"
                  >
                    Economical
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setFilteredPosts(
                        Posts.filter((c) => c.category == "acadamical")
                      );
                    }}
                    className="btn btn-success btn-sm"
                  >
                    Acadamical
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setFilteredPosts(
                        Posts.filter((c) => c.category == "phycological")
                      );
                    }}
                    className="btn btn-success btn-sm"
                  >
                    Physcological
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container-fluid pt-3" style={{ marginTop: "5rem" }}>
          <div className="container">
            <div className="text-center pb-2">
              <h3 className="mb-4">Latest Articles From counsellors</h3>
            </div>

            <div className="row pb-3">
              {FilteredPosts.map((post) => (
                <div className="col-lg-4 mb-4">
                  <div className="card border-0 shadow-sm mb-2">
                    <img
                      style={{ height: "12rem" }}
                      className=""
                      src={`http://localhost:5000/${post.image}`}
                    />
                    <div className="card-body bg-light text-center p-4">
                      <h4 className="">{post.title}</h4>
                      <p>{post.content}</p>
                      {/*<a href="" className="btn btn-primary px-4 mx-auto my-2">
                        Read More
                      </a>*/}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Register;
