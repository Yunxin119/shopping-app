import React from 'react'
import { FaTimes, FaCheck, FaEdit, FaTrash } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useGetAllProductsQuery } from '../slices/productsApiSlice'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductList = () => {
    const { data: products, isLoading ,error } = useGetAllProductsQuery();
    const deleteProductHandler = () => {
        console.log('delete product handler')
    }
  return (
    <>
    {isLoading ? (
        <Loader />
    ) 
    : error ? (
        <Message variant='danger'>{error?.data?.message || error.error }</Message>
    ) 
    : (
        <Table className='table-md my-3'>
            <thead>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                            <LinkContainer
                                to={`/admin/product/${product._id}/edit`}
                                style={{ marginRight: '10px' }}
                            >
                                <Button variant='light' className='btn-sm'>
                                    <FaEdit />
                                </Button>
                            </LinkContainer>
                            <Button
                                variant='danger'
                                className='btn-sm'
                                onClick={() => deleteProductHandler(product._id)}
                            >
                                <FaTrash style={{ color: 'white' }} />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
    }
    </>
  )
}

export default ProductList
