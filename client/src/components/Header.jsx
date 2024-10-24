import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Search from './Search';

const Header = () => {
    const state = useSelector((state) => state);
    const { cartItems } = state.cart;
    const { userInfo } = state.auth;

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [logoutApiCall] = useLogoutMutation();

   const logoutHandler = async () => {
     try {
       await logoutApiCall().unwrap();
       dispatch(logout());
       navigate('/login');
     } catch (err) {
       console.error(err);
     }
    }


return (
    <header>
    <Navbar className='custom-nav' expand='lg' collapseOnSelect>
        <Container>
        <LinkContainer to='/'>
            <Navbar.Brand className='custom-nav-txt'>Yunxin's</Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='w-100 d-flex align-items-center justify-content-between'>
            {/* Left Section */}
            <div className="d-flex align-items-center">
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

                {userInfo ? (
                <NavDropdown title={userInfo.username} id='username' className='custom-nav-txt'>
                    <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                    </NavDropdown.Item>
                </NavDropdown>
                ) : (
                <LinkContainer to='/login'>
                    <Nav.Link className='custom-nav-txt'>
                    <FaUser /> Log in
                    </Nav.Link>
                </LinkContainer>
                )}
                
                {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Manage' id='adminmenu' className='custom-nav-txt'>
                    <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                </NavDropdown>
                )}
            </div>

            {/* Centered Search Bar */}
            <div className="flex-grow-1 d-flex justify-content-end">
                <Search />
            </div>

            {/* Right Section */}
            <div className="d-none d-lg-flex"></div>
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    </header>

);
};

 export default Header;