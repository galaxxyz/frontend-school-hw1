import './UserFeed.css';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import abbreviateNumber from '../../functions/abbreviateNumber';
import videoStub from '../../assets/videoStub.png';
import Loader from '../Loader/Loader';

export default function UserFeed({ feed, loading }) {
  if (loading) return <Loader />;

  return (
    <Row className="justify-content-center" md={7}>
      {feed.map((post) => (
        <Col className="my-3" sm="auto" xs="auto">
          <img className="video" alt="" src={videoStub} />
          <div className="text-center">
            <FontAwesomeIcon icon={faEye} size="xs" className="iconPlayCount" />
            <p className="iconPlayCount">
              {` ${abbreviateNumber(post.stats.playCount)}`}
            </p>
          </div>
        </Col>
      ))}
    </Row>
  );
}

UserFeed.propTypes = {
  feed: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
};
