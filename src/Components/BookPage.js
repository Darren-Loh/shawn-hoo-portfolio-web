import React, { useState, useEffect, Component } from 'react';
import BookCover from '../assets/book-cover_of-the-florids.png';
import './CSS/BookPage.css';
import {FaFileImage} from "react-icons/fa";

function Book() {

    let [bookAll,setBookAll] = useState("");

    useEffect(() => {
        const getPosts = async() => {
        const postsFromServer = await fetchPosts();
        setBookAll(postsFromServer.slice(0).reverse());
        
        }
        getPosts();

    },[])

    //----------------------database stuff------------------------------------------------
    const fetchPosts = async() => {
        const res = await fetch('http://localhost:5000/books');
        const data = await res.json();
        return data;
    }

        return (

            <div>
                {bookAll && bookAll.map((book) => 
                <div key={book.id}>
                    <div className='book-page-cover-wrapper'>
                        <div className='book-page-cover-wrapper__left-col'>
                            {book.imageUrl==null?<FaFileImage size={150} color={'darkgrey'} />:<img src={book.imageUrl} />}
                        </div>
                        <div className='book-page-cover-wrapper__right-col'>
                            <h1>{book.title}</h1>
                            <p className='book-page-cover-wrapper__right-col-publisher'>{book.edition}</p>
                            <p className='book-page-cover-wrapper__right-col-awards'>{book.awards}</p>
                            <p className='book-page-cover-wrapper__right-col-short-text'>{book.description}</p>
                            <div>
                                <p style={{fontFamily: 'Inter'}}>Purchase a copy from:</p>
                                <button>EPIGRAM BOOKS</button>
                                <button>DIODE EDITIONS</button>
                            </div>
                        </div>
                    </div>
                    <div className='book-page-body-wrapper'>
                        <h2 className='book-page-body-wrapper__h2-header'>Reviews</h2>
                        {book.reviews.map((review) => <p className='book-page-body-wrapper__text'><span>“</span><span>{review[1]}</span><span>” —</span><span className='book-page-body-wrapper__bold-text'>{review[2]}</span></p> )}
                        
                        <h2 className='book-page-body-wrapper__h2-header'>Interviews</h2>
                        {book.interviews.map((interview) => <p className='book-page-body-wrapper__text'><span>“</span><span>{interview[1]}</span><span>” —</span><span className='book-page-body-wrapper__bold-text'>{interview[2]}</span></p> )}
                    </div>
                </div>
                )}
            </div>
        )
    
}

export default Book;