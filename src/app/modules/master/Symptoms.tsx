import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import ThreeDotMenu from "../../../admin/assets/media/svg/three-dot.svg";
import { KTSVG } from "../../../admin/helpers";
import APICallService from "../../../api/apiCallService";
import { DEFAULT_OPTIONS } from "../../../api/apiEndPoints";
import Loader from "../../../Global/loader";
import Pagination from "../../../Global/pagination";
import { success } from "../../../Global/toast";
import { IDefaultOptionsData } from "../../../types/request_data/master";
import { PAGE_LIMIT } from "../../../utils/constants";
import { commonString, defaultOptionsString } from "../../../utils/string";
import { defaultOptionsToast } from "../../../utils/toast";
import { useDebounce } from "../../../utils/useDebounce";
import { CustomSelectTable } from "../../custom/select/CustomSelectTable";
import CommonDeleteModal from "../../modals/CommonDelete";
import SymptomFormModal from "../../modals/SymptomFormModal";

const options = [
  {
    label: (
      <button className="btn btn-link fs-15 fw-600 text-black ms-3 p-4">
        {defaultOptionsString.editSymptom}
      </button>
    ),
    value: 1,
  },
  {
    label: (
      <button className="btn btn-link fs-15 fw-600 text-danger ms-3 p-4">
        {defaultOptionsString.deleteSymptom}
      </button>
    ),
    value: 2,
  },
];

