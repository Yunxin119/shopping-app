import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { useUpdateUserMutation, useGetUserDetailQuery } from '../../slices/usersApiSlice';
import { LinkContainer } from 'react-router-bootstrap'

const EditUser = () => {
    const navigate = useNavigate();
    const { id: userId } = useParams();
    const [username, setUsername] = useState("")
    const [email, setEmail ] = useState("")
    const [isAdmin, setIsAdmin] = useState(false);

    const {
        data: user,
        isLoading,
        refetch,
        error,
    } = useGetUserDetailQuery(userId);

    const [updateUser, {isLoading: updateLoading, error: updateError}] = useUpdateUserMutation();

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            await updateUser({
                userId, username, email, isAdmin
            });
            toast.success('User updated');
            refetch();
            navigate('/admin/userlist');
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }

    useEffect(() => {
        if(user) {
            setUsername(user.username);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user])
  return (
    <>
        <LinkContainer to='/admin/userlist' className = 'custom-link my-3'><p>&lt;&nbsp; Go Back</p></LinkContainer>
        <FormContainer>
            <h2>Edit User</h2>
            {updateLoading && <Loader />}
            {
            isLoading ? (<Loader />)
            : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>)
            : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='username' className='my-2'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email' className='my-2'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2' controlId='isadmin'>
                        <Form.Check
                            type='checkbox'
                            label='Is Admin'
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        ></Form.Check>
                    </Form.Group>
                    <Button className='btn button-full my-3' onClick={submitHandler}>Save Changes</Button>
                </Form>
            )
            }
        </FormContainer>
    </>
  )
}

export default EditUser
