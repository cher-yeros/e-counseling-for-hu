import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCounslor } from "../../redux/apiCalls";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Modal, Container, Form, Row, Col, Button } from "react-bootstrap";
import AddCounselor from "./AddCounselor";

export default function Counselors() {
  const [Counselors, setCounselors] = useState([]);
  const [showCounselorForm, setshowCounselorForm] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getCounselors();
  }, []);
  const getCounselors = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/v1/api/admin/counselors`
      );
      setCounselors(res.data);
    } catch (err) {}
  };
  const handleDelete = (id) => {
    deleteCounslor(id, dispatch);
    getCounselors();
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
                      <h6>Counselors</h6>
                    </div>
                  </div>
                </div>
                <div className="card-body px-0 pb-2">
                  <div className="table-responsive">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Counselors
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Operation
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Counselors.map((c, i) => (
                          <tr key={i}>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">{c.fullName}</h6>
                                </div>
                              </div>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <button
                                onClick={() => handleDelete(c.id)}
                                className="btn btn-primary btn-sm"
                              >
                                Delete
                              </button>
                              
                            </td>
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
                          <td className="align-middle text-center text-sm">
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => setshowCounselorForm(true)}
                            >
                              Add Counselors
                            </button>
                          </td>
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

      <CounselorForm
        show={showCounselorForm}
        onHide={() => setshowCounselorForm(false)}
        onAdded={() => getCounselors()}
      />
    </>
  );
}

function CounselorForm(props) {
  return (
    <Modal
      {...props}
      backdrop="static"
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="add-product-modal"
      style={{ backgroundColor: "transparent" }}
    >
      <AddCounselor props={props} />
    </Modal>
  );
}
