import * as Yup from "yup";

export const loginSchema = Yup.object({
  password: Yup.string().min(6).required("Password is required"),
  studentId: Yup.string().min(8).max(20).required("required"),
  role: Yup.string().required("required"),
});

export const loginCASchema = Yup.object({
  password: Yup.string().min(6).required("Password is required"),
  role: Yup.string().required("required"),
  email: Yup.string().email().required("required"),
});