const Symptoms = () => {
  const [symptomsData, setSymptomsData] = useState<IDefaultOptionsData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(PAGE_LIMIT);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  // Modal states
  const [symptomModal, setShowSymptomModal] = useState<boolean>(false);
  const [symptomModalTitle, setSymptomModalTitle] = useState<string>('');
  const [currentSymptom, setCurrentSymptom] = useState<IDefaultOptionsData | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  // Load data
  useEffect(() => {
    (async () => {
      setFetchLoading(true);
      await fetchSymptoms(1, pageLimit, search);
      setFetchLoading(false);
    })();
  }, []);

  const fetchSymptoms = async (pageNo: number, limit: number, search: string = '') => {
    setLoading(true);
    const params = {
      page: pageNo,
      limit: limit,
      needCount: pageNo === 1,
      searchTerm: search,
      sortKey: '-1',
      sortOrder: '_createdAt',
      type: 2
    };

    const apiService = new APICallService(DEFAULT_OPTIONS.GET_DEFAULT_OPTIONS, params);
    const response = await apiService.callAPI();
    if (response && response.records) {
      if (pageNo === 1) {
        setTotalRecords(response.total);
      } else {
        let prevTotal = totalRecords;
        setTotalRecords(prevTotal);
      }
      setSymptomsData(response.records);
    } else {
      setSymptomsData([]);
    }
    setLoading(false);
  };

  const handleDeleteConfirm = async () => {
    const apiService = new APICallService(DEFAULT_OPTIONS.DELETE_DEFAULT_OPTION, currentSymptom?._id);
    const response = await apiService.callAPI();
    if (response) {
      success(defaultOptionsToast.symptomDeleted);
      setCurrentSymptom(null);
      setShowDeleteModal(false);
      setPage(1);
      await fetchSymptoms(1, pageLimit, search);
    }
  };

  const handleCurrentPage = async (val: number) => {
    if (val === page || val.toString() === "...") return;
    setPage(val);
    await fetchSymptoms(val, pageLimit, search);
  };

  const handleNextPage = async (val: number) => {
    setPage(val + 1);
    await fetchSymptoms(val + 1, pageLimit, search);
  };

  const handlePreviousPage = async (val: number) => {
    setPage(val - 1);
    await fetchSymptoms(val - 1, pageLimit, search);
  };

  const handlePageLimit = async (event: any) => {
    setPage(1);
    setPageLimit(event.target.value);
    await fetchSymptoms(1, event.target.value, search);
  };

  const debounce = useDebounce(fetchSymptoms, 300);
  const handleSearch = async (value: string) => {
    value = value.trimStart();
    const regex = /^(\S+( \S+)*)? ?$/;
    const isValid = regex.test(value);
    if (!isValid) {
      return;
    }
    setSearch(value);
    if (value.trim().length > 2 && search !== value) {
      setPage(1);
      await debounce(1, pageLimit, value);
    } else if (value.trim().length <= 2 && value.length < search.length) {
      setPage(1);
      await debounce(1, pageLimit, value);
    }
  };

  return (
    <>
      <Row className="align-items-center g-md-2 g-3 mb-7">
        <Col sm>
          <h1 className="fs-22 fw-bolder">{defaultOptionsString.symptom}</h1>
        </Col>
        {!fetchLoading ? (
          <Col md={'auto'} className="text-right mb-5">
            <Button
              onClick={() => {
                setShowSymptomModal(true);
                setSymptomModalTitle('Add');
              }}
              className="btn btn-primary mh-md-50px btn-lg fs-16 fw-600"
            >
              {defaultOptionsString.addSymptom}
            </Button>
          </Col>
        ) : (
          <></>
        )}
      </Row>

      <Row className="align-items-center p-3">
        <Col xs={12}>
          <Card className="bg-light border mb-7">
            <Card.Body className="px-7">
              <Row className="align-items-center">
                <Col xl={6} lg={6} md={12} className="mb-xl-0 mb-5">
                  <div className="form-group">
                    <Form.Label className="fs-16 fw-500">Search Symptoms</Form.Label>
                    <div className="d-flex align-items-center position-relative">
                      <KTSVG
                        path="media/icons/duotune/general/gen021.svg"
                        className="svg-icon-3 position-absolute ms-3"
                      />
                      <input
                        type="text"
                        className="form-control form-control-white min-h-60px form-control-lg ps-10"
                        placeholder={defaultOptionsString.search}
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {!fetchLoading ? (
        <Card className="border border-r10px">
          <Card.Body className="p-0">
            <div className="table-responsive">
              <table className="table table-rounded table-row-bordered align-middle gs-7 gy-4 mb-0">
                <thead>
                  <tr className="fw-bold fs-16 fw-600 text-dark border-bottom h-70px align-middle gy-3">
                    <th style={{ minWidth: 200 }}>{defaultOptionsString.option}</th>
                    <th style={{ minWidth: 50 }} className="text-center">
                      {commonString.actions}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {symptomsData && symptomsData.length ? (
                    symptomsData.map((item) => (
                      <tr key={item._id}>
                        <td>
                          {item.option}
                        </td>
                        <td className="text-center">
                          <CustomSelectTable
                            marginLeft="45px"
                            width="150px"
                            placeholder={
                              <img
                                className="img-fluid mt-0"
                                width={20}
                                height={4}
                                src={ThreeDotMenu}
                                alt=""
                              />
                            }
                            borderBottom="none"
                            options={options}
                            backgroundColor="#fff"
                            onChange={(event: any) => {
                              if (event.value === 1) {
                                setCurrentSymptom(item);
                                setShowSymptomModal(true);
                                setSymptomModalTitle('Edit');
                              } else if (event.value === 2) {
                                setCurrentSymptom(item);
                                setShowDeleteModal(true);
                              }
                            }}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-10">
                        <span className="text-muted">{commonString.noDataFound}</span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <div className="w-100 fs-15 fw-bold d-flex justify-content-center">
          <Loader loading={fetchLoading} />
        </div>
      )}

      {!loading && totalRecords > 0 && symptomsData.length > 0 && (
        <Pagination
          totalRecords={totalRecords}
          currentPage={page}
          pageLimit={pageLimit}
          handleCurrentPage={handleCurrentPage}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          handlePageLimit={handlePageLimit}
        />
      )}

      <SymptomFormModal
        show={symptomModal}
        title={symptomModalTitle}
        data={currentSymptom}
        handleClose={() => {
          setShowSymptomModal(false);
          setCurrentSymptom(null);
        }}
        onHide={async () => {
          setShowSymptomModal(false);
          setCurrentSymptom(null);
          setPage(1);
          await fetchSymptoms(1, pageLimit, search);
        }}
      />

      <CommonDeleteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title={defaultOptionsString.deleteSymptom}
        id={currentSymptom?._id || ''}
        btnText={"Delete"}
        headerText="this Symptom"
        handleSubmit={handleDeleteConfirm}
      />
    </>
  );
};

export default Symptoms;
