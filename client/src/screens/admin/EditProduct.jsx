import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { useUpdateProductMutation, useGetProductDetailQuery } from '../../slices/productsApiSlice'
import { LinkContainer } from 'react-router-bootstrap'

const EditProduct = () => {
    const navigate = useNavigate();
    const { id: productId } = useParams();
    const [name, setName] = useState("")
    const [price, setPrice ] = useState(0)
    const [image, setImage] = useState("")
    const [category, setCategory] = useState("")
    const [brand, setBrand] = useState("")
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const {
        data: product,
        isLoading,
        refetch,
        error,
    } = useGetProductDetailQuery(productId);

    const [updateProduct, {isLoading: updateLoading, error: updateError}] = useUpdateProductMutation();

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            await updateProduct({
                productId,
                name,
                price,
                image,
                category,
                brand,
                countInStock,
                description
            });
            toast.success('Product updated');
            refetch();
            navigate('/admin/productlist');
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }
    useEffect(() => {
        if(product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product])
  return (
    <>
        <LinkContainer to='/admin/productlist' className = 'custom-link my-3'><p>&lt;&nbsp; Go Back</p></LinkContainer>
        <FormContainer>
            <h2>Edit Product</h2>
            {updateLoading && <Loader />}
            {
            isLoading ? (<Loader />)
            : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>)
            : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className='my-2'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='price' className='my-2'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='brand' className='my-2'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter brand'
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='category' className='my-2'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='countInStock' className='my-2'>
                        <Form.Label>Count in stock</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter countInStock'
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='description' className='my-2'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as='textarea'
                            rows={3}
                            placeholder='Enter description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ resize: 'none', height: '100px', width: '100%' }}
                        ></Form.Control>
                    </Form.Group> 
                    {/* <Form.Group controlId='image' className='my-2'>
                        <Form.Label>image</Form.Label>
                        <Form.Control
                            type='image'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        ></Form.Control>
                    </Form.Group>  */}
                    <Button className='btn button-full my-3'>Save Changes</Button>
                </Form>
            )
            }
        </FormContainer>
    </>
  )
}

export default EditProduct
