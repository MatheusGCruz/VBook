import './App.css';
import React, {useEffect, fetchData, useContext, useState} from 'react'

import HTMLFlipBook  from "react-pageflip";
import StatusPage from './Pages/StatusPage.jsx';
import {ReturnPages} from './Files/BookPages';
import useScreenSize from './Functions/ScreenSize';
import { BookContext } from './Context/BookContext';

import useConfigs from './Functions/Config';
import axios from "axios";

export const UserContext = React.createContext(null);


function App() {

  const [book, setBook] = useState([]);
  const [loadingBook, setLoadingBook] = useState(true);
  const [loadingCover, setLoadingCover] = useState(true);
  const configs = useConfigs();
  const [bgImage, setBgImage] = useState("");
  var coverImage = "";


  useEffect(() => {
    axios.get(configs.book+window.location.pathname.substring(1))
      .then(response => {
        setBook(response.data); 
        setLoadingBook(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoadingBook(false);
      });

    axios.get(configs.cover+window.location.pathname.substring(1))
      .then(response => {
        setBgImage(response.data);        
        console.log(bgImage.toString);
        setLoadingCover(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoadingCover(false);
      });
  }, []);

  const bookPages = ReturnPages(book);
  const screenSize = useScreenSize();
  let pageIndex = 0;


  useEffect(()=> {
    
  }, []);

  if (loadingBook || loadingCover) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100"><h1 className="text-3xl font-bold text-gray-600">Loading...</h1></div>;
  }

  return (
    <div className="App">
      <HTMLFlipBook         
          width={screenSize.width} 
          height={screenSize.height}
          clickEventForward='false'
          isUserTouch='false'
          showCover='true'
          
          >
        <div className="frontCover"> 
        </div> 
	      <div className="leftPage"><BookContext.Provider value={"Dracula"}><StatusPage/></BookContext.Provider></div>
       
        <div className="rightPage"> <img  src={bgImage} style={{
              width:'90%',
              height:'90%',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              margin:screenSize.verticalPadding, 
              borderRadius:screenSize.verticalPadding, 
              paddingTop:screenSize.verticalPadding,
              paddingBottom:screenSize.verticalPadding,
              paddingRight:screenSize.horizontalPadding,
              paddingLeft:screenSize.horizontalPadding}}/></div>

        { bookPages.map( (page) => {
          pageIndex = pageIndex + 1;
          if(pageIndex%2===0){
            return <div className="rightPage"> <div style={{fontSize:screenSize.font, margin:screenSize.verticalPadding, textAlign:'justify', 
              paddingTop:screenSize.verticalPadding,
              paddingBottom:screenSize.verticalPadding,
              paddingRight:screenSize.horizontalPadding,
              paddingLeft:screenSize.horizontalPadding}}>{page}</div></div>
          }
          else{
            return <div className="leftPage"> <div style={{fontSize:screenSize.font, margin:screenSize.verticalPadding, textAlign:'justify', 
              paddingTop:screenSize.verticalPadding,
              paddingBottom:screenSize.verticalPadding,
              paddingRight:screenSize.horizontalPadding,
              paddingLeft:screenSize.horizontalPadding}}>{page}</div> </div>
          }        
          
          }) }
	      <div className="backCover"> BackCover </div>

      </HTMLFlipBook>
    </div>    
  );
}

export default App;
