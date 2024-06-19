import React, { useEffect, useState } from 'react'
import { Table, Button, Form, Row, Col } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { toast } from 'react-toastify'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useProfileMutation } from '../slices/usersApiSlice'
import { setCredential } from '../slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice'
import { FaTimes } from 'react-icons/fa';

const Profile = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail ] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userInfo = useSelector((state) => state.auth)

    useEffect(() => {
        if (userInfo) {
            setUsername(userInfo.username);
            setEmail(userInfo.email);
        }
    }, [userInfo.username, userInfo.email])
    
    const { data: orders, isLoading, error } = useGetMyOrdersQuery();

    const [ updateProfile, {isLoading: loadingUpdateProfile }] = useProfileMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    username,
                    email,
                    password
                }).unwrap()
                dispatch(setCredential({ ...res }));
                toast.success('User update successfully')
            } catch (error) {
                toast.error(error?.data?.message || error.error || JSON.stringify(error))
            }
        }
    }
    
  return (
    <Row>
       <Col md={8}>
         <h2 className='my-3'>My Orders</h2>
         {isLoading ? (
           <Loader />
         ) : error ? (
           <Message variant='danger'>
             {error?.data?.message || error.error}
           </Message>
         ) : (
            <div className='order-table'>
                <Table striped table hover responsive className='table-md my-2'>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>$ {order.totalPrice}</td>
                    <td>
                        {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                        ) : (
                        <FaTimes style={{ color: 'red' }} />
                        )}
                    </td>
                    <td>
                        {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                        ) : (
                        <FaTimes style={{ color: 'red' }} />
                        )}
                    </td>
                    <td>
                        <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                            Details
                        </Button>
                        </LinkContainer>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            </div>


         )}
       </Col>
       <Col md={3} className='mx-4'>
         <h2 className='my-3'>Update Profile</h2>

         <Form onSubmit={submitHandler} className='my-3'>
           <Form.Group className='my-2' controlId='username'>
             <Form.Label>Username</Form.Label>
             <Form.Control
               type='username'
               placeholder='Enter username'
               value={username}
               onChange={(e) => setUsername(e.target.value)}
             ></Form.Control>
           </Form.Group>

           <Form.Group className='my-2' controlId='email'>
             <Form.Label>Email Address</Form.Label>
             <Form.Control
               type='email'
               placeholder='Enter email'
               value={email}
               onChange={(e) => setEmail(e.target.value)}
             ></Form.Control>
           </Form.Group>

           <Form.Group className='my-2' controlId='password'>
             <Form.Label>Password</Form.Label>
             <Form.Control
               type='password'
               placeholder='Enter password'
               value={password}
               onChange={(e) => setPassword(e.target.value)}
             ></Form.Control>
           </Form.Group>

           <Form.Group className='my-2' controlId='confirmPassword'>
             <Form.Label>Confirm Password</Form.Label>
             <Form.Control
               type='password'
               placeholder='Confirm password'
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
             ></Form.Control>
           </Form.Group>

           <Button type='submit' variant='primary button-full my-3'>
             Update
           </Button>
         </Form>
       </Col>
     </Row>
   
  )
}

export default Profile
