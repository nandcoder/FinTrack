import { useContext } from 'react';
import { Avatar } from '@chakra-ui/react';
import { ButtonGroup, Container, Dropdown, Nav, Navbar, NavLink } from 'react-bootstrap';
import Profile from "./Authentication/Profile"
import { AuthContext } from './Authentication/AuthProvider';
import { Link } from 'react-router-dom';

function CollapsibleExample({ setPage }) {
    const { user } = useContext(AuthContext);
    return (
        <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
            <Container>
                <Navbar.Brand href='/'>FinTrack</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {user && (
                            <>
                                <NavLink>
                                    <Link to={'/'}>Home</Link>
                                </NavLink>
                                <NavLink>
                                    <Link to={'/user'}>User</Link>
                                </NavLink>
                                <NavLink>
                                    <Link to={'/transaction'}>Transaction</Link>
                                </NavLink>
                            </>
                        )}
                        <NavLink>
                            <Link to={'/community'}>Community</Link>
                        </NavLink>
                    </Nav>
                    {user && (
                        <Nav>
                            <Dropdown as={ButtonGroup} align={{ lg: 'end' }}>
                                <Avatar size='sm' bg="blue.500" />
                                <Dropdown.Toggle as={NavLink} split variant="success" id="dropdown-split-basic" />
                                <Dropdown.Menu style={{ padding: 0 }}>
                                    {/* <Dropdown.Item href="#/action-1">View Profile</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Friends</Dropdown.Item>
                                <Dropdown.Divider /> */}
                                    <Profile />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CollapsibleExample;