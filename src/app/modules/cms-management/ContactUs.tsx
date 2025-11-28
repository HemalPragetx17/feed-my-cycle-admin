import { Card, Col, Row, FormLabel } from "react-bootstrap";
import { commonString, ContactString } from "../../../utils/string";
import { KTSVG } from "../../../admin/helpers";
import { useEffect, useState } from "react";
import Loader from "../../../Global/loader";
import Pagination from "../../../Global/pagination";
import APICallService from "../../../api/apiCallService";
import { CMS } from "../../../api/apiEndPoints";
import Method from "../../../utils/methods";
import ContactUsDetailModal from "../../modals/ContactUsDetailModal";
import { CustomSelectTable } from "../../custom/select/CustomSelectTable";
import ThreeDotMenu from "../../../admin/assets/media/svg/three-dot.svg";
import { useDebounce } from "../../../utils/useDebounce";

const ContactUs = () => {
  const [inquiries, setInquiries] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

  useEffect(() => {
    (async () => {
      setFetchLoading(true);
      await fetchInquiries(1, pageLimit, search);
      setFetchLoading(false);
    })();
  }, []);

  const fetchInquiries = async (pageNo: any, limit: any, searchTerm: any) => {
    setLoading(true);
    const params: any = {
      pageNo: pageNo,
      limit: limit,
      needCount: true,
      searchTerm: searchTerm,
      sortOrder: '-1',
      sortKey: "_createdAt",
    };

    // Dummy data for Contact Us inquiries
    const dummyInquiries = [
      {
        _id: "1",
        user: {
          firstName: "John",
          lastName: "Murphy",
          email: "john.murphy@example.com",
        },
        _createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        content: "I would like to inquire about ticket availability for the upcoming Feed My Cycle Championship match. Can you please provide information on pricing and seating options?",
      },
      {
        _id: "2",
        user: {
          firstName: "Sarah",
          lastName: "O'Connor",
          email: "sarah.oconnor@example.com",
        },
        _createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        content: "I'm interested in volunteering for community events. How can I get involved with the Feed My Cycle GAA community programs?",
      },
      {
        _id: "3",
        user: {
          firstName: "Michael",
          lastName: "Walsh",
          email: "michael.walsh@example.com",
        },
        _createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        content: "I have a question regarding the fixture schedule. When will the next round of matches be announced?",
      },
      {
        _id: "4",
        user: {
          firstName: "Emma",
          lastName: "Byrne",
          email: "emma.byrne@example.com",
        },
        _createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        content: "I would like to report an issue with the mobile app. The live scores feature is not updating correctly during matches.",
      },
      {
        _id: "5",
        user: {
          firstName: "David",
          lastName: "Ryan",
          email: "david.ryan@example.com",
        },
        _createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
        content: "I'm looking for information about youth coaching programs in my area. Can you provide details about registration and schedules?",
      },
      {
        _id: "6",
        user: {
          firstName: "Lisa",
          lastName: "Kelly",
          email: "lisa.kelly@example.com",
        },
        _createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
        content: "I have a suggestion for improving the match day experience. Would it be possible to add more food vendors at the stadium?",
      },
    ];
    setInquiries(dummyInquiries);
    setTotalRecords(dummyInquiries.length);

    // const apiService = new APICallService(CMS.GET_CONTACT_US, params);
    // const response = await apiService.callAPI();
    // if (response && response.records) {
    //   setInquiries(response.records);
    //   setTotalRecords(response.total);
    // }
    setLoading(false);
  };

  const handleCurrentPage = async (val: any) => {
    if (val === page || val.toString() === "...") return;
    setPage(val);
    await fetchInquiries(val, pageLimit, search);
  };

  const handleNextPage = async (val: any) => {
    setPage(val + 1);
    await fetchInquiries(val + 1, pageLimit, search);
  };

  const handlePreviousPage = async (val: any) => {
    setPage(val - 1);
    await fetchInquiries(val - 1, pageLimit, search);
  };

  const handlePageLimit = async (event: any) => {
    setPage(1);
    setPageLimit(event.target.value);
    await fetchInquiries(1, event.target.value, search);
  };

  const debounce = useDebounce(fetchInquiries, 300);
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

  const handleViewDetails = (inquiry: any) => {
    setSelectedInquiry(inquiry);
    setShowModal(true);
  };

  return (
    <>
      <Row className="align-items-center">
        <Col className="align-self-center mb-5">
          <h1 className="fs-22 fw-bolder">{ContactString.title}</h1>
        </Col>
      </Row>
      
      <Col xs={12}>
        <Card className="bg-light border mb-7">
          <Card.Body className="px-7">
            <Row className="align-items-center">
              <Col xl={6} lg={6} md={12} className="mb-xl-0 mb-5">
                <div className="form-group">
                  <FormLabel className="fs-16 fw-500">
                    Search by User Name
                  </FormLabel>
                  <div className="d-flex align-items-center position-relative">
                    <KTSVG
                      path="media/icons/duotune/general/gen021.svg"
                      className="svg-icon-3 position-absolute ms-3"
                    />
                    <input
                      type="text"
                      className="form-control form-control-white min-h-60px form-control-lg ps-10"
                      placeholder={ContactString.searchPlaceholder}
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

      {!fetchLoading ? (
        <Card className="border border-r10px">
          <Card.Body className="py-3">
            <div className="table-responsive">
              <table className="table table-rounded table-row-bordered align-middle gy-4">
                <thead>
                  <tr className="fw-bold fs-16 fw-600 text-dark border-bottom h-70px align-middle">
                    <th className="min-w-250px ">
                      {commonString.name}
                    </th>
                    <th className="min-w-350px ">{commonString.email}</th>
                    <th className="min-w-150px">
                      {ContactString.receivedOn}
                    </th>
                    <th className="min-w-200px text-center">{commonString.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={4}>
                        <div className="w-100 d-flex justify-content-center">
                          <Loader loading={loading} />
                        </div>
                      </td>
                    </tr>
                  ) : inquiries && inquiries.length ? (
                    inquiries.map(
                      (inquiryVal: any, inquiryIndex: number) => (
                        <tr key={inquiryIndex}>
                          <td>
                            <div className="d-flex align-items-center gap-2">

                              <div className="d-flex flex-column">
                                <span className="fs-15 fw-500">
                                  {inquiryVal.user.firstName + " " + inquiryVal.user.lastName}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div >
                              <span className="fs-15 fw-600 text-dark">
                                {inquiryVal.user.email || "-"}
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className="fs-15 fw-500">
                              {Method.convertDateToFormat(
                                inquiryVal._createdAt,
                                "DD-MM-YYYY"
                              ) || "-"}
                            </span>
                          </td>
                          <td className="text-center">
                            <CustomSelectTable
                              marginLeft="-20px"
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
                              options={[
                                {
                                  label: (
                                    <button className="btn btn-link fs-15 fw-600 text-black ms-3 p-4">
                                      {ContactString.viewMessage}
                                    </button>
                                  ),
                                  value: 1,
                                },
                              ]}
                              backgroundColor="#fff"
                              onChange={(event: any) => {
                                if (event.value === 1) {
                                  handleViewDetails(inquiryVal);
                                }
                              }}
                            />
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td colSpan={4}>
                        <div className="w-100 fs-15 fw-bold d-flex justify-content-center">
                          {commonString.noDataFound}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <div className="w-100 d-flex justify-content-center">
          <Loader loading={fetchLoading} />
        </div>
      )}

      {!loading && totalRecords > 0 && (
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

      <ContactUsDetailModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setSelectedInquiry(null);
        }}
        inquiryData={selectedInquiry}
      />
    </>
  );
};

export default ContactUs;
