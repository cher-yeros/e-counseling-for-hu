import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/userRedux";
function Sidebar() {
  const dispatch = useDispatch();

  function logout(e) {
    dispatch(logoutUser());
  }

  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <aside
      className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark"
      id="sidenav-main"
    >
      <div className="sidenav-header">
        <i
          className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
          aria-hidden="true"
          id="iconSidenav"
        ></i>
        <a
          className="navbar-brand m-0"
          href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard "
          target="_blank"
        >
          <span className="ms-1 font-weight-bold text-white">
            {currentUser.fullname}
          </span>
        </a>
      </div>
      <hr className="horizontal light mt-0 mb-2" />
      <div
        className="collapse navbar-collapse  w-auto "
        id="sidenav-collapse-main"
      >
        <ul className="navbar-nav" style={{ overflow: "hidden" }}>
          <li className="nav-item">
            <Link to="/student" className="nav-link text-white ">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center"></div>
              <span className=" text-white nav-link-text ms-1">Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/selecttype" className="nav-link text-white ">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center"></div>
              <span className=" text-white nav-link-text ms-1">
                Get Counselor
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/choose-counselor" className="nav-link text-white ">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center"></div>
              <span className=" text-white nav-link-text ms-1">
                Choose Counselor
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/chat" className="nav-link text-white ">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center"></div>
              <span className=" text-white nav-link-text ms-1">Chat</span>
            </Link>
          </li>

          {/*<li className="nav-item">
            <Link to="/selecttype" className="nav-link text-white ">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center"></div>
              <span className=" text-white nav-link-text ms-1">
                Select Type
              </span>
            </Link>
          </li>*/}

          <li className="nav-item nav-link text-white">
            <button onClick={logout} className="btn bg-gradient-primary">
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div className="sidenav-footer position-absolute w-100 bottom-0 "></div>
    </aside>
  );
}

export default Sidebar;
