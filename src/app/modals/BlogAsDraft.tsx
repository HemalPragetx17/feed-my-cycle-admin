import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
function BlogAsDraft(props: any) {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    await props.onSaveAsDraft();
    setLoading(false);
  }
  return (
    <>
      <Modal
        {...props}
        show={props.show}
        onHide={props.onHide}
        dialogClassName="modal-dialog-centered min-w-lg-580px"
        className="rounded-16"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title className="fs-22 fw-bolder pt-lg-3">
            Blog Draft Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-0 text-center mx-auto">
          <Modal.Title className="fs-20 fw-bolder pt-lg-3">
            Are you sure you want to save blog details as draft?
          </Modal.Title>
        </Modal.Body>
        <Modal.Footer className="justify-content-center mt-2 mb-4 border-top-0">
          <Button
            variant="primary"
            size="lg"
            onClick={handleSubmit}
            disabled={loading}
          >
            {!props.loading && (
              <span className="indicator-label fs-16 fw-bold">
                Yes, save as draft
              </span>
            )}
            {props.loading && (
              <span
                className="indicator-progress fs-16 fw-bold"
                style={{ display: 'block' }}
              >
                Please wait...
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default BlogAsDraft;
