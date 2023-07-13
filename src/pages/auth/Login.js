import React, { useState } from "react";
import styles from './auth.module.scss'
import {BiLogIn} from 'react-icons/bi';
import Card from '../../components/card/Card'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser, validateEmail } from "../../services/authService";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";


const initialState = {
    email:"",
    password:"",
    
}


const Login = ()=>{
    const dispatch=useDispatch()
    const navigate =useNavigate()

    const [isLoading,setIsLoading] = useState(false)
    const [formData,setFormData]=useState(initialState)

    const {email,password} = formData

    const handleInputChange =(e)=>{
        const {name, value} = e.target;
        setFormData({...formData, [name]:value})
      }


      const  login = async (e)=>{
        e.preventDefault();
        console.log(formData)
        if( !email || !password){
          return toast.error('All fields are required')
        }
        if(!validateEmail(email)){
          return toast.error('Please enter a valid  Email')
        }
      
      const userData ={
        email,
        password
      };
      setIsLoading(true)
      try {
        const data = await loginUser(userData)
        console.log(data)
    
        await dispatch(SET_LOGIN(true))
        await dispatch(SET_NAME(data.name))
        navigate('/dashboard')
        
      } catch (error) {
        setIsLoading(false)
      }
    }


    return<div className={`container ${styles.auth}`}>
    {/* {isLoading && <Loader/>} */}
    <Card>
      <div className={styles.form}>
                <div className='--flex-center'>
                 <BiLogIn size= {30} color = '#999'/>
                </div>
            <h2>Login</h2>
     <Form onSubmit={login}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        
        <Form.Control type="email" placeholder="Enter email"required name ='email' value={email} onChange={handleInputChange} />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Password" required name = 'password'value={password} onChange={handleInputChange} />
      </Form.Group>
      
      <Button type='submit' style={{padding:'1rem'}} className='--btn --btn-primary --btn-block' size='lg'>Login</Button>
    </Form>
    <Link style={{textDecoration:'none'}} to='/forgot'>Forgot Password</Link>

      <span className={styles.register}>
       
        <p style={{margin:'1rem'}}>&nbsp;&nbsp; Dont have an account?&nbsp;&nbsp;</p>
        <Link style={{textDecoration:'none'}} to ='/'>Register</Link>
      </span>
            
                
    </div>
        </Card>  
       
    </div>

}


export default Login;