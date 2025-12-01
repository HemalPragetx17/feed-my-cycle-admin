import { useEffect, useState } from "react";
import { Card, Col, FormLabel, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ThreeDotMenu from "../../../admin/assets/media/svg/three-dot.svg";
import { KTSVG } from "../../../admin/helpers";
import APICallService from "../../../api/apiCallService";
import { BLOG } from "../../../api/apiEndPoints";
import Loader from "../../../Global/loader";
import Pagination from "../../../Global/pagination";
import { success } from "../../../Global/toast";
import { Blog } from "../../../types/request_data/blog";
import { PAGE_LIMIT } from "../../../utils/constants";
import Method from "../../../utils/methods";
import { BlogString, commonString } from "../../../utils/string";
import { blogToast } from "../../../utils/toast";
import { useDebounce } from "../../../utils/useDebounce";
import { CustomSelectTable } from "../../custom/select/CustomSelectTable";
import CommonConfirm from "../../modals/CommonDelete";
import DraftBlogs from "../../modals/DraftBlogs";

const options = [
  {
    label: (
      <button className="btn btn-link fs-14 fw-600 text-black ms-3 p-4">
        {BlogString.view}
      </button>
    ),
    value: 1,
  },
  {
    label: (
      <button className="btn btn-link fs-14 fw-600 text-black ms-3 p-4">
        {BlogString.edit}
      </button>
    ),
    value: 2,
  },
  {
    label: (
      <button className="btn btn-link fs-14 fw-600 text-danger ms-3 p-4">
        {BlogString.delete}
      </button>
    ),
    value: 3,
  },
];

const BlogList = () => {
  const navigate = useNavigate();

  const [totalRecords, setTotalRecords] = useState(0);
  const [blogData, setBlogData] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(PAGE_LIMIT);
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [draftCount, setDraftCount] = useState<number>(0);
  const [showDraftBlogs, setShowDraftBlogs] = useState(false);

  // Filter states
  const [search, setSearch] = useState<string>("");

  // Modal states
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  // Apply filters
  useEffect(() => {
    (async () => {
      setFetchLoading(true);
      await fetchBlogs(1, pageLimit, search);
      setFetchLoading(false);
    })();
  }, []);

  const fetchBlogs = async (pageNo: number, limit: number, search: string = '') => {
    setLoading(true);
    const params: Record<string, any> = {
      pageNo: pageNo,
      limit: limit,
      needCount: pageNo === 1,
      searchTerm: search,
      sortKey: '-1',
      sortOrder: '_createdAt',
      isDraft: false,
      isPublished: true,
    };

    const apiService = new APICallService(BLOG.GET_BLOGS, params);
    const response = await apiService.callAPI();
    if (response && response.records) {
      if (pageNo === 1) {
        setTotalRecords(response.publishedCount);
      } else {
        let prevTotal = totalRecords;
        setTotalRecords(prevTotal);
      }
      setDraftCount(response.draftCount || 0);
      setBlogData(response.records);
    } else {
      setBlogData([]);
    }
    setLoading(false);
  };

  const handleCurrentPage = async (val: number) => {
    if (val === page || val.toString() === "...") return;
    setPage(val);
    await fetchBlogs(val, pageLimit, search);
  };

  const handleNextPage = async (val: number) => {
    setPage(val + 1);
    await fetchBlogs(val + 1, pageLimit, search);
  };

  const handlePreviousPage = async (val: number) => {
    setPage(val - 1);
    await fetchBlogs(val - 1, pageLimit, search);
  };

  const handlePageLimit = async (event: any) => {
    setPage(1);
    setPageLimit(event.target.value);
    await fetchBlogs(1, event.target.value, search);
  };

  const debounce = useDebounce(fetchBlogs, 300);
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

  const handleAddClick = () => {
    navigate("/blog/create")
  };

  const handleEditClick = (_id?: string) => {
    if (!_id) return;
    navigate("/blog/edit", { state: { _id } })
  };

  const handleDeleteClick = (item?: Blog) => {
    if (!item?._id) return;
    setCurrentBlog(item);
    setShowDeleteModal(true);
  };

  const handleViewClick = (_id?: string) => {
    if (!_id) return;
    navigate("/blog/view", { state: { _id } })
  };

  const handleDeleteConfirm = async () => {
    const apiService = new APICallService(BLOG.DELETE_BLOG, currentBlog?._id);
    const response = await apiService.callAPI();
    if (response) {
      success(blogToast.blogDeleted);
      setCurrentBlog(null);
      setShowDeleteModal(false);
      await fetchBlogs(page, pageLimit, search);
    }
  };

  const handleStatusToggle = async (_id: string, index: number) => {
    const temp = [...blogData];
    const currStatus = temp[index].isPublished;
    const params = {
      isPublished: !currStatus,
    };
    const apiCallService = new APICallService(BLOG.UPDATE_STATUS, params, { _id });
    const response = await apiCallService.callAPI();
    if (response) {
      temp[index].isPublished = !currStatus;
      setBlogData(temp);
      if (currStatus) {
        success(blogToast.unpublished);
      } else {
        success(blogToast.published);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center g-md-2 g-3 mb-7">
        <Col sm>
          <h1 className="fs-22 fw-bolder">
            {BlogString.blogs}
          </h1>
        </Col>
        {draftCount > 0 ? (
          <Col xs={6}
            md={'auto'}
            className="text-end"
          >
            <button className="btn btn-secondary" onClick={() => setShowDraftBlogs(true)}>
              {draftCount} draft blogs
            </button>
          </Col>
        ) : (
          <></>
        )}
        {!fetchLoading ? (
          <Col xs={'auto'}>
            <button className="btn btn-primary" onClick={handleAddClick}>
              {BlogString.add}
            </button>
          </Col>
        ) : (
          <></>
        )}
      </Row>

      {/* Filters */}
      <Col xs={12}>
        <Card className="bg-light border mb-7">
          <Card.Body className="px-7">
            <Row className="align-items-center">
              <Col lg={6} className="mb-xl-0 mb-5">
                <FormLabel className="fs-16 fw-500">
                  {BlogString.searchTitle}
                </FormLabel>
                <div className="d-flex align-items-center position-relative">
                  <KTSVG
                    path="media/icons/duotune/general/gen021.svg"
                    className="svg-icon-3 position-absolute ms-3"
                  />
                  <input
                    type="text"
                    className="form-control form-control-white min-h-60px form-control-lg ps-10"
                    placeholder="Search by title"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>

      {!fetchLoading ? (
        <Card className="border border-r10px">
          <Card.Body className="p-0">
            <div className="table-responsive">
              <table className="table table-rounded table-row-bordered align-middle gs-7 gy-4 mb-0">
                <thead>
                  <tr className="fw-bold fs-16 fw-600 text-dark border-bottom h-70px">
                    <th>{BlogString.title}</th>
                    <th>{BlogString.status}</th>
                    <th>{BlogString.createdAt}</th>
                    <th className="text-center">{commonString.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {blogData && blogData.length ? (
                    blogData.map((item, index) => (
                      <tr key={item._id}>
                        <td>{item.title}</td>
                        <td>
                          <div className="d-flex justify-content-start">
                            <label className="form-check form-switch form-check-custom form-check-solid">
                              <input
                                className="form-check-input form-check-success w-50px h-30px"
                                type="checkbox"
                                name="notifications"
                                checked={item.isPublished}
                                onChange={() =>
                                  handleStatusToggle(item._id ? item._id : '', index)
                                }
                                style={{ cursor: "pointer" }}
                              />
                            </label>
                          </div>
                        </td>
                        <td>{Method.convertDateToDDMMYYYY(item._createdAt ?? '')}</td>
                        <td className="text-center">
                          <CustomSelectTable
                            marginLeft="-40px"
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
                                handleViewClick(item._id)
                              } else if (event.value === 2) {
                                handleEditClick(item._id)
                              } else if (event.value === 3) {
                                handleDeleteClick(item)
                              };
                            }}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-10">
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

      {/* Pagination */}
      {!loading && totalRecords > 0 && blogData.length > 0 && (
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

      <DraftBlogs
        show={showDraftBlogs}
        onHide={() => setShowDraftBlogs(false)}
        onDelete={handleDeleteClick}
      />

      <CommonConfirm
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title={BlogString.delete}
        id={currentBlog?._id ?? ''}
        btnText={BlogString.delete}
        headerText="this Blog"
        handleSubmit={handleDeleteConfirm}
      />
    </>
  );
};

export default BlogList;
