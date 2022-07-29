import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg  text-bg-dark">
            <div className="container ">
                <Link

                    className="navbar-brand text-bg-dark" to='/home'>
                    <i className="fa-solid fa-note-sticky"></i>
                    Notes</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                {props.userdata? 
                <>
              
               
                
                <span className='ms-auto'>Welcome {props.userdata.first_name}!
                
                <span onClick={props.logOut} className=' px-2 pointer log-out'>logout
                
                </span>
                </span>
                
                </>
                :
                      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                      <li className="nav-item dropdown">
                          <Link
                      
                              className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              Login
                          </Link>
                          <ul className="dropdown-menu ">
                              <li><Link
                      
                                  className="dropdown-item text-muted" to='/Signup'>Sign up</Link></li>
                              <li><Link
                      
                                  className="dropdown-item text-muted" to='/login'>Login</Link></li>
                          </ul>
                      </li>
                      
                      </ul>}
                   

                </div>
            </div>
        </nav>

    )
}
