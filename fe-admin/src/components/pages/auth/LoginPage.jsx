import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./LoginPage.css"
export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),
    password: Yup.string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Mật khẩu không được để trống"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const result = await dispatch(login(values));
      console.log("Login result:", result);
      if (login.fulfilled.match(result)) {
        const { role } = result.payload;
        if (role === "admin") {
          navigate("/admin"); // Điều hướng đến trang admin nếu là admin
        } else {
          navigate("/"); // Điều hướng đến trang chủ nếu là user
        }
      }
    },
  });

  return (
    <div className="login-page">
      <div className="login_register_wrap">
        <div className="padding_eight_all">
          <div className="heading_s1">
            <h3>Đăng nhập</h3>
          </div>
          <form onSubmit={formik.handleSubmit}>
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
                className="btn btn-login"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
          {error && (
            <div className="error-message">
              {typeof error === "string" ? error : error.message || "An error occurred"}
            </div>
          )}
          <div className="form-note text-center">
            Don't have an account? <Link to={"/register"}>Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
