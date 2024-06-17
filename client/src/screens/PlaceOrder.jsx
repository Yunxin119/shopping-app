import React, { useEffect } from 'react'
import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice'
import CheckoutSteps from '../components/CheckoutSteps';


const PlaceOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state)=> state.cart)
    const [createOrder, {isLoading, error}] = useCreateOrderMutation();

    useEffect(() => {
        if(!cart.shippingAddress.address) {
            navigate('/shipping')
        } else if (!cart.paymentMethod) {
            navigate('/payment')
        }
    }, [navigate, cart.shippingAddress.address, cart.paymentMethod])

    const placeOrderHandler = async() => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                taxPrice: cart.taxPrice,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`)
        } catch (error) {
            toast.error(error)
        }
    }
  return (
    <>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
         <Col md={8}>
            <Card className='payment-left'>
                <ListGroup variant='flush' >
                <ListGroup.Item>
                <h3 className='payment-head'>Shipping</h3>
                <p>
                    <strong className='payment-head'>Address:</strong>
                    {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                    {cart.shippingAddress.postalCode},{' '}
                    {cart.shippingAddress.country}
                </p>
                </ListGroup.Item>

                <ListGroup.Item>
                <h3 className='payment-head'>Payment Method</h3>
                <strong className='payment-head'>Method: </strong>
                {cart.paymentMethod}
                </ListGroup.Item>

                <ListGroup.Item>
                <h3 className='payment-head'>Order Items</h3>
                {cart.cartItems.length === 0 ? (
                    <Message>Your cart is empty</Message>
                ) : (
                    <ListGroup variant='flush'>
                    {cart.cartItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                        <Row>
                            <Col md={1}>
                            <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                            />
                            </Col>
                            <Col>
                            <Link to={`/product/${item.product}`}>
                                {item.name}
                            </Link>
                            </Col>
                            <Col md={4}>
                            ${item.qty * item.price}
                            </Col>
                        </Row>
                        </ListGroup.Item>
                    ))}
                    </ListGroup>
                )}
                </ListGroup.Item>
            </ListGroup>
            </Card>

         </Col>
         <Col md={4}>
           <Card className='payment-right'>
             <ListGroup variant='flush'>
               <ListGroup.Item>
                 <h3 className='payment-head'>Order Summary</h3>
               </ListGroup.Item>
               <ListGroup.Item>
                 <Row>
                   <Col className='payment-head'><b>Items:</b></Col>
                   <Col>${cart.itemPrice}</Col>
                 </Row>
               </ListGroup.Item>
               <ListGroup.Item>
                 <Row>
                   <Col className='payment-head'><b>Shipping:</b></Col>
                   <Col>${cart.shippingPrice}</Col>
                 </Row>
               </ListGroup.Item>
               <ListGroup.Item>
                 <Row>
                   <Col className='payment-head'><b>Tax:</b></Col>
                   <Col>${cart.taxPrice}</Col>
                 </Row>
               </ListGroup.Item>
               <ListGroup.Item>
                 <Row>
                   <Col className='payment-head'><b>Total:</b></Col>
                   <Col>${cart.totalPrice}</Col>
                 </Row>
               </ListGroup.Item>
               <ListGroup.Item>
                 {error && <Message variant='danger'>{error}</Message>}
               </ListGroup.Item>
               <ListGroup.Item>
                 <Button
                   type='button'
                   className='button-full'
                   disabled={cart.cartItems === 0}
                   onClick={placeOrderHandler}
                 >
                   Place Order
                 </Button>
                 {isLoading && <Loader />}
               </ListGroup.Item>
             </ListGroup>
           </Card>
         </Col>
       </Row>
    </>
  )
}

export default PlaceOrder
