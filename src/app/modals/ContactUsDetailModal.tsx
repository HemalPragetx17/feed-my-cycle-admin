import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Loader from "../../Global/loader";
import CrossSvg from '../../admin/assets/media/close.png';

interface ContactUsDetailModalProps {
  show: boolean;
  onHide: () => void;
  inquiryData: any;
}

const ContactUsDetailModal: React.FC<ContactUsDetailModalProps> = ({
  show,
  onHide,
  inquiryData,
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    if (show && inquiryData) {
      setData(inquiryData);
    } else {
      setData(null);
    }
    setLoading(false);
  }, [show, inquiryData]);
  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName="modal-dialog-centered min-w-580px"
      className="rounded-16"
      centered
      backdrop={loading ? 'static' : true}
    >
      <Modal.Header className="p-0 d-flex justify-content-between py-3 w-100 bg-f9f9f9 px-2 rounded-16">
        <Modal.Title className="fs-18 fw-600 ps-4">Contact Us Details</Modal.Title>
        <img
          className="cursor-pointer"
          width={34}
          height={34}
          src={CrossSvg}
          alt="closebutton"
          onClick={loading ? () => { } : onHide}
        />
      </Modal.Header>
      <Modal.Body className="p-4">
        {loading ? (
          <div className="w-100 d-flex justify-content-center align-items-center min-h-200px">
            <Loader loading={loading} />
          </div>
        ) : (
          <div>
            <div className="mb-3">
              <label className="fs-16 fw-600 text-dark mb-2 d-block">Comment</label>
              <div
                className="p-3 bg-light rounded border"
                style={{
                  minHeight: "150px",
                  maxHeight: "400px",
                  overflowY: "auto",
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                <p className="fs-15 text-dark fw-500 mb-0">
                  {data?.message || "No comment provided"}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ContactUsDetailModal;

