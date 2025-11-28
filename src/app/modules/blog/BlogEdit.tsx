import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import FileUpload from "../../custom/file-upload/FileUpload";
import { BlogString, commonString } from "../../../utils/string";
import { Blog, BlogValidateData } from "../../../types/request_data/blog";
import clsx from "clsx";
import { success } from "../../../Global/toast";
import { blogToast } from "../../../utils/toast";
import APICallService from "../../../api/apiCallService";
import { BLOG } from "../../../api/apiEndPoints";
import { BLOGJSON } from "../../../api/apiJSON/blog";
import BlogAsDraft from "../../modals/BlogAsDraft";

const BlogEdit = () => {
  const navigate = useNavigate();
  const { state }: { state: any } = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [blogAsDraftModalShow, setBlogAsDraftModalShow] = useState(false);
  const [validation, setValidation] = useState<BlogValidateData>({
    title: false,
    content: false,
    image: false,
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchBlogData();
      setLoading(false);
    })();
  }, []);

  const fetchBlogData = async () => {
    setLoading(true);
    const apiService = new APICallService(BLOG.GET_BLOG_DETAILS, state._id);
    const response = await apiService.callAPI();
    if (response) {
      setBlog(response);
    }
    setLoading(false);
  };

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
    if (temp.image && typeof temp.image === 'string' && temp.image.trim().length > 0) {
      tempValidation.image = false;
    } else if ((temp.image as any) instanceof File && (temp.image as any).name.trim().length > 0) {
      tempValidation.image = false;
    } else {
      tempValidation.image = true;
    }

    if (!tempValidation.content && !tempValidation.title && !tempValidation.image) {
      setLoading(true);
      const apiService = new APICallService(BLOG.EDIT_BLOG, BLOGJSON.editBlog({
        title: blog?.title || '',
        content: blog?.content || '',
        image: blog?.image || '',
        isPublished: true,
        isDraft: false,
      }),
        { _id: state._id }
      );
      const response = await apiService.callAPI();
      if (response) {
        navigate("/blog");
        success(blogToast.blogUpdated);
      }
    }
    setValidation(tempValidation);
    setLoading(false);
  };

  const onSaveAsDraft = async () => {
    setLoading(true);

    const apiService = new APICallService(BLOG.EDIT_BLOG, BLOGJSON.editBlog({
      title: blog?.title || '',
      content: blog?.content || '',
      image: blog?.image || '',
      isPublished: false,
      isDraft: true
    }),
      { _id: state._id }
    );
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
        <h1 className="fs-22 fw-bolder mb-0">{BlogString.editBlog}</h1>
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
                value={blog?.title || ""}
                onChange={(e) => handleChange(e.target.value.trimStart(), 'title')}
                placeholder="Enter title"
                required
                className={clsx(
                  'form-control-custom bg-light',
                  validation.title ? 'border-danger' : 'border'
                )}
              />
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
            </Col>
          </Row>
          <div className="d-flex justify-content-end gap-3 mt-6">
            {blog?.isDraft ? (
              <Button
              variant="outline-secondary"
              className="px-6"
              onClick={() => setBlogAsDraftModalShow(true)}
            >
              {BlogString.saveDraft}
              </Button>
            ) : (
                <></>
            )}
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

export default BlogEdit;
