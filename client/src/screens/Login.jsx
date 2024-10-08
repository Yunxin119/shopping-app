import React from 'react'
import { useState, useEffect } from 'react'
import {Link, useLocation, useNavigate } from 'react-router-dom'
import {Form, Row, Col, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredential } from '../slices/authSlice'
import { toast } from 'react-toastify'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();
    const {userInfo} = useSelector((state) => state.auth)

    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    },[navigate, redirect, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredential({...res}));
            navigate(redirect)
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }
  return (
    <FormContainer className='my-5'>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className='my-3'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' placeholder='Enter your email here' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className='my-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Enter your password here' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='my-3' disabled={isLoading}>Sign In</Button>

        {isLoading && <Loader />}
      </Form>

      <Row className='py-3'>
        <Col>
        New customer? <Link to={ redirect ? `/register?redirect=${redirect}`: '/redirect'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default Login
