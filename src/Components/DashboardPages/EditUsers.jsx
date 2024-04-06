import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditUsers = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
 
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://www.helpingbrother.in/bettingUser/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setUserData(prevData => ({ ...prevData, [name]: checked }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`https://www.helpingbrother.in/bettingUser/updateStatus`, {
        Id: parseInt(id),
        ActiveStatus: userData.ActiveStatus,
        Authorize: userData.Authorize
      });
  
      // Check if the request was successful
      if (response.status === 200 && response.data.success) {
        // Show success message using SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User data updated successfully'
        }).then(() => {
            // Reload the window after the SweetAlert is closed
            window.location.reload();
          });
      } else {
        // Show error message using SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message || 'An error occurred while updating user data'
        });
      }
  
      console.log('User data updated successfully');
    } catch (error) {
      console.error('Error updating user data:', error);
      // Show error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating user data'
      });
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {userData && (
        <>
          <div className="wrapper-Adduser-section p-4">
            <div className="bg-white p-3">
              <h1 style={{ fontSize: '16px' }}>Edit User</h1>
            </div>
          </div>

          <div className="Wrapper-Edit-UserForm">
            <div className="container bg-white p-5">
              <div className="row">
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      UserName
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={userData.UserName}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                      Password
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                      value={userData.Password}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="mb-1 mt-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="authorizeCheckbox"
                      name="Authorize"
                      checked={userData.Authorize}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="authorizeCheckbox">
                      Authorize
                    </label>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="activeStatusCheckbox"
                      name="ActiveStatus"
                      checked={userData.ActiveStatus}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="activeStatusCheckbox">
                      ActiveStatus
                    </label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <button type="button" className="btn text-white Secondary" onClick={handleSubmit}>
                    Update <i class="fa-solid fa-arrow-right-to-bracket"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EditUsers;
