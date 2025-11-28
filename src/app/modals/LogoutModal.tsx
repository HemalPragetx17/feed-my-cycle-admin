import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useAuth } from "../modules/auth";
import APICallService from "../../api/apiCallService";
import CrossSvg from '../../admin/assets/media/close.png';
import { LOGOUT } from "../../api/apiEndPoints";
const LogoutModal = (props: any) => {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    const apiService = new APICallService(LOGOUT);
    const response = await apiService.callAPI();
    if (response) {
      logout();
    }
    setLoading(false);
    props.onHide();
  };
  return (
    <Modal
      {...props}
      show={props.show}
      onHide={props.onHide}
      dialogClassName="modal-dialog-centered min-w-580px"
      className="rounded-16 min-w-lg-1025px"
      centered
      backdrop="static"
    >
      <Modal.Header className="p-0 d-flex justify-content-between py-3 w-100 bg-f9f9f9 px-2 rounded-16">
        <Modal.Title className="fs-18 fw-600  ps-4">{'Logout'}</Modal.Title>
        <img
          className="cursor-pointer"
          width={34}
          height={34}
          src={CrossSvg}
          alt="closebutton"
          onClick={props.onHide}
        />
      </Modal.Header>
      <Modal.Body className="text-center pb-0 pt-2">
        <h5 className="fw-bolder mb-2">Sign out of your account?</h5>
        <p className="text-muted mb-0">You can sign back in at any time.</p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center border-top-0 gap-2">
        <Button
          variant="outline-secondary"
          onClick={props.onHide}
          className="px-4"
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          className="px-4"
          onClick={handleLogout}
          disabled={loading}
        >
          {!loading && (
            <span className="indicator-label d-inline-flex align-items-center gap-2">
              <i className="bi bi-box-arrow-right"></i>
              Logout
            </span>
          )}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              Please wait...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default LogoutModal;
