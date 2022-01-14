/* eslint-disable react/prop-types */
import './UserFeedPage.css';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import abbreviateNumber from '../../functions/abbreviateNumber';
import videoStub from '../../assets/videoStub.png';

export default function UserFeedPage({ feed }) {
  return (
    <Row className="justify-content-center" md={7}>
      {feed.map((post) => (
        <Col key={post.id} className="my-3" sm="auto" xs="auto">
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
