import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Dash() {
  const [usersData, setUsersData] = useState([]);

  const dashboardTotalUsers = async () => {
    try {
      const response = await axios.get('https://www.helpingbrother.in/bettingAllUsers');
      console.log("response data", response.data);

      // Set the state to trigger re-rendering if needed
      setUsersData(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    dashboardTotalUsers();
  }, []);

  return (
    <>
    
    <div className="wrapper-Total-users">
    <div className="wrapper-Adduser-section p-3">
      
            <div className="bg-white p-3">
              <Link to='/'><i className='fa-solid fa-home'> Home</i></Link>
              <h1 style={{ fontSize: '16px' }}> Total User</h1>
            </div>
          </div>
    <div className='container ptb-plr mt-0'>
      {usersData.length > 0 ? (
        <>
        <div className="row bg-white p-4 align-items-center">
          <div className="col-lg-4 text-end">
          <div className="card text-center text-white bg-dark mb-3 broder-radius-14px" style={{ maxWidth: "13rem" }}>
   
    <div className="card-body">
    <h5 className="card-title"><i class="fa-solid fa-users"></i></h5>

      <h5 className="card-title">Total Users</h5>
      <h5 className="card-title">{usersData.length}</h5>
      
    </div>
  </div>
          </div>
          <div className="col-lg-4">
          <div className="card text-center text-white Ligt-blue mb-3 broder-radius-14px" style={{ maxWidth: "13rem" }}>
    {/* <div className="card-header"><i class="fa-solid fa-users"></i></div> */}
    <div className="card-body">
      <h5 className="card-title"><i class="fa-solid fa-user-tie"></i></h5>
    <h5 className="card-title">Authorize  Users</h5>
      <h5 className="card-title">{usersData.filter(user => user.Authorize === true).length}</h5>
     
    </div>
  </div>
          </div>
          <div className="col-lg-4">
          <div className="card text-center text-white bg-dark mb-3 broder-radius-14px" style={{ maxWidth: "13rem" }}>
    
    <div className="card-body">
    <h5 className="card-title"><i class="fa-regular fa-user"></i></h5>
    <h5 className="card-title">UnAuthorize Users</h5>

      <h5 className="card-title">{usersData.filter(user => user.Authorize === false).length}</h5>
      
    </div>
  </div>
          </div>
        </div>
        
     
        </>
      ) : (
        <h1>Oops! No data available.</h1>
      )}
    </div>
    </div>
  </>
  );
}

export default Dash;
