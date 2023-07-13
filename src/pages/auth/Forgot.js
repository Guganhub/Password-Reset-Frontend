import React, { useState } from "react";
import styles from './auth.module.scss'
import {AiOutlineMail} from 'react-icons/ai';
import Card from '../../components/card/Card'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword, validateEmail } from "../../services/authService";


const Forgot = ()=>{

    const [email,setEmail] = useState('')
    const forgot = async(e)=>{
        e.preventDefault()
        if( !email){
          // alert('hi')
          return toast.error('Please enter an Email')
          
        }
        if(!validateEmail(email)){
          return toast.error('Please enter a valid Email')
        }
    
        const userData ={
          email,
          
        };
        await forgotPassword(userData)
        setEmail('')
      }


    return<div className={`container ${styles.auth}`}>
    {/* {isLoading && <Loader/>} */}
    <Card>
      <div className={styles.form}>
                <div className='--flex-center'>
                 <AiOutlineMail size= {30} color = '#999'/>
                </div>
            <h2>Forgot Password</h2>
     <Form onSubmit={forgot}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        
      </Form.Group>

      
      
      <Button type='submit' style={{padding:'1rem'}} className='--btn --btn-primary --btn-block' size='lg'>Get Reset Email</Button>
    </Form>

    <div className={styles.links}>
        {/* <p>
        <Link style={{textDecoration:'none'}} to='/'>-Register</Link>
        </p> */}
        <p>
        <Link style={{textDecoration:'none'}} to ='/login'>-Login</Link>
        </p>
      </div>
            
                
    </div>
        </Card>  
       
    </div>

}


export default Forgot;