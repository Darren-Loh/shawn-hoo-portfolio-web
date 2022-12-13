import React, { useState, useEffect, Component } from 'react';
import BookCover from '../../../assets/book-cover_of-the-florids.png';
import './BookAdmin.css';
import BookAdminInner from './BookAdminInner';

function BookAdmin() {

    let [bookAll,setBookAll] = useState("");

    useEffect(() => {
        const getPosts = async() => {
        const postsFromServer = await fetchPosts();
        setBookAll(postsFromServer);
        
        }
        getPosts();

    },[])

    //----------------------database stuff------------------------------------------------
    const fetchPosts = async() => {
        const res = await fetch('http://localhost:5000/books');
        const data = await res.json();
        return data;
    }

    //return here
    return (
        
        <div>
            {bookAll && bookAll.map((bookProp) => <BookAdminInner book = {bookProp}/>)}
        </div>
    )



}

export default BookAdmin
