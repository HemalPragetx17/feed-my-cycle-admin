import { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Modal
} from 'react-bootstrap';
import APICallService from '../../api/apiCallService';
import { success } from '../../Global/toast';
import { commonString, faqString } from '../../utils/string';
import { FAQValidateData, IFAQData } from '../../types/request_data/faqs';
import { CMS } from '../../api/apiEndPoints';
import { cmsToast } from '../../utils/toast';
import clsx from 'clsx';

interface FAQFormModalProps {
  show: boolean;
  title: string;
  data: IFAQData | null;
  handleClose: () => void;
  onHide: () => void;
}

const FAQFormModal: React.FC<FAQFormModalProps> = ({
  show,
  title,
  data,
  handleClose,
  onHide,
}) => {
  const [loading, setLoading] = useState(false);
  const [faq, setFaq] = useState<IFAQData | null>(null);
  const [validation, setValidation] = useState<FAQValidateData>({
    question: false,
    answer: false,
  });
  useEffect(() => {
    if (title === 'Edit' && data) {
      setFaq(data);
    } else {
      setFaq(null)
    }
  }, [data, title]);
  const handleChange = (value: string, name: string) => {
    const temp: any = { ...faq };
    const tempValidation: any = { ...validation };
    if (value.length === 0) {
      tempValidation[name] = true;
    } else {
      tempValidation[name] = false;
    }
    temp[name] = value;
    setFaq(temp);
    setValidation(tempValidation);
  };
  const handleSubmit = async () => {
    const temp = { ...faq };
    const tempValidation = { ...validation };
    if (temp.question && temp.question.trim().length === 0) {
      tempValidation.question = true;
    }
    if (temp.answer && temp.answer.trim().length === 0) {
      tempValidation.answer = true;
    }
    if (!tempValidation.answer && !tempValidation.question) {
      setLoading(true);
      let endPoint;
      let params: any = undefined;
      if (title === 'Add') {
        endPoint = CMS.ADD_FAQ;
      }
      if (title === 'Edit') {
        endPoint = CMS.EDIT_FAQ;
        params = {
          _id: data?._id,
        };
      }
      const apiService = new APICallService(endPoint, temp, params);
      const response = await apiService.callAPI();
      if (response) {
        if (title === 'Add') {
          success(cmsToast.faqAdded);
        } else if (title === 'Edit') {
          success(cmsToast.faqUpdated);
        }
        onHide();
      }
      setLoading(false);
    }
    setValidation(tempValidation);
  };

  return (
    <Modal
      show={show}
      title={title}
      onHide={handleClose}
      dialogClassName="modal-dialog-centered min-w-580px"
      className="rounded-16"
      centered
      backdrop={loading ? 'static' : true}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title className="fs-22 fw-bolder">
          {title} {faqString.modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="align-items-center mx-4 my-3">
          <Form.Group className="mb-4">
            <Form.Label className="required">
              {faqString.question}
            </Form.Label>
            <Form.Control
              className={clsx(
                'form-control-custom bg-light',
                validation.question ? 'border-danger' : 'border'
              )}
              type="text"
              placeholder={faqString.question}
              value={faq?.question}
              onChange={(event: any) => handleChange(event.target.value.trimStart(), 'question')}
            />
            <div className="fv-plugins-message-container">
              <span className="text-danger fs-12 fw-bold">
                {validation.question
                  ? 'Please enter valid question'
                  : ''}
              </span>
            </div>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="required">
              {faqString.answer}
            </Form.Label>
            <Form.Control
              className={clsx(
                'form-control-custom bg-light',
                validation.answer ? 'border-danger' : 'border'
              )}
              as="textarea"
              rows={5}
              placeholder={faqString.answer}
              value={faq?.answer}
              onChange={(event: any) => handleChange(event.target.value.trimStart(), 'answer')}
            />
            <div className="fv-plugins-message-container">
              <span className="text-danger fs-12 fw-bold">
                {validation.answer
                  ? 'Please enter valid answer'
                  : ''}
              </span>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center pt-1 mb-4 border-top-0">
        <Button
          variant="secondary"
          onClick={handleClose}
        >
          {commonString.cancel}
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={handleSubmit}
          disabled={loading}
        >
          {!loading && (
            <span className="indicator-label fs-16 fw-bold">
              {commonString.saveChanges}
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
      </Modal.Footer>
    </Modal>
  );
};

export default FAQFormModal;
