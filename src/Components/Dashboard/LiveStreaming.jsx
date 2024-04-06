// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const LiveStreaming = () => {
//     const { id } = useParams();

//     useEffect(() => {
//         const fetchStreamingData = async () => {
//             try {
//                 const response = await axios.post(`https://groundreport.live/page2.html?match_id=${id}`);
//                 console.log("Streaming data:", response.data);
//                 // Process the streaming data as needed
//             } catch (error) {
//                 console.error("Error fetching streaming data:", error);
//             }
//         };

//         fetchStreamingData(); // Call the function to fetch streaming data
//     }, [id]); // Dependency array with 'id' to fetch data when 'id' changes

//     return (
//         <div>
//             live streaming
//         </div>
//     );
// }

// export default LiveStreaming;
