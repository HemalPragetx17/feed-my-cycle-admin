import React, { useEffect, useState } from "react";
import { Card, Table, Badge, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CustomSelectTable } from "../../custom/select/CustomSelectTable";
import ThreeDotMenu from "../../../admin/assets/media/svg/three-dot.svg";
import { SubscriptionString } from "../../../utils/string";

interface SubscriptionPlan {
  id: number;
  name: string;
  type: "free" | "weekly" | "monthly" | "yearly";
  price: number;
  features: string[];
  validity: string;
  subscribersCount: number;
}

const options = [
  {
    label: (
      <button className="btn btn-link fs-14 fw-600 text-black ms-3 p-4">
        {SubscriptionString.edit}
      </button>
    ),
    value: 1,
  },
  {
    label: (
      <button className="btn btn-link fs-14 fw-600 text-danger ms-3 p-4">
        {SubscriptionString.delete}
      </button>
    ),
    value: 2,
  },
];

const SubscriptionsList: React.FC = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    // TODO: Replace with actual API call
    const mockPlans: SubscriptionPlan[] = [
      {
        id: 1,
        name: "Free Trial",
        type: "free",
        price: 0,
        features: [
          "1 period cycle tracking",
          "Basic health tips",
          "Limited features",
        ],
        validity: "1 Period Cycle",
        subscribersCount: 450,
      },
      {
        id: 2,
        name: "Weekly Trial",
        type: "weekly",
        price: 4.99,
        features: [
          "2 period cycle tracking",
          "Basic health tips",
          "Limited features",
        ],
        validity: "7 days",
        subscribersCount: 200,
      },
      {
        id: 3,
        name: "Monthly Premium",
        type: "monthly",
        price: 9.99,
        features: [
          "Unlimited cycle tracking",
          "Personalized health insights",
          "Weight management tools",
          "Premium content access",
          "Ad-free experience",
        ],
        validity: "30 days",
        subscribersCount: 320,
      },
      {
        id: 4,
        name: "Yearly Premium",
        type: "yearly",
        price: 99.99,
        features: [
          "All monthly features",
          "Priority support",
          "Advanced analytics",
          "Exclusive content",
          "Family sharing (up to 3 members)",
        ],
        validity: "365 days",
        subscribersCount: 180,
      },
    ];
    setPlans(mockPlans);
    setLoading(false);
  };

  const handleEdit = (planId: number) => {
    navigate(`/subscription/edit/${planId}`);
  };

  const handleDelete = async (planId: number) => {
    if (window.confirm(SubscriptionString.deleteConfirmation)) {
      // TODO: Implement delete API call
      console.log("Delete plan:", planId);
    }
  };

  const getPlanTypeColor = (type: string) => {
    switch (type) {
      case "free":
        return "secondary";
      case "weekly":
        return "warning";
      case "monthly":
        return "info";
      case "yearly":
        return "success";
      default:
        return "primary";
    }
  };

  return (
    <>
      <Row className="align-items-center g-md-2 g-3 mb-7">
        <Col sm>
          <h1 className="fs-22 fw-bolder">
            {SubscriptionString.subscriptionPlan}
          </h1>
        </Col>
        <Col sm className="d-flex justify-content-sm-end justify-content-start">
          <Button
            className="btn btn-primary"
            onClick={() => navigate("/subscription/add")}
          >
            {SubscriptionString.addPlans}
          </Button>
        </Col>
      </Row>
      <Card>
        <Card.Body className="py-4">
          {loading ? (
            <div className="text-center py-10">
              <span className="spinner-border spinner-border-lg align-middle ms-2"></span>
            </div>
          ) : (
            <div className="table-responsive">
              <Table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                <thead>
                  <tr className="fw-bold text-muted">
                    <th className="min-w-140px">{SubscriptionString.name}</th>
                    <th className="min-w-100px">{SubscriptionString.type}</th>
                    <th className="min-w-100px">{SubscriptionString.price}</th>
                    <th className="min-w-200px">
                      {SubscriptionString.features}
                    </th>
                    <th className="min-w-90px">
                      {SubscriptionString.validity}
                    </th>
                    <th className="min-w-80px">
                      {SubscriptionString.subscribers}
                    </th>
                    <th className="min-w-90px text-center">
                      {SubscriptionString.actions}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => (
                    <tr key={plan.id}>
                      <td>
                        <span className="text-dark fw-bold text-hover-primary fs-6">
                          {plan.name}
                        </span>
                      </td>
                      <td>
                        <Badge bg={getPlanTypeColor(plan.type)}>
                          {plan.type.toUpperCase()}
                        </Badge>
                      </td>
                      <td>
                        <span className="text-dark fw-bold d-block fs-6">
                          ${plan.price.toFixed(2)}
                        </span>
                      </td>
                      <td>
                        <ul className="list-unstyled mb-0">
                          {plan.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="text-muted fs-7">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              {feature}
                            </li>
                          ))}
                          {plan.features.length > 3 && (
                            <li className="text-muted fs-7">
                              +{plan.features.length - 3} more
                            </li>
                          )}
                        </ul>
                      </td>
                      <td>
                        <span className="text-dark fw-bold d-block fs-6">
                          {plan.validity}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-light-primary fs-6">
                          {plan.subscribersCount}
                        </span>
                      </td>
                      <td className="text-center">
                        <CustomSelectTable
                          marginLeft="-90px"
                          placeholder={
                            <img
                              src={ThreeDotMenu}
                              width={20}
                              height={4}
                              alt=""
                            />
                          }
                          options={options}
                          onChange={(event: any) => {
                            if (event.value === 1) handleEdit(plan.id);
                            if (event.value === 2) handleDelete(plan.id);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default SubscriptionsList;
