import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useGetProductDetailQuery, useCreateReviewMutation } from '../slices/productsApiSlice'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import {Row, Col, Image, ListGroup, Button, ListGroupItem, Form } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { addToCart } from '../slices/cartSlice'
import { toast } from 'react-toastify'

const ProductDetail = () => {
    const {id} = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const addToCartHandler = () => {
        dispatch(addToCart({...product, qty}))
        navigate('/cart')
    }

    const { data: product, isLoading, error, refetch } = useGetProductDetailQuery(id);

    const userInfo = useSelector((state) => state.auth);
    const [createReview, {isLoading: loadingReivew }] = useCreateReviewMutation();

    const submitReviewHandler = async(e) => {
        e.preventDefault()
        try {
            await createReview({
                productId: id,  
                rating,
                comment
            }).unwrap();
            refetch();
            toast.success('Thanks for your review!')
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

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
                </ListGroup.Item>

            </ListGroup>
        </Col>
    </Row>
    <Row className='review'>
        <Col md={6}>
            <h4>Reviews</h4>
            {product.reviews.length === 0 && <Message>No Reviews Yet</Message>}
            <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating rating={review.rating} />
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Col>
        <Col md={5} className='mx-4'>
            <h4>Write a review</h4>
            {loadingReivew && <Loader />}
            {!userInfo ? ( 
                <Message variant='danger'>
                    Please <Link to='/login'>Login</Link>
                </Message>)
            : (
                <Form onSubmit={submitReviewHandler}>
                    <Form.Group className='my-2'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                           as='select'
                           required
                           value={rating}
                           onChange={(e) => setRating(e.target.value)}
                         >
                           <option value=''>Select...</option>
                           <option value='1'>1 - Poor</option>
                           <option value='2'>2 - Fair</option>
                           <option value='3'>3 - Good</option>
                           <option value='4'>4 - Very Good</option>
                           <option value='5'>5 - Excellent</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                            as='textarea'
                            rows={5}
                            placeholder='Enter comment'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            style={{ resize: 'none', height: '150px', width: '100%' }}
                        ></Form.Control>
                    </Form.Group>
                    <Button
                         disabled={loadingReivew}
                         type='submit'
                         variant='primary'
                         className='button-full'
                       >
                         Submit
                    </Button>
                </Form>
            )}
        </Col>
    </Row>
    </>)}



    </>
  )
}

export default ProductDetail
