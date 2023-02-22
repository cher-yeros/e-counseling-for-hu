import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCounslor } from "../../redux/apiCalls";
import { userRequest } from "../../requestmethods";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Appointments() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [Appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getAppointments();
  }, []);
  const getAppointments = async () => {
    userRequest
      .get("/counselor/view-appointment/" + currentUser.id)
      .then(({ data }) => {
        console.log(data);
        setAppointments(data);
      });
  };
  const handleDelete = (id) => {
    deleteCounslor(id, dispatch);
    getAppointments();
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
                      <h6>Appointments</h6>
                    </div>
                  </div>
                </div>
                <div className="card-body px-0 pb-2">
                  <div className="table-responsive">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            #
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Student Name
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Date
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Time
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Set Time
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Appointments.map((c, i) => (
                          <tr key={i}>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">{i + 1}</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">
                                    {c.HUStudent.fullname}
                                  </h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">
                                    {new Date(c.date).toDateString()}
                                  </h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">{c.time}</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">
                                    {new Date(c.createdAt).toDateString()}
                                  </h6>
                                </div>
                              </div>
                            </td>
                            {/*<td className="align-middle text-center text-sm">
                              <button
                                onClick={() => handleDelete(c.id)}
                                className="btn btn-primary btn-sm"
                              >
                                Delete
                              </button>
                              <button
                                //onClick={() => handleUpdate(c)}
                                className="btn btn-primary btn-sm"
                              >
                                Update
                              </button>
                            </td>*/}
                          </tr>
                        ))}
                        <tr>
                          <td>
                            <div className="d-flex px-2 py-1">
                              <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm"></h6>
                              </div>
                            </div>
                          </td>
                          <td className="align-middle text-center text-sm"></td>
                        </tr>
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
