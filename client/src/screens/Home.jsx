import React from 'react'
import { useEffect, useState } from 'react'
import {Row, Col} from 'react-bootstrap'
import Loader from '../components/Loader'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Message from '../components/Message'
import { Link, useParams } from 'react-router-dom'
import ProductCarousel from '../components/ProductCarousel'
import Page from '../components/Page'

const Home = () => {
  const {keyword, pageNumber} = useParams();
  const { data, isLoading, error } = useGetProductsQuery({keyword, pageNumber});


  return (
    <>
    {keyword ? (
      <Link to='/' className='btn btn-light my-3'>Go back</Link>
    ) : (
      <ProductCarousel />
    )}
    {isLoading ? (
      <Loader /> 
    ): error ? (
      <Message variant='danger'>{error?.data?.message || error.error}</Message>
    ) : (
      <>
        <h2 className='txt-head'>Latest Products</h2>
        <Row>
            {data.products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
            </Col>
            ))}
        </Row>
        <Page pages={data.pages} page={data.page} keyword={keyword? keyword : ''}/>
      </>
    )}
    </>
  )
}

export default Home
