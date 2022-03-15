import { Nav, Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../../Context/auth-context';
import learnItLogo from '../../assets/logo.svg';
import logoutIcon from '../../assets/logout.svg';

const NavbarMenu = () => {
  const {
    logoutUser,
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const logout = () => {
    logoutUser();
  };

  return (
    <>
      <Navbar bg='primary' expand='lg'>
        <Container>
          <Link to='/dashboard'>
            <Navbar.Brand className='text-light'>
              <img
                src={learnItLogo}
                alt='learnItlogo'
                width='32'
                height='32'
                className='me-2'
              />
              LearnIt
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle
            aria-controls='basic-navbar-nav'
            className='font-weight-border text-light'
          />

          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link
                className='font-weight-border text-light'
                to='/dashboard'
                as={Link}
              >
                Dashboard
              </Nav.Link>
              <Nav.Link
                className='font-weight-border text-light'
                to='/about'
                as={Link}
              >
                About
              </Nav.Link>
            </Nav>

            <Nav>
              <Nav.Link className='font-weight-border text-light' disabled>
                Welcome {username}
              </Nav.Link>
              <Button variant='secondary' onClick={logout}>
                <img
                  src={logoutIcon}
                  alt='logoutIcon'
                  width='24'
                  height='24'
                  className='me-2'
                />
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarMenu;
