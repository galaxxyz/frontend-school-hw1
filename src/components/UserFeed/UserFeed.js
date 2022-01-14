import './UserFeed.css';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import PaginationComponent from '../PaginationComponent/PaginationComponent';
import UserFeedPage from '../UserFeedPage/UserFeedPage';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

// nickname prop is never used yet, because I use stub for userinfo and feed during development
// eslint-disable-next-line no-unused-vars
export default function UserFeed({ nickname }) {
  const [feed, setFeed] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  useEffect(() => {
    axios
      // .get(`http://localhost:3001/user/feed/${nickname}`)
      .get('http://localhost:3001/user/feed')
      .then((response) => {
        setFeed(response.data.itemList);
        setLoading(false);
      })
      .catch(() => {
        setErrorMessage(
          'There was an error while loading data from the server. Please reload the page or visit it later.',
        );
        setLoading(false);
      });
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = feed.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <Loader />;

  if (errorMessage) return <ErrorMessage message={errorMessage} />;

  return (
    <>
      <UserFeedPage feed={currentPosts} />
      <Row className="justify-content-center">
        <Col sm="auto">
          <PaginationComponent
            postsPerPage={postsPerPage}
            totalPosts={feed.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </Col>
      </Row>
    </>
  );
}

UserFeed.propTypes = {
  nickname: PropTypes.string.isRequired,
};
