import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_LOGIN, selectName } from "../redux/features/auth/authSlice";
import Button from "react-bootstrap/esm/Button";
import { logoutUser } from "../services/authService";
import { useNavigate } from "react-router-dom";





const Dashboard = ()=>{

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const name =useSelector(selectName)


    const logout = async()=>{
        await logoutUser();
        await dispatch(SET_LOGIN(false))
        navigate('/login')
      }
    return(
        <div className='--pad header'>
        <div className='--flex-between'>
        <h3>
           <span className='--fw-thin'>Welcome, </span>
           <span className='--color-danger'>{name}</span> 
        </h3>    
        <Button className='--btn' variant='danger'size='lg' onClick={logout}>Logout</Button>      

        </div>   

        <hr/>   
    </div>
    )
}

export default Dashboard