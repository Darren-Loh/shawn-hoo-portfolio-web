import React, { useState, useEffect, Component } from 'react';
import BookCover from '../../../assets/book-cover_of-the-florids.png';
import './BookAdmin.css';

function BookAdminInner({book}) {
    let [isEdit,setIsEdit] = useState(false);
    let [titleText,setTitleText] = useState(book.title);
    let [editionText,setEditionText] = useState(book.edition);
    let [awardsText,setAwardsText] = useState(book.awards);
    let [descText,setDescText] = useState(book.description);
    let [reviewsArr,setReviewsArr] = useState(book.reviews);
    let [interviewsArr,setInterviewsArr] = useState(book.interviews);


    function triggerEdit(){
        setIsEdit(true);
    }

    //collect text onChange methods

    function handleTitleChange(e){
        setTitleText(e.target.value);
    }

    function handleEditionChange(e){
        setEditionText(e.target.value);
    }

    function handleAwardsChange(e){
        setAwardsText(e.target.value);
    }

    function handleDescChange(e){
        setDescText(e.target.value);
    }

    function reviewsChange(e,idx){
        setReviewsArr(current => current.map((innerReview)=>{
            if(innerReview[0] === idx){
                return [idx,e.target.value,innerReview[2]];
            }
            return innerReview;
        }))
    }

    function reviewsAuthorChange(e,idx){
        setReviewsArr(current => current.map((innerReview)=>{
            if(innerReview[0] === idx){
                return [idx,innerReview[1],e.target.value];
            }
            return innerReview;
        }))
    }

    //edit here 
    if(!isEdit){
        return (
            <div>
                <div className='main-body-top'>
                    <div className='body-col-left'>
                        <img className='bookcover-img' src={BookCover} />
                    </div>
                    <div className='body-col-right'>
                        <h1>{titleText}</h1>
                        <p className='main-text publisher'>{editionText}</p>
                        <p className='main-text awards'>{awardsText}</p>
                        <p className='main-text short-text'>{descText}</p>
                        <div>
                            <p style={{fontFamily: 'Inter'}}>Purchase a copy from:</p>
                            <button>EPIGRAM BOOKS</button>
                            <button style={{marginBottom: 0}}>DIODE EDITIONS</button>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className='h2-header'>Reviews</h2>
                    {reviewsArr.map((review) => 
                    <div key={review[0]}>
                        <p className='text'><span>“</span><span>{review[1]}</span><span>” —</span><span className='reviews-signoff-name'>{review[2]}</span></p>
                    </div> 
                    )}
                    
                    <h2 className='h2-header'>Interviews</h2>
                    <h2 className='h2-header'>Description</h2>
                </div>
                <button onClick={triggerEdit}>Edit</button>
            </div>
          )
    }
        
    else{
        return (
            <div>
                <div className='main-body-top'>
                    <div className='body-col-left'>
                        <img className='bookcover-img' src={BookCover} />
                    </div>
                    <div className='body-col-right'>
                        <input type="text" id="editBookHeader" name="editBookHeader" className='editBookTitle' value={titleText} onChange={handleTitleChange}></input>
                        <input type="text" id="editBookEdition" name="editBookEdition" className='main-text publisher editPara' value={editionText} onChange={handleEditionChange}></input>
                        <textarea className='main-text awards editPara' type="text" id="editBookAwards" name="editBookAwards" rows="5" cols="75" value={awardsText} onChange={handleAwardsChange}/>
                        <textarea className='main-text short-text editPara' type="text" id="editBookDescription" name="editBookDescription" rows="10" cols="75" value={descText} onChange={handleDescChange}/>
                        <div>
                            <p style={{fontFamily: 'Inter'}}>Purchase a copy from:</p>
                            <button>EPIGRAM BOOKS</button>
                            <button style={{marginBottom: 0}}>DIODE EDITIONS</button>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className='h2-header'>Reviews</h2>
                    {reviewsArr.map((review) => 
                    <div key={review[0]}>
                        <p className='text'>
                            <span>“</span>
                            <textarea className='editReviewDescription' type="text" id="editReviewDescription" name="editReviewDescription" rows="5" cols="100" value={review[1]} onChange={(e)=>reviewsChange(e,review[0])}/>
                            <span>” —</span>
                            <input type="text" id="editReviewAuthor" name="editReviewAuthor" className='editReviewAuthor' value={review[2]} onChange={(e)=>reviewsAuthorChange(e,review[0])}></input>
                        </p>
                    </div> 
                    )}
                    
                    <h2 className='h2-header'>Interviews</h2>
                    <h2 className='h2-header'>Description</h2>
                </div>
            </div>
        )
    }

}

export default BookAdminInner
