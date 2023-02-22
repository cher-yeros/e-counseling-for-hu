import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCounselorStudent } from "../../redux/userRedux";
import { userRequest as api } from "../../requestmethods";
import ChatBox from "../Chat1/ChatC";
import Sidebar from "./Sidebar";

export default function Messages() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [Student, setStudent] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    getMyStudents();
  }, []);

  function getMyStudents() {
    api.get("/counselor/my-students/" + currentUser.id).then(({ data }) => {
      if (data.success) {
        dispatch(setCounselorStudent(data.students));
      }
    });
  }

  return (
    <>
      <Sidebar />
      <main
        style={{ overflow: "hidden" }}
        className="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
      >
        <div className="row mt-3">
          <div className="col-lg-6">
            <div className="card h-100 ">
              <div className="card-header pb-0 p-3">
                <h6 className="mb-0">Your Students</h6>
              </div>

              <div className="card-body p-3 ">
                <ul className="list-group">
                  {currentUser?.Students?.map((student) => (
                    <li
                      key={student.id}
                      className="list-group-item border-0 d-flex align-items-center px-0 mb-2 pt-0"
                    >
                      <div className="row justify-content-between w-100">
                        <div className="col-lg-9">
                          <div className="d-flex align-items-start flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">{student.fullname}</h6>
                            <p className="mb-0 text-xs">
                              Click to chat with student...
                            </p>
                          </div>
                        </div>

                        <div className="col-lg-3">
                          <button
                            onClick={() => setStudent(student)}
                            className="btn btn-outline-primary btn-sm"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            {Student?.id && <ChatBox Student={Student} />}
          </div>
        </div>
      </main>
    </>
  );
}
