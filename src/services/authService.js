


import  axios from 'axios';
import {toast} from 'react-toastify'



export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

export const validateEmail =(email)=>{
    return email.match( /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

// Register User
export const registerUser = async(userData)=>{
    try{
        const res = await axios.post(`${BACKEND_URL}/users/register`,userData,{withCredentials:true})
        if(res.statusText==='OK'){
            toast.success('User Registered Successfully')
        }
        return res.data;
    }
    catch(err){
        const message = (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
        toast.error(message)
    }
}

// Login User

export const loginUser = async(userData)=>{
    try{
        const res = await axios.post(`${BACKEND_URL}/users/login`,userData,{withCredentials:true})
        if(res.statusText==='OK'){
            toast.success('LoggedIn Successfully')
        }
        return res.data;
    }
    catch(err){
        const message = (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
        toast.error(message)
    }
}


export const logoutUser = async()=>{
    try{
        await axios.get(`${BACKEND_URL}/users/logout`)
        toast.success('logged out')
       
    }
    catch(err){
        const message = (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
        toast.error(message)
        console.log(err)
    }
}

//forgot password

export const forgotPassword = async(userData)=>{
    try{
        const res = await axios.post(`${BACKEND_URL}/users/forgotpassword`,userData,{withCredentials:true})
        if(res.statusText==='OK'){
            toast.success('Reset Email Sent')
        }
        
    }
    catch(err){
        const message = (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
        toast.error(message)
    }
}


// reset password

export const resetPassword = async(userData, resetToken)=>{
    try{
        const res = await axios.put(`${BACKEND_URL}/users/resetpassword/${resetToken}`, userData)

        // console.log(res.data)
        return res.data
    }
    catch(err){
        const message = (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
        toast.error(message)
        console.log(err)
    }
}