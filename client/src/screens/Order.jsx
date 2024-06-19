import React, { useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'
import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPaypalClientIdQuery } from '../slices/ordersApiSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Order = () => {
    const { id: orderId } = useParams();
    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
    const [{isPending}, paypalDispatch] = usePayPalScriptReducer();
    const { data: paypal, isLoading: loadingPaypal, error: paypalError } = useGetPaypalClientIdQuery();
    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!paypalError && !loadingPaypal && paypal.clientId) {
          const loadPaypalScript = async () => {
            paypalDispatch({
              type: 'resetOptions',
              value: {
                'client-id': paypal.clientId,
                currency: 'USD',
              },
            });
            paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
          };
          if (order && !order.isPaid) {
            if (!window.paypal) {
              loadPaypalScript();
            }
          }
        }
      }, [paypalError, loadingPaypal, order, paypal, paypalDispatch]);

      function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
            try {
                await payOrder({
                    orderId, details
                });
                refetch();
                toast.success('Payment successful')
            } catch (error) {
                toast.error(error?.data?.message || error.error || JSON.stringify(error))
            }
        })
      }
      async function onApproveTest() {
        await payOrder({orderId, details: {payer: {}}});
        refetch();
        toast.success('Payment successful')
      }
      function onError(err) {
        toast.error(error.message)
      }
      
      function createOrder(data, actions) {
        return actions.order
          .create({
            purchase_units: [
              {
                amount: { value: order.totalPrice },
              },
            ],
          })
          .then((orderID) => {
            return orderID;
          });
      }
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

                    { !order.isPaid && (
                        <ListGroup.Item>
                            {loadingPay && <Loader />}
                            {isPending ? (<Loader />) : (
                                <div>
                                    {/* <Button onClick={onApproveTest} style={{marginBottom: '10px'}}>Test Pay Order</Button> */}
                                    
                                        <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError} />
                                    
                                </div>
                            )}
                        </ListGroup.Item>
                    )}
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
