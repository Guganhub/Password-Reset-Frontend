import React, { useState } from "react";
import styles from './auth.module.scss'
import {MdPassword} from 'react-icons/md';
import Card from '../../components/card/Card'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useParams } from "react-router-dom";
import { resetPassword } from "../../services/authService";
import { toast } from "react-toastify";



const initialState ={
 
    password:'',
    password2 :'',
    
  }


const Reset = ()=>{
    const [formData,setformData] = useState(initialState)
    const {password, password2} = formData
  
    const {resetToken} = useParams()
  
    const handleInputChange =(e)=>{
      const {name, value} = e.target;
      setformData({...formData, [name]:value})
    }
    const reset = async(e)=>{
      e.preventDefault()
    //   console.log(formData)
    //   console.log(resetToken)
  
      if(password.length<6){
        return toast.error('Password must be more than 6 characters')
      }
      if(password !== password2){
        return toast.error('New password and confirm password does not match')
      }
      const userData ={
        password,
        password2
      }
      try {
        const data = await resetPassword(userData, resetToken)
        // console.log(data)
        toast.success(data)
      } catch (error) {
          toast.error(error)
      }
    }




    return<div className={`container ${styles.auth}`}>
    {/* {isLoading && <Loader/>} */}
    <Card>
      <div className={styles.form}>
                <div className='--flex-center'>
                 <MdPassword size= {30} color = '#999'/>
                </div>
            <h2>Reset Password</h2>
     <Form onSubmit={reset}>
     <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="New Password" name='password' value={password} onChange={handleInputChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Confirm New Password"  name='password2' value={password2} onChange={handleInputChange} />
      </Form.Group>
      
      <Button type='submit' style={{padding:'1rem'}} className='--btn --btn-primary --btn-block' size='lg'>Reset Password</Button>
    </Form>
    <br></br>
    &nbsp;&nbsp;
      <span className={styles.links}>
       
        <Link style={{textDecoration:'none'}} to ='/login'>Login</Link>
      </span>
            
                
    </div>
        </Card>  
       
    </div>

}


export default Reset;