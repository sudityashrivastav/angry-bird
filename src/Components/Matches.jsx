import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';

const Matches = () => {
    const [liveLink, setLiveLink] = useState([]);

    useEffect(() => {
        const fetchLiveStreamData = async () => {
            try {
                const response = await axios.get('https://free-cricket-live-score1.p.rapidapi.com/live-stream/match', {
                    params: {
                        key: 'star_sports_hindi'
                    },
                    headers: {
                        'X-RapidAPI-Key': 'fc1351a274msh1cfc86f995af7a6p1abcbfjsn8bae2121d60c',
                        'X-RapidAPI-Host': 'free-cricket-live-score1.p.rapidapi.com'
                    }
                });

                setLiveLink(response.data.documents[0]);
            } catch (error) {
                console.error('Error fetching live stream data:', error);
            }
        };

        fetchLiveStreamData();
    }, []);
    console.log("livelink",liveLink);
const YOutubevideo = liveLink['live-match-link']
console.log("YOutubevideo",YOutubevideo);
    // const Youtube = 'https://www.youtube.com/watch?v=32vhmYawZak&list=RD-FC4mw5bpwo&index=8'

    return (
        <div>
            {liveLink && (
                <>
          

                {/* <ReactPlayer
                   
                    url={YOutubevideo} 
                    playing="true"
                    controls="true"
                    width="100%"
                    height="100%"
                    type="video/mp4"
                    
                /> */}
                {/* <video controls autoPlay>
                    <source src="blob:https://live-channels-suditya.netlify.app/0edfdbc0-ff2c-456c-9bc4-4f95ff28b84c" type="video/mp4"  />
                    Your browser does not support the video tag.
                </video> */}
           <iframe src={YOutubevideo} width="100%" height="400px"/>
           {/* <iframe src="https://live-channels-suditya.netlify.app/0edfdbc0-ff2c-456c-9bc4-4f95ff28b84c" width="100%" height="400px"/> */}

           
                </>
            )}
        </div>
    );
}

export default Matches;
