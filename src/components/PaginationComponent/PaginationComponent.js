import { Pagination, PageItem } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function PaginationComponent({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      {pageNumbers.map((number) => (
        <PageItem
          key={number}
          active={number === currentPage}
          onClick={() => paginate(number)}
        >
          {number}
        </PageItem>
      ))}
    </Pagination>
  );
}

PaginationComponent.propTypes = {
  postsPerPage: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};
