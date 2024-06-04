import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductDetailQuery } from '../slices/productsApiSlice'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import {Row, Col, Image, ListGroup, Button, ListGroupItem } from 'react-bootstrap'

const ProductDetail = () => {
    const {id} = useParams();

    const { data: product, isLoading, error } = useGetProductDetailQuery(id);

  return (
    <>
    <Link className='btn btn-light my-3' to='/'>
        Home
    </Link>

    {isLoading ? (
        <h2>Loading...</h2>
    ) : 
    error ? (
        <div>{error?.data?.message || error.error}</div>
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
                    <Button id='add-to-cart' type='button' disabled={product.countInStock === 0}>
                        Add to Cart
                    </Button>
                    <select id='quantity-select' className='form-select'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </ListGroup.Item>

            </ListGroup>
        </Col>
    </Row>
    </>)}



    </>
  )
}

export default ProductDetail
