import React, { useEffect, useState } from "react";
import { Card, Row, Col, Form, Button, Badge } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { SubscriptionString } from "../../../utils/string";

interface SubscriptionFormData {
  name: string;
  type: "free" | "weekly" | "monthly" | "yearly";
  price: number;
  features: string[];
  validity: string;
  isActive: boolean;
}

const SubscriptionsEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<SubscriptionFormData>({
    name: "",
    type: "free",
    price: 0,
    features: [""],
    validity: "",
    isActive: true,
  });

  useEffect(() => {
    if (id) {
      fetchPlanDetails();
    }
  }, [id]);

  const fetchPlanDetails = async () => {
    setLoading(true);
    // TODO: Replace with actual API call
    const mockPlan = {
      name: "Monthly Premium",
      type: "monthly" as "free" | "weekly" | "monthly" | "yearly",
      price: 9.99,
      features: [
        "Unlimited cycle tracking",
        "Personalized health insights",
        "Weight management tools",
        "Premium content access",
      ],
      validity: "30 days",
      isActive: true,
    };
    setFormData(mockPlan);
    setLoading(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    const { name, value, type } = target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (target as HTMLInputElement).checked : value,
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData((prev) => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData((prev) => ({ ...prev, features: [...prev.features, ""] }));
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, features: newFeatures }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement save API call
    console.log("Save plan:", formData);
    setTimeout(() => {
      setLoading(false);
      navigate("/subscription");
    }, 1000);
  };

  return (
    <>
      <Row className="align-items-center g-md-2 g-3 mb-7">
        <Col sm>
          <h1 className="fs-22 fw-bolder">
            {id
              ? SubscriptionString.editSubscriptionPlans
              : SubscriptionString.createPlan}
          </h1>
        </Col>
      </Row>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-7">
              <Col md={6}>
                <Form.Group className="mb-5">
                  <Form.Label className="fw-bold fs-6 mb-2">
                    {SubscriptionString.name}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter plan name"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-5">
                  <Form.Label className="fw-bold fs-6 mb-2">
                    {SubscriptionString.planType}
                  </Form.Label>
                  <Form.Select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="free">{SubscriptionString.free}</option>
                    <option value="weekly">{SubscriptionString.weekly}</option>
                    <option value="monthly">
                      {SubscriptionString.monthly}
                    </option>
                    <option value="yearly">{SubscriptionString.yearly}</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-5">
              <Col md={6}>
                <Form.Group className="mb-5">
                  <Form.Label className="fw-bold fs-6 mb-2">
                    {SubscriptionString.price} ($)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    placeholder="Enter price"
                    disabled={formData.type === "free"}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-5">
                  <Form.Label className="fw-bold fs-6 mb-2">
                    {SubscriptionString.validity}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="validity"
                    value={formData.validity}
                    onChange={handleInputChange}
                    placeholder="e.g., 30 days, 1 year"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-5">
              <Col md={12}>
                <Form.Label className="fw-bold fs-6 mb-2">
                  {SubscriptionString.features}
                </Form.Label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="d-flex align-items-center mb-3">
                    <Form.Control
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        handleFeatureChange(index, e.target.value)
                      }
                      placeholder="Enter feature description"
                      className="me-2"
                      required
                    />
                    <Button
                      variant="light-danger"
                      size="sm"
                      onClick={() => removeFeature(index)}
                      disabled={formData.features.length === 1}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </div>
                ))}
                <Button variant="light-primary" size="sm" onClick={addFeature}>
                  <i className="bi bi-plus-circle"></i>{" "}
                  {SubscriptionString.addFeature}
                </Button>
              </Col>
            </Row>
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="me-3"
                onClick={() => navigate("/subscription")}
                disabled={loading}
              >
                {SubscriptionString.cancel}
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    {SubscriptionString.saving}
                  </>
                ) : (
                  SubscriptionString.saveChanges
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default SubscriptionsEdit;
