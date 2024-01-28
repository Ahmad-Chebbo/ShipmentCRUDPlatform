// Pagination.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ meta, onPageChange }) => {
  const getPrevisePage = () => {
    onPageChange(meta.current_page - 1 > 0 ? meta.current_page - 1 : 1);
  };

  const getNextPage = () => {
    const currentPage = meta.current_page;
    const lastPage = meta.last_page;
    onPageChange(currentPage + 1 <= lastPage ? currentPage + 1 : currentPage);
  };

  const renderPageButtons = () => {
    const totalPageCount = meta.last_page;
    const currentPage = meta.current_page;

    let pageButtons = [];
    let showLeftEllipsis = false;
    let showRightEllipsis = false;

    for (let i = 1; i <= totalPageCount; i++) {
      if (
        i === 1 ||
        i === totalPageCount ||
        (i >= currentPage - 2 && i <= currentPage + 2)
      ) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`btn btn-primary mx-1 ${i === currentPage ? 'active' : ''}`}
          >
            {i}
          </button>
        );
      } else if (i < currentPage - 2 && !showLeftEllipsis) {
        pageButtons.push(
          <span key={`left-ellipsis`} className="mx-1">
            ...
          </span>
        );
        showLeftEllipsis = true;
      } else if (i > currentPage + 2 && !showRightEllipsis) {
        pageButtons.push(
          <span key={`right-ellipsis`} className="mx-1">
            ...
          </span>
        );
        showRightEllipsis = true;
      }
    }

    return pageButtons;
  };

  return (
    <div className="d-flex justify-content-between align-items-center p-3">
      <button onClick={getPrevisePage} className="btn btn-primary">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div>{renderPageButtons()}</div>
      <button onClick={getNextPage} className="btn btn-primary">
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default Pagination;
