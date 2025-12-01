import clsx from "clsx";
import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import APICallService from "../../../api/apiCallService";
import { BLOG } from "../../../api/apiEndPoints";
import { BLOGJSON } from "../../../api/apiJSON/blog";
import { success } from "../../../Global/toast";
import { Blog, BlogValidateData } from "../../../types/request_data/blog";
import { BlogString, commonString } from "../../../utils/string";
import { blogToast } from "../../../utils/toast";
import FileUpload from "../../custom/file-upload/FileUpload";
import BlogAsDraft from "../../modals/BlogAsDraft";

const BlogCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [blogAsDraftModalShow, setBlogAsDraftModalShow] = useState(false);
  const [validation, setValidation] = useState<BlogValidateData>({
    title: false,
    content: false,
    image: false,
  });

  const handleChange = (value: string, name: string) => {
    const temp: any = { ...blog };
    const tempValidation: any = { ...validation };
    if (value.length === 0) {
      tempValidation[name] = true;
    } else {
      tempValidation[name] = false;
    }
    temp[name] = value;
    setBlog(temp);
    setValidation(tempValidation);
  };

  const handleFileChange = (value: File | null) => {
    const temp: any = { ...blog };
    const tempValidation: any = { ...validation };
    if (value === null) {
      tempValidation['image'] = true;
    } else {
      tempValidation['image'] = false;
    }
    temp['image'] = value;
    setBlog(temp);
    setValidation(tempValidation);
  };

  const handleSubmit = async () => {
    const temp = { ...blog };
    const tempValidation = { ...validation };

    // Validate title
    if (!temp.title || temp.title.trim().length === 0) {
      tempValidation.title = true;
    } else {
      tempValidation.title = false;
    }

    // Validate content
    if (!temp.content || temp.content.trim().length === 0) {
      tempValidation.content = true;
    } else {
      tempValidation.content = false;
    }

    // Validate image
    if (!temp.image || !((temp.image as any) instanceof File)) {
      tempValidation.image = true;
    } else {
      tempValidation.image = false;
    }

    if (!tempValidation.content && !tempValidation.title && !tempValidation.image) {
      setLoading(true);
      const apiService = new APICallService(BLOG.ADD_BLOG, BLOGJSON.addBlog({
        title: blog?.title || '',
        content: blog?.content || '',
        image: blog?.image || '',
        isPublished: true,
        isDraft: false
      }));
      const response = await apiService.callAPI();
      if (response) {
        navigate("/blog");
        success(blogToast.blogAdded);
      }
    }
    setValidation(tempValidation);
    setLoading(false);
  };

  const onSaveAsDraft = async () => {
    setLoading(true);

    const apiService = new APICallService(BLOG.ADD_BLOG, BLOGJSON.addBlog({
      title: blog?.title || '',
      content: blog?.content || '',
      image: blog?.image || '',
      isPublished: false,
      isDraft: true
    }));
    const response = await apiService.callAPI();
    if (response) {
      navigate('/blog');
      success(blogToast.blogDrafted);
      setBlogAsDraftModalShow(false);
    }
    setLoading(false);
  };

  return (
    <>
      <BlogAsDraft
        show={blogAsDraftModalShow}
        onHide={() => setBlogAsDraftModalShow(false)}
        onSaveAsDraft={onSaveAsDraft}
        loading={loading}
      />

      <div className="d-flex align-items-center mb-6">
        <button
          type="button"
          className="btn btn-primary btn-sm me-3"
          onClick={() => navigate("/blog")}
        >
          <i className="bi bi-arrow-left me-2"></i>
          {BlogString.back}
        </button>
        <h1 className="fs-22 fw-bolder mb-0">{BlogString.add}</h1>
      </div>
      <Card className="border border-r10px">
        <Card.Body className="p-7">
          <Row className="mb-6">
            <Col lg={12} className="mb-3 mb-md-3">
              <Form.Label className="fs-6 fw-bold mb-2">
                {BlogString.title}
              </Form.Label>
              <Form.Control
                type="text"
                value={blog?.title || ''}
                onChange={(e) => handleChange(e.target.value.trimStart(), 'title')}
                placeholder="Enter title"
                required
                className={clsx(
                  'form-control-custom bg-light',
                  validation.title ? 'border-danger' : 'border'
                )}
              />
              <div className="fv-plugins-message-container">
                <span className="text-danger fs-12 fw-bold">
                  {validation.title
                    ? 'Please enter valid title'
                    : ''}
                </span>
              </div>
            </Col>
            <Col lg={12} className="mb-3 mb-md-3">
              <Form.Label className="fs-6 fw-bold mb-2">
                {BlogString.content}
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={blog?.content || ''}
                onChange={(e) => handleChange(e.target.value.trimStart(), 'content')}
                placeholder="Enter content"
                required
                className={clsx(
                  'form-control-custom bg-light',
                  validation.content ? 'border-danger' : 'border'
                )}
              />
              <div className="fv-plugins-message-container">
                <span className="text-danger fs-12 fw-bold">
                  {validation.content
                    ? 'Please enter valid content'
                    : ''}
                </span>
              </div>
            </Col>
            <Col lg={6}>
              <FileUpload
                label={BlogString.image}
                fileType="image"
                value={blog?.image}
                onChange={(file) => handleFileChange(file)}
                required
                className={clsx(
                  'form-control-custom bg-light',
                  validation.image ? 'border-danger' : 'border'
                )}
              />
              <div className="fv-plugins-message-container">
                <span className="text-danger fs-12 fw-bold">
                  {validation.image
                    ? 'Please enter valid image'
                    : ''}
                </span>
              </div>
            </Col>
          </Row>
          <div className="d-flex justify-content-end gap-3 mt-6">
            <Button
              variant="outline-secondary"
              className="px-6"
              onClick={() => setBlogAsDraftModalShow(true)}
            >
              {BlogString.saveDraft}
            </Button>
            <Button
              onClick={handleSubmit}
              variant="primary"
              size="lg"
              disabled={loading}
            >
              {!loading && (
                <span className="indicator-label fs-16 fw-bold">
                  {BlogString.publish}
                </span>
              )}
              {loading && (
                <span
                  className="indicator-progress fs-16 fw-bold"
                  style={{ display: 'block' }}
                >
                  {commonString.pleaseWait}
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              )}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default BlogCreate;
