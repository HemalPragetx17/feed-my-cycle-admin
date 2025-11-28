import { Button, Col, Modal, Row } from 'react-bootstrap';
import CrossSvg from '../../admin/assets/media/close.png';
import { useState } from 'react';
import { CommonDeleteModalProps } from '../../types/request_data/deleteModal';
import { commonString } from '../../utils/string';

const CommonDeleteModal: React.FC<CommonDeleteModalProps> = ({
  show,
  onHide,
  title = "",
  headerText = "",
  btnText = "",
  fontWeight,
  id,
  handleSubmit,
}) => {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    if (loading) return;
    const entityId = typeof id === "string" ? id : id?._id;
    if (!entityId) return;
    setLoading(true);
    await handleSubmit(entityId);
    setLoading(false);
  };
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        dialogClassName="modal-dialog-centered "
        className="rounded-16 min-w-lg-1025px"
        backdrop={loading ? 'static' : true}
        centered
      >
        <Modal.Header className="p-0 d-flex justify-content-between py-3 w-100 bg-f9f9f9 px-2 rounded-16">
          <Modal.Title className="fs-18 fw-600  ps-4">
            {title || ''}
          </Modal.Title>
          <div style={{ cursor: 'pointer' }}>
            <img
              className=""
              width={40}
              height={40}
              src={CrossSvg}
              alt="closebutton"
              onClick={loading ? () => { } : onHide}
            />
          </div>
        </Modal.Header>
        <Modal.Body className="mb-3 pt-3">
          <Row>
            <Col className="text-center mt-4 px-13">
              <div
                className={`${fontWeight ? fontWeight : 'fw-700 fs-24'
                  } text-black`}
              >
                {commonString.deleteCommonText} {headerText || ''}?
              </div>
              <div className="mt-4">
                <Button
                  variant="danger"
                  className="bg-danger bg-ff3a36 rounded-16 min-h-60px fs-16 text-white px-7"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {!loading && (
                    <span className="indicator-label fs-18 fw-bold">
                      {btnText || ''}
                    </span>
                  )}
                  {loading && (
                    <span
                      className="indicator-progress fs-16 fw-bold"
                      style={{ display: 'block' }}
                    >
                      {commonString.pleaseWait}
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  )}
                </Button>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default CommonDeleteModal;
