import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import ThreeDotMenu from "../../../admin/assets/media/svg/three-dot.svg";
import { KTSVG } from "../../../admin/helpers";
import APICallService from "../../../api/apiCallService";
import { MOTIVATIONAL_QUOTES } from "../../../api/apiEndPoints";
import Loader from "../../../Global/loader";
import Pagination from "../../../Global/pagination";
import { success } from "../../../Global/toast";
import { IMotivationalQuotesData } from "../../../types/request_data/master";
import { PAGE_LIMIT } from "../../../utils/constants";
import { commonString, motivationalQuotesString } from "../../../utils/string";
import { motivationalQuotesToast } from "../../../utils/toast";
import { useDebounce } from "../../../utils/useDebounce";
import { CustomSelectTable } from "../../custom/select/CustomSelectTable";
import CommonDeleteModal from "../../modals/CommonDelete";
import MotivationalQuoteFormModal from "../../modals/MotivationalQuoteFormModal";
const options = [
  {
    label: (
      <button className="btn btn-link fs-15 fw-600 text-black ms-3 p-4">
        {motivationalQuotesString.edit}
      </button>
    ),
    value: 1,
  },
  {
    label: (
      <button className="btn btn-link fs-15 fw-600 text-danger ms-3 p-4">
        {motivationalQuotesString.delete}
      </button>
    ),
    value: 2,
  },
];

const MotivationalQuotes = () => {
  const [motivationalQuotesData, setMotivationalQuotesData] = useState<IMotivationalQuotesData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(PAGE_LIMIT);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  // Modal states
  const [motivationalQuotesModal, setShowMotivationalQuotesModal] = useState<boolean>(false);
  const [motivationalQuotesModalTitle, setMotivationalQuotesModalTitle] = useState<string>('');
  const [currentMotivationalQuote, setCurrentMotivationalQuote] = useState<IMotivationalQuotesData | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  // Load data
  useEffect(() => {
    (async () => {
      setFetchLoading(true);
      await fetchMotivationalQuotes(1, pageLimit, search);
      setFetchLoading(false);
    })();
  }, []);

  const fetchMotivationalQuotes = async (pageNo: number, limit: number, search: string = '') => {
    setLoading(true);
    const params = {
      pageNo: pageNo,
      limit: limit,
      needCount: pageNo === 1,
      searchTerm: search,
      sortKey: '-1',
      sortOrder: '_createdAt',
    };

    const apiService = new APICallService(MOTIVATIONAL_QUOTES.GET_MOTIVATIONAL_QUOTES, params);
    const response = await apiService.callAPI();
    if (response && response.records) {
      if (pageNo === 1) {
        setTotalRecords(response.total);
      } else {
        let prevTotal = totalRecords;
        setTotalRecords(prevTotal);
      }
      setMotivationalQuotesData(response.records);
    } else {
      setMotivationalQuotesData([]);
    }
    setLoading(false);
  };

  const handleDeleteConfirm = async () => {
    const apiService = new APICallService(MOTIVATIONAL_QUOTES.DELETE_MOTIVATIONAL_QUOTES, currentMotivationalQuote?._id);
    const response = await apiService.callAPI();
    if (response) {
      success(motivationalQuotesToast.motivationalQuoteDeleted);
      setCurrentMotivationalQuote(null);
      setShowDeleteModal(false);
      setPage(1);
      await fetchMotivationalQuotes(1, pageLimit, search);
    }
  };

  const handleCurrentPage = async (val: number) => {
    if (val === page || val.toString() === "...") return;
    setPage(val);
    await fetchMotivationalQuotes(val, pageLimit, search);
  };

  const handleNextPage = async (val: number) => {
    setPage(val + 1);
    await fetchMotivationalQuotes(val + 1, pageLimit, search);
  };

  const handlePreviousPage = async (val: number) => {
    setPage(val - 1);
    await fetchMotivationalQuotes(val - 1, pageLimit, search);
  };

  const handlePageLimit = async (event: any) => {
    setPage(1);
    setPageLimit(event.target.value);
    await fetchMotivationalQuotes(1, event.target.value, search);
  };

  const debounce = useDebounce(fetchMotivationalQuotes, 300);
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
          <h1 className="fs-22 fw-bolder">{motivationalQuotesString.motivationalQuotes}</h1>
        </Col>
        {!fetchLoading ? (
          <Col md={'auto'} className="text-right mb-5">
            <Button
              onClick={() => {
                setShowMotivationalQuotesModal(true);
                setMotivationalQuotesModalTitle('Import');
              }}
              className="btn btn-primary mh-md-50px btn-lg fs-16 fw-600"
            >
              {motivationalQuotesString.import}
            </Button>
          </Col>
        ) : (
          <></>
        )}
        {!fetchLoading ? (
          <Col md={'auto'} className="text-right mb-5">
            <Button
              onClick={() => {
                setShowMotivationalQuotesModal(true);
                setMotivationalQuotesModalTitle('Add');
              }}
              className="btn btn-primary mh-md-50px btn-lg fs-16 fw-600"
            >
              {motivationalQuotesString.add}
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
                    <Form.Label className="fs-16 fw-500">Search Motivational Quotes</Form.Label>
                    <div className="d-flex align-items-center position-relative">
                      <KTSVG
                        path="media/icons/duotune/general/gen021.svg"
                        className="svg-icon-3 position-absolute ms-3"
                      />
                      <input
                        type="text"
                        className="form-control form-control-white min-h-60px form-control-lg ps-10"
                        placeholder={motivationalQuotesString.search}
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
                    <th style={{ minWidth: 200 }}>{motivationalQuotesString.quote}</th>
                    <th style={{ minWidth: 50 }} className="text-center">
                      {commonString.actions}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {motivationalQuotesData && motivationalQuotesData.length ? (
                    motivationalQuotesData.map((item) => (
                      <tr key={item._id}>
                        <td>
                          {item.quote}
                        </td>
                        <td className="text-center">
                          <CustomSelectTable
                            marginLeft="-160px"
                            width="250px"
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
                                setCurrentMotivationalQuote(item);
                                setShowMotivationalQuotesModal(true);
                                setMotivationalQuotesModalTitle('Edit');
                              } else if (event.value === 2) {
                                setCurrentMotivationalQuote(item);
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

      {!loading && totalRecords > 0 && motivationalQuotesData.length > 0 && (
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

      <MotivationalQuoteFormModal
        show={motivationalQuotesModal}
        title={motivationalQuotesModalTitle}
        data={currentMotivationalQuote}
        handleClose={() => {
          setShowMotivationalQuotesModal(false);
          setCurrentMotivationalQuote(null);
        }}
        onHide={async () => {
          setShowMotivationalQuotesModal(false);
          setCurrentMotivationalQuote(null);
          setPage(1);
          await fetchMotivationalQuotes(1, pageLimit, search);
        }}
      />

      <CommonDeleteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title={motivationalQuotesString.delete}
        id={currentMotivationalQuote?._id || ''}
        btnText={"Delete"}
        headerText="this Motivational Quote"
        handleSubmit={handleDeleteConfirm}
      />
    </>
  );
};

export default MotivationalQuotes;
