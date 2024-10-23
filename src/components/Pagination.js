import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
    return (
        <div className="pagination-controls">
            <button onClick={onPrevPage} disabled={currentPage === 0}>Previous</button>
            <span>Page {currentPage + 1} of {totalPages}</span>
            <button onClick={onNextPage} disabled={currentPage === totalPages - 1}>Next</button>
        </div>
    );
};

export default Pagination;
