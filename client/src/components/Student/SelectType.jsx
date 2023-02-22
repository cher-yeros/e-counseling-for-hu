import Sidebar from "./Sidebar";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { userRequest as api } from "../../requestmethods";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStudentCounselor } from "../../redux/userRedux";

function SelectType() {
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
    api.get("/admin/counselors").then(({ data }) => {
      setCounselors(data);
      console.log(data);
      setP(data.filter((c) => c.category == "phycological"));
      setE(data.filter((c) => c.category == "economical"));
      setA(data.filter((c) => c.category == "academical"));
    });
  }

  const dispatch = useDispatch();

  function handleAssign(selected) {
    api
      .post("admin/assign-counselor", {
        sId: currentUser.id,
        cId: selected[0]?.id,
      })
      .then(({ data }) => {
        console.log(data);
        if (data.success) {
          dispatch(updateStudentCounselor(data.counselor));
          alert("Sucessfully Chosen");
        } else {
          alert("Server error");
        }
      });
  }

  return (
    <>
      <Sidebar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <div className="container-fluid pt-3">
          <div className="row align-items-center px-3 mt-5">
            <div className="col-lg-4 col-md-6 pb-1">
              <div
                className="d-flex bg-light shadow-sm border-top rounded mb-4"
                style={{ padding: "30px" }}
              >
                <i className="flaticon-050-fence h1 font-weight-normal text-primary mb-3"></i>
                <div className="pl-4">
                  <h4>Economical Issue</h4>
                  <p className="m-0">
                    Kasd labore kasd et dolor est rebum dolor ut, clita dolor
                    vero lorem amet elitr vero...
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 pb-1">
              <div
                className="d-flex bg-light shadow-sm border-top rounded mb-4"
                style={{ padding: "30px" }}
              >
                <i className="flaticon-022-drum h1 font-weight-normal text-primary mb-3"></i>
                <div className="pl-4">
                  <h4>Psychological Issue</h4>
                  <p className="m-0">
                    Kasd labore kasd et dolor est rebum dolor ut, clita dolor
                    vero lorem amet elitr vero...
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 pb-1">
              <div
                className="d-flex bg-light shadow-sm border-top rounded mb-4"
                style={{ padding: "30px" }}
              >
                <i className="flaticon-030-crayons h1 font-weight-normal text-primary mb-3"></i>
                <div className="pl-4">
                  <h4>Acadamical Issue</h4>
                  <p className="m-0">
                    Kasd labore kasd et dolor est rebum dolor ut, clita dolor
                    vero lorem amet elitr vero...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="form-group">
              <div className="form-label">Select Cateogry</div>

              <select
                name="category"
                onChange={(e) => {
                  setCategory(e.target.value);

                  console.log(
                    Counselors.filter((c) => c.category == e.target.value)
                  );
                  setCList(
                    Counselors.filter((c) => c.category == e.target.value)
                  );
                }}
              >
                <option disabled>Select Category</option>
                <option value="phycological">Physcological</option>
                <option value="economical">Economical</option>
                <option value="acedamical">Academical</option>
              </select>
            </div>

            <div className="form-group">
              <div className="form-label">Select Counselor</div>
              <div className="form-control">
                <Typeahead
                  style={{ border: "2px solid gray" }}
                  onChange={(selected) => {
                    handleAssign(selected);
                  }}
                  id="4"
                  labelKey={(option) => `${option.fullName}`}
                  options={CList}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default SelectType;
