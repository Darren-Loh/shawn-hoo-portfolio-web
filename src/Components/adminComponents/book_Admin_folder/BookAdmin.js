import React, { useState, useEffect, Component } from 'react';
import BookCover from '../../../assets/book-cover_of-the-florids.png';
// import './BookAdmin.css';
import BookAdminHeader from './BookAdminHeader';
import BookAdminInner from './BookAdminInner';

function BookAdmin() {

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
        const res = await fetch('https://shawn-hoo-portfolio-server.onrender.com/books');
        const data = await res.json();
        return data;
    }



    //return here
    return (
        
        <div className='bookAdminOuter'>
            
            <BookAdminHeader bookAll = {bookAll} setBookAll = {setBookAll}/>
            {bookAll && bookAll.map((bookProp) => <BookAdminInner key={bookProp.id} book = {bookProp} setBookAll = {setBookAll}/>)}

        </div>
    )
    // onClick={()=> setTriggerAddPost(true)}



}

export default BookAdmin
