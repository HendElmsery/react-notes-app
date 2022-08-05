import React from 'react'
//import ParticlesBg from 'particles-bg';
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";
import { useState } from 'react';
import Axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
export default function Login(props) {
//sign up functions
let navigate = useNavigate()
const [errorlist, seterrorlist] = useState([])
const [error, seterror] = useState('')
const [user, setuser] = useState({

 email:'',
 password:'',

})
function getUserData(e){
  let newUser ={...user};
newUser[e.target.name] = e.target.value;

setuser(newUser)

}
//submit function
async function submitloginForm(e){
  e.preventDefault()
  let validationResult= validateRegister();
 if(validationResult.error){

  seterrorlist(validationResult.error.details)
 }
 else{
  let response = await Axios.post('https://route-egypt-api.herokuapp.com/signin',user)

if (response.data.message === 'success') {
  localStorage.setItem('token',response.data.token)
  //call saveuser data function fro App
  props.saveUserdata()
  navigate('/home')
}
else{
  seterror(response.data.message)
}
}
 }

//joi validation
function validateRegister(){
  let schema =Joi.object({
 
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password:Joi.string()
    .pattern(new RegExp('^[A-Z][a-z0-9]{3,30}')).required(),
   
  })
  return schema.validate(user,{abortEarly:false})
}
// particles code
  // const particlesInit = async (main) => {
  
  //   await loadFull(main);
  // };

  // const particlesLoaded = (container) => {
  //   console.log(container);
  // };
  /////////////

  return <>
    <div className="main-form  mx-auto">
      <form onSubmit={submitloginForm}>
        {errorlist.map((error,i)=><div className="alert alert-danger" role="alert">{error.message}</div>)}
    
 {error ? <div className="alert alert-danger" role="alert">{error}</div>:''}

       
        
       
        <div className="form-group mb-2">
        <label htmlFor="email" className='d-block'>
          <input type="email" onChange={getUserData} className='form-control w-100' id='email' name='email' placeholder='Enter Your Email' />
        </label>
        </div>

      

        <div className="form-group mb-2">
        <label htmlFor="password" className='d-block'>
          <input type="password"onChange={getUserData} className='form-control w-100' id='password' name='password' placeholder='Enter Your password' />
        </label>
        </div>

        <button  className="btn btn-info w-100 " type="submit" style={{ border:'none'}} ><span>Login</span></button>
      </form>
    </div>
 

  </>
}
