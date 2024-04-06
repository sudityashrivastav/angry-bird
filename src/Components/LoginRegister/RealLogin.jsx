import React, { useEffect } from 'react';
import './Login.css'
const Login = () => {

  useEffect(() => {
    openLoginInfo();
    setTimeout(closeLoginInfo, 1000);
    
    // Cleanup function for resize event listener
    return () => {
      window.removeEventListener('resize', closeLoginInfo);
    };
  }, []);

  const handleLogin = () => {
    closeLoginInfo();
    const inputs = document.querySelectorAll('#login_form input');
    let proceed = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        const span = input.parentNode.querySelector('span');
        span.classList.add('i-warning');
        span.style.display = 'block';
        proceed = false;
      }
    });

    if (proceed) {
      inputs.forEach(input => {
        const span = input.parentNode.querySelector('span');
        span.classList.remove('i-warning');
        span.classList.add('i-save');
        span.style.display = 'block';
      });
    }
  };

  const openLoginInfo = () => {
    document.querySelector('.b-form').style.opacity = '0.01';
    document.querySelector('.box-form').style.left = '-37%';
    document.querySelector('.box-info').style.right = '-37%';
  };

  const closeLoginInfo = () => {
    document.querySelector('.b-form').style.opacity = '1';
    document.querySelector('.box-form').style.left = '0px';
    document.querySelector('.box-info').style.right = '-5px';
  };

  window.addEventListener('resize', closeLoginInfo);

  return (
    <div className='box'>
      <div className='box-form'>
        <div className='box-login-tab'></div>
        <div className='box-login-title'>
          <div className='i i-login'></div>
          <h2>LOGIN</h2>
        </div>
        <div className='box-login'>
          <div className='fieldset-body' id='login_form'>
            <button onClick={openLoginInfo} className='b b-form i i-more' title='Mais Informações'></button>
            <p className='field'>
              <label htmlFor='user'>E-MAIL</label>
              <input type='text' id='user' name='user' title='Username' />
              <span className='i i-warning'></span>
            </p>
            <p className='field'>
              <label htmlFor='pass'>PASSWORD</label>
              <input type='password' id='pass' name='pass' title='Password' />
              <span className='i i-close'></span>
            </p>
            <label className='checkbox'>
              <input type='checkbox' value='TRUE' title='Keep me Signed in' /> Keep me Signed in
            </label>
            <input type='submit' id='do_login' value='GET STARTED' title='Get Started' onClick={handleLogin} />
          </div>
        </div>
      </div>
      <div className='box-info'>
        <p>
          <button onClick={closeLoginInfo} className='b b-info i i-left' title='Back to Sign In'></button>
          <h3>Need Help?</h3>
        </p>
        <div className='line-wh'></div>
        <button onClick={() => {}} className='b-support' title='Forgot Password?'> Forgot Password?</button>
        {/* <button onClick={() => {}} className='b-support' title='Contact Support'> Contact Support</button> */}
        <div className='line-wh'></div>
        <button onClick={() => {}} className='b-cta' title='Sign up now!'> CREATE ACCOUNT</button>
      </div>
    </div>
  );
};

export default Login;
