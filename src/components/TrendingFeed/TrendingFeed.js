import './TrendingFeed.css';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComments, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import abbreviateNumber from '../../functions/abbreviateNumber';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function TrendingFeed() {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3001/user/feed')
      .then((response) => {
        setTrendingPosts(response.data.itemList);
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
    <Container>
      {trendingPosts.map((post) => (
        <Container key={post.id}>
          <Row className="justify-content-center my-5">
            <Col sm="auto" xs={12} className="text-center">
              <video
                height={post.video.height * 0.4}
                width={post.video.width * 0.4}
                controls
                loop
                autoPlay="autoplay"
                muted
              >
                <source src={post.video.playAddr} type="Video/mp4" />
              </video>
            </Col>

            <Col sm={4} xs={12} className="py-3">
              <Container className="videoAuthor px-0 pb-3">
                <Link
                  className="authorLink"
                  to={`/tiktuk/${post.author.uniqueId}`}
                >
                  <Row>
                    <Col xs="auto">
                      <img
                        className="AvatarXS"
                        alt=""
                        src={post.author.avatarThumb}
                      />
                    </Col>
                    <Col className="px-0">
                      <p className="authorName">{post.author.uniqueId}</p>
                      <p className="authorNickName">{post.author.nickname}</p>
                    </Col>
                  </Row>
                </Link>
              </Container>
              <p className="videoDescription">{post.desc}</p>
              <Container className="videoStatistic">
                <Row>
                  <Col className="text-center">
                    <FontAwesomeIcon icon={faHeart} size="lg" />
                    <p>{abbreviateNumber(post.stats.diggCount)}</p>
                  </Col>
                  <Col className="text-center">
                    <FontAwesomeIcon icon={faComments} size="lg" />
                    <p>{abbreviateNumber(post.stats.commentCount)}</p>
                  </Col>
                  <Col className="text-center">
                    <FontAwesomeIcon icon={faEye} size="lg" />
                    <p>{abbreviateNumber(post.stats.playCount)}</p>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      ))}
    </Container>
  );
}
