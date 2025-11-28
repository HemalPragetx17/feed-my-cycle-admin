import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import APICallService from "../../../api/apiCallService";
import { CMS } from "../../../api/apiEndPoints";
import Loader from "../../../Global/loader";
import { success } from "../../../Global/toast";
import { cmsString, commonString } from "../../../utils/string";
import { cmsToast } from "../../../utils/toast";
import TextEditor from "./text-editor";
const TermsAndCondition = () => {
  const [termsData, setTermsData] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setFetchLoading(true);
      await fetchTermsAndConditionData();
      setFetchLoading(false);
    })();
  }, []);
  const fetchTermsAndConditionData = async () => {
    setLoading(true);
    const apiService = new APICallService(CMS.GET_TERMS_AND_CONDITIONS);
    const response: any = await apiService.callAPI();
    if (response) {
      setTermsData(response.data);
    }
    setLoading(false);
  };
  const saveTermsAndCondition = async (data: string) => {
    setLoading(true);
    const apiService = new APICallService(CMS.ADD_TERMS_AND_CONDITIONS, {
      content: data,
    });
    const response: any = await apiService.callAPI();
    if (response) {
      success(cmsToast.savedTermAndCond);
    }
    setLoading(false);
  };
  return (
    <>
      <Row className="align-items-center">
        <Col md className="align-self-center mb-5">
          <h1 className="fs-22 fw-bolder">{cmsString.termsTitle}</h1>
        </Col>
        {fetchLoading ? (
          <div className="d-flex justify-content-center m-4">
            <Loader loading={fetchLoading} />
          </div>
        ) : (
          <>
            <TextEditor
              data={termsData}
              onChange={setTermsData}
            />
            <Col
              xs="auto"
              className="pt-7"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => saveTermsAndCondition(termsData)}
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
export default TermsAndCondition;
