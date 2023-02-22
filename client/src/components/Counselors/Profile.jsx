import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const CurrentUser = useSelector((state) => state.user.currentUser);

  return (
    <>
      <Sidebar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <div className="container-fluid px-2 px-md-4 mt-3">
          <Navbar />
          <div className="card card-body mx-3 mx-md-4 mt-n6">
            <div className="row gx-4 mb-2">
              <div className="col-auto">
                <div className="avatar avatar-xl position-relative"></div>
              </div>
              <div className="col-auto my-auto">
                <div className="h-100">
                  <h5 className="mb-1">{CurrentUser.fullName}</h5>
                  <p className="mb-0 font-weight-normal text-sm">Counselor</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-xl-8">
                <div className="card h-100">
                  <div className="card-header pb-0 p-3">
                    <div className="row">
                      <div className="col-md-8 d-flex align-items-center">
                        <h6 className="mb-0">Profile Information</h6>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-3">
                    <hr className="horizontal gray-light my-"></hr>
                    <ul className="list-group">
                      <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                        <strong className="text-dark">Full Name:</strong> &nbsp;{" "}
                        {CurrentUser.fullName}
                      </li>
                      <li className="list-group-item border-0 ps-0 text-sm">
                        <strong className="text-dark">Mobile:</strong> &nbsp;
                        {CurrentUser.phone}
                      </li>
                      <li className="list-group-item border-0 ps-0 text-sm">
                        <strong className="text-dark">Email:</strong> &nbsp;
                        {CurrentUser.email}
                      </li>
                      <li className="list-group-item border-0 ps-0 text-sm">
                        <strong className="text-dark">Category:</strong> &nbsp;
                        {CurrentUser.category}
                      </li>
                    </ul>
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

export default Profile;
