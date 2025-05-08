import React, { useState } from "react";
import Axios from "axios";
import Joi from "joi";
import { useNavigate, Link } from "react-router-dom";

export default function Auth({ isLogin = false ,saveUserdata }) {
  const navigate = useNavigate();
  const [errorlist, setErrorList] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function getUserData(e) {
    const newUser = { ...user, [e.target.name]: e.target.value };
    setUser(newUser);
  }

  async function submitAuthForm(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setErrorList([]);

    const validationResult = validateForm();
    if (validationResult.error) {
      setErrorList(validationResult.error.details);
      setIsLoading(false);
      return;
    }

    try {
      console.log(user);
      const url = isLogin
        ? "https://reqres.in/api/login"
        : "https://reqres.in/api/register";

      const response = await Axios.post(
        url,
        {
          email: user.email,
          password: user.password,
        },
        {
          headers: { "x-api-key": "reqres-free-v1" },
        }
      );

      if (response.data?.token) {
        localStorage.setItem("userData", JSON.stringify(user.email)); // save user
        // console.log(JSON.stringify(user)+ "LOGGED IN")
        localStorage.setItem("token", response.data.token); // save token
        saveUserdata(user.email);
        
        navigate("/home");
      } else {
        setError("Authentication failed. Please try again.");
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  function validateForm() {
    const schema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
          "string.empty": "Email is required",
          "string.email": "Invalid email format",
        }),
      password: Joi.string().min(3).max(30).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 3 characters",
        "string.max": "Password must be no more than 30 characters",
      }),
    });

    return schema.validate(user, { abortEarly: false });
  }

  return (
   
        <div className="auth-container">
          <div className="auth-card">
            <h2 className="mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
            <form onSubmit={submitAuthForm}>
              {errorlist.map((err, i) => (
                <div key={i} className="alert alert-danger">{err.message}</div>
              ))}
              {error && <div className="alert alert-danger">{error}</div>}
      
              <div className="form-group mb-3">
                <input
                  onChange={getUserData}
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter your email"
                  value={user.email}
                />
              </div>
      
              <div className="form-group mb-3">
                <input
                  onChange={getUserData}
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter your password"
                  value={user.password}
                />
              </div>
      
              <button
                className="btn btn-primary w-100 mb-3"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
              </button>
      
              <div className="text-center">
                {isLogin ? (
                  <p>
                    Don&apos;t have an account? <Link to="/signup">Sign up</Link>
                  </p>
                ) : (
                  <p>
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      )
    

  
}
