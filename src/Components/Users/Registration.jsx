import React, { useState } from 'react'

const Registration = () => {
const [FormData, SetFormData] =useState({
    Email: "",
    Passwrod
})



  return (
    <>
 <div className="UserRegister-Wraper">
        <div className="container">
            <div className="col-lg-12">
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
      Email address
    </label>
    <input
      type="email"
      className="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      name=''
    />
    <div id="emailHelp" className="form-text">
      We'll never share your email with anyone else.
    </div>
  </div>
  </div>
  <div className="col-lg-12">

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Password
    </label>
    <input
      type="password"
      className="form-control"
      id="exampleInputPassword1"
    />
  </div>
  </div>
  
  <div className="col-lg-12">

  <button type="submit" className="btn btn-primary">
    Submit
  </button>
  </div>
  </div>
  </div>
    </>
  )
}

export default Registration;
