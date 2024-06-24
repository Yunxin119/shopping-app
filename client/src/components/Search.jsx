import React from 'react'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'


const Search = () => {
    const navigate = useNavigate();
    const { keyword: urlKeyword } = useParams();
    const [keyword, setKeyword ]=useState(urlKeyword || '');

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword) {
          navigate(`/search/${keyword.trim()}`);
        } else {
          navigate('/');
        }
    };

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
        <Form.Control
        type='search'
        className='mr-sm-2 ml-sm-5 search p-2'
        placeholder='Search...'
        aria-label="Search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        >
        </Form.Control>
        <Button type='submit' className='p-1.5 mx-1 search' variant='outline-success'> Search </Button>
    </Form>
  )
}

export default Search
