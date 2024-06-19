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

const Profile = () => {
    const [name, setName] = useState("")
    const [email, setEmail ] = useState("")
    const [password, setPassword] = useState("")
    const [comfirmPassword, setComfirmPassword] = useState("")

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userInfo = useSelector((state) => state.auth)
    
  return (
    <div>
        
      
    </div>
  )
}

export default Profile
