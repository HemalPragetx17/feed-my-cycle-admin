
import { useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
import FeedMyCycleLogo from '../../../admin/assets/media/FeedMyCycleLogo.png'

const AuthLayout = () => {
  useEffect(() => {
    const root = document.getElementById('root')
    if (root) {
      root.style.height = '100%'
    }
    return () => {
      if (root) {
        root.style.height = 'auto'
      }
    }
  }, [])

  return (
    <div className='d-flex flex-column flex-lg-row flex-column-fluid'>
      {/* begin::Body */}
      <div
        className="d-flex flex-column flex-lg-row-fluid pt-lg-20 w-lg-50 bg-body order-2 overflow-lg-hidden position-relative"
        style={{ height: '100vh' }}
      >
        {/* begin::Brand */}
        <div>
          <Link
            to="/"
            className="mb-8 position-absolute top-0 start-0 mt-10 ms-10 d-flex align-items-center gap-3"
          >
            <img src={FeedMyCycleLogo} alt="Feed My Cycle Logo" className="h-50px" />
            <div className="d-flex flex-column">
              <span className="text-dark fw-bolder fs-5">Feed My Cycle</span>
              <span className="text-muted fs-7">Lose weight in sync with your cycle</span>
            </div>
          </Link>
        </div>
        {/* end::Brand */}
        {/* begin::Form */}
        <div
          className="d-flex flex-center flex-column flex-lg-row-fluid h-100vh"
          style={{ height: '100vh' }}
        >
          {/* begin::Wrapper */}
          <div className="w-425px px-10" style={{ textAlign: "center", borderRadius: "20px", boxShadow: "0 10px 40px rgba(156, 163, 128, 0.30)" }}>
            <Outlet />
          </div>
          {/* end::Wrapper */}
        </div>
        {/* end::Form */}

        {/* begin::Footer */}
        {/* <div className='d-flex flex-center flex-wrap px-5'> */}
        {/* begin::Links */}
        {/* <div className='d-flex fw-semibold text-primary fs-base'>
            <a href='#' className='px-5' target='_blank'>
              Terms
            </a>

            <a href='#' className='px-5' target='_blank'>
              Plans
            </a>

            <a href='#' className='px-5' target='_blank'>
              Contact Us
            </a>
          </div> */}
        {/* end::Links */}
        {/* </div> */}
        {/* end::Footer */}
      </div>
      {/* end::Body */}

      {/* begin::Aside */}

      {/* end::Aside */}
    </div>
  )
}

export { AuthLayout }
