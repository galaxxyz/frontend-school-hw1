/* eslint-disable react/prop-types */
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import styles from './UserFeedPage.module.css';
import abbreviateNumber from '../../functions/abbreviateNumber';
import videoStub from '../../assets/videoStub.png';

export default function UserFeedPage({ feed }) {
  return (
    <Row className="justify-content-center" md={7}>
      {feed.map((post) => (
        <Col key={post.id} className="my-3" sm="auto" xs="auto">
          <img className={styles.video} alt="" src={videoStub} />
          <div className="text-center">
            <FontAwesomeIcon
              icon={faEye}
              size="xs"
              className={styles.iconPlayCount}
            />
            <p className={styles.iconPlayCount}>
              {` ${abbreviateNumber(post.stats.playCount)}`}
            </p>
          </div>
        </Col>
      ))}
    </Row>
  );
}
