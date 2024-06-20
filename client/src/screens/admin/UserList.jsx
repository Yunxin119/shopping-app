import React, { useState } from 'react'
import { FaTimes, FaCheck, FaEdit, FaTrash } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useGetAllUsersQuery } from '../../slices/usersApiSlice'
import Message from '../../components/Message'
import Loader from '../../components/Loader'


const UserList = () => {
    const { data: users, isLoading ,error } = useGetAllUsersQuery();
    const deleteUserHandler = () => {
        console.log('delete user handler')
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
        <Table className='table-md'>
            <thead>
                <th>ID</th>
               <th>USER</th>
               <th>EMAIL</th>
               <th>ADMIN</th>
               <th></th>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.isAdmin? (<FaCheck style={{ color: 'green' }} />) : (<FaTimes style={{ color: 'red' }} />) }</td>
                        <td>
                            {!user.isAdmin && (
                                <>
                                    <LinkContainer
                                        to={`/admin/user/${user._id}/edit`}
                                        style={{ marginRight: '10px' }}
                                    >
                                        <Button variant='light' className='btn-sm'>
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => deleteUserHandler(user._id)}
                                    >
                                        <FaTrash style={{ color: 'white' }} />
                                    </Button>
                                </>
                            )}
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

export default UserList
