import clsx from 'clsx'
import { useFormik } from 'formik'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Authentication } from '../../../../utils/string'
import APICallService from '../../../../api/apiCallService'
import { AUTH } from '../../../../api/apiEndPoints'
import { AUTHJSON } from '../../../../api/apiJSON/auth'
import { success } from '../../../../Global/toast'

const initialValues = {
  email: 'admin.feedmycycle@yopmail.com',
}

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
})

export function ForgotPassword() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setHasErrors(undefined);
      const data = { email: values.email };
      const apiService = new APICallService(
        AUTH.FORGOT_PASSWORD,
        AUTHJSON.forgotPassword(data)
      );
      const response = await apiService.callAPI();
      if (response) {
        success("Email sent successfully");
        navigate('/auth/login');
      }
      // navigate('/auth/reset-password');
      setLoading(false);
      setSubmitting(false);
    },
  });

  return (
    <form
      className="form w-100 h-100 overflow-hidden"
      noValidate
      id="kt_login_password_reset_form"
      onSubmit={formik.handleSubmit}
    >
      <div className="d-flex flex-column flex-root bg-white" >
        <div className="d-flex flex-column flex-lg-row-fluid py-10">
          <div className="text-center mb-6 pt-15">
            <h2 className="fs-26 fw-bolder text-dark mb-3">
              {Authentication.ForgetPassword}
            </h2>
            <p className="text-black fs-16 fw-400">
              {Authentication.ForgetText}
            </p>
          </div>
          <div className="fv-row mb-3">
            <input
              type="email"
              placeholder="Email"
              autoComplete="off"
              {...formik.getFieldProps('email')}
              className={clsx(
                'form-control form-control-custom',
                {
                  'is-invalid':
                    formik.touched.email && formik.errors.email,
                },
                {
                  'is-valid':
                    formik.touched.email && !formik.errors.email,
                }
              )}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="fv-plugins-message-container">
                <span role="text-danger fs-12 fw-bold">{formik.errors.email}</span>
              </div>
            )}
          </div>
          <div className="fv-row mb-6">
            <button
              type="submit"
              id="kt_password_reset_submit"
              className="btn btn-primary me-4 w-100 min-h-lg-60px min-h-55px"
              disabled={
                loading || formik.isSubmitting || !!formik.errors.email
              }
            >
              <span className="indicator-label">Continue with this Email</span>
              {loading && (
                <span className="indicator-progress">
                  Please wait...
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              )}
            </button>
          </div>
          <div className="d-grid mb-10 mb-lg-20">
            <div className="d-flex flex-center fs-16">
              {Authentication.GoBack}
              <Link
                to="/auth/login"
                className="text-primary fs-16 fw-bold"
              >
                &nbsp;Sign in
              </Link>
            </div>
          </div>
        </div>
        {hasErrors === true && (
          <div className="mb-lg-15 alert alert-danger">
            <div className="alert-text font-weight-bold">
              Sorry, looks like there are some errors detected, please try
              again.
            </div>
          </div>
        )}
        {hasErrors === false && (
          <div className="mb-10 bg-light-info p-8 rounded">
            <div className="text-info">
              Sent password reset. Please check your email
            </div>
          </div>
        )}
      </div>
    </form>
  )
}
