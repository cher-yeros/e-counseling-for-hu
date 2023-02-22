import Sidebar from "./Sidebar";
import "./css/material-dashboard.css";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { userRequest as api } from "../../requestmethods";
function Layout() {
  const [Count, setCount] = useState({
    approvedPosts: 0,
    counselors: 0,
    students: 0,
    unApprovedPosts: 0,
  });

  useEffect(() => {
    getCounts();
  }, []);

  function getCounts() {
    api.get("/admin/counts").then(({ data }) => {
      console.log(data);
      setCount(data);
    });
  }

  return (
    <>
      <Sidebar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Navbar />

        <div className="container-fluid py-4">
          <div className="row mt-4">
            <div className="col-lg-3 col-md-6 mt-4 mb-4">
              <div className="card z-index-2 ">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                  <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                    <h1 style={{ textAlign: "center", color: "white" }}>
                      {Count.counselors}
                    </h1>
                  </div>
                </div>
                <div className="card-body">
                  <h6 className="mb-0 ">Counselors</h6>
                  <p className="text-sm ">Number of Counselors registered</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mt-4 mb-4">
              <div className="card z-index-2  ">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                  <div className="bg-gradient-success shadow-success border-radius-lg py-3 pe-1">
                    <h1 style={{ textAlign: "center", color: "white" }}>
                      {Count.approvedPosts}
                    </h1>
                  </div>
                </div>
                <div className="card-body">
                  <h6 className="mb-0 ">Approved Posts</h6>
                  <p className="text-sm ">Number of approved posts</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 mt-4 mb-3">
              <div className="card z-index-2 ">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                  <div className="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1">
                    <h1 style={{ textAlign: "center", color: "white" }}>
                      {Count.unApprovedPosts}
                    </h1>
                  </div>
                </div>
                <div className="card-body">
                  <h6 className="mb-0 ">Unapproved Posts</h6>
                  <p className="text-sm ">Number of unapproved posts</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 mt-4 mb-3">
              <div className="card z-index-2 ">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                  <div className="bg-gradient-info shadow-info border-radius-lg py-3 pe-1">
                    <h1 style={{ textAlign: "center", color: "white" }}>
                      {Count.counselors}
                    </h1>
                  </div>
                </div>
                <div className="card-body">
                  <h6 className="mb-0 ">Students</h6>
                  <p className="text-sm ">Numbr of students get counseled</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Layout;
