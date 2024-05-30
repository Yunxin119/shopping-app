import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

const Header = () => {
return (
    <header>
    <Navbar className='bg-primary' expand='lg' collapseOnSelect>
        <Container>
        <Navbar.Brand href='/' className='text-secondary'>Yunxin's</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
            <Nav.Link href='/cart'  className='text-secondary'>
                <FaShoppingCart /> Cart
            </Nav.Link>
            <Nav.Link href='/login' className='text-secondary'>
                <FaUser /> Log in
            </Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    </header>
);
};

 export default Header;