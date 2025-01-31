import React, {useState, useContext} from 'react'
import useScreenSize from './../Functions/ScreenSize';
import { bookSelect , setBookSelect} from './../Functions/BookSelect.js'
import {returnPages} from './../Files/BookPages';
import MessageContext from './../Pages/TestPage.jsx'
import { BookContext }  from './../Context/BookContext.js'



const BookList = () =>{
    const screenSize = useScreenSize();
    const [selectedBook, setSelectedBook] = useState(null)

    var bookValue = useContext(BookContext);


    function changeBook(e, bookId){
        e.preventDefault();
        setSelectedBook(bookId);
        bookValue = {bookId};
      }

    const bookList = ['Dracula', 'Grim']


    return (
        <div>

        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <p>Teste /n teste \n teste</p> 
        Selected Book: {selectedBook} -- {bookValue} 
        </div>      
        <BookContext.Provider value={selectedBook}>
          </BookContext.Provider>
          
        <div style={{padding:'50px', border:'20px'}}>
            <div class="listContainer" style={{height:'50vh',overflowY: 'scroll',padding:'10px'}}>
                { bookList.map( (file) => <div><button style={{width:'100%', fontSize:.8*screenSize.font}} key={file} onClick={(e) =>{changeBook(e, file)}}>{file}</button></div>) }
            </div>
        </div>


      </div>
    )
}

export default BookList;