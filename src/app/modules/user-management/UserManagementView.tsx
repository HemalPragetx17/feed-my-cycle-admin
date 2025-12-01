import { useEffect, useState } from "react";
import { Badge, Card, Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import APICallService from "../../../api/apiCallService";
import { USERMANAGEMENT } from "../../../api/apiEndPoints";
import Loader from "../../../Global/loader";
import { UserManagementString } from "../../../utils/string";
import { User } from "../../../types/request_data/user";

const UserManagementView = () => {
  const navigate = useNavigate();
  const { state }: { state: any } = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [item, setItem] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchUserData();
      setLoading(false);
    })();
  }, [state]);

  const fetchUserData = async () => {
    setLoading(true);

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

    if (FAKE_USERS && state && state._id) {
      const found = FAKE_USERS.find((i: User) => i._id === state._id);
      setItem(found || null);
    }

    // const apiService = new APICallService(USERMANAGEMENT.GET_USER_DETAILS, state._id);
    // const response = await apiService.callAPI();
    // if (response) {
    //   setItem(response);
    // }
    setLoading(false);
  };

  if (!item) {
    return (
      <Card className="border border-r10px">
        <Card.Body className="p-7">
          <div className="text-center py-5">
            <p className="text-muted">{UserManagementString.userNotFound}</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/user-management")}
            >
              {UserManagementString.backToList}
            </button>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      {loading ? (
        <>
          <div className="d-flex justify-content-center">
            <Loader loading={loading} />
          </div>
        </>
      ) : (
        <>
          <div className="d-flex align-items-center mb-6">
            <button
              type="button"
              className="btn btn-primary btn-sm me-3"
              onClick={() => navigate("/user-management")}
            >
              <i className="bi bi-arrow-left me-2"></i>
              {UserManagementString.back}
            </button>
            <h1 className="fs-22 fw-bolder mb-0">
              {UserManagementString.userDetails}
            </h1>
            <Badge
              bg=""
              className="fw-bold d-flex align-items-center justify-content-center text-align-center fs-14 h-30px w-75px ms-4"
              style={{
                backgroundColor: item?.isActive ? "#27AD4A1A" : "#FF00001A",
                color: item?.isActive ? "#27AD4A" : "#FF0000",
                borderRadius: "100px",
              }}
            >
              {item?.isActive
                ? UserManagementString.active
                : UserManagementString.inActive}
            </Badge>
            <Badge
              bg=""
              className="fw-bold d-flex align-items-center justify-content-center text-align-center fs-14 h-40px w-85px ms-auto"
              style={{
                backgroundColor:
                  item?.subscription === UserManagementString.free
                    ? "#2013131a"
                    : item?.subscription === UserManagementString.weekly
                      ? "#27AD4A1A"
                      : item?.subscription === UserManagementString.monthly
                        ? "#1A73E81A"
                        : "#FFA5001A",
                color:
                  item?.subscription === UserManagementString.free
                    ? "#706e08ff"
                    : item?.subscription === UserManagementString.weekly
                      ? "#27AD4A"
                      : item?.subscription === UserManagementString.monthly
                        ? "#1A73E8"
                        : "#FFA500",
                borderRadius: "100px",
              }}
            >
              {item?.subscription === UserManagementString.free
                ? UserManagementString.free
                : item?.subscription === UserManagementString.weekly
                  ? UserManagementString.weekly
                  : item?.subscription === UserManagementString.monthly
                    ? UserManagementString.monthly
                    : UserManagementString.yearly}
            </Badge>
          </div>

          <Card className="border-0 shadow-sm mb-6">
            <Card.Body className="p-6">
              <h5 className="fw-bold mb-4">{UserManagementString.personalInfo}</h5>
              <Row className="g-4 mb-6">
                <Col lg={6}>
                  <div>
                    <Form.Label className="fs-6 fw-semibold text-muted mb-2">
                      {UserManagementString.name}
                    </Form.Label>
                    <div className="p-3 bg-light rounded-2">
                      <p className="mb-0">{item.name}</p>
                    </div>
                  </div>
                </Col>
                <Col lg={6}>
                  <div>
                    <Form.Label className="fs-6 fw-semibold text-muted mb-2">
                      {UserManagementString.email}
                    </Form.Label>
                    <div className="p-3 bg-light rounded-2">
                      <p className="mb-0">{item.email}</p>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row className="g-4 mb-6">
                <Col lg={6}>
                  <div>
                    <Form.Label className="fs-6 fw-semibold text-muted mb-2">
                      {UserManagementString.age}
                    </Form.Label>
                      <div className="p-3 bg-light rounded-2">
                      <p className="mb-0">
                        {item.age} {UserManagementString.years}
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>

              <h5 className="fw-bold mb-4 mt-6">
                {UserManagementString.physicalMetrics}
              </h5>
              <Row className="g-4 mb-6">
                <Col lg={4}>
                  <div>
                    <Form.Label className="fs-6 fw-semibold text-muted mb-2">
                      {UserManagementString.height}
                    </Form.Label>
                    <div className="p-3 bg-light rounded-2">
                      <p className="mb-0">
                        {item.height} {UserManagementString.cm}
                      </p>
                    </div>
                  </div>
                </Col>
                <Col lg={4}>
                  <div>
                    <Form.Label className="fs-6 fw-semibold text-muted mb-2">
                      {UserManagementString.weight}
                    </Form.Label>
                    <div className="p-3 bg-light rounded-2">
                      <p className="mb-0">
                        {item.weight} {UserManagementString.kg}
                      </p>
                    </div>
                  </div>
                </Col>
                <Col lg={4}>
                  <div>
                    <Form.Label className="fs-6 fw-semibold text-muted mb-2">
                      {UserManagementString.targetWeight}
                    </Form.Label>
                    <div className="p-3 bg-light rounded-2">
                      <p className="mb-0">
                        {item.targetWeight} {UserManagementString.kg}
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>

              <h5 className="fw-bold mb-4 mt-6">
                {UserManagementString.cycleInfo}
              </h5>
              <Row className="g-4 mb-6">
                <Col lg={6}>
                  <div>
                    <Form.Label className="fs-6 fw-semibold text-muted mb-2">
                      {UserManagementString.cycleLength}
                    </Form.Label>
                    <div className="p-3 bg-light rounded-2">
                      <p className="mb-0">
                        {item.averageCycleLength} {UserManagementString.days}
                      </p>
                    </div>
                  </div>
                </Col>
                <Col lg={6}>
                  <div>
                    <Form.Label className="fs-6 fw-semibold text-muted mb-2">
                      {UserManagementString.duration}
                    </Form.Label>
                    <div className="p-3 bg-light rounded-2">
                      <p className="mb-0">
                        {item.durationOfPeriod} {UserManagementString.days}
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>

              <h5 className="fw-bold mb-4 mt-6">
                {UserManagementString.weightLossProgress}
              </h5>
              <Row className="g-4 mb-6">
                <Col lg={6}>
                  <div>
                    <Form.Label className="fs-6 fw-semibold text-muted mb-2">
                      {UserManagementString.weightLoss}
                    </Form.Label>
                    <div className="p-3 bg-light rounded-2">
                      <p className="mb-0 text-success fw-bold">
                        {item.actualWeightLoss} {UserManagementString.kg}
                      </p>
                    </div>
                  </div>
                </Col>
                <Col lg={6}>
                  <div>
                    <Form.Label className="fs-6 fw-semibold text-muted mb-2">
                      {UserManagementString.progressTillDate}
                    </Form.Label>
                    <div className="p-3 bg-light rounded-2">
                      <div className="d-flex align-items-center">
                        <div
                          className="progress flex-grow-1 me-3"
                          style={{ height: "20px" }}
                        >
                          <div
                            className="progress-bar bg-success"
                            role="progressbar"
                            style={{ width: `${item.progressTillDate}%` }}
                            aria-valuenow={item.progressTillDate}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          ></div>
                        </div>
                        <span className="fw-bold">{item.progressTillDate}%</span>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
};

export default UserManagementView;
