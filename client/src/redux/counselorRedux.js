import { createSlice } from "@reduxjs/toolkit";

const counselorSlice = createSlice({
  name: "counselor",
  initialState: {
    isFetching: false,
    error: false,
    counselors: [],
  },
  reducers: {
    //REGISTER counselor
    addCounselorStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addCounselorSuccess: (state, action) => {
      state.isFetching = false;
      state.counselors.push(action.payload);
    },
    addCounselorFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteCounselorStart: (state) => {
      // state.isFetching = true;
      // state.error = false;
    },
    deleteCounselorSuccess: (state, action) => {
      // state.isFetching = false;
      // state.products.splice(
      //   state.products.findIndex((item) => item._id === action.payload),
      //   1
      // );
    },
    deleteCounselorFailure: (state) => {
      // state.isFetching = false;
      // state.error = true;
    },

    //ADD POST
    addPostStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addPostSuccess: (state, action) => {
      state.isFetching = false;
      // state.counselors.push(action.payload);
    },
    addPostFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //GET ALL
    getCounselorStart: (state) => {
      // state.isFetching = true;
      // state.error = false;
    },
    getCounselorSuccess: (state, action) => {
      // state.isFetching = false;
      // state.users = action.payload;
    },
    getCounselorFailure: (state) => {
      // state.isFetching = false;
      // state.error = true;
    },
    //UPDATE
    updateCounselorStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateCounselorSuccess: (state, action) => {
      state.isFetching = false;
      state.users[
        state.users.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;
    },
    updateCounselorFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  //   loginStart,
  //   loginSuccess,
  //   loginFailure,
  addCounselorStart,
  addCounselorSuccess,
  addCounselorFailure,
  addPostStart,
  addPostSuccess,
  addPostFailure,
  deleteCounselorStart,
  deleteCounselorSuccess,
  deleteCounselorFailure,
  getCounselorStart,
  getCounselorSuccess,
  getCounselorFailure,
  //   followStart,
  //   followSuccess,
  //   followFailure,
  //   unfollowStart,
  //   unfollowSuccess,
  //   unfollowFailure,
  updateCounselorStart,
  updateCounselorSuccess,
  updateCounselorFailure,
} = counselorSlice.actions;
export default counselorSlice.reducer;
