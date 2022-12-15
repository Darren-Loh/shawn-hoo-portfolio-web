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

    //functions
    function addNewBook(){
        let newID = bookAll[bookAll.length-1].id+1;
        let newBook = {
            "id": newID,
            "imageUrl": null,
            "title": "New Title",
            "edition": "Edition Number",
            "awards": "Awards Text",
            "description": "Book Description",
            "reviews": [],
            "interviews": []
          };

        addPostFunction(newBook);
        setBookAll(current => [...current,newBook]);
        
    }

    //----------------------database stuff------------------------------------------------
    const fetchPosts = async() => {
        const res = await fetch('http://localhost:5000/books');
        const data = await res.json();
        return data;
    }

    const addPostFunction = async (post) => {
        const res = await fetch('http://localhost:5000/books', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(post),
        })

        const data = await res.json();
    }

    //return here
    return (
        
        <div>
            {bookAll && bookAll.map((bookProp) => <BookAdminInner key={bookProp.id} book = {bookProp} setBookAll = {setBookAll}/>)}
            <div className='addNewBook' onClick={addNewBook}>
              {/* <div className='circle plus'></div> */}
              Create a new post
            </div>
        </div>
    )
    // onClick={()=> setTriggerAddPost(true)}



}

export default BookAdmin
