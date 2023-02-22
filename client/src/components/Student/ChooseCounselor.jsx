import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStudentCounselor } from "../../redux/userRedux";
import { userRequest } from "../../requestmethods";
import Sidebar from "./Sidebar";

function ChooseCounselor() {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [Counselors, setCounselors] = useState([]);

  const [P, setP] = useState([]);
  const [E, setE] = useState([]);
  const [A, setA] = useState([]);

  const [CList, setCList] = useState([]);

  const [Category, setCategory] = useState("");

  useEffect(() => {
    getCounselors();
  }, []);

  function getCounselors() {
    userRequest.get("/admin/counselors").then(({ data }) => {
      setCounselors(data);
      setCList(data);
      setP(data.filter((c) => c.category == "phycological"));
      setE(data.filter((c) => c.category == "economical"));
      setA(data.filter((c) => c.category == "academical"));
    });
  }

  const dispatch = useDispatch();

  function handleAssign(selected) {
    //alert(currentUser.CounselorId != selected.id);
    var ok = window.confirm("Are you sure you want to change counselor?");

    if (!ok) return;
    //alert(selected.id);
    //return;
    userRequest
      .post("admin/assign-counselor", {
        sId: currentUser.id,
        cId: selected.id,
      })
      .then(({ data }) => {
        if (data.success) {
          dispatch(updateStudentCounselor(data.counselor));
          alert("Sucessfully Chosen");
          getCounselors();
        } else {
          alert(data.message);
        }
      });
  }
  return (
    <>
      <Sidebar />
      <main
        style={{ overflow: "hidden" }}
        className="main-content position-relative max-height-vh-100 h-100 border-radius-lg "
      >
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
              <h6 className="font-weight-bolder mb-0">Choose Counselor By :</h6>
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
                      setCList(Counselors);
                    }}
                    className="btn btn-success btn-sm"
                  >
                    All Counselors
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => {
                      setCList(
                        Counselors.filter((c) => c.category == "economical")
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
                      setCList(
                        Counselors.filter((c) => c.category == "acadamical")
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
                      console.log(
                        Counselors.filter((c) => c.category == "phycological")
                      );
                      setCList(
                        Counselors.filter((c) => c.category == "phycological")
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
        <div className="row  mx-3 " style={{ marginTop: "5rem" }}>
          {CList.map((counselor, i) => (
            <div key={counselor.id} className="col-4 mb-3">
              <div className="card h-100">
                <div className="card-header pb-0 p-3">
                  <div className="row">
                    <div className="col-md-8 d-flex align-items-center">
                      <h5 className="mb-0">{counselor.fullName}</h5>
                    </div>
                  </div>
                </div>
                <div className="card-body p-3">
                  <hr className="horizontal gray-light my-"></hr>
                  <ul className="list-group">
                    <li className="list-group-item border-0 ps-0 text-sm">
                      <strong className="text-dark">Mobile:</strong> &nbsp;
                      {counselor.phone}
                    </li>
                    <li className="list-group-item border-0 ps-0 text-sm">
                      <strong className="text-dark">Email:</strong> &nbsp;
                      {counselor.email}
                    </li>
                    <li className="list-group-item border-0 ps-0 text-sm">
                      <strong className="text-dark">Category:</strong> &nbsp;
                      {counselor.category}
                    </li>
                    <li className="list-group-item border-0 ps-0 text-sm">
                      <strong className="text-dark">Articles :</strong> &nbsp;
                      {counselor.Posts.length}
                    </li>
                    <li className="list-group-item border-0 ps-0 text-sm">
                      <strong className="text-dark">
                        Students Counseled :
                      </strong>
                      &nbsp;
                      {counselor.HUStudents.length}
                    </li>
                  </ul>
                  {currentUser?.CounselorId == counselor.id ? (
                    <button
                      disabled
                      className="btn btn-primary btn-sm shadow-primary"
                    >
                      Selected
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAssign(counselor)}
                      className="btn btn-primary btn-sm shadow-primary"
                    >
                      Select
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default ChooseCounselor;
