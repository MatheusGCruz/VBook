import './App.css';
import React, {useEffect, fetchData, useContext, useState, useRef} from 'react'


import HTMLFlipBook  from "react-pageflip";
import StatusPage from './Pages/StatusPage.jsx';
import {ReturnPages} from './Files/BookPages';
import useScreenSize from './Functions/ScreenSize';
import { BookContext } from './Context/BookContext';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

import useConfigs from './Functions/Config';
import axios from "axios";


export const UserContext = React.createContext(null);


function App() {

  const [book, setBook] = useState([]);
  const [loadingBook, setLoadingBook] = useState(true);
  const [loadingCover, setLoadingCover] = useState(true);
  const [loadingFullName, setLoadingFullName] = useState(true);
  const [loadingStyle, setLoadingStyle] = useState(true);
  const configs = useConfigs();
  const [bgImage, setBgImage] = useState("");
  const [fullName, setFullName] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const showBook = useRef();
  const pageCookie = 'pageCookie';
  const [bookCode, setBookCode] = useState("");

  const [rightPageCss, setRightPageCss] = useState("rightPage")
  const [leftPageCss, setLeftPageCss] = useState("leftPage")
  const [buttonCss, setButtonCss] = useState("appButtonBook")

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

    axios.get(configs.fullName+window.location.pathname.substring(1))
      .then(response => {
        setFullName(response.data);        
        console.log(bgImage.toString);
        setLoadingFullName(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoadingFullName(false);
      });

      axios.get(configs.style+window.location.pathname.substring(1))
      .then(response => {
        switch(response.data){
          case 1: 
              setRightPageCss("rightPage");
              setLeftPageCss("leftPage");
              setButtonCss("appButtonBook");
              break;
          case 2: 
              setRightPageCss("rightNote");
              setLeftPageCss("leftNote");
              setButtonCss("appButtonNote");
              break;
          default:
              setRightPageCss("rightPage");
              setLeftPageCss("leftPage");
              setButtonCss("appButtonBook");
              break;
        }

        setLoadingStyle(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoadingFullName(false);
      });
  }, []);

  const bookPages = ReturnPages(book);
  const screenSize = useScreenSize();
  let pageIndex = 0;

  const bookInit = () => {
    const actualBookCode = window.location.pathname.substring(1);
    setBookCode(actualBookCode);
    if(read_cookie(actualBookCode)>0){
          setCurrentPage(read_cookie(actualBookCode));
    }
  };

  const bookFlip = (data) => {
    if(data>2){
      setCurrentPage(data);
      bake_cookie(bookCode, data);
    }
  };

  const setPage = () => {
    showBook.current.pageFlip().flip(currentPage);
  };

  useEffect(()=> {
    
  }, []);

  if (loadingBook || loadingCover || loadingFullName || loadingStyle) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-600">Loading...</h1></div>;
  }

  return (
    <div className="App">
      <HTMLFlipBook         
          width={screenSize.width} 
          height={screenSize.height}
          clickEventForward='false'
          isUserTouch='false'
          showCover='true'
          onInit={bookInit}
          onFlip={(e) => bookFlip(e.data)}
          ref={showBook}      
          >
        <div className="frontCover"> 
        </div> 
	      <div className={leftPageCss}>
        <div style={{fontSize:screenSize.font, margin:screenSize.verticalPadding, textAlign:'justify', 
                  paddingTop:screenSize.verticalPadding,
                  paddingBottom:screenSize.verticalPadding,
                  paddingRight:screenSize.horizontalPadding,
                  paddingLeft:screenSize.horizontalPadding}}>

          <h1> {fullName}</h1>
          <br/><br/>
          <h2> Screen Status Values:</h2>
          <br/>
          <div> Width = {screenSize.width}          </div>
          <div> Height = {screenSize.height}          </div>
          <div> Font = {screenSize.font}</div>
          <div> Vertical Padding = {screenSize.verticalPadding}</div>
          <div> Horizontal Padding = {screenSize.horizontalPadding}</div>
          <div> Char Density = {screenSize.charDensity}    </div>  
          <br/>
          <button class={buttonCss} onClick={setPage}>Ultima página lida: {currentPage}. Ir para página</button>        
          </div>
        </div>
       
        <div className={rightPageCss}> <img  src={bgImage} style={{
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
            return <div className={rightPageCss}> 
            <div style={{fontSize:screenSize.font, margin:screenSize.verticalPadding, textAlign:'justify', 
              paddingTop:screenSize.verticalPadding,
              paddingBottom:screenSize.verticalPadding,
              paddingRight:screenSize.horizontalPadding,
              paddingLeft:screenSize.horizontalPadding}}>{page}</div></div>
          }
          else{
            return <div className={leftPageCss}> 
            <div style={{fontSize:screenSize.font, margin:screenSize.verticalPadding, textAlign:'justify', 
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
