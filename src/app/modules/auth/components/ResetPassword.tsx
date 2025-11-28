import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import APICallService from "../../../../api/apiCallService";
import { AUTH } from "../../../../api/apiEndPoints";
import { AUTHJSON } from "../../../../api/apiJSON/auth";
import { error, success } from "../../../../Global/toast";

const resetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Minimum 6 characters")
    .max(50, "Maximum 50 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

const initialValues = {
  newPassword: "Admin@123",
  confirmPassword: "Admin@123",
};

export function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token"); // Extract the token from the URL

  const togglePasswordVisibility = (field: any) => {
    setPasswordVisible((prev: any) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const formik = useFormik({
    initialValues,
    validationSchema: resetPasswordSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);

      // Check if token is available
      if (!token) {
        setStatus("Invalid or missing token");
        error("Invalid or missing token");
        setLoading(false);
        return;
      }

      // Create API request payload
      const apiService = new APICallService(
        AUTH.RESET_PASSWORD,
        AUTHJSON.resetPassword({
          token: token,
          newPassword: values.newPassword,
          confirmNewPassword: values.confirmPassword,
        })
      );

      try {
        const response = await apiService.callAPI();
        if (response) {
          success("Password reset successfully");
          navigate("/login");
        } else {
          setStatus("An error occurred during password reset.");
          error("Password reset failed");
        }
      } catch (err) {
        setStatus("An error occurred during password reset.");
        error("Password reset failed");
      }
      navigate("/login");
      setLoading(false);
      setSubmitting(false);
    },
  });

  return (
    <form
      className="form w-100 h-100 overflow-hidden"
      onSubmit={formik.handleSubmit}
      noValidate
      id="kt_reset_password_form"
    >
      <div className="d-flex flex-column flex-root bg-white">
        <div className="d-flex flex-column flex-lg-row-fluid py-10">
          <div className="text-center mb-6 pt-15">
            <h2 className="fs-26 fw-bolder text-dark mb-3">
              Reset Password
            </h2>
          </div>

          {/* New Password Field */}
          <div className="fv-row mb-3">
            <div
              className={clsx(
                "input-group input-group-solid border rounded bg-light",
                {
                  "border-danger": formik.touched.newPassword && formik.errors.newPassword,
                },
                {
                  "is-valid": formik.touched.newPassword && !formik.errors.newPassword,
                }
              )}
            >
              <input
                placeholder="New Password"
                {...formik.getFieldProps("newPassword")}
                value={formik.values.newPassword.trimStart()}
                onChange={(e) => formik.handleChange(e)}
                className="form-control form-control-custom"
                type={passwordVisible.newPassword ? "text" : "password"}
                name="newPassword"
                autoComplete="off"
              />
              <span
                className="input-group-text fs-1 fw-500 text-dark bg-light"
                id="basic-addon1"
                onClick={() => togglePasswordVisibility("newPassword")}
              >
                {passwordVisible.newPassword ? (
                  <i className="bi bi-eye-slash-fill fs-20 cursor-pointer"></i>
                ) : (
                  <i className="bi bi-eye-fill fs-20 cursor-pointer"></i>
                )}
              </span>
            </div>
            {formik.touched.newPassword && formik.errors.newPassword && (
              <div className="fv-plugins-message-container mt-2">
                <span className="text-danger fs-12 fw-bold">{formik.errors.newPassword}</span>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="fv-row mb-5">
            <div
              className={clsx(
                "input-group input-group-solid border rounded bg-light",
                {
                  "border-danger": formik.touched.confirmPassword && formik.errors.confirmPassword,
                },
                {
                  "is-valid": formik.touched.confirmPassword && !formik.errors.confirmPassword,
                }
              )}
            >
              <input
                placeholder="Confirm Password"
                {...formik.getFieldProps("confirmPassword")}
                value={formik.values.confirmPassword.trimStart()}
                onChange={(e) => formik.handleChange(e)}
                className="form-control form-control-custom"
                type={passwordVisible.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                autoComplete="off"
              />
              <span
                className="input-group-text fs-1 fw-500 text-dark bg-light"
                id="basic-addon1"
                onClick={() => togglePasswordVisibility("confirmPassword")}
              >
                {passwordVisible.confirmPassword ? (
                  <i className="bi bi-eye-slash-fill fs-20 cursor-pointer"></i>
                ) : (
                  <i className="bi bi-eye-fill fs-20 cursor-pointer"></i>
                )}
              </span>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="fv-plugins-message-container mt-2">
                <span className="text-danger fs-12 fw-bold">{formik.errors.confirmPassword}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="d-grid mb-10 mb-lg-20">
            <button
              type="submit"
              id="kt_reset_password_submit"
              className="btn btn-primary btn-lg min-h-lg-60px"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {!loading && <span className="indicator-label fs-16 fw-bolder">Reset Password</span>}
              {loading && (
                <span className="indicator-progress fs-16 fw-bold" style={{ display: "block" }}>
                  Please wait...
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ResetPassword;
