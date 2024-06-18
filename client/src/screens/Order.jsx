import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';

const Order = () => {
    const { id: orderId } = useParams();
    const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);

  return (
    <>
    {isLoading ? (
        <Loader />
    )
    : error ? (
        <Message variant='danger'>{error?.data?.message || error.message || JSON.stringify(error)}</Message>
    )
    : (
        <>
        <h1>Order Details</h1>
        <Row>
            <Col md={8}>
                <Card className='payment-left'>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                        <h3 className='payment-head'>Shipping</h3>
                        <p>
                            <strong className='payment-head'>Address: </strong>
                            {order.user.username}
                        </p>
                        <p>
                            <strong className='payment-head'>Email: </strong>
                            {order.user.email}
                        </p>
                        <p>
                            <strong className='payment-head'>Address: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                            {order.shippingAddress.postalCode},{' '}
                            {order.shippingAddress.country}
                        </p>
                        { order.isDelivered? (
                            <Message variant='success'>Delivered</Message>
                        ) : (
                            <Message variant='danger'>Not Delivered</Message>
                        )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                        <h3 className='payment-head'>Payment Method</h3>
                        <p>
                            <strong className='payment-head'>Method: </strong>
                            {order.paymentMethod}
                        </p>

                        { order.isPaid? (
                            <Message variant='success'>Paid</Message>
                        ) : (
                            <Message variant='danger'>Not Paid</Message>
                        )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                        <h3 className='payment-head'>Order Items</h3>
                        {order.orderItems.length === 0 ? (
                            <Message>Your order is empty</Message>
                        ) : (
                            <ListGroup variant='flush'>
                            {order.orderItems.map((item, index) => (
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
                                    <Link to={`/product/${item.product}`} className='custom-link'>
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
                        <Col>${order.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                        <Col className='payment-head'><b>Shipping:</b></Col>
                        <Col>${order.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                        <Col className='payment-head'><b>Tax:</b></Col>
                        <Col>${order.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                        <Col className='payment-head'><b>Total:</b></Col>
                        <Col>${order.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {error && <Message variant='danger'>{error}</Message>}
                    </ListGroup.Item>
                    {/* <ListGroup.Item>
                        <Button
                        type='button'
                        className='button-full'
                        disabled={order.orderItems === 0}
                        onClick={placeOrderHandler}
                        >
                        Place Order
                        </Button>
                        {isLoading && <Loader />}
                    </ListGroup.Item> */}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </>
    )}
    </>

  )
}

export default Order
