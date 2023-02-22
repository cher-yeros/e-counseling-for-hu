import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { userRequest as api } from "../../requestmethods";

export default function Posts() {
  const [Posts, setPosts] = useState([]);
  const getPosts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/v1/api/admin/get-posts`
      );
      console.log(res.data, "res");
      setPosts(res.data);
      // console.log(Post, "post");
    } catch (err) {}
  };
  useEffect(() => {
    getPosts();
  }, []);

  const handleApprove = (id, action) => {
    console.log(id, action);

    api
      .post("/admin/approve-post", {
        postId: id,
        action,
      })
      .then(({ data }) => {
        console.log(data);
        getPosts();
      });
  };

  return (
    <>
      <Sidebar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Navbar />

        <div className="container-fluid py-4">
          <div className="row mb-4">
            <div className="col-lg-8 col-md-6 mb-md-0 mb-4">
              <div className="card">
                <div className="card-header pb-0">
                  <div className="row">
                    <div className="col-lg-6 col-7">
                      <h6>Posts</h6>
                    </div>
                  </div>
                </div>
                <div className="card-body px-0 pb-2 pt-0">
                  <div className="table-responsive">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Title
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Author
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Category
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Posts.map((p, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">{p.title}</h6>
                                </div>
                              </div>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <span className="text-xs font-weight-bold">
                                {p.Counselor?.fullName}
                              </span>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <span className="text-xs font-weight-bold">
                                {p.category}
                              </span>
                            </td>
                            <td>
                              {p.approved ? (
                                <button
                                  onClick={() => handleApprove(p.id, 1)}
                                  className="btn btn-outline-success btn-sm"
                                >
                                  {/*Disapprove*/}
                                  Approved!
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleApprove(p.id, 0)}
                                  className="btn btn-outline-primary btn-sm"
                                >
                                  Approve
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
