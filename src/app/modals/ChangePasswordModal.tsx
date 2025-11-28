import React, { useState } from 'react';
import {
  Modal,
  Button,
  FormLabel,
  Form,
  InputGroup,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import clsx from 'clsx';
import Validations from '../../utils/validations';
import { useAuth } from '../modules/auth';
import CrossSvg from '../../admin/assets/media/close.png';
import APICallService from '../../api/apiCallService';
import { AUTH } from '../../api/apiEndPoints';
import { AUTHJSON } from '../../api/apiJSON/auth';
import { success } from '../../Global/toast';

const ChangePasswordModal = (props: any) => {
  const [password, setPassword] = useState<any>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const { saveAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<any>({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [validation, setValidation] = useState<any>({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
    samePassword: false,
  });
  const [validationMessage, setValidationMessage] = useState<any>({
    newPassword: '',
    confirmPassword: '',
  });

  const popOver = (
    <Popover id="popover-password-rules" className="border-0 shadow-lg rounded-3">
      <Popover.Body className="p-3 bg-dark text-white border-0 rounded-3">
        <>
          Password must be min. 8 characters with atleast one uppercase, lowercase, and a special character.
        </>
      </Popover.Body>
    </Popover>
  );

  const handleChange = (name: any, value: any) => {
    const temp = { ...password };
    const tempValidation = { ...validation };
    const tempValidationMessage = { ...validationMessage };
    temp[name] = value;
    tempValidation[name] = false;
    tempValidationMessage[name] = '';
    if (!value.length) {
      tempValidation[name] = true;
    }
    if (name === 'newPassword') {
      const newPasswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&].{7,}$/;
      if (!newPasswordRegex.test(value)) {
        tempValidation[name] = true;
        tempValidationMessage[name] =
          'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.';
      }
    }
    if (name === 'confirmPassword' && value !== password.newPassword) {
      tempValidation[name] = true;
      tempValidationMessage[name] = 'Passwords do not match.';
    }
    setPassword(temp);
    setValidation(tempValidation);
    setValidationMessage(tempValidationMessage);
  };

  const handleShow = (name: any) => {
    const temp = { ...showPassword };
    temp[name] = !temp[name];
    setShowPassword(temp);
  };

  const handleSubmit = async () => {
    const tempValidation = { ...validation };
    const temp = { ...password };
    if (temp.oldPassword === '') {
      tempValidation.oldPassword = true;
    }
    if (temp.newPassword === '') {
      tempValidation.newPassword = true;
    }
    if (temp.confirmPassword === '') {
      tempValidation.confirmPassword = true;
    }
    if (
      temp.newPassword !== '' &&
      temp.confirmPassword !== '' &&
      temp.newPassword !== temp.confirmPassword
    ) {
      tempValidation.confirmPassword = true;
    }
    const newPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&].{7,}$/;
    if (!newPasswordRegex.test(temp.newPassword) && temp.newPassword !== '') {
      tempValidation.newPassword = true;
    }
    const isValid = await Validations.validateObject(tempValidation);
    if (isValid) {
      const params = {
        oldPassword: password.oldPassword,
        newPassword: password.newPassword,
      };
      setLoading(true);
      const apiService = new APICallService(
        AUTH.CHANGE_PASSWORD,
        AUTHJSON.changePassword(params)
      );
      const response = await apiService.callAPI();
      if (response) {
        saveAuth(response?.token);
        success("Password changed successfully");
        props.onHide();
      }
      setLoading(false);
    }
    setValidation(tempValidation);
  };

  return (
    <Modal
      {...props}
      show={props.show}
      onHide={props.onHide}
      dialogClassName="modal-dialog-centered min-w-588px"
      className="border-r10px"
      centered
      backdrop="static"
    >
      <Modal.Header className="border-bottom-0 pb-0">
        <div style={{ cursor: 'pointer' }}>
          <img
            className="close-inner-top-3 mt-1"
            width={40}
            height={40}
            src={CrossSvg}
            alt="closebutton"
            onClick={props.onHide}
            style={{ right: '0px', left: 'auto' }}
          />
        </div>
        <Modal.Title className="fs-18 fw-bolder mw-lg-375px pt-lg-1">
          Change password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-2">
        <div className="text-muted mb-4">
          Create a strong password and keep your account secure.
        </div>

        <Form className="d-grid gap-3">
          <Form.Group controlId="oldPassword">
            <FormLabel className="fs-16 fw-500 text-dark mb-2">
              Old password
            </FormLabel>
            <InputGroup
              className={clsx(
                'border border-r5px shadow-sm',
                validation.oldPassword ? 'border-danger border-1' : ''
              )}
            >
              <InputGroup.Text className="border-0 bg-white">
                <i className="bi bi-lock fs-20"></i>
              </InputGroup.Text>
              <Form.Control
                className="border-0 form-control-custom"
                placeholder="Type here…"
                name="oldPassword"
                type={showPassword.oldPassword ? 'text' : 'password'}
                onChange={(e) =>
                  handleChange(e.target.name, e.target.value.trimStart())
                }
              />
              <InputGroup.Text className="border-0 bg-white">
                <Button
                  variant="link"
                  className="btn-flush"
                  onClick={() => handleShow('oldPassword')}
                >
                  {showPassword.oldPassword ? (
                    <i className="bi bi-eye-fill fs-20 cursor-pointer"></i>
                  ) : (
                    <i className="bi bi-eye-slash-fill fs-20 cursor-pointer"></i>
                  )}
                </Button>
              </InputGroup.Text>
            </InputGroup>
            {validation.oldPassword && (
              <div className="text-danger mt-1">Old password is required.</div>
            )}
          </Form.Group>

          <Form.Group controlId="newPassword">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <FormLabel className="fs-16 fw-600 text-dark mt-1">
                New Password
                <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={popOver}>
                  <span
                    className="d-inline-flex align-items-center justify-content-center ms-2 rounded-circle bg-light border text-gray-600 cursor-pointer"
                    role="button"
                    aria-label="Password rules"
                    style={{ width: 24, height: 24 }}
                  >
                    <i className="bi bi-info fs-16"></i>
                  </span>
                </OverlayTrigger>
              </FormLabel>
            </div>
            <InputGroup
              className={clsx(
                'border border-r5px shadow-sm',
                validation.newPassword ? 'border-danger border-1' : ''
              )}
            >
              <InputGroup.Text className="border-0 bg-white">
                <i className="bi bi-lock fs-20"></i>
              </InputGroup.Text>
              <Form.Control
                className="border-0 form-control-custom"
                placeholder="Type here…"
                name="newPassword"
                type={showPassword.newPassword ? 'text' : 'password'}
                onChange={(e) =>
                  handleChange(e.target.name, e.target.value.trimStart())
                }
              />
              <InputGroup.Text className="border-0 bg-white">
                <Button
                  variant="link"
                  className="btn-flush"
                  onClick={() => handleShow('newPassword')}
                >
                  {showPassword.newPassword ? (
                    <i className="bi bi-eye-fill fs-20 cursor-pointer"></i>
                  ) : (
                    <i className="bi bi-eye-slash-fill fs-20 cursor-pointer"></i>
                  )}
                </Button>
              </InputGroup.Text>
            </InputGroup>
            {/* Intentionally hiding inline validation text for new password; red border indicates error */}
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <FormLabel className="fs-16 fw-500 text-dark mb-2">
              Confirm new password
            </FormLabel>
            <InputGroup
              className={clsx(
                'border border-r5px shadow-sm',
                validation.confirmPassword ? 'border-danger border-1' : ''
              )}
            >
              <InputGroup.Text className="border-0 bg-white">
                <i className="bi bi-lock fs-20"></i>
              </InputGroup.Text>
              <Form.Control
                className="border-0 form-control-custom"
                placeholder="Type here…"
                name="confirmPassword"
                type={showPassword.confirmPassword ? 'text' : 'password'}
                onChange={(e) =>
                  handleChange(e.target.name, e.target.value.trimStart())
                }
              />
              <InputGroup.Text className="border-0 bg-white">
                <Button
                  variant="link"
                  className="btn-flush"
                  onClick={() => handleShow('confirmPassword')}
                >
                  {showPassword.confirmPassword ? (
                    <i className="bi bi-eye-fill fs-20 cursor-pointer"></i>
                  ) : (
                    <i className="bi bi-eye-slash-fill fs-20 cursor-pointer"></i>
                  )}
                </Button>
              </InputGroup.Text>
            </InputGroup>
            {validationMessage.confirmPassword && (
              <div className="text-danger mt-1">{validationMessage.confirmPassword}</div>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-between align-items-center border-top-0 pt-0">
        <button onClick={props.onHide} className="btn fw-bolder me-2">
          Cancel
        </button>
        <Button variant="primary" size="lg" onClick={handleSubmit}>
          {!loading && (
            <span className="indicator-label fs-16 fw-bold">Set new password</span>
          )}
          {loading && (
            <span className="indicator-progress fs-16 fw-bold" style={{ display: 'block' }}>
              Please wait...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordModal;
