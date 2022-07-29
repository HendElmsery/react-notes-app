import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Routes,Route, Navigate,useNavigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Signup from './components/register/Signup';
import Login from './components/Login/Login';
import { useState,useEffect } from 'react';
import jwtDecode from 'jwt-decode';

function App() {
  let navigate = useNavigate()
  const [userdata, setuserdata] = useState(null);
  function saveUserdata(){
    let encoded = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encoded);
    setuserdata(decodedToken)
    console.log(decodedToken);
  }
  useEffect(() => {
    return()=>{
  if(localStorage.getItem('userToken')){
    saveUserdata()
  }
}
    
  }, [])
  
  function PrtectodRoute(props){
    if(localStorage.getItem('userToken')=== null){
      return <Navigate to='/login'/>
    }
    else{
      return props.children
    }
  }
  function logOut(){
    setuserdata(null);
    localStorage.removeItem('userToken')
    navigate('/login')
  }
  return  <>
 <Navbar logOut={logOut} userdata ={userdata}/>
 <Routes>
 <Route path='' element={<PrtectodRoute><Home /></PrtectodRoute>}/>
<Route path='home' element={<PrtectodRoute><Home /></PrtectodRoute>}/>
<Route path='Signup' element={<Signup/>}/>
<Route path='login' element={<Login saveUserdata={saveUserdata}/>}/>
{/* <Route path='*' element={<PrtectodRoute><div className='text-center mt-5 text-white'>ERROR 404!</div></PrtectodRoute>}/> */}
 </Routes>
 </>
}

export default App;
