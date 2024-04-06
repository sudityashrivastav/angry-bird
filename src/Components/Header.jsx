import React, { useEffect, useState } from 'react';
import './Allcss/Header.css'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Header = () => {

  const [userData, setUserData] = useState(null); // State to store user data
  const Navigate = useNavigate()

  useEffect(() => {
    // Retrieve user data from session storage
    const storedUserData = sessionStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);


  const handleLogout = (e) => {
    e.preventDefault()
    // Clear session storage
    sessionStorage.removeItem('userData');
    toast.success('Logout Sucessfully');
    // Navigate to another page
    Navigate('/')
    window.location.reload();
  };

  return (
    <>
    


    </>


  )
}

export default Header;
