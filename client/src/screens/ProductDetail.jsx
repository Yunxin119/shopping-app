import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useGetProductDetailQuery } from '../slices/productsApiSlice'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import {Row, Col, Image, ListGroup, Button, ListGroupItem, Form } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { addToCart } from '../slices/cartSlice'

const ProductDetail = () => {
    const {id} = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);

    const addToCartHandler = () => {
        dispatch(addToCart({...product, qty}))
        navigate('/cart')
    }

    const { data: product, isLoading, error } = useGetProductDetailQuery(id);
  return (
    <>
    <Link className='btn btn-light my-3' to='/'>
        Home
    </Link>

    {isLoading ? (
        <Loader />
    ) : 
    error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
    ) : (<>
        <Row>
        <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={6} >
            <ListGroup variant='flush' className='product-details'>
                <ListGroup.Item className='custom-list-group-item'>
                    <h3 id='product-detail-name'>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item className='custom-list-group-item'>
                    <Rating rating={product.rating} text={`${product.numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item className='custom-list-group-item'> 
                    <Row>
                        <Col>
                            <h3>${product.price}</h3>
                        </Col>
                        <Col>
                            <h6 id='stock'>
                                {product.countInStock >0 ? 'In Stock' : 'Out Of Stock' }
                            </h6>
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroupItem className='custom-list-group-item-down'>
                    <p className='product-description'>{product.description}</p>
                </ListGroupItem>
                <ListGroup.Item className='d-flex align-items-center custom-list-group-item-down'>
                    <Button id='add-to-cart' type='button' 
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}>
                        Add to Cart
                    </Button>
                    <Form.Control
                             as='select'
                             value={qty}
                             onChange={(e) => setQty(e.target.value)}
                             id='quantity-select' className='form-select'
                    >
                        {[...Array(product.countInStock).keys()].map((i)=> (
                            <option key = {i+1} value = {i+1}>{i+1}</option>
                        ))}
                    </Form.Control>
                    {/* <select >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select> */}
                </ListGroup.Item>

            </ListGroup>
        </Col>
    </Row>
    </>)}



    </>
  )
}

export default ProductDetail
