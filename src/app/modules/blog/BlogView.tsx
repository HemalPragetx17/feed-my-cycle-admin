import { useEffect, useState } from "react";
import { Badge, Card, Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../../Global/loader";
import { Blog } from "../../../types/request_data/blog";
import { BlogString } from "../../../utils/string";
import APICallService from "../../../api/apiCallService";
import { BLOG } from "../../../api/apiEndPoints";

const BlogView = () => {
  const navigate = useNavigate();
  const { state }: { state: any } = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [item, setItem] = useState<Blog | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchUserData();
      setLoading(false);
    })();
  }, [state]);

  const fetchUserData = async () => {
    setLoading(true);

    const apiService = new APICallService(BLOG.GET_BLOG_DETAILS, state._id);
    const response = await apiService.callAPI();
    if (response) {
      setItem(response);
    }
    setLoading(false);
  };

  if (!item) {
    return (
      <Card className="border border-r10px">
        <Card.Body className="p-7">
          <div className="text-center py-5">
            <p className="text-muted">{BlogString.blogNotFound}</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/blog")}
            >
              {BlogString.backToList}
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
              onClick={() => navigate("/blog")}
            >
              <i className="bi bi-arrow-left me-2"></i>
              {BlogString.back}
            </button>
            <h1 className="fs-22 fw-bolder mb-0">{BlogString.details}</h1>
            <Badge
              bg=""
              className="fw-bold d-flex align-items-center justify-content-center text-align-center fs-14 h-40px ms-auto"
              style={{
                backgroundColor: item?.isPublished ? "#27AD4A1A" : "#FF00001A",
                color: item?.isPublished ? "#27AD4A" : "#FF0000",
                borderRadius: "100px",
                width: "120px",
              }}
            >
              {item?.isPublished
                ? BlogString.published
                : BlogString.unpublished}
            </Badge>
          </div>

          <Card className="border-0 shadow-sm mb-6">
            <Card.Body className="p-6">
              <Row className="g-4 mb-6">
                <Col lg={12}>
                  <div>
                    <Form.Label className="fs-6 fw-semibold text-muted mb-2">
                      {BlogString.title}
                    </Form.Label>
                    <div className="p-3 bg-light rounded-2">
                      <p className="mb-0">{item.title}</p>
                    </div>
                  </div>
                </Col>
                <Col lg={12}>
                  <div>
                    <Form.Label className="fs-6 fw-semibold text-muted mb-2">
                      {BlogString.content}
                    </Form.Label>
                    <div className="p-3 bg-light rounded-2">
                      <p className="mb-0">{item.content}</p>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="g-4 mb-6">
                <Col lg={12}>
                  <Form.Label className="fs-6 fw-semibold text-muted mb-2">
                    {BlogString.image}
                  </Form.Label>
                  <div className="p-3 bg-light rounded-2 text-center">
                    <img
                      src={item.image}
                      alt="Blog"
                      className="img-fluid rounded"
                      style={{ maxHeight: "250px" }}
                    />
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

export default BlogView;
