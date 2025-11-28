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

interface CycleStageFormModalProps {
  show: boolean;
  title: string;
  data: IDefaultOptionsData | null;
  handleClose: () => void;
  onHide: () => void;
}

const CycleStageFormModal: React.FC<CycleStageFormModalProps> = ({
  show,
  title,
  data,
  handleClose,
  onHide,
}) => {
  const [loading, setLoading] = useState(false);
  const [cycleStage, setCycleStage] = useState<IDefaultOptionsData | null>(null);
  const [validation, setValidation] = useState<DefaultOptionsValidateData>({
    option: false,
  });
  useEffect(() => {
    if (title === 'Edit' && data) {
      setCycleStage(data);
    } else {
      setCycleStage(null)
    }
  }, [data, title]);
  const handleChange = (value: string, name: string) => {
    const temp: any = { ...cycleStage };
    const tempValidation: any = { ...validation };
    if (value.length === 0) {
      tempValidation[name] = true;
    } else {
      tempValidation[name] = false;
    }
    temp[name] = value;
    setCycleStage(temp);
    setValidation(tempValidation);
  };
  const handleSubmit = async () => {
    const temp = { ...cycleStage };
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
          type: 1,
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
          success(defaultOptionsToast.cycleStageAdded);
        } else if (title === 'Edit') {
          success(defaultOptionsToast.cycleStageUpdated);
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
          {title === 'Add' ? defaultOptionsString.addCycleStage : defaultOptionsString.editCycleStage}
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
              value={cycleStage?.option}
              onChange={(event: any) => handleChange(event.target.value.trimStart(), 'option')}
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

export default CycleStageFormModal;
