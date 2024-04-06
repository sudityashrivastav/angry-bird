import React, { useContext, useEffect } from 'react'
import Header from './Header';
import { Context } from './Context/ContextProvider';

const Videoplayer = () => {
    const {drmBaseUrl, setDrmBaseUrl} =useContext(Context);
    
    const Neweapi = () =>{

console.log("videoplayecomponet",drmBaseUrl);
        const videoPlayer = document.getElementById('videoPlayer');
        
        // const videoUrl = 'https://prod-sports-hin-gm.jiocinema.com/hls/live/2100323/hd_akamai_androidmob_avc_hin_wpl_s1_m1290224/master_240p.m3u8';
        // const videoUrl = "https://dai.fancode.com/primary/94505_english_hls_8311ta-di/720p.m3u8";
        const videoUrl = `${drmBaseUrl}`;
    
        if(Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videoUrl);
            hls.attachMedia(videoPlayer);
            hls.on(Hls.Events.MANIFEST_PARSED,function() {
                videoPlayer.play();
            });
        } else if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')) {
            videoPlayer.src = videoUrl;
            videoPlayer.addEventListener('loadedmetadata',function() {
                videoPlayer.play();
            });
        }
    
    
    }
    
    useEffect(()=>{
        Neweapi()
    },[])
  return (
    <>
    <Header/>
    <div className="wrapper-video-player mt-3">
<video style={{width:"60%",height:'100%'}} id="videoPlayer" controls autoplay></video>
</div>
    </>
  )
}

export default Videoplayer
