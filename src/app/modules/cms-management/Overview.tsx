import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import APICallService from "../../../api/apiCallService";
import { CMS } from "../../../api/apiEndPoints";
import Loader from "../../../Global/loader";
import { success } from "../../../Global/toast";
import { cmsString, commonString } from "../../../utils/string";
import { cmsToast } from "../../../utils/toast";
import TextEditor from "./text-editor";
const Overview = () => {
  const [overviewData, setOverviewData] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setFetchLoading(true);
      await fetchOverviewData();
      setFetchLoading(false);
    })();
  }, []);
  const fetchOverviewData = async () => {
    setLoading(true);
    const apiService = new APICallService(CMS.GET_OVERVIEW);
    const response: any = await apiService.callAPI();
    if (response) {
      setOverviewData(response.data);
    }
    setLoading(false);
  };
  const saveOverview = async (data: string) => {
    setLoading(true);
    const apiService = new APICallService(CMS.ADD_OVERVIEW, {
      content: data,
    });
    const response: any = await apiService.callAPI();
    if (response) {
      success(cmsToast.savedOverview);
    }
    setLoading(false);
  };
  return (
    <>
      <Row className="align-items-center">
        <Col md className="align-self-center mb-5">
          <h1 className="fs-22 fw-bolder">{cmsString.overviewTitle}</h1>
        </Col>
        {fetchLoading ? (
          <div className="d-flex justify-content-center m-4">
            <Loader loading={fetchLoading} />
          </div>
        ) : (
          <>
            <TextEditor
              data={overviewData}
              onChange={setOverviewData}
            />
            <Col
              xs="auto"
              className="pt-7"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => saveOverview(overviewData)}
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
export default Overview;
