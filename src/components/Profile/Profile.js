import './Profile.css';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUsers, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserFeed from '../UserFeed/UserFeed';
import abbreviateNumber from '../../functions/abbreviateNumber';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function Profile() {
  const { nickname } = useParams();
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/${nickname}`)
      .then((response) => {
        setInfo(response.data);
        setLoading(false);
      })
      .catch(() => {
        setErrorMessage(
          'There was an error while loading data from the server. Please reload the page or visit it later.',
        );
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  if (errorMessage) return <ErrorMessage message={errorMessage} />;

  return (
    <Container className="my-4">
      <ErrorMessage message={errorMessage} />
      <Row className="justify-content-center">
        <Col sm="auto" xs="auto">
          <Image className="Avatar" src={info.avatarMedium} roundedCircle />
        </Col>
      </Row>

      <Row className="justify-content-center my-3">
        <Col sm="auto" xs="auto">
          <div className="userName text-center">{info.nickname}</div>
          <div className="userNickName text-center pb-3">{`@${info.uniqueId}`}</div>
          {info.signature ? (
            <div className="userSignature py-3 px-4">{info.signature}</div>
          ) : (
            <p />
          )}
        </Col>
      </Row>

      <Row className="justify-content-center my-4">
        <Col sm="auto" xs="auto">
          <Container className="videoStatistic">
            <Row>
              <Col xs={4} className="text-center px-4">
                <FontAwesomeIcon icon={faUsers} size="2x" />
                <p>{abbreviateNumber(info.stats.followerCount)}</p>
              </Col>
              <Col xs={4} className="text-center px-4">
                <FontAwesomeIcon icon={faHeart} size="2x" />
                <p>{abbreviateNumber(info.stats.heartCount)}</p>
              </Col>
              <Col xs={4} className="text-center px-4">
                <FontAwesomeIcon icon={faPlay} size="2x" />
                <p>{abbreviateNumber(info.stats.videoCount)}</p>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>

      <UserFeed nickname={nickname} />
    </Container>
  );
}
