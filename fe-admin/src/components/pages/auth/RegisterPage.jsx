import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/authSlice";
import { fetchUsers } from "../../redux/userSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  // Xác định validation schema với Yup
  const validationSchema = Yup.object({
    username: Yup.string()
    .min(1, "Nhập nhiều hơn 1 kí tự")
    .max(25, "Không vượt quá 25 kí tự")
    .required("không được để trống"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),
    password: Yup.string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Mật khẩu không được để trống"),
  });

  // Sử dụng Formik để quản lý form
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      role:"user"
    },
    validationSchema,
    onSubmit: async (values) => {
      const result = await dispatch(register(values));
      console.log("Register result:", result);
      if (register.fulfilled.match(result)) {
        navigate("/"); 
        dispatch(fetchUsers());
      }
    },
  });

  return (
    <div className="register-page">
      <div className="login_register_wrap">
        <div className="padding_eight_all">
          <div className="heading_s1">
            <h3>Đăng kí</h3>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Enter Your Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                
              />
              {formik.touched.username && formik.errors.username && (
                <div className="error-message" style={{ marginTop: "10px" }}>{formik.errors.username}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter Your Email"
                value={formik.values.email}
                onChange={formik.handleChange}
               
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error-message" style={{ marginTop: "10px" }}>{formik.errors.email}</div>
              )}
            </div>
            <div className="form-group" style={{ position: "relative" }}>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
            
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error-message" style={{ marginTop: "10px" }}>{formik.errors.password}</div>
              )}
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-signup"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
          {error && <div className="error-message">{error}</div>}
          <div className="form-note text-center">
            Already have an account? <Link to={"/login"}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
