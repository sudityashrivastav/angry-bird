
// import { Children, useState } from "react";
// import "../Allcss/Dashboard.css";
// import { Link } from "react-router-dom";


// const Dashboard = ({children}) => {
//     const [isActive, setActive] = useState(false);
//     const toggleclass = () => {
//       setActive(!isActive);
//     };
//     const [activeItem, setActiveItem] = useState(null);

//     const handleItemClick = (item) => {
//       if (activeItem === item) {
//         setActiveItem(null);
//       } else {
//         setActiveItem(item);
//       }
//     };
//   return (
//     <>
//         <section id="sidebar"  classNameName={isActive ? 'hide': null} >
//         <a href="#" className="brand">
//           <i className='bx bxs-smile'></i>
        
//         </a>
//         <ul className="side-menu top">
//           <li>
//             <a href="#" >
//               <i className='bx bxs-dashboard' ></i>
//               <Link to="/DashboardContent"  className={activeItem === 'dashboard' ? 'activeColor' : ''} onClick={() => handleItemClick('dashboard')}>Dashboard</Link>
//             </a>
//           </li>
//           <li>
//             <a href="#"  className={activeItem === 'myStore' ? 'activeColor' : ''} onClick={() => handleItemClick('myStore')}>
//               <i className='bx bxs-shopping-bag-alt' ></i><span className="text">My Store</span>
//             </a>
//           </li>
//           <li>
//             <a href="#" className={activeItem === 'analytics' ? 'activeColor' : ''} onClick={() => handleItemClick('analytics')}>
//               <i className='bx bxs-doughnut-chart' ></i>
//               <span className="text">Analytics</span>
//             </a>
//           </li><li >
//             <a href="#" className={activeItem === 'message' ? 'activeColor' : ''} onClick={() => handleItemClick('message')}>
//               <i className='bx bxs-message-dots' ></i>
//               <span className="text">Message</span>
//             </a>
//           </li>
//           <li >
//             <a href="#" className={activeItem === 'team' ? 'activeColor' : ''} onClick={() => handleItemClick('team')}>
//               <i className='bx bxs-group' ></i>
//               <span className="text">Team</span>
//             </a>
//           </li>
//         </ul>
//         <ul className="side-menu" >
//           <li >
//             <a href="#" className={activeItem === 'setup' ? 'activeColor' : ''} onClick={() => handleItemClick('setup')}>
//               <i className='bx bxs-cog' ></i>
//               <span className="text">Setup</span>
//             </a>
//           </li>
//           <li>
//             <a href="#"  className={activeItem === 'logout' ? 'activeColor' : ''} onClick={() => handleItemClick('logout')}>
//               <i className='bx bxs-log-out-circle' ></i>
//               <span className="text">Logout</span>
//             </a>
//           </li>
//         </ul>
//       </section>
     
     
//       <section id="content">
       
//        <nav>
//          <i  class='bx bx-menu'  onClick={toggleclass}  ></i>
        
//          <form action="#">
//            <div class="form-input">
//              <input type="search" placeholder="Search..." />
//              <button type="button" class="search-btn"><i class='bx bx-search' ></i></button>
//           <i class="fa-solid fa-bars"  onClick={toggleclass} ></i>

//            </div>
//          </form>
//          <a href="#" class="notification">
//            <i class='bx bxs-bell' ></i>
//            <span class="num">8</span>
//          </a>
//          <a href="#" class="profile">
//            <img src="https://secure.gravatar.com/avatar/d09eaad01aea86c51b4f892b4f8abf6f?s=100&d=wavatar&r=g" />
//          </a>
//        </nav>
//        {children}
      
//      </section>
//       </>
//   )
// }

// export default Dashboard;



import { Children, useState } from "react";
import "../Allcss/Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


