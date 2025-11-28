import { useEffect, useId, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const Pagination = (props: any) => {
  const { currentPage, totalRecords, pageLimit, handlePageLimit, handlePreviousPage, handleCurrentPage, handleNextPage } = props;
  const [pages, setPages] = useState<(number | string)[]>([]);
  const id = useId();
  const location = useLocation();
  const pagination = (current: number, last: number) => {
    const delta = 1;
    const left = current - delta;
    const right = current + delta + 1;
    let range: number[] = [];
    let rangeWithDots: (number | string)[] = [];
    let l;

    for (let i = 1; i <= last; i++) {
      if (i === 1 || i === last || (i >= left && i < right)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  useEffect(() => {
    const data = pagination(currentPage, Math.ceil(totalRecords / pageLimit));
    setPages(data);
  }, [currentPage, pageLimit, totalRecords]);

  return (
    <>
      <div className="row d-flex flex-wrap justify-content-between my-5">
        <div className="col-auto">
          <Form.Select
            size="lg"
            onChange={(e) => handlePageLimit(e)}
            value={pageLimit}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </Form.Select>
        </div>
        <div className="d-flex align-items-center justify-content-end col">
          <ul className="pagination">
            <li
              className={clsx(
                'page-item previous',
                currentPage === 1 ? 'disabled' : ''
              )}
              key={`${id}-previous`}
            >
              <Link
                to="#"
                className="page-link"
                state={location.state}
                // onClick={() => handlePreviousPage(currentPage)}
                onClick={(e) => { e.preventDefault(); handlePreviousPage(currentPage); }}
              >
                <i className="previous"></i>
              </Link>
            </li>

            {pages.map((val, index) => (
              <li
                className={clsx(
                  'page-item',
                  val === currentPage ? 'active' : '',
                  val === '...' ? 'disabled' : ''
                )}
                key={`${id}-page-${index}`}
              >
                <Link
                  to="#"
                  className={clsx(
                    'page-link',
                    val === currentPage ? 'active' : '',
                    val === '...' ? 'disabled' : ''
                  )}
                  state={location.state}
                  onClick={(e) => {
                    e.preventDefault();
                    // Don't handle click for ellipsis
                    if (val !== '...') {
                      handleCurrentPage(val);
                    }
                  }}
                  style={val === '...' ? { cursor: 'default' } : { cursor: 'pointer' }}
                >
                  {val}
                </Link>
              </li>
            ))}

            <li
              className={clsx(
                'page-item next',
                currentPage === Math.ceil(totalRecords / pageLimit) ? 'disabled' : ''
              )}
              key={`${id}-next`}
            >
              <Link
                to="#"
                className="page-link"
                state={location.state}
                onClick={(e) => { e.preventDefault(); handleNextPage(currentPage) }}
              >
                <i className="next"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Pagination;
