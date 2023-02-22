import { loginFailure, loginStart, loginSuccess } from "./userRedux";

import {
  addCounselorFailure,
  addCounselorStart,
  addCounselorSuccess,
  addPostFailure,
  addPostStart,
  addPostSuccess,
  deleteCounselorFailure,
  deleteCounselorStart,
  deleteCounselorSuccess,
} from "./counselorRedux";

import { publicRequest, userRequest } from "../requestmethods";

// LOGIN
export const login = async (dispatch, navigate, user) => {
  dispatch(loginStart());
  let url = "/login/student";
  switch (user.role) {
    case "counselor":
      url = "/login/counselor";
      break;
    case "admin":
      url = "/login/admin";
      break;
    default:
      url = "/login/student";
  }
  try {
    const { data } = await publicRequest.post(url, user);
    if (data.success) {
      console.log(data.user);
      if (data.user.role) {
      }
      dispatch(loginSuccess(data.user));

      switch (data.user.role) {
        case "counselor":
          navigate("/profile");
          break;
        case "admin":
          navigate("/admin");
          break;
        case "student":
          navigate("/admin");
          break;
      }
    } else {
      dispatch(loginFailure());
    }
  } catch (err) {
    dispatch(loginFailure());
  }
};

//export const addCounselor = async (counselor, dispatch) => {
//  dispatch(addCounselorStart());
//  try {
//    const res = await publicRequest.post(`admin/add-counselor`, counselor);
//    dispatch(addCounselorSuccess(res.data));
//    alert("add counselor success");
//  } catch (err) {
//    alert("this counselor already exists");

//    dispatch(addCounselorFailure());
//  }
//};

export const addCounselor = async (counselor, dispatch) => {
  dispatch(addCounselorStart());
  try {
    const res = await userRequest.post(`admin/add-counselor`, counselor);
    dispatch(addCounselorSuccess(res.data));
    alert("add counselor success");
  } catch (err) {
    alert("this counselor already exists");

    dispatch(addCounselorFailure());
  }
};
export const addPost = async (post, dispatch) => {
  dispatch(addPostStart());
  try {
    const res = await publicRequest.post(`counselor/post-document`, post, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    dispatch(addPostSuccess(res.data));
    alert("add post success");
  } catch (err) {
    dispatch(addPostFailure());
    alert("post not success");
  }
};

export const deleteCounslor = async (id, dispatch) => {
  dispatch(deleteCounselorStart());
  try {
    const res = await userRequest.post(`/admin/delete-counselor/${id}`);
    dispatch(deleteCounselorSuccess(id));
  } catch (err) {
    dispatch(deleteCounselorFailure());
  }
};
