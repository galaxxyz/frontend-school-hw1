import './NavBar.css';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <Navbar bg="light" fixed="top">
      <Container>
        <Nav className="m-auto py-2">
          <Nav.Link>
            <Link to="/tiktuk/" className="navLink">
              Trending
            </Link>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
