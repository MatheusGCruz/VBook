import { useState  } from 'react';
import MusicFilesList from "../Components/MusicFilesList";
import './../Styles/Videos.css';

function Music() {

    return (
      <div class="row"> 
        
        <h1  style={{display: 'flex',  justifyContent:'center', alignItems:'center', padding:20}}>Musics </h1>
        <div class="col" style={{backgroundColor:'blue'}}>

        </div>
        <div class="col">
            <br />
            <MusicFilesList />        
          </div>
      </div>
)
}

export default Music;