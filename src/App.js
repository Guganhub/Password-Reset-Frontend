
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Forgot from './pages/auth/Forgot';
import Reset from './pages/auth/Reset';
import axios from 'axios'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard';

axios.defaults.withCredentials = true;

function App() {
  return (
   <BrowserRouter>
   <ToastContainer/>
   <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forgot' element={<Forgot/>}/>
      <Route path='/resetpassword/:resetToken' element={<Reset/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>



   </Routes>
   
   </BrowserRouter>
  );
}

export default App;
