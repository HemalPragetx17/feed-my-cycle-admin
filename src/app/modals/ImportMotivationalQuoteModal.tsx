import clsx from 'clsx';
import { useState } from 'react';
import {
  Button,
  Form,
  Modal
} from 'react-bootstrap';
import APICallService from '../../api/apiCallService';
import { MOTIVATIONAL_QUOTES } from '../../api/apiEndPoints';
import { success } from '../../Global/toast';
import { commonString, motivationalQuotesString } from '../../utils/string';
import { motivationalQuotesToast } from '../../utils/toast';
import FileUpload from '../custom/file-upload/FileUpload';

interface ImportMotivationalQuoteModalProps {
  show: boolean;
  title: string;
  handleClose: () => void;
  onHide: () => void;
}

const ImportMotivationalQuoteModal: React.FC<ImportMotivationalQuoteModalProps> = ({
  show,
  title,
  handleClose,
  onHide,
}) => {
  const [loading, setLoading] = useState(false);
  const [motivationalQuote, setMotivationalQuote] = useState<any>(null);
  const [validation, setValidation] = useState<any>({
    file: false,
  });
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
    if (!temp.file || !((temp.file as any) instanceof File)) {
      tempValidation.file = true;
    } else {
      tempValidation.file = false;
    }
    if (!tempValidation.file) {
      setLoading(true);
      const apiService = new APICallService(MOTIVATIONAL_QUOTES.IMPORT_MOTIVATIONAL_QUOTES, temp);
      const response = await apiService.callAPI();
      if (response) {
        success(motivationalQuotesToast.motivationalQuoteAdded);
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
        <Form className="align-items-center mx-4 my-3">
          <Form.Group className="mb-4">
            <FileUpload
              label={motivationalQuotesString.file}
              fileType="excel"
              value={motivationalQuote?.file || null}
              onChange={(file) => handleFileChange(file)}
              required
              className={clsx(
                'form-control-custom bg-light',
                validation.image ? 'border-danger' : 'border'
              )}
            />
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

export default ImportMotivationalQuoteModal;
