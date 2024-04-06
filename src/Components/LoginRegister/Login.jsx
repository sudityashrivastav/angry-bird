
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
   
    UserName: "",
    Password: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userData = sessionStorage.getItem('UserId');
    if (userData) {
      // If UserId exists in sessionStorage, redirect to /NewMatches
      navigate('/NewMatches');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    navigate('/NewMatches');
    try {
    
          const response = await axios.post('https://www.helpingbrother.in/login',formData)
          // console.log("Login",response);
        sessionStorage.setItem('UserId', response.data.id);

        setFormData({
          UserName: '',
        Password: ''
      })
      navigate('/NewMatches');

      }
   
     catch (error) {
      toast.error('This Credential is not Authorize')
      
    }
  };

  return (
    <>
      <div className="LoginWrapper">
        <div className='box'>
          <div className='box-form'>
            <div className='box-login-tab'></div>
            <div className='box-login-title'>
              <div className='i i-login'></div>
              <h2>LOGIN</h2>
            </div>
            <div className='box-login'>
              <form className='fieldset-body' id='login_form' onSubmit={handleFormSubmit}>
                <button className='b b-form i i-more' title='Mais Informações'></button>
                <p className='field'>
                  <label htmlFor='user'>UserName</label>
                  <input type='text' id='user' name='UserName' value={formData.UserName} onChange={handleChange} title='Username' />
                  <span className='i i-warning'></span>
                </p>
                <p className='field'>
                  <label htmlFor='pass'>PASSWORD</label>
                  <input type='Password' id='pass' value={formData.Password} name='Password' onChange={handleChange} title='Password' />
                  <span className='i i-close'></span>
                </p>
               
                <input type='submit' id='do_login' value='Login' title='Login' />
              </form>
            </div>
          </div>
          <div className='box-info' style={{ display: 'none' }}>
            <p>
              <button className='b b-info i i-left' title='Back to Sign In'></button>
              <h3>Need Help?</h3>
            </p>
            <div className='line-wh'></div>
            <button onClick={() => {}} className='b-support' title='Forgot Password?'> Forgot Password?</button>
            <div className='line-wh'></div>
            <button onClick={() => {}} className='b-cta' title='Sign up now!'> CREATE ACCOUNT</button>
          </div>

        </div>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
};

export default Login;
