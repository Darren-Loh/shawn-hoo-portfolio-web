import React, { Component } from 'react';
import BookCover from '../assets/book-cover_of-the-florids.png';
import './CSS/Book.css';

class Book extends Component {
    render() {
        return (
            <div className='main-body'>
                <div className='body-col-left'>
                    <img className='bookcover-img' src={BookCover} />
                    <p>Purchase a copy from:</p>
                    <button>EPIGRAM BOOKS</button>
                    <button>DIODE EDITIONS</button>
                </div>
                <div className='body-col-right'>
                    <h2>Of the Florids</h2>
                    <p className='text'>Diode Editions, 2022</p>
                    <p className='text'>Winner of the 2021 Diode Editions Chapbook Prize</p>
                    <p className='text'>Runner-up of the 2021 Tupelo Press Sunken Garden Chapbook Prize</p>
                    <p className='text description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus dui nec dignissim tempor. Vivamus viverra dictum libero, sed tempus arcu varius id. Nam luctus luctus enim, sit amet viverra arcu consequat fringilla. Sed non lectus eu elit convallis finibus in vitae orci. In vel turpis mollis, pharetra ex quis, ultrices mauris. Sed sed euismod mi, sit amet hendrerit ipsum.</p>
                    <button>BUY NOW</button>
                </div>
            </div>
        )
    }
}

export default Book;