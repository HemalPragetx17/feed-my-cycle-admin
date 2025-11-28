import { useEffect, useState } from "react";
import { Card, Col, FormLabel, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ThreeDotMenu from "../../../admin/assets/media/svg/three-dot.svg";
import { KTSVG } from "../../../admin/helpers";
import Pagination from "../../../Global/pagination";
import { PAGE_LIMIT } from "../../../utils/constants";
import { UserManagementString } from "../../../utils/string";
import CustomDateInput from "../../custom/DateRange/CustomDateInput";
import CustomDatePicker from "../../custom/DateRange/DatePicker";
import { CustomSelectTable } from "../../custom/select/CustomSelectTable";
import { CustomSelectWhite } from "../../custom/select/CustomSelectWhite";
import Loader from "../../../Global/loader";
import { useDebounce } from "../../../utils/useDebounce";
import Method from "../../../utils/methods";
import APICallService from "../../../api/apiCallService";
import { success } from "../../../Global/toast";
import { customerToast } from "../../../utils/toast";
import { USERMANAGEMENT } from "../../../api/apiEndPoints";
import { User } from "../../../types/request_data/user";
import { UserStatusOptions } from "../../../utils/staticJSON";

const UserManagementList = () => {
  const navigate = useNavigate();
  
  const [totalRecords, setTotalRecords] = useState(0);
  const [userData, setUserData] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(PAGE_LIMIT);
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Filter states
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    (async () => {
      setFetchLoading(true);
      await fetchUsers(1, pageLimit, search, startDate, endDate, status);
      setFetchLoading(false);
    })();
  }, []);

  const fetchUsers = async (pageNo: number, limit: number, search: string = '', startDate: Date | null = null, endDate: Date | null = null, status: string) => {
    setLoading(true);
    const params: Record<string, any> = {
      page: pageNo,
      limit: limit,
      needCount: pageNo === 1,
      searchTerm: search,
      sortKey: '-1',
      sortOrder: '_createdAt',
    };

    if (startDate && endDate) {
      params.startDate = Method.convertDateToFormat(startDate, 'YYYY-MM-DD');
      params.endDate = Method.convertDateToFormat(endDate, 'YYYY-MM-DD');
    }

    if (status) {
      params.status = status != '' ? status : 'all';
    }

    // Static fake user data array (15 users)
    const FAKE_USERS: User[] = [
      {
        _id: "user-1",
        name: "Emma Smith",
        email: "emma.smith0@example.com",
        age: 28,
        height: 165,
        weight: 68,
        targetWeight: 60,
        averageCycleLength: 28,
        durationOfPeriod: 5,
        actualWeightLoss: 5,
        progressTillDate: 62,
        isActive: true,
        subscription: "Monthly",
        _createdAt: "2024-08-15T10:30:00.000Z",
      },
      {
        _id: "user-2",
        name: "Olivia Johnson",
        email: "olivia.johnson1@example.com",
        age: 32,
        height: 170,
        weight: 75,
        targetWeight: 65,
        averageCycleLength: 30,
        durationOfPeriod: 4,
        actualWeightLoss: 7,
        progressTillDate: 70,
        isActive: true,
        subscription: "Yearly",
        _createdAt: "2024-06-20T14:20:00.000Z",
      },
      {
        _id: "user-3",
        name: "Ava Williams",
        email: "ava.williams2@example.com",
        age: 25,
        height: 158,
        weight: 62,
        targetWeight: 55,
        averageCycleLength: 27,
        durationOfPeriod: 6,
        actualWeightLoss: 3,
        progressTillDate: 42,
        isActive: false,
        subscription: "Free",
        _createdAt: "2024-09-10T08:15:00.000Z",
      },
      {
        _id: "user-4",
        name: "Sophia Brown",
        email: "sophia.brown3@example.com",
        age: 29,
        height: 172,
        weight: 80,
        targetWeight: 70,
        averageCycleLength: 29,
        durationOfPeriod: 5,
        actualWeightLoss: 6,
        progressTillDate: 60,
        isActive: true,
        subscription: "Weekly",
        _createdAt: "2024-07-05T12:45:00.000Z",
      },
      {
        _id: "user-5",
        name: "Isabella Jones",
        email: "isabella.jones4@example.com",
        age: 35,
        height: 163,
        weight: 70,
        targetWeight: 62,
        averageCycleLength: 31,
        durationOfPeriod: 4,
        actualWeightLoss: 4,
        progressTillDate: 50,
        isActive: true,
        subscription: "Monthly",
        _createdAt: "2024-05-12T09:30:00.000Z",
      },
      {
        _id: "user-6",
        name: "Mia Garcia",
        email: "mia.garcia5@example.com",
        age: 27,
        height: 168,
        weight: 73,
        targetWeight: 65,
        averageCycleLength: 26,
        durationOfPeriod: 5,
        actualWeightLoss: 2,
        progressTillDate: 25,
        isActive: false,
        subscription: "Free",
        _createdAt: "2024-10-01T16:00:00.000Z",
      },
      {
        _id: "user-7",
        name: "Charlotte Miller",
        email: "charlotte.miller6@example.com",
        age: 31,
        height: 175,
        weight: 82,
        targetWeight: 72,
        averageCycleLength: 28,
        durationOfPeriod: 6,
        actualWeightLoss: 8,
        progressTillDate: 80,
        isActive: true,
        subscription: "Yearly",
        _createdAt: "2024-04-18T11:20:00.000Z",
      },
      {
        _id: "user-8",
        name: "Amelia Davis",
        email: "amelia.davis7@example.com",
        age: 26,
        height: 160,
        weight: 65,
        targetWeight: 58,
        averageCycleLength: 29,
        durationOfPeriod: 4,
        actualWeightLoss: 5,
        progressTillDate: 71,
        isActive: true,
        subscription: "Monthly",
        _createdAt: "2024-08-25T13:10:00.000Z",
      },
      {
        _id: "user-9",
        name: "Harper Rodriguez",
        email: "harper.rodriguez8@example.com",
        age: 30,
        height: 167,
        weight: 71,
        targetWeight: 64,
        averageCycleLength: 27,
        durationOfPeriod: 5,
        actualWeightLoss: 3,
        progressTillDate: 42,
        isActive: false,
        subscription: "Weekly",
        _createdAt: "2024-09-30T10:05:00.000Z",
      },
      {
        _id: "user-10",
        name: "Evelyn Martinez",
        email: "evelyn.martinez9@example.com",
        age: 33,
        height: 162,
        weight: 67,
        targetWeight: 60,
        averageCycleLength: 30,
        durationOfPeriod: 6,
        actualWeightLoss: 4,
        progressTillDate: 57,
        isActive: true,
        subscription: "Free",
        _createdAt: "2024-07-22T15:35:00.000Z",
      },
      {
        _id: "user-11",
        name: "Abigail Hernandez",
        email: "abigail.hernandez10@example.com",
        age: 24,
        height: 171,
        weight: 76,
        targetWeight: 68,
        averageCycleLength: 28,
        durationOfPeriod: 5,
        actualWeightLoss: 6,
        progressTillDate: 75,
        isActive: true,
        subscription: "Monthly",
        _createdAt: "2024-06-08T08:50:00.000Z",
      },
      {
        _id: "user-12",
        name: "Emily Lopez",
        email: "emily.lopez11@example.com",
        age: 28,
        height: 164,
        weight: 69,
        targetWeight: 62,
        averageCycleLength: 29,
        durationOfPeriod: 4,
        actualWeightLoss: 2,
        progressTillDate: 28,
        isActive: false,
        subscription: "Yearly",
        _createdAt: "2024-10-15T12:25:00.000Z",
      },
      {
        _id: "user-13",
        name: "Elizabeth Gonzalez",
        email: "elizabeth.gonzalez12@example.com",
        age: 34,
        height: 169,
        weight: 78,
        targetWeight: 70,
        averageCycleLength: 31,
        durationOfPeriod: 5,
        actualWeightLoss: 5,
        progressTillDate: 62,
        isActive: true,
        subscription: "Weekly",
        _createdAt: "2024-05-30T14:40:00.000Z",
      },
      {
        _id: "user-14",
        name: "Sofia Wilson",
        email: "sofia.wilson13@example.com",
        age: 27,
        height: 166,
        weight: 72,
        targetWeight: 65,
        averageCycleLength: 27,
        durationOfPeriod: 6,
        actualWeightLoss: 4,
        progressTillDate: 57,
        isActive: true,
        subscription: "Free",
        _createdAt: "2024-08-02T09:15:00.000Z",
      },
      {
        _id: "user-15",
        name: "Avery Anderson",
        email: "avery.anderson14@example.com",
        age: 29,
        height: 173,
        weight: 81,
        targetWeight: 73,
        averageCycleLength: 28,
        durationOfPeriod: 5,
        actualWeightLoss: 7,
        progressTillDate: 87,
        isActive: true,
        subscription: "Monthly",
        _createdAt: "2024-04-25T11:30:00.000Z",
      },
    ];

    setTotalRecords(FAKE_USERS.length);
    setUserData(FAKE_USERS);

    // const apiService = new APICallService(USERMANAGEMENT.GET_USERS, params);
    // const response = await apiService.callAPI();
    // if (response && response.records) {
    //   if (pageNo === 1) {
    //     setTotalRecords(response.total);
    //   } else {
    //     let prevTotal = totalRecords;
    //     setTotalRecords(prevTotal);
    //   }
    //   setUserData(response.records);
    // } else {
    //   setUserData([]);
    // }
    setLoading(false);
  };

  const handleViewClick = (_id: string) => {
    navigate("view", { state: { _id } });
  };

  const handleCurrentPage = async (val: number) => {
    if (val === page || val.toString() === "...") return;
    setPage(val);
    await fetchUsers(val, pageLimit, search, startDate, endDate, status);
  };

  const handleNextPage = async (val: number) => {
    setPage(val + 1);
    await fetchUsers(val + 1, pageLimit, search, startDate, endDate, status);
  };

  const handlePreviousPage = async (val: number) => {
    setPage(val - 1);
    await fetchUsers(val - 1, pageLimit, search, startDate, endDate, status);
  };

  const handlePageLimit = async (event: any) => {
    setPage(1);
    setPageLimit(event.target.value);
    await fetchUsers(1, event.target.value, search, startDate, endDate, status);
  };

  const debounce = useDebounce(fetchUsers, 300);
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
      await debounce(1, pageLimit, value, startDate, endDate, status);
    } else if (value.trim().length <= 2 && value.length < search.length) {
      setPage(1);
      await debounce(1, pageLimit, value, startDate, endDate, status);
    }
  };

  const handleStatusFilter = async (value: string) => {
    if (value) {
      setStatus(value);
      setPage(1);
      await fetchUsers(1, pageLimit, search, startDate, endDate, value);
    }
  };

  const handleDateFilter = async (event: [Date | null, Date | null] | null) => {
    if (event) {
      setStartDate(event[0]);
      setEndDate(event[1]);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
    setPage(1);
    if (event && event[0] && event[1]) {
      await fetchUsers(1, pageLimit, search, event[0], event[1], status);
    }
  };

  const handleStatusToggle = async (id: string, index: number) => {
    console.log("🚀 ~ handleStatusToggle ~ id:", id)
    const temp = [...userData];
    const currStatus = temp[index].isActive;
    const params = {
      status: !currStatus,
    };
    console.log("🚀 ~ handleStatusToggle ~ params:", params)
    // const apiCallService = new APICallService(USERMANAGEMENT.UPDATE_STATUS, params, { id: id });
    // const response = await apiCallService.callAPI();
    // if (response) {
    //   temp[index].isActive = !currStatus;
    //   setUserData(temp);
    //   if (currStatus) {
    //     success(customerToast.deactivated);
    //   } else {
    //     success(customerToast.activated);
    //   }
    // }
  };

  return (
    <>
      <Row className="align-items-center g-md-2 g-3 mb-7">
        <Col sm>
          <h1 className="fs-22 fw-bolder">
            {UserManagementString.userManagement}
          </h1>
        </Col>
      </Row>

      <Row className="align-items-center p-3">
        <Col xs={12}>
          <Card className="bg-light border mb-7">
            <Card.Body className="px-7">
              <Row className="align-items-center">
                <Col lg={4} className="mb-xl-0 mb-5">
                  <div className="form-group">
                    <FormLabel className="fs-16 fw-500">
                      {UserManagementString.searchUser}
                    </FormLabel>
                    <div className="d-flex align-items-center position-relative">
                      <KTSVG
                        path="media/icons/duotune/general/gen021.svg"
                        className="svg-icon-3 position-absolute ms-3"
                      />
                      <input
                        type="text"
                        id="kt_filter_search"
                        className="form-control form-control-white min-h-60px form-control-lg ps-10"
                        placeholder="Search by Name or Email"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg={4} className="mb-xl-0 mb-5">
                  <div className="form-group">
                    <FormLabel className="fs-16 fw-500">
                      {UserManagementString.accountStatus}
                    </FormLabel>
                    <div className="min-w-lg-250px">
                      <CustomSelectWhite
                        placeholder="Select"
                        isSearchable={false}
                        onChange={(e: any) => handleStatusFilter(e.target.value)}
                        options={UserStatusOptions}
                        isClearable={true}
                        value={status}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg={4} className="mb-xl-0 mb-5">
                  <div className="form-group">
                    <FormLabel className="fs-16 fw-500">
                      {UserManagementString.filterByDate}
                    </FormLabel>
                    <div className="min-w-lg-250px">
                      <CustomDatePicker
                        className="form-control bg-white fs-14 fw-bold text-dark min-w-md-288px min-w-175px"
                        onChange={handleDateFilter}
                        selectsRange
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="dd/MM/yyyy"
                        showFullMonthYearPicker
                        maxDate={new Date()}
                        isClearable
                        placeholder="Select date range"
                        minDate={new Date("2023-01-01")}
                        customInput={
                          <CustomDateInput inputClass="form-control-white min-h-60px form-control-lg fs-15 fw-400 border-r10px" />
                        }
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
                    <th style={{ minWidth: 150 }}>{UserManagementString.name}</th>
                    <th style={{ minWidth: 200 }}>
                      {UserManagementString.email}
                    </th>
                    <th style={{ minWidth: 90 }}>
                      {UserManagementString.status}
                    </th>
                    <th style={{ minWidth: 80 }}>
                      {UserManagementString.subscription}
                    </th>
                    <th style={{ minWidth: 100 }}>
                      {UserManagementString.heightInCm}
                    </th>
                    <th style={{ minWidth: 100 }}>
                      {UserManagementString.weightInKg}
                    </th>
                    <th style={{ minWidth: 50 }} className="text-center">
                      {UserManagementString.actions}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userData.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-10">
                        <span className="text-muted">
                          {UserManagementString.noUsersFound}
                        </span>
                      </td>
                    </tr>
                  ) : (
                    userData.map((item, index) => (
                      <tr key={item._id}>
                        <td>
                          <span className="fs-15 fw-600 text-dark">
                            {item.name}
                          </span>
                        </td>
                        <td>
                          <span className="fs-15 fw-600 text-dark">
                            {item.email}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex justify-content-start">
                            <label className="form-check form-switch form-check-custom form-check-solid">
                              <input
                                className="form-check-input form-check-success w-50px h-30px"
                                type="checkbox"
                                name="notifications"
                                checked={item.isActive}
                                onChange={() =>
                                  handleStatusToggle(item._id, index)
                                }
                                style={{ cursor: "pointer" }}
                              />
                            </label>
                          </div>
                        </td>
                        <td>
                          <span className="fs-15 fw-600 text-dark">
                            {item.subscription}
                          </span>
                        </td>
                        <td>
                          <span className="fs-15 fw-600 text-dark">
                            {item.height}
                          </span>
                        </td>
                        <td>
                          <span className="fs-15 fw-600 text-dark">
                            {item.weight}
                          </span>
                        </td>
                        <td className="text-center">
                          <CustomSelectTable
                            marginLeft="-95px"
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
                                    {UserManagementString.viewDetails}
                                  </button>
                                ),
                                value: 1,
                              },
                            ]}
                            backgroundColor="#fff"
                            onChange={(event: any) => {
                              if (event.value === 1) {
                                handleViewClick(item._id);
                              }
                            }}
                          />
                        </td>
                      </tr>
                    ))
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

      {!loading && totalRecords > 0 && userData.length > 0 && (
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
    </>
  );
};

export default UserManagementList;
