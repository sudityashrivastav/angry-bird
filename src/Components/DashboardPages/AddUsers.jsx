import { useEffect, useState } from 'react';
import './AddUser.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import AlluserList from './AlluserList';
import Swal from 'sweetalert2';

const AddUsers = () => {

const [formdata, SetFormdata] =useState({
  CreatedBy:'',
  UserName: '',
  Password: ''
})


useEffect(() => {
  // Get the data from sessionStorage
  const UserId = sessionStorage.getItem('UserId');


  // Update the state with the retrieved UserId
  SetFormdata(prevState => ({
    ...prevState,
    CreatedBy: UserId
  }));
}, []);

const HandleChange = (e)=>{
  SetFormdata({...formdata , [e.target.name]: e.target.value})
}


const HandleSubmit = async () => {
  try {
    const response = await axios.post('https://www.helpingbrother.in/insertUser', formdata);
    console.log("response", response);
    if (response.status === 201) {
      Swal.fire({
        icon: 'success',
        title: 'User Added',
        text: 'User added successfully.',
      }).then(() => {
        SetFormdata({
          UserName: '',
          Password: ''
        })
        // Close modal if needed
        // $('#staticBackdrop').modal('hide');
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: response.data.error || 'An error occurred while adding user.',
      });
    }
  } catch (error) {
    console.error('Error adding user:', error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'An error occurred while adding user.',
    });
  }
};

  return (
   <>
   
   <div className="wrapper-Adduser-section p-4">
    <div className="d-flex justify-content-between align-items-center bg-white p-3">
      <h1 style={{fontSize:'16px'}}>Add User</h1>
      <button className="btn text-white Secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Add user <i class="fa-solid fa-user-plus"></i></button>
    </div>
   </div>


   {/* <AlluserList/> */}
  



<>
  {/* Modal */}
  


  <div class="modal fade AdduserForm " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{zIndex:"10555"}}>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div className="modal-body">
        <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
  User Name
    </label>
    <input
      type="ematextil"
      className="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      name='UserName'
      value={formdata.UserName}
      onChange={((e)=>{HandleChange(e)})}
    />
   
  </div>
  
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Password
    </label>
    <input
      type="password"
      className="form-control"
      id="exampleInputPassword1"
      name='Password'
      value={formdata.Password}
      onChange={((e)=>{HandleChange(e)})}
    />
  </div>
 
</form>

        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={((e)=>{HandleSubmit()})}> Add <i className="fa-solid fa-arrow-right-to-bracket"></i></button>
      </div>
    </div>
  </div>
</div>
</>



   </>
  )
}

export default AddUsers;