import './Profile.css';
import { useState, useEffect } from 'react';
// eslint-disable-next-line object-curly-newline
import { Container, Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUsers, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import PaginationComponent from '../PaginationComponent/PaginationComponent';
import UserFeed from '../UserFeed/UserFeed';
import feedStub from '../../assets/user-feed.json';
import abbreviateNumber from '../../functions/abbreviateNumber';
import Loader from '../Loader/Loader';

const axios = require('axios').default;

export default function Profile() {
  const { nickname } = useParams();
  const [info, setInfo] = useState('');
  const [feed, setFeed] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  const headers = {
    'x-rapidapi-host': 'tiktok33.p.rapidapi.com',
    'x-rapidapi-key': 'c1257dc04cmshd888bbb072eb770p1f2b8ajsnbf16d4cd1d66',
  };
  const optionsInfo = {
    method: 'GET',
    url: `https://tiktok33.p.rapidapi.com/user/info/${nickname}`,
    headers,
  };

  /* const optionsFeed = {
        method: 'GET',
        url: `https://tiktok33.p.rapidapi.com/user/feed/${nickname}`,
        headers,
    }; */

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      await axios
        .request(optionsInfo)
        .then((response) => {
          setInfo(response.data);
          setFeed(feedStub.itemList);
        })
        .catch((error) => {
          console.error(error);
        });
      setLoading(false);
    };
    fetchInfo();
  }, []);

  /* useEffect(() => {
        const fetchFeed = async () => {
            const res = await axios.request(optionsFeed).then(function (response) {
                setFeed(response.data);
            }).catch(function (error) {
                console.error(error);
            });
        }
        fetchFeed();

    }, []) */

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = feed.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <Loader />;

  if (info && feed) {
    return (
      <Container className="my-4">
        <Row className="justify-content-center">
          <Col sm="auto" xs="auto">
            <Image
              className="Avatar"
              src={info.user.avatarMedium}
              roundedCircle
            />
          </Col>
        </Row>

        <Row className="justify-content-center my-3">
          <Col sm="auto" xs="auto">
            <div className="userName text-center">{info.user.nickname}</div>
            <div className="userNickName text-center pb-3">{`@${info.user.uniqueId}`}</div>
            {info.user.signature ? (
              <div className="userSignature py-3 px-4">
                {info.user.signature}
              </div>
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

        <UserFeed feed={currentPosts} loading={loading} />

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
      </Container>
    );
  }
}
