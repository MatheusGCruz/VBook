import UseScreenSize from './../Functions/ScreenSize';

export function ReturnPages(newBook){

    let returnList = [];
    //let book = newBook;
   
    let BookValue = window.location.pathname.substring(1); // Remove the leading '/'
    BookValue = BookValue || "Not setted"; // Ensure label is set
    let bookText = "Failed to load: " + BookValue;

    if((newBook != null && newBook.length >10)){
        bookText = newBook;
    }

    const pages = bookText.split('(NP)');
    const ScreenSize = UseScreenSize();

    const charDensity = ScreenSize.charDensity
    let pageNumber = 0;

    pages.forEach(function(newPage, nidx, narray){
        const lines = newPage.split('(BR)');
        let page = "";
        const newLine = "\n\r \n\n";

        let linesSize = lines.size;
    
        lines.forEach(function(element, idx, array){
            linesSize = linesSize - element.size;
            page = page + element + newLine;
   
            if(page.length > charDensity || linesSize === 0){    
                returnList.push(page);
                page = "";
                pageNumber ++;
            }

            if (idx === array.length - 1){ 
                returnList.push(page);
                page = "";
                pageNumber ++;
            }
        });

    });
    if(pageNumber%2===1){
        returnList.push("");
    }

    return returnList;
}


