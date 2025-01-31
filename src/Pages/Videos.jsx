import { useState  } from 'react';
import VideoPlayer from '../Components/VideoPlayer';
import MkvVideoPlayer from '../Components/MkvVideoPlayer';
import Input from "../Components/Input";
import VideoFilesList from "../Components/VideoFilesList";
import './../Styles/Videos.css';

function Videos() {

    const [videoId, setVideoId] = useState(null);

    function playVideo(e, videoId){
      e.preventDefault();
      setVideoId(videoId);
    }
  
    function playMkvVideo(e, videoId){
      e.preventDefault();
      setVideoId(videoId);
    }

    return (
      <div class="row"> 
        
        <h1  style={{display: 'flex',  justifyContent:'center', alignItems:'center', padding:20}}>Videos </h1>
        <div class="col" style={{backgroundColor:'blue'}}>

        </div>
        <div class="col">
            <br />
            <VideoFilesList />        
          </div>
      </div>
)
}

export default Videos;