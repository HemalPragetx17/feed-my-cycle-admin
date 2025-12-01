import clsx from 'clsx';
import { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Modal
} from 'react-bootstrap';
import APICallService from '../../api/apiCallService';
import { DEFAULT_OPTIONS } from '../../api/apiEndPoints';
import { success } from '../../Global/toast';
import { DefaultOptionsValidateData, IDefaultOptionsData } from '../../types/request_data/master';
import { commonString, defaultOptionsString } from '../../utils/string';
import { defaultOptionsToast } from '../../utils/toast';

interface SymptomFormModalProps {
  show: boolean;
  title: string;
  data: IDefaultOptionsData | null;
  handleClose: () => void;
  onHide: () => void;
}

const SymptomFormModal: React.FC<SymptomFormModalProps> = ({
  show,
  title,
  data,
  handleClose,
  onHide,
}) => {
  const [loading, setLoading] = useState(false);
  const [symptom, setSymptom] = useState<IDefaultOptionsData | null>(null);
  const [validation, setValidation] = useState<DefaultOptionsValidateData>({
    option: false,
  });
  useEffect(() => {
    if (title === 'Edit' && data) {
      setSymptom(data);
    } else {
      setSymptom(null)
    }
  }, [data, title]);
  const handleChange = (value: string, name: string) => {
    const temp: any = { ...symptom };
    const tempValidation: any = { ...validation };
    if (value.length === 0) {
      tempValidation[name] = true;
    } else {
      tempValidation[name] = false;
    }
    temp[name] = value;
    setSymptom(temp);
    setValidation(tempValidation);
  };
  const handleSubmit = async () => {
    const temp = { ...symptom };
    const tempValidation = { ...validation };
    if (temp.option && temp.option.trim().length === 0) {
      tempValidation.option = true;
    }
    if (!tempValidation.option) {
      setLoading(true);
      let endPoint;
      let params: any = undefined;
      let dataToSend: any = undefined
      if (title === 'Add') {
        endPoint = DEFAULT_OPTIONS.ADD_DEFAULT_OPTION;
        dataToSend = {
          option: temp.option?.trim(),
          type: 2,
        };
      }
      if (title === 'Edit') {
        endPoint = DEFAULT_OPTIONS.EDIT_DEFAULT_OPTION;
        dataToSend = {
          option: temp.option?.trim(),
        };
        params = {
          _id: data?._id,
        };
      }
      const apiService = new APICallService(endPoint, dataToSend, params);
      const response = await apiService.callAPI();
      if (response) {
        if (title === 'Add') {
          success(defaultOptionsToast.symptomAdded);
        } else if (title === 'Edit') {
          success(defaultOptionsToast.symptomUpdated);
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
          {title === 'Add' ? defaultOptionsString.addSymptom : defaultOptionsString.editSymptom}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="align-items-center mx-4 my-3">
          <Form.Group className="mb-4">
            <Form.Label className="required">
              {defaultOptionsString.option}
            </Form.Label>
            <Form.Control
              className={clsx(
                'form-control-custom bg-light',
                validation.option ? 'border-danger' : 'border'
              )}
              type="text"
              placeholder={defaultOptionsString.option}
              value={symptom?.option}
              onChange={(event: any) => handleChange(event.target.value.trimStart(), 'option')}
            />
            <div className="fv-plugins-message-container">
              <span className="text-danger fs-12 fw-bold">
                {validation.option
                  ? 'Please enter valid option'
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

export default SymptomFormModal;
