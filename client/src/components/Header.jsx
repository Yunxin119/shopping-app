import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
return (
    <header>
    <Navbar className='custom-nav' expand='lg' collapseOnSelect>
        <Container>
            <LinkContainer to='/'>
                <Navbar.Brand className='custom-nav-txt'>Yunxin's</Navbar.Brand>
            </LinkContainer>
            
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ms-auto'>
                    <LinkContainer to='/cart'>
                        <Nav.Link className='custom-nav-txt'>
                            <FaShoppingCart /> Cart
                        </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/login'>
                        <Nav.Link className='custom-nav-txt'>
                            <FaUser /> Log in
                        </Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    </header>
);
};

 export default Header;