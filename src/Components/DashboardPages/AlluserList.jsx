import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AlluserList = () => {
  const [UsersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = UsersData.slice(indexOfFirstUser, indexOfLastUser);

  const AllUserlist = async () => {
    try {
      const response = await axios.get('https://www.helpingbrother.in/bettingAllUsers');
      setUsersData(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    AllUserlist();
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="table-responsive wrapper-table-Userlist m-3 p-5">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">UserName</th>
              <th scope="col">Password</th>
              <th scope="col">Staus</th>
              <th scope="col">CreatedBy</th>
              <th scope="col">Authorize</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((val, i) => (
                <tr key={i}>
                  <td>{val.Id}</td>
                  <td>{val.UserName}</td>
                  <td>{val.Password}</td>
                  <td>{val.ActiveStatus ? 'true' : 'false'}</td>
                  <td>{val.CreatedBy}</td>
                  <td>{val.Authorize ? 'true' : 'false'}</td>
                  <td>
                    <Link to={`/Edituser/${val.Id}`}>
                      <i className="fa-regular fa-pen-to-square"></i>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">There is no data</td>
              </tr>
            )}
          </tbody>
        </table>
        <div>
        <ul className="pagination justify-content-center">
          {UsersData.length > 0 ? (
            <Pagination
              usersPerPage={usersPerPage}
              totalUsers={UsersData.length}
              paginate={paginate}
            />
          ) : null}
        </ul>
      </div>
      </div>
   
    </>
  );
};

const Pagination = ({ usersPerPage, totalUsers, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {pageNumbers.map((number) => (
        <li key={number} className="page-item">
          <button onClick={() => paginate(number)} className="page-link bg-dark text-white">
            {number}
          </button>
        </li>
      ))}
    </>
  );
};

export default AlluserList;
