import React, { useState } from "react";
import styles from './auth.module.scss'
import {TiUserAddOutline} from 'react-icons/ti';
import Card from '../../components/card/Card'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link , useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import { registerUser, validateEmail } from "../../services/authService";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";



const initialState = {
    name:"",
    email:"",
    password:"",
    password2:""
}



const Register = ()=>{
    const dispatch=useDispatch()
    const navigate =useNavigate()

    const [isLoading,setIsLoading] = useState(false)
    const [formData,setFormData]=useState(initialState)

    const {name,email,password,password2} = formData


    const handleInputChange =(e)=>{
        const {name, value} = e.target;
        setFormData({...formData, [name]:value})
      }

      const register = async (e)=>{
        e.preventDefault()
        // console.log(formData)
       
        if(!name || !email || !password){
          return toast.error('All fields are required')
        }
        if(!validateEmail(email)){
          return toast.error('Please enter a valid Email')
        }
        if(password.length < 6 ){
          return toast.error('Password should be above 6 characters')
        }
        if(password !== password2){
          return toast.error('Password and Confirm Password should be same')
        }
        const userData = {
            name, email, password
          }
          setIsLoading(true)
          try{
            const data = await registerUser(userData)
            await dispatch(SET_LOGIN(true))
            await dispatch(SET_NAME(data.name))
            navigate('/dashboard')
            console.log(data)
          }
          catch(error){
            setIsLoading(false)
            console.log(error);
          }
    }


    return<div className={`container ${styles.auth}`}>
    {/* {isLoading && <Loader/>} */}
    <Card>
      <div className={styles.form}>
                <div className='--flex-center'>
                 <TiUserAddOutline size= {30} color = '#999'/>
                </div>
            <h2>Register</h2>
     <Form onSubmit={register}>
     <Form.Group className="mb-3" controlId="formBasicName">
        
        <Form.Control type="text" placeholder="Enter Name" required name='name' value={name} onChange={handleInputChange}/>
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        
        <Form.Control type="email" placeholder="Enter email" required name = 'email'value={email} onChange={handleInputChange}/>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Password" required name = 'password' value={password} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Confirm Password"required name='password2' value={password2} onChange={handleInputChange} />
      </Form.Group>
      
      <Button type='submit' style={{padding:'1rem'}} className='--btn --btn-primary --btn-block' size='lg'>Register</Button>
    </Form>

      <span className={styles.register}>
       
        <p style={{margin:'1rem'}}>&nbsp;&nbsp;Already have an account?&nbsp;&nbsp;</p>
        <Link style={{textDecoration:'none'}} to ='/login'>Login</Link>
      </span>
            
                
    </div>
        </Card>  
       
    </div>

}


export default Register;