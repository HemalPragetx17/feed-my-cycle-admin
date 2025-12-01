import { useEffect, useState } from 'react';
import { Button, Card, ListGroup, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import APICallService from '../../api/apiCallService';
import { BLOG } from '../../api/apiEndPoints';
import Loader from '../../Global/loader';
import p1 from '../../admin/assets/media/svg/default.svg';
import crossRed from '../../admin/assets/media/svg/cross.red.svg';
import Method from '../../utils/methods';
interface DraftBlogsModalProps {
  show: boolean;
  onHide: () => void;
  onDelete: (item: any) => void;
}
const DraftBlogs: React.FC<DraftBlogsModalProps> = ({
  show,
  onHide,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [fetchLoader, setFetchLoader] = useState(false);
  const [draftBlogs, setDraftBlogs] = useState<any>([]);
  useEffect(() => {
    (async () => {
      if (show) {
        setFetchLoader(true);
        await fetchDraftBlogs();
        setFetchLoader(false);
      }
    })();
  }, [show]);
  const fetchDraftBlogs = async () => {
    const params: Record<string, any> = {
      pageNo: 1,
      limit: 20,
      needCount: true,
      searchTerm: '',
      sortKey: '-1',
      sortOrder: '_createdAt',
      isDraft: true,
      isPublished: false,
    };

    const apiService = new APICallService(BLOG.GET_BLOGS, params);
    const response = await apiService.callAPI();
    if (response.records) {
      setDraftBlogs(response.records);
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        dialogClassName="modal-dialog-centered min-w-lg-700px"
        className="rounded-16"
        centered
        backdrop="static"
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title className="fs-22 fw-bolder">
            Draft products
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-6">
          <Card className="">
            {fetchLoader ? (
              <div className="d-flex flex-wrap justify-content-center align-items-center p-2 py-3">
                <div className="d-md-flex">
                  <Loader loading={fetchLoader} />
                </div>
              </div>
            ) : (
              <>
                <ListGroup>
                  {draftBlogs.map((blogVal: any, index: number) => {
                    return (
                      <ListGroup.Item key={index} className="">
                        <div className="d-flex flex-wrap justify-content-between gap-4 align-items-center p-2 py-3">
                          <div className="d-md-flex">
                            <div className="symbol symbol-50px border me-5">
                              {blogVal.image ? (
                                <img
                                  src={blogVal.image}
                                  className="object-fit-contain"
                                  alt=""
                                />
                              ) : (
                                <img
                                  src={p1}
                                  width={50}
                                  height={50}
                                  alt=""
                                />
                              )}
                            </div>
                            <div className="d-flex justify-content-start flex-column">
                              <span className="fs-18 fw-500 text-dark">
                                {blogVal.title?.length > 30
                                  ? `${blogVal.title.substring(0, 30)}...`
                                  : blogVal.title}
                              </span>
                              <span className="d-block fs-15 fw-500 text-gray">
                                Drafted on{' '}
                                {Method.convertDateToDDMMYYYY(
                                  blogVal._updatedAt
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="d-flex justify-content-end align-items-center flex-row mt-lg-0 mt-5">
                            <Button
                              type="button"
                              variant="primary"
                              className="fs-14 fw-600 btn-sm min-h-40px me-1"
                              onClick={() => navigate('/blog/edit', { state: { _id: blogVal._id } })}
                            >
                              Continue adding details
                            </Button>
                            <button
                              type="button"
                              className="btn btn-icon btn-sm"
                              onClick={() => {
                                onDelete(blogVal);
                                onHide();
                              }}
                            >
                              <img
                                src={crossRed}
                                width={16}
                                height={16}
                                alt=""
                              />
                            </button>
                          </div>
                        </div>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </>
            )}
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default DraftBlogs;
