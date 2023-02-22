import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCounselor } from "../../redux/apiCalls";
import "./css/material-dashboard.css";
function AddCounselor({ props }) {
  const dispatch = useDispatch();
  const [Counselor, setCounselor] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  function handleInputs(e) {
    e.preventDefault();
    setCounselor((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  const handleClick = async (e) => {
    e.preventDefault();
    if (Counselor.password === Counselor.confirmPassword) {
      var a = await addCounselor(Counselor, dispatch);

      props.onAdded();
    }
    try {
    } catch (err) {}
  };
  return (
    <>
      <div className="card border-0">
        <div
          style={{ background: "#2483c7 !important" }}
          className="card-header bg-secondary text-center p-4"
        >
          <h3 className="text-white m-0">Create New Counselor</h3>
          <button
            onClick={() => props.onHide()}
            style={{
              position: "absolute",
              right: "1rem",
              top: ".8rem",
              fontSize: "2rem",
            }}
            type="button"
            class="close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div
          style={{ background: " #d5d5d5 !important" }}
          className="card-body rounded-bottom bg-success p-3"
        >
          <form>
            <div className="form-group">
              <input
                name="fullName"
                value={Counselor.fullname}
                onChange={handleInputs}
                type="text"
                className="form-control border-0 p-4"
                placeholder="Counselor Name"
                required="required"
              />
            </div>
            <div className="form-group">
              <input
                name="email"
                value={Counselor.email}
                onChange={handleInputs}
                type="text"
                className="form-control border-0 p-4"
                placeholder="Counselor Email"
                required="required"
              />
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    name="phone"
                    value={Counselor.phone}
                    onChange={handleInputs}
                    type="text"
                    className="form-control border-0 p-4"
                    placeholder="Counselor Phone Number"
                    required="required"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    name="counselorId"
                    value={Counselor.counselorId}
                    onChange={handleInputs}
                    type="text"
                    className="form-control border-0 p-4"
                    placeholder="Counselor ID Number"
                    required="required"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <select
                    name="gender"
                    value={Counselor.gender}
                    onChange={handleInputs}
                    className="custom-select border-0 px-4"
                    style={{ height: "47px" }}
                  >
                    <option disabled>Gender</option>
                    <option value="female">FEMALE</option>
                    <option value="male">MALE</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <select
                    className="custom-select border-0 px-4"
                    style={{ height: "47px" }}
                    name="category"
                    value={Counselor.category}
                    onChange={handleInputs}
                  >
                    <option disabled value="">
                      Select Category
                    </option>
                    <option value="economical">Economical</option>
                    <option value="acadamical">Acadamical</option>
                    <option value="phycological">Phsycological</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    name="password"
                    value={Counselor.password}
                    onChange={handleInputs}
                    type="password"
                    className="form-control border-0 p-4"
                    placeholder="Enter Counselor Password"
                    required="required"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    name="confirmPassword"
                    value={Counselor.confirmPassword}
                    onChange={handleInputs}
                    type="Password"
                    className="form-control border-0 p-4"
                    placeholder="Confirm Counselor Password"
                    required="required"
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={handleClick}
                className="btn btn-secondary btn-block border-0 py-3"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {/*</div>
        </div>
      </div>*/}
    </>
  );
}

export default AddCounselor;
