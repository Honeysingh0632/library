import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa"; // Search icon
import "./search.css";
import axios from 'axios';
import { baseurl } from "../Config/config";
import { useAuth } from "../store/auth";

const SearchBook = () => {
    const [hover, setHover] = useState(false);
  

    const {
        
        searchTerm,
        setSearchTerm,
        priceFilter,
        setPriceFilter
      } = useAuth();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const token = localStorage.getItem('token');
    //         try {
    //             const res = await axios.get(`${baseurl}/addbook/getapi`, {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': token
    //                 }
    //             });
    //             setBooks(res.data);
    //         } catch (err) {
    //             console.error("Error fetching books:", err);
    //         }
    //     };
    //     fetchData();
    // }, []);

    // // Filter books based on search and price range
    // const filteredBooks = books.filter(book => {
    //     const matchesSearch =
    //         book.AddBookname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         book.AddAuthorname?.toLowerCase().includes(searchTerm.toLowerCase());

    //     const bookPrice = parseFloat(book.bookprice);

    //     const matchesPrice =
    //         priceFilter === 'all' ||
    //         (priceFilter === '10-100' && bookPrice >= 10 && bookPrice <= 50) ||
    //         (priceFilter === '10-100' && bookPrice >= 50 && bookPrice <= 100) ||
    //         (priceFilter === '100-200' && bookPrice > 100 && bookPrice <= 200);

    //     return matchesSearch && matchesPrice;
    // });

    return (
        <div className="search-container">
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by book name or author"
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="search-icon me-3" />

            {/* Price Range Dropdown */}
            <select className="filter-dropdown search-btn me-2" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
                <option value="all">All Prices</option>
                <option value="10-100">$10 - $50</option>
                <option value="10-100">$50 - $100</option>
                <option value="100-200">$100 - $200</option>
            </select>

            {/* Search Button */}
            <button
                className={`search-btn ${hover ? "tilted" : ""}`}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                GO
            </button>

           {/* Book List 
              <div className="book-list">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map(book => (
                        <div key={book._id} className="book-card">
                            {book.image && (
                                <img
                                    src={`${baseurl}${book.image}`}
                                    alt={book.AddBookname}
                                    width="200"
                                    className="add-book-card"
                                />
                            )}
                            <h3>{book.AddBookname}</h3>
                            <h6>By {book.AddAuthorname}</h6>
                            <p>{book.bookdesc}</p>
                            <p className="text-success">Price: ${book.bookprice}</p>
                            <p className="text-decoration-line-through text-danger">
                                Old Price: ${book.bookoldprice}
                            </p>
                            <p>Book Rating: {book.bookrating}/5</p>
                        </div>
                    ))
                ) : (
                    <p>No books found</p>
                )}
            </div> */}
        </div>
    );
}

export default SearchBook;
