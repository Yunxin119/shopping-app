import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { savePaymentMethod } from '../slices/cartSlice'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'


const Payment = () => {
    const cart = useSelector((state)=>state.cart)
    const { shippingAddress} = cart;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        if (!shippingAddress) {
            navigate('/shipping')
        }
    }, [navigate,shippingAddress])
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder')
    }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <Form onSubmit={submitHandler}>
         <Form.Group>
           <Form.Label as='legend'>Select Method</Form.Label>
           <Col>
             <Form.Check
               className='my-2'
               type='radio'
               label='PayPal or Credit Card'
               id='PayPal'
               name='paymentMethod'
               value='PayPal'
               checked
               onChange={(e) => setPaymentMethod(e.target.value)}
             ></Form.Check>
           </Col>
         </Form.Group>

         <Button type='submit' variant='primary' className='my-3 center-button'>
           Continue
         </Button>
       </Form>
    </FormContainer>
  )
}

export default Payment
