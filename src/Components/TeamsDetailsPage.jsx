// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import Header from './Header';
// import { useParams } from 'react-router-dom';

// const TeamsDetailsPage = () => {
//     const { time, team1, team2 } = useParams();
//     const [TemasDetails, SetTeamDetails] = useState([])

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const options = {
//                     method: 'POST',
//                     url: 'https://free-cricket-live-score1.p.rapidapi.com/odds/odds',
//                     headers: {
//                         'content-type': 'application/json',
//                         'X-RapidAPI-Key': 'fc1351a274msh1cfc86f995af7a6p1abcbfjsn8bae2121d60c',
//                         'X-RapidAPI-Host': 'free-cricket-live-score1.p.rapidapi.com'
//                     },
//                     data: JSON.stringify({
//                         teams_t1_name: team1,
//                         teams_t2_name: team2,
//                         time: parseInt(time) // Convert time to a number
//                     })
//                 };

//                 const response = await axios.request(options);
//                 SetTeamDetails(response.data)
//                 console.log(response.data);
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         fetchData();
//     }, [time, team1, team2]);



    
// console.log("TemasDetails",TemasDetails);
//     return (
//         <>
//             <Header />
//             <div>
//             <table className="table">
//   <thead>
//     <tr>
//       <th scope="col">#</th>
//       <th scope="col">First</th>
//       <th scope="col">Last</th>
//       <th scope="col">Handle</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <th scope="row">1</th>
//       <td>Mark</td>
//       <td>Otto</td>
//       <td>@mdo</td>
//     </tr>
//     <tr>
//       <th scope="row">2</th>
//       <td>Jacob</td>
//       <td>Thornton</td>
//       <td>@fat</td>
//     </tr>
//     <tr>
//       <th scope="row">3</th>
//       <td colSpan={2}>Larry the Bird</td>
//       <td>@twitter</td>
//     </tr>
//   </tbody>
// </table>

//             </div>
//         </>
//     );
// }

// export default TeamsDetailsPage;
// time: parseInt(time)

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import { Link, useParams } from 'react-router-dom';
import { Context } from './Context/ContextProvider';

const TeamsDetailsPage = () => {
  
    const [teamsDetails, setTeamsDetails] = useState(null); 
  
     const {TeamdetailsAll,SetTeamdetailsAll} =useContext(Context)

    
useEffect(() => {
    const fetchData = async () => {
        try {
            const { time, TeamA, TeamB } = JSON.parse(sessionStorage.getItem('teamDetails'));

            const options = {
                method: 'POST',
                url: 'https://free-cricket-live-score1.p.rapidapi.com/odds/odds',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': 'fc1351a274msh1cfc86f995af7a6p1abcbfjsn8bae2121d60c',
                    'X-RapidAPI-Host': 'free-cricket-live-score1.p.rapidapi.com'
                },
                data: {
                    teams_t1_name: TeamA,
                    teams_t2_name: TeamB,
                    time: parseInt(time)
                }
            };

            const response = await axios.request(options);
           
            setTeamsDetails(response.data.data_type_one); 
            SetTeamdetailsAll(response.data)
        } catch (error) {
            console.error(error);
        }
    };


    fetchData();

    const intervalId = setInterval(fetchData, 5000);

 
    return () => clearInterval(intervalId);
}, [TeamA, TeamB, time]);
console.log("teamsDetails", teamsDetails);


return (
        <>
           
            <div>
                {teamsDetails ? (
                    <>       
                                 <div className="container">

                   <div className="row">
                    <div className="wrapperVsteam d-flex align-items-center mt-5 mb-5" style={{width:'auto'}}>
                    <img src={teamsDetails.data.team_a_img} style={{width:'60px',height:'60px',borderRadius:"50%"}}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p>vs</p>&nbsp;&nbsp;&nbsp;&nbsp;<img src={teamsDetails.data.team_b_img} style={{width:'60px',height:'60px',borderRadius:"50%"}}/>&nbsp;&nbsp;
                  <p>Target:{teamsDetails.data.target}</p>
                    </div>
                    <div className="col-lg-12">
                    <div class="table-responsive">
                    <table className="table table-dark">
                        <thead className='text-center'>
                            <tr>
                             
                                <th nowrap="" scope="col">Team</th>
                                <th nowrap="" scope="col">Ranking</th>
                                <th nowrap="" scope="col">Batsman Name</th>
                                <th nowrap="" scope="col">Ball</th>
                                <th nowrap="" scope="col">Run</th>
                                <th nowrap="" scope="col">Four</th>
                                <th nowrap="" scope="col">Sixes</th>
                                
                                <th scope="col">strikeRate</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>

                            {teamsDetails.data.batsman && teamsDetails.data.batsman.map((batsman, index) => (
                                <tr key={index}>
                                    <td nowrap="">{teamsDetails.data.team_a_short}</td>
                                    <td nowrap="">Batsman {index + 1}</td>
                                    <td nowrap="">{batsman.name}</td>
                                    <td nowrap="">{batsman.ball}</td>
                                    <td nowrap="">{batsman.run}</td>
                                    <td nowrap="">{batsman.fours}</td>
                                    <td nowrap="">{batsman.sixes}</td>
                                    <td nowrap="">{batsman.strike_rate}</td>
                                </tr>
                            ))}
                        </tbody>
                     
                    </table>
                    </div>
                    </div>
                    <div className="col-lg-6">
                    <div class="table-responsive">
                    <table className="table table-dark">
  <thead className='text-center'>
    <tr>
      <th nowrap="" scope="col">Ball</th>
      <th nowrap="" scope="col">over</th>
      <th  nowrap="" scope="col">score</th>
      <th nowrap="" scope="col">wicket</th>
      <th nowrap="" scope="col">Live Streaming</th>
    </tr>
  </thead>
  <tbody className='text-center'>
  
  <tr>
  <td nowrap=""></td>
  <td nowrap=""></td>
  <td nowrap=""></td>
  <td nowrap=""></td>
  <td nowrap=""><Link to={`/Previewmatch/${teamsDetails.data.tv_id}`}><i class="fa-solid fa-tv"></i></Link></td>
</tr>

   
  </tbody>
</table>

                    </div>
                    </div>
                    </div>
                    </div>
                    </>

                ) : (
                    <>
                    <section className='SectionLoader'></section>
                    <div className="wrapper-loader">
                    <svg
                      version="1.2"
                      baseProfile="tiny"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      width="170.49px"
                      height="177px"
                      viewBox="0 0 170.49 177"
                      overflow="inherit"
                      xmlSpace="preserve"
                    >
                      <polygon
                        className="hex"
                        points="16.623,87 0,58.5 16.623,30 49.868,30 66.49,58.5 49.868,87 "
                      />
                      <polygon
                        className="hex"
                        points="68.623,57 52,28.5 68.623,0 101.868,0 118.49,28.5 101.868,57 "
                      />
                      <polygon
                        className="hex"
                        points="120.623,87 104,58.5 120.623,30 153.868,30 170.49,58.5 153.868,87 "
                      />
                      <polygon
                        className="hex"
                        points="120.623,147 104,118.5 120.623,90 153.868,90 170.49,118.5 153.868,147 "
                      />
                      <polygon
                        className="hex"
                        points="68.623,177 52,148.5 68.623,120 101.868,120 118.49,148.5 101.868,177 "
                      />
                      <polygon
                        className="hex"
                        points="16.623,147 0,118.5 16.623,90 49.868,90 66.49,118.5 49.868,147 "
                      />
                      <polygon
                        className="hex"
                        points="68.623,117 52,88.5 68.623,60 101.868,60 118.49,88.5 101.868,117 "
                      />
                    </svg>
                    <div className="after">
                      <b>reconnecting...</b>
                    </div>
                    </div>
                  </>
                  
                )}
            </div>
        </>
    );
}

export default TeamsDetailsPage;
