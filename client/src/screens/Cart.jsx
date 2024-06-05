import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../slices/cartSlice';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';


const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({...product, qty}));
  }

  const removeFromCartHandler = async (product) => {
    dispatch(removeFromCart(product));
  }
  
  return (
    <Row>
      <Col md={9}>
        <h2 className='txt-head' style={{ marginBottom: '20px', marginTop: '20px' }}>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={5} className='item-col'>
                    <Link to={`/product/${item._id}`} className='custom-link cart-txt'>{item.name}</Link>
                  </Col>
                  <Col md={2} id='cart-price' className='item-col'>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                      className='cart-selector'
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button
                      type='button'
                      className='cart-delete'
                      variant='light'
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={3}>
        <Card id='cart-card'>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3 className='txt-head'>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </h3>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default Cart
