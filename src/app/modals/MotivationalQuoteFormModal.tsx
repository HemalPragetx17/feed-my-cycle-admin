import clsx from 'clsx';
import { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Modal
} from 'react-bootstrap';
import APICallService from '../../api/apiCallService';
import { success } from '../../Global/toast';
import { commonString, motivationalQuotesString } from '../../utils/string';
import { IMotivationalQuotesData, MotivationalQuotesValidateData } from '../../types/request_data/master';
import { MOTIVATIONAL_QUOTES } from '../../api/apiEndPoints';
import { motivationalQuotesToast } from '../../utils/toast';
import FileUpload from '../custom/file-upload/FileUpload';
import { MOTIVATIONAL_QUOTES_JSON } from '../../api/apiJSON/motivational-quotes';

interface MotivationalQuoteFormModalProps {
  show: boolean;
  title: string;
  data: IMotivationalQuotesData | null;
  handleClose: () => void;
  onHide: () => void;
}

const MotivationalQuoteFormModal: React.FC<MotivationalQuoteFormModalProps> = ({
  show,
  title,
  data,
  handleClose,
  onHide,
}) => {
  const [loading, setLoading] = useState(false);
  const [motivationalQuote, setMotivationalQuote] = useState<IMotivationalQuotesData | null>(null);
  const [validation, setValidation] = useState<MotivationalQuotesValidateData>({
    quote: false,
    file: false,
  });
  useEffect(() => {
    if (title === 'Edit' && data) {
      setMotivationalQuote(data);
    } else {
      setMotivationalQuote(null)
    }
  }, [data, title]);
  const handleChange = (value: string, name: string) => {
    const temp: any = { ...motivationalQuote };
    const tempValidation: any = { ...validation };
    if (value.length === 0) {
      tempValidation[name] = true;
    } else {
      tempValidation[name] = false;
    }
    temp[name] = value;
    setMotivationalQuote(temp);
    setValidation(tempValidation);
  };
  const handleFileChange = (value: File | null) => {
    const temp: any = { ...motivationalQuote };
    const tempValidation: any = { ...validation };
    if (value === null) {
      tempValidation['file'] = true;
    } else {
      tempValidation['file'] = false;
    }
    temp['file'] = value;
    setMotivationalQuote(temp);
    setValidation(tempValidation);
  };
  const handleSubmit = async () => {
    const temp = { ...motivationalQuote };
    const tempValidation = { ...validation };
    if (title === 'ADD' || title === 'Edit') {
      if (temp.quote && temp.quote.trim().length === 0) {
        tempValidation.quote = true;
      }
    } else if (title === 'Import') {
      if (!temp.file) {
        tempValidation.file = true;
      }
    }
    if (!tempValidation.quote && !tempValidation.file) {
      setLoading(true);
      let endPoint;
      let params: any = undefined;
      let payload: any = undefined;
      if (title === 'Add') {
        endPoint = MOTIVATIONAL_QUOTES.ADD_MOTIVATIONAL_QUOTES;
        payload = MOTIVATIONAL_QUOTES_JSON.addMotivationalQuotes(temp);
      }
      if (title === 'Import') {
        endPoint = MOTIVATIONAL_QUOTES.ADD_MOTIVATIONAL_QUOTES;
        payload = MOTIVATIONAL_QUOTES_JSON.addMotivationalQuotes(temp);
      }
      if (title === 'Edit') {
        endPoint = MOTIVATIONAL_QUOTES.EDIT_MOTIVATIONAL_QUOTES;
        payload = { quote: motivationalQuote?.quote };
        params = {
          _id: data?._id,
        };
      }
      const apiService = new APICallService(endPoint, payload, params);
      const response = await apiService.callAPI();
      if (response) {
        if (title === 'Add') {
          success(motivationalQuotesToast.motivationalQuoteAdded);
        } else if (title === 'Edit') {
          success(motivationalQuotesToast.motivationalQuoteUpdated);
        } else if (title === 'Import') {
          success(response.message);
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
    >
      <Modal.Header closeButton>
        <Modal.Title className="fs-22 fw-bolder">
          {title} {motivationalQuotesString.modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {title === 'Import' ? (
          <Form.Group className="mb-4">
            <FileUpload
              label={motivationalQuotesString.file}
              fileType="excel"
              value={motivationalQuote?.file || null}
              onChange={(file) => handleFileChange(file)}
              required
              className={clsx(
                'form-control-custom bg-light',
                validation.file ? 'border-danger' : 'border'
              )}
            />
          </Form.Group>
        ) : (
          <Form.Group className="mb-4">
            <Form.Label className="required">
              {motivationalQuotesString.quote}
            </Form.Label>
            <Form.Control
              className={clsx(
                'form-control-custom bg-light',
                validation.quote ? 'border-danger' : 'border'
              )}
              type="text"
              placeholder={motivationalQuotesString.quote}
              value={motivationalQuote?.quote}
              onChange={(event: any) => handleChange(event.target.value.trimStart(), 'quote')}
            />
          </Form.Group>
        )}
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

export default MotivationalQuoteFormModal;
