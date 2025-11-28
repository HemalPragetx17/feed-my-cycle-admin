import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import APICallService from "../../../api/apiCallService";
import { CMS } from "../../../api/apiEndPoints";
import Loader from "../../../Global/loader";
import { success } from "../../../Global/toast";
import { cmsString, commonString } from "../../../utils/string";
import { cmsToast } from "../../../utils/toast";
import TextEditor from "./text-editor";
const Instructions = () => {
  const [instructionsData, setInstructionsData] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setFetchLoading(true);
      await fetchInstructionsData();
      setFetchLoading(false);
    })();
  }, []);
  const fetchInstructionsData = async () => {
    setLoading(true);
    const apiService = new APICallService(CMS.GET_INSTRUCTION);
    const response: any = await apiService.callAPI();
    if (response) {
      setInstructionsData(response.data);
    }
    setLoading(false);
  };
  const saveInstructions = async (data: string) => {
    setLoading(true);
    const apiService = new APICallService(CMS.ADD_INSTRUCTION, {
      content: data,
    });
    const response: any = await apiService.callAPI();
    if (response) {
      success(cmsToast.savedInstruction);
    }
    setLoading(false);
  };
  return (
    <>
      <Row className="align-items-center">
        <Col md className="align-self-center mb-5">
          <h1 className="fs-22 fw-bolder">{cmsString.instructionsTitle}</h1>
        </Col>
        {fetchLoading ? (
          <div className="d-flex justify-content-center m-4">
            <Loader loading={fetchLoading} />
          </div>
        ) : (
          <>
            <TextEditor
              data={instructionsData}
              onChange={setInstructionsData}
            />
            <Col
              xs="auto"
              className="pt-7"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => saveInstructions(instructionsData)}
                disabled={loading}
              >
                {!loading && (
                  <span className="indicator-label fs-16 fw-bolder">
                    {cmsString.save}
                  </span>
                )}
                {loading && (
                  <span
                    className="indicator-progress fs-16 fw-bolder"
                    style={{ display: "block" }}
                  >
                    {commonString.pleaseWait}
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                )}
              </Button>
            </Col>
          </>
        )}
      </Row>
    </>
  );
};
export default Instructions;
