import React from 'react'
import ParticlesBg from 'particles-bg';
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";
import { useState } from 'react';
import Axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
export default function Signup() {
//sign up functions
let navigate = useNavigate()
const [errorlist, seterrorlist] = useState([])
const [error, seterror] = useState('')
const [user, setuser] = useState({
  first_name:'',
 last_name:'',
 email:'',
 password:'',
 age:0
})
function getUserData(e){
  let newUser ={...user};
newUser[e.target.name] = e.target.value;
setuser(newUser)

}
//submit function
async function submitRigesterForm(e){
  e.preventDefault()
  let validationResult= validateRegister();
 if(validationResult.error){

  seterrorlist(validationResult.error.details)
 }
 else{
  let response = await Axios.post('https://route-egypt-api.herokuapp.com/signup',user)
if (response.data.message === 'success') {
  navigate('/login')
}
else{
  seterror(response.data.message)
}
}
 }

//joi validation
function validateRegister(){
  let schema =Joi.object({
    first_name:Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    last_name:Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password:Joi.string()
    .pattern(new RegExp('^[A-Z][a-z0-9]{3,30}')).required(),
    age:Joi.number().min(16).max(80).required()
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
   <ParticlesBg type="cobweb" bg={true} />
    <div className="main-form  mx-auto">
      <form onSubmit={submitRigesterForm}>
        {errorlist.map((error,i)=><div className="alert alert-danger" role="alert">{error.message}</div>)}
    
 {error ? <div className="alert alert-danger" role="alert">{error}</div>:''}

        <div className="row">
          <div className="col-md-6">
            
            <div className="form-group">
            <label htmlFor="first_name" className="form-label w-100">
          <input onChange={getUserData} type="text" className='form-control w-100' id='first_name' name='first_name' placeholder='Enter first name' />
        </label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
            <label htmlFor="last_name" className="form-label w-100">
          <input type="text" onChange={getUserData} className='form-control' id='last_name' name='last_name' placeholder='Enter last name' />
        </label>
            </div>
          </div>


        </div>
        
       
        <div className="form-group mb-2">
        <label htmlFor="email" className='d-block'>
          <input type="email" onChange={getUserData} className='form-control w-100' id='email' name='email' placeholder='Enter Your Email' />
        </label>
        </div>

        <div className="form-group mb-2">
        <label htmlFor="age" className='d-block'>
          <input type="number" onChange={getUserData} className='form-control w-100' id='age' name='age' placeholder='Enter Your Age' />
        </label>
        </div>

        <div className="form-group mb-2">
        <label htmlFor="password" className='d-block'>
          <input type="password"onChange={getUserData} className='form-control w-100' id='password' name='password' placeholder='Enter Your password' />
        </label>
        </div>

        <button  className="btn btn-info w-100 " type="submit" style={{backgroundColor:'gray', border:'none'}} ><span>Sign Up</span></button>
      </form>
    </div>
 

  </>
}
