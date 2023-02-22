import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/userRedux.js";

function Sidebar() {
  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  function logout(e) {
    dispatch(logoutUser());
  }
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
        <div className="row">
          <span className="ms-1 font-weight-bold text-white">
            {currentUser.name}
          </span>
          <div className="btn btn-primary btn-sm">Admin</div>
        </div>
      </div>
      <hr className="horizontal light mt-0 mb-2" />
      <div
        className="collapse navbar-collapse  w-auto "
        id="sidenav-collapse-main"
      >
        <ul className="navbar-nav" style={{ overflow: "hidden" }}>
          <li className="nav-item">
            <Link to="/admin" className="nav-link text-white ">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center"></div>
              <span className=" text-white nav-link-text ms-1">Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/counselors" className="nav-link text-white ">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center"></div>
              <span className=" text-white nav-link-text ms-1">Counselors</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/posts" className="nav-link text-white ">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center"></div>
              <span className=" text-white nav-link-text ms-1">Posts</span>
            </Link>
          </li>
          {/*<li className="nav-item">
            <Link to="/case" className="nav-link text-white ">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center"></div>
              <span className=" text-white nav-link-text ms-1">Cases</span>
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
