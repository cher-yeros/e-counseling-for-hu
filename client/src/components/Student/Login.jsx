import React, { useState } from "react";
import { login } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { loginCASchema, loginSchema } from "../../Validation/validation";
import { useNavigate } from "react-router-dom";
import RegisterPage from "./RegisterPage";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, error } = useSelector((state) => state.user);

  const [User, setUser] = useState({
    password: "",
    studentId: "",
    role: "",
  });

  function handleInputs(e) {
    const n = { ...User };
    n[e.target.name] = e.target.value;
    setUser(n);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isStudent) {
      User.role = "student";
    }

    if (User.role == "student") {
      const isValid = await loginSchema.isValid(User);
      formik.setValues(User);
      console.log(isValid, "val");
      console.log(formik.errors, "error");

      console.log(User);
      if (isValid) {
        login(dispatch, navigate, User);
      }
    } else {
      const isValid = await loginCASchema.isValid(User);
      formikCA.setValues(User);
      //console.log(isValid, "val");
      console.log(formikCA.errors, "error");

      console.log(User);

      if (isValid) {
        delete User.studentId;
        login(dispatch, navigate, User);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      studentId: "",
      role: "",
    },
    validationSchema: loginSchema,
    onSubmit: handleLogin,
  });
  const formikCA = useFormik({
    initialValues: {
      password: "",
      email: "",
      role: "",
    },
    validationSchema: loginCASchema,
    onSubmit: handleLogin,
  });

  const [isStudent, setisStudent] = useState(true);

  const optionStyle = {
    padding: "1rem",
  };
  
  
  return (
    //<body className="bg-gray-200">
    //<main className="main-content  mt-0">
    <div className="page-header align-items-start min-vh-100">
      <span className="mask bg-gradient-dark opacity-6"></span>
      <div className="container my-auto">
        <div className="row">
          <div className="col-lg-5 col-md-8 col-12 mx-auto">
            <div className="card z-index-0 fadeIn3 fadeInBottom">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                  <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">
                    Log in
                  </h4>
                  <div className="row mt-3">
                    <div className="col-2 text-center ms-auto">
                      {/*<a className="btn btn-link px-3" href="javascript:;">
                        <i className="fa fa-facebook text-white text-lg"></i>
                      </a>*/}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row justify-content-around">
                  {/*<div className="col-lg-6"></div>*/}
                  <button
                    onClick={() => setisStudent(true)}
                    type="button"
                    className="btn bg-gradient-primary w-40 my-4 mb-2"
                  >
                    Student Sign in
                  </button>
                  <button
                    onClick={() => setisStudent(false)}
                    type="button"
                    className="btn bg-gradient-primary w-40 my-4 mb-2"
                  >
                    Counselor/Admin
                  </button>
                </div>

                <form role="form" className="text-start mx-2">
                  {isStudent ? (
                    <div className="input-group input-group-outline my-3 w-100">
                      <input
                        name="studentId"
                        value={User.studentId}
                        onChange={handleInputs}
                        type="id"
                        className="form-control"
                        placeholder="ID number"
                      ></input>

                      <small>{formik.errors.studentId}</small>
                    </div>
                  ) : (
                    <div className="input-group input-group-outline my-3">
                      <input
                        name="email"
                        value={User.email}
                        onChange={handleInputs}
                        type="id"
                        className="form-control"
                        placeholder="Email Address"
                      ></input>

                      <small>{formik.errors.studentId}</small>
                    </div>
                  )}

                  <div className="input-group input-group-outline mb-3">
                    {/*<label className="form-label">Password</label>*/}

                    <select
                      name="role"
                      value={User.role}
                      onChange={handleInputs}
                      type="password"
                      className="form-select px-2"
                      placeholder="Password"
                    >
                      {!isStudent && <option disabled>Select role</option>}

                      {isStudent ? (
                        <option
                          className="p-2 m-2"
                          style={optionStyle}
                          value="student"
                        >
                          Student
                        </option>
                      ) : (
                        <>
                          <option
                            className="p-2 m-2"
                            style={optionStyle}
                            value="counselor"
                          >
                            Counselor
                          </option>
                          <option
                            className="p-2 m-2"
                            style={optionStyle}
                            value="admin"
                          >
                            Admin
                          </option>
                        </>
                      )}
                    </select>
                    <small>{formik.errors.password}</small>
                  </div>

                  <div className="input-group input-group-outline mb-3">
                    {/*<label className="form-label">Password</label>*/}

                    <input
                      name="password"
                      value={User.Password}
                      onChange={handleInputs}
                      type="password"
                      className="form-control"
                      placeholder="Password"
                    ></input>
                    <small>{formik.errors.password}</small>
                  </div>

                  {/*{error && (
                    <span
                      styled={{
                        fontColor: "red",
                      }}
                    >
                      incorrect Id or password
                    </span>
                  )}*/}
                  <div className="text-center">
                    <button
                      onClick={handleLogin}
                      //disabled={isFetching}
                      type="button"
                      className="btn bg-gradient-primary w-100 my-4 mb-2"
                    >
                      Sign in
                    </button>
                    <button
                      onClick={() => navigate("/registerPage")}
                      type="button"
                      className="btn btn-outline-info w-100 my-4 mb-2"
                    >
                      New User  Sign up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    //</main>
    //</body>
  );
}