const Dashboard = ({children}) => {
  const Navigate = useNavigate();
    const [activeItem, setActiveItem] = useState(null);

    const [isActive, setActive] = useState(false);
    const toggleClass = () => {
      setActive(!isActive);
    };
    const handleLogout = (e) => {
      e.preventDefault();
       
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log me out"
      }).then((result) => {
        if (result.isConfirmed) {
          // The "OK" button was clicked
          Navigate('/');
          sessionStorage.clear(); 
        } else {
          // The "Cancel" button was clicked, do nothing
        }
      });
    };
const handleItemClick = (item) => {
  if (activeItem === item) {
    setActiveItem(null);
   
  } else {
    setActiveItem(item);
  }
};
  return (
    <>
        <section id="sidebar"  className={isActive ? 'hide': null} >
        <a href="#" class="brand">
          <i class='bx bxs-smile'></i>
          {/* <span class="text" >Upcloud Global Solutions</span> */}
        </a>
        <ul class="side-menu top">
          <li class="">
            <a href="#" >
              <i class='bx bxs-dashboard' ></i>
              <Link to="/Dash" class="text" className={activeItem === 'dashboard' ? 'activeColor' : ''} onClick={() => handleItemClick('dashboard')} >Dashboard</Link>
            </a>
          </li>
          <li>
            <Link to="/AddUsers" href="#" className={activeItem === 'myStore' ? 'activeColor' : ''} onClick={(e) => handleItemClick('myStore')} >
              {/* <i class='bx bxs-shopping-bag-alt' ></i> */}
              <i class='bx bxs-user'></i>
              <span  class="text">Add User</span>
            </Link>
          </li>
          <li>
            <Link to="/AddUsers" href="#" className={activeItem === 'Logout' ? 'activeColor' : ''} onClick={(e) => handleLogout(e)} >
              {/* <i class='bx bxs-shopping-bag-alt' ></i> */}
              <i class='bx bxs-log-out-circle'></i>
              <span  class="text">Logout</span>
            </Link>
          </li>
          {/* <li>
            <a href="#"  className={activeItem === 'analytics' ? 'activeColor' : ''} onClick={() => handleItemClick('analytics')}>
              <i class='bx bxs-doughnut-chart' ></i>
              <span class="text">Analytics</span>
            </a>
          </li> */}
          {/* <li>
            <a href="#" className={activeItem === 'message' ? 'activeColor' : ''} onClick={() => handleItemClick('message')}>
              <i class='bx bxs-message-dots' ></i>
              <span class="text">Message</span>
            </a>
          </li> */}
          {/* <li>
            <a href="#" className={activeItem === 'team' ? 'activeColor' : ''} onClick={() => handleItemClick('team')}>
              <i class='bx bxs-group' ></i>
              <span class="text">Team</span>
            </a>
          </li> */}
        </ul>
        {/* <ul class="side-menu">
          <li>
            <a href="#" className={activeItem === 'setup' ? 'activeColor' : ''} onClick={() => handleItemClick('setup')}>
              <i class='bx bxs-cog' ></i>
              <span class="text">Setup</span>
            </a>
          </li>
          <li>
            <a href="#" class="logout" className={activeItem === 'logout' ? 'activeColor' : ''} onClick={() => handleItemClick('logout')}>
              <i class='bx bxs-log-out-circle' ></i>
              <span class="text">Logout</span>
            </a>
          </li>
        </ul> */}
      </section>
     
      <section id="content">
       
        <nav>
          <i  class='bx bx-menu'  onClick={toggleClass}  ></i>
          {/* <a href="#" class="nav-link">Categories</a> */}
          <form action="#">
            {/* <div class="form-input">
              <input type="search" placeholder="Search..." />
              <button type="button" class="search-btn"><i class='bx bx-search' ></i></button>
            </div> */}
          </form>
          <a href="#" class="notification">
            <i class='bx bxs-bell' ></i>
            <span class="num">8</span>
          </a>
          <a href="#" class="profile">
            <img src="https://secure.gravatar.com/avatar/d09eaad01aea86c51b4f892b4f8abf6f?s=100&d=wavatar&r=g" />
          </a>
        </nav>
        {children}
       
      </section>
      </>
  )
}

export default Dashboard;