import React, { useState, useEffect, Component } from 'react';
import BookCover from '../assets/book-cover_of-the-florids.png';
import './CSS/Book.css';

function Book() {

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

        return (
            




            <div>

                <div className='main-body-top'>
                    <div className='body-col-left'>
                        <img className='bookcover-img' src={BookCover} />
                    </div>
                    <div className='body-col-right'>
                        <h1>Of the Florids</h1>
                        <p className='main-text publisher'>Diode Editions, 2022</p>
                        <p className='main-text awards'>Winner of the 2021 Diode Editions Chapbook Prize</p>
                        <p className='main-text awards'>Runner-up of the 2021 Tupelo Press Sunken Garden Chapbook Prize</p>
                        <p className='main-text short-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus dui nec dignissim tempor. Vivamus viverra dictum libero, sed tempus arcu varius id. Nam luctus luctus enim, sit amet viverra arcu consequat fringilla. Sed non lectus eu elit convallis finibus in vitae orci. In vel turpis mollis, pharetra ex quis, ultrices mauris. Sed sed euismod mi, sit amet hendrerit ipsum.</p>
                        <div>
                            <p style={{fontFamily: 'Inter'}}>Purchase a copy from:</p>
                            <button>EPIGRAM BOOKS</button>
                            <button style={{marginBottom: 0}}>DIODE EDITIONS</button>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className='h2-header'>Reviews</h2>
                    <p className='text'><span>“Vivamus viverra dictum libero, sed tempus arcu varius id. Nam luctus luctus enim, sit amet viverra arcu consequat fringilla. Sed non lectus eu elit convallis finibus in vitae orci. In vel turpis mollis, pharetra ex quis, ultrices mauris.” —</span><span className='reviews-signoff-name'>John Doe</span></p>
                    <p className='text'><span>“Vivamus viverra dictum libero, sed tempus arcu varius id. Nam luctus luctus enim, sit amet viverra arcu consequat fringilla. Sed non lectus eu elit convallis finibus in vitae orci. In vel turpis mollis, pharetra ex quis, ultrices mauris.” —</span><span className='reviews-signoff-name'>John Doe</span></p>
                    <h2 className='h2-header'>Interviews</h2>
                    <h2 className='h2-header'>Description</h2>
                </div>
            </div>
        )
    
}

export default Book;