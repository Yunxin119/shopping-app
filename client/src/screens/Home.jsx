import React from 'react'
import { useEffect, useState } from 'react'
import {Row, Col} from 'react-bootstrap'
import Loader from '../components/Loader'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Message from '../components/Message'

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();


  return (
    <>
    {isLoading ? (
      <Loader /> 
    ): error ? (
      <Message variant={danger}>{error?.data?.message || error.error}</Message>
    ) : (
      <>
        <h2 className='txt-head'>Latest Products</h2>
        <Row>
            {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
            </Col>
            ))}
        </Row>
      </>
    )}
    </>
  )
}

export default Home
