import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Signup from './components/register/Signup';
import Login from './components/Login/Login';
import { useState, useEffect } from 'react';
import { ThemeProvider } from './ThemeContext';

// import jwtDecode from 'jwt-decode'; // Don't use this with Reqres tokens

function App() {
  const navigate = useNavigate();
  const [userdata, setuserdata] = useState(null);

  function saveUserdata() {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData')
    console.log(token +"tttkotnttnnt")
    if (token) {
      // Just store the token or a dummy user (Reqres token is not decodable)
      setuserdata( {userData} );
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      saveUserdata();
    }
  }, []);

  function ProtectedRoute({ children }) {
    if (!localStorage.getItem('token')) {
      return <Navigate to="/login" />;
    }
    return children;
  }

  function logOut() {
    setuserdata(null);
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <>
    <ThemeProvider>
      <Navbar logOut={logOut} userdata={userdata} />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login saveUserdata={saveUserdata} />} />
        <Route path="*" element={<div className="text-center mt-5 text-white">ERROR 404!</div>} />
      </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
