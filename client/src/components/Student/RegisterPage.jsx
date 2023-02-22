import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../requestmethods";

function RegisterPage() {
  const [User, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    studentId: "",
    department: "",
    password: "",
    confirmPassword: "",
  });

  function handleInputs(e) {
    const n = { ...User };
    n[e.target.name] = e.target.value;
    setUser(n);
  }
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    try {
      const { data } = await publicRequest.post("/register/student", User);
      if (data.success) {
        alert("User is Successfully registered!");
        navigate("/login");
      }
    } catch (error) {
      const { data } = error.response;
      console.log(data);

      alert("There has been an error : " + data);
    }
  };

  return (
    <div className="container vh-100">
      <br />
      <div className="row justify-content-center mt-5">
        <div className="col-lg-6">
          <div className="card border-0">
            <div
              style={{ background: "#2483c7 !important" }}
              className="card-header bg-secondary text-center p-4"
            >
              <h1 className="text-white m-0">Registration form</h1>
            </div>
            <div
              style={{ background: " #d5d5d5 !important" }}
              className="card-body rounded-bottom bg-success p-3"
            >
              <form>
                <div className="form-group">
                  <input
                    name="fullname"
                    value={User.fullname}
                    onChange={handleInputs}
                    type="Text"
                    className="form-control border-0 p-4"
                    placeholder="Enter your name"
                    required="required"
                  />
                </div>
                <div className="form-group">
                  <input
                    name="email"
                    value={User.email}
                    onChange={handleInputs}
                    type="text"
                    className="form-control border-0 p-4"
                    placeholder="Your Email"
                    required="required"
                  />
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        name="phone"
                        value={User.phone}
                        onChange={handleInputs}
                        type="text"
                        className="form-control border-0 p-4"
                        placeholder="Your Phone Number"
                        required="required"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <select
                        name="gender"
                        value={User.gender}
                        onChange={handleInputs}
                        className="custom-select border-0 px-4"
                        style={{ height: "47px" }}
                      >
                        <option disabled>Gender</option>
                        <option value="male">MALE</option>
                        <option value="female">FEMALE</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        name="studentId"
                        value={User.studentId}
                        onChange={handleInputs}
                        type="text"
                        className="form-control border-0 p-4"
                        placeholder="Your ID"
                        required="required"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <select
                        className="custom-select border-0 px-4"
                        style={{ height: "47px" }}
                        name="department"
                        value={User.department}
                        onChange={handleInputs}
                      >
                        <option value="Cs">Cs</option>
                        <option value="Is">Is</option>
                        <option value="It">It</option>
                        <option value="Biosystem">Biosystem</option>
                        <option value="Biomedical">Biomedical</option>
                        <option value="Civil">Civil</option>
                        <option value="COTM">COTM</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        name="password"
                        value={User.password}
                        onChange={handleInputs}
                        type="password"
                        className="form-control border-0 p-4"
                        placeholder="Enter Your Password"
                        required="required"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        name="confirmPassword"
                        value={User.confirmPassword}
                        onChange={handleInputs}
                        type="Password"
                        className="form-control border-0 p-4"
                        placeholder="Confirm Your Password"
                        required="required"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    className="btn btn-secondary btn-block border-0 py-3"
                    type="submit"
                    onClick={register}
                  >
                    Submit
                  </button>
                  <button
                    //disabled={isFetching}
                    type="button"
                    className="btn btn-outline-danger w-100 my-4 mb-2"
                    onClick={() => navigate("/login")}
                  >
                    have account Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
