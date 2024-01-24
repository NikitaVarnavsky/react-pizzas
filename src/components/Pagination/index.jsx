import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

const Pagination = ({ onChangePage, infoPage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel='>'
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={infoPage.per_page}
      pageCount={infoPage.total_pages}
      forcePage={infoPage.current_page - 1}
      previousLabel='<'
      renderOnZeroPageCount={null}
    />
  );
};
export default Pagination;
