import { Badge, Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
    const state = useSelector((state) => state);
    const { cartItems } = state.cart;

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
                            {cartItems.length > 0 && 
                                <Badge pill bg='danger' style={{marginLeft:'3px'}}>
                                    {cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
                                </Badge>
                            }
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