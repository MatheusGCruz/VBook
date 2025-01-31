import {returnPages} from './../Files/BookPages';


let book = ""

export function bookSelect(){
  return book;
};

export function setBookSelect(newBook){
    book = newBook;
    //returnPages();
    return book;
};

