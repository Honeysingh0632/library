import React from "react";

const NewBooks = () => {

    return(
        <>
        
        <div className="new">
            <h1 className="new-text"> New Additions</h1>
            <p>We have a wide range Of New Books</p>
        </div>
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-3"><img src={require('./images/books.jpeg')} className="book1"></img></div>
                <div className="col-lg-3" > <img src={require('./images/book2.jpeg')} className="book1"></img></div>
                <div className="col-lg-3"> <img src={require('./images/books3.jpeg')} className="book1"></img></div>
                <div className="col-lg-3"> <img src={require('./images/books4.jpeg')} className="book1"></img></div>
            </div>
        </div>

        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-3"> <img src={require('./images/books5.jpeg')} className="book1"></img></div>
                <div className="col-lg-3" > <img src={require('./images/books6.jpeg')} className="book1"></img></div>
                <div className="col-lg-3"> <img src={require('./images/books7.jpeg')} className="book1"></img></div>
                <div className="col-lg-3"> <img src={require('./images/books8.jpeg')} className="book1"></img></div>
            </div>
            <div className="colection mt-4"> <button className="mt-5  btn-colection">Our collection</button></div>
           
        </div>
        </>

    )
}
export default NewBooks;