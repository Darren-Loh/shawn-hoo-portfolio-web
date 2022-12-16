import React, { useState, useEffect, Component } from 'react';
import BookCover from '../assets/book-cover_of-the-florids.png';
import './CSS/Book.css';
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
                <div>
                    <div className='main-body-top'>
                        <div className='body-col-left'>
                            {/* <img className='bookcover-img' src={BookCover} /> */}
                            {book.imageUrl==null?<FaFileImage size={300} />:<img className='bookcover-img' src={book.imageUrl} />}
                        </div>
                        <div className='body-col-right'>
                            <h1>{book.title}</h1>
                            <p className='main-text publisher'>{book.edition}</p>
                            <p className='main-text awards'>{book.awards}</p>
                            <p className='main-text short-text'>{book.description}</p>
                            <div>
                                <p style={{fontFamily: 'Inter'}}>Purchase a copy from:</p>
                                <button>EPIGRAM BOOKS</button>
                                <button style={{marginBottom: 0}}>DIODE EDITIONS</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className='h2-header'>Reviews</h2>
                        {book.reviews.map((review) => <p className='text'><span>“</span><span>{review[1]}</span><span>” —</span><span className='reviews-signoff-name'>{review[2]}</span></p> )}
                        
                        <h2 className='h2-header'>Interviews</h2>
                        {book.interviews.map((interview) => <p className='text'><span>“</span><span>{interview[1]}</span><span>” —</span><span className='reviews-signoff-name'>{interview[2]}</span></p> )}
                    </div>
                </div>
                )}
            </div>
        )
    
}

export default Book;