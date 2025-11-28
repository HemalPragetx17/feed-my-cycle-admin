import clsx from "clsx";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { success } from "../../../../Global/toast";
import { Auth } from "../../../../utils/toast";
import { useAuth } from "../core/Auth";
import APICallService from "../../../../api/apiCallService";
import { LOGIN } from "../../../../api/apiEndPoints";
import { AUTHJSON } from "../../../../api/apiJSON/auth";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required"),
});

const initialValues = {
  email: "admin.feedmycycle@yopmail.com",
  password: "Admin@123",
};

export function Login() {
  const [loading, setLoading] = useState(false);
  const { saveAuth, saveCurrentUser } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting, setFieldValue }) => {
      setLoading(true);
      const apiService = new APICallService(
        LOGIN,
        AUTHJSON.login({ email: values.email, password: values.password })
      );
      const response = await apiService.callAPI();
      if (response) {
        saveAuth(response.token);
        saveCurrentUser(response.user);
        success(Auth.login);
        navigate('/dashboard');
      } else {
        setStatus('The login details are incorrect');
        saveAuth(undefined);
        saveCurrentUser(undefined);
      }
      setLoading(false);
      setSubmitting(false);
    },
  });

  return (
    <form
      className="form w-100 h-100 overflow-hidden"
      onSubmit={formik.handleSubmit}
      noValidate
      id="kt_login_signin_form"
    >
      <div className="d-flex flex-column flex-root bg-white">
        <div className="d-flex flex-column flex-lg-row-fluid py-10">
          {/* Brand/logo is rendered by AuthLayout */}
          <div className="text-center mb-6 pt-15">
            <h2 className="fs-26 fw-bolder text-dark mb-3">
              Admin Login
            </h2>
          </div>

          <div className="fv-row mb-3">
            <input
              placeholder="Email"
              {...formik.getFieldProps("email")}
              name="email"
              value={formik.values.email.trimStart()}
              onChange={(e) => formik.handleChange(e)}
              className={clsx(
                "form-control form-control-custom",
                { "is-invalid": formik.touched.email && formik.errors.email },
                {
                  "is-valid": formik.touched.email && !formik.errors.email,
                }
              )}
              type="text"
              autoComplete="off"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="fv-plugins-message-container">
                <span className="text-danger fs-12 fw-bold">
                  {formik.errors.email}
                </span>
              </div>
            )}
          </div>

          <div className="fv-row mb-5">
            <div
              className={clsx(
                "input-group input-group-solid  border rounded  bg-light ",
                {
                  "border-danger":
                    formik.touched.password && formik.errors.password,
                },
                {
                  "is-valid":
                    formik.touched.password && !formik.errors.password,
                }
              )}
            >
              <input
                placeholder="Password"
                {...formik.getFieldProps("password")}
                value={formik.values.password.trimStart()}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                className={clsx("form-control form-control-custom")}
                type={passwordVisible ? "text" : "password"}
                name="password"
                autoComplete="off"
              />
              <span
                className="input-group-text fs-1 fw-500 text-dark bg-light"
                id="basic-addon1"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <i className="bi bi-eye-slash-fill fs-20 cursor-pointer"></i>
                ) : (
                  <i className="bi bi-eye-fill fs-20 cursor-pointer"></i>
                )}
              </span>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="fv-plugins-message-container mt-2">
                <span className="text-danger fs-12 fw-bold">
                  {formik.errors.password}
                </span>
              </div>
            )}
          </div>

          <div className="d-grid mb-6">
            <button
              type="submit"
              id="kt_sign_in_submit"
              className="btn btn-primary btn-lg min-h-lg-60px"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {!loading && (
                <span className="indicator-label fs-16 fw-bolder">
                  Sign In
                </span>
              )}
              {loading && (
                <span
                  className="indicator-progress fs-16 fw-bold"
                  style={{ display: "block" }}
                >
                  Please wait...
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              )}
            </button>
          </div>

          <div className="d-grid mb-10 mb-lg-20">
            <div className="d-flex flex-center">
              <Link
                to="/auth/forgot-password"
                className="text-dark fs-16 fw-normal"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
