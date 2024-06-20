import React from 'react'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { toast } from 'react-toastify'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useGetAllProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/productsApiSlice'
import Message from '../../components/Message'
import Loader from '../../components/Loader'

const ProductList = () => {
    const { data: products, isLoading ,error, refetch } = useGetAllProductsQuery();

    const [createProduct, {isLoading: loadingCreate }] = useCreateProductMutation();

    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();
    const deleteProductHandler = async (id) => {
        if (window.confirm('Sure to delete this product?')) {
            try {
                await deleteProduct(id);
                refetch();
              } catch (err) {
                toast.error(err?.data?.message || err.error);
              }
        }
    }

    const createProductHandler = async() => {
        if (window.confirm('Sure to create product?')) {
            try {
                await createProduct();
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }
  return (
    <>
        <Row className='align-items-center'>
            <Col>
            <h1 className='my-3'>Products</h1>
            </Col>
            <Col className='text-end'>
            <Button className='btn-sm m-3 my-3' onClick={createProductHandler}>
                <FaPlus className='mx-1'/> New Product
            </Button>
            </Col>
        </Row>

        {loadingCreate && <Loader />}
        {loadingDelete && <Loader />}
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
