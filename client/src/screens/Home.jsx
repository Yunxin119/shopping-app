import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
// import products from '../products'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'

const Home = () => {
  const [products, setProducts] = useState([])

  const fetchProducts = async() => {
    const {data} = await axios.get('/api/products');
    setProducts(data);
  };

  useEffect(()=>{
    fetchProducts();
  }, []);

  return (
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
  )
}

export default Home
