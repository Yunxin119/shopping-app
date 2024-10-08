import React from 'react'
import { useState } from 'react'
import {Form, Button} from  'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../slices/cartSlice'
import CheckoutSteps from '../components/CheckoutSteps'

const Shipping = () => {

    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart;
    const [address, setAddress] = useState(shippingAddress?.address || '')
    const [city, setCity] = useState(shippingAddress?.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '')
    const [country, setCountry] = useState(shippingAddress?.country || '')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const saveShippingAddressHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address, city, postalCode, country}));
        navigate('/payment')
    }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 />
       <h1>Shipping</h1>
       <Form onSubmit={saveShippingAddressHandler}>
         <Form.Group className='my-2' controlId='address'>
           <Form.Label>Address</Form.Label>
           <Form.Control
             type='text'
             placeholder='Enter address here'
             value={address}
             required
             onChange={(e) => setAddress(e.target.value)}
           ></Form.Control>
         </Form.Group>

         <Form.Group className='my-2' controlId='city'>
           <Form.Label>City</Form.Label>
           <Form.Control
             type='text'
             placeholder='Enter city here'
             value={city}
             required
             onChange={(e) => setCity(e.target.value)}
           ></Form.Control>
         </Form.Group>

         <Form.Group className='my-2' controlId='postalCode'>
           <Form.Label>Postal Code</Form.Label>
           <Form.Control
             type='text'
             placeholder='Enter postal code here'
             value={postalCode}
             required
             onChange={(e) => setPostalCode(e.target.value)}
           ></Form.Control>
         </Form.Group>

         <Form.Group className='my-2' controlId='country'>
           <Form.Label>Country</Form.Label>
           <Form.Control
             type='text'
             placeholder='Enter country here'
             value={country}
             required
             onChange={(e) => setCountry(e.target.value)}
           ></Form.Control>
         </Form.Group>

         <Button type='submit' variant='primary' className='my-4 d-flex center-button'>
           Continue
         </Button>
       </Form>
     </FormContainer>
  )
}

export default Shipping
