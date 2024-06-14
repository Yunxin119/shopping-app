import React from 'react'
import { useState, useEffect } from 'react'
import {Link, useLocation, useNavigate } from 'react-router-dom'
import {Form, Row, Col, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredential } from '../slices/authSlice'
import { toast } from 'react-toastify'

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, {isLoading}] = useRegisterMutation();
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
        if (password !== confirmPassword) {
            toast.error('Password do not match');
            return;
        } else {
            try {
                const res = await register({ username, email, password }).unwrap();
                dispatch(setCredential({...res}));
                navigate(redirect)
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }

    }
  return (
    <FormContainer className='my-5'>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='my-3'>
            <Form.Label>username</Form.Label>
            <Form.Control type='text' placeholder='Enter your username here' value={username} onChange={(e) => setUsername(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='email' className='my-3'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' placeholder='Enter your email here' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className='my-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Enter your password here' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword' className='my-3'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type='password' placeholder='Confirm your password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='my-3' disabled={isLoading}>Register</Button>

        {isLoading && <Loader />}
      </Form>

      <Row className='py-3'>
        <Col>
        Already have an account? <Link to={ redirect ? `/login?redirect=${redirect}`: '/login'}>Log in</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default Register
