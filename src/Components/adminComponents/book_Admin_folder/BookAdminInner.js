import React, { useState, useEffect, Component } from 'react';
import BookCover from '../../../assets/book-cover_of-the-florids.png';
import './BookAdmin.css';

function BookAdminInner({book, setBookAll}) {
    let [isEdit,setIsEdit] = useState(false);
    let [titleText,setTitleText] = useState(book.title);
    let [editionText,setEditionText] = useState(book.edition);
    let [awardsText,setAwardsText] = useState(book.awards);
    let [descText,setDescText] = useState(book.description);
    let [reviewsArr,setReviewsArr] = useState(book.reviews);
    let [interviewsArr,setInterviewsArr] = useState(book.interviews);

    //original values
    let [oriTitleText,setOriTitleText] = useState(book.title);
    let [oriEditionText,setOriEditionText] = useState(book.edition);
    let [oriAwardsText,setOriAwardsText] = useState(book.awards);
    let [oriDescText,setOriDescText] = useState(book.description);
    let [oriReviewsArr,setOriReviewsArr] = useState(book.reviews);
    let [oriInterviewsArr,setOriInterviewsArr] = useState(book.interviews);


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

    function saveButton(){
        updatePost(book.id);
        setOriTitleText(titleText);
        setOriEditionText(editionText);
        setOriAwardsText(awardsText);
        setOriDescText(descText);
        setOriReviewsArr(reviewsArr);
        setOriInterviewsArr(interviewsArr);
        setIsEdit(false);
    }

    function cancelButton(){
        // updatePost(book.id);
        setTitleText(oriTitleText);
        setEditionText(oriEditionText);
        setAwardsText(oriAwardsText);
        setDescText(oriDescText);
        setReviewsArr(oriReviewsArr);
        setInterviewsArr(oriInterviewsArr);
        setIsEdit(false);
    }

    function deleteBookButton(){
        deleteServerPost(book.id);
        setBookAll(current => current.filter((innerItem)=> innerItem.id!==book.id));
    }

    function addNewReview(){
        let newID = reviewsArr[reviewsArr.length-1][0]+1;
        let newReview = [newID,"Review Text","Writer Name"];
        setReviewsArr(current => [...current,newReview]);
        
    }

    function deleteReview(idx){
        setReviewsArr(current => current.filter((innerItem) => innerItem[0]!==idx));
        
    }

      //----------------------database stuff------------------------------------------------
  const fetchPost = async(instanceID) => {
    const res = await fetch(`http://localhost:5000/books/${instanceID}`);
    const data = await res.json();

    return data;
  }

  const deleteServerPost = async (id) => {
    await fetch(`http://localhost:5000/books/${id}`,{
      method: 'DELETE',
    });

    // setBlogRecords(blogRecords.filter((record) => record.id !== id));
    
  }

  const updatePost = async (instanceID) => {
    const postToUpdate = await fetchPost(instanceID);
    const updatedPost = {
      ...postToUpdate, 
      "title": titleText,
      "edition": editionText,
      "awards": awardsText,
      "description": descText,
      "reviews": reviewsArr,
      "interviews": interviewsArr
    }

    const res = await fetch(`http://localhost:5000/books/${instanceID}`, {
      method:'PUT',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedPost)
    })

    const data = await res.json();
  }

  //----------------------database stuff------------------------------------------------

    //return here 
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
                        <button onClick={()=>deleteReview(review[0])}>Delete this review</button>
                        
                    </div> 
                    )}
                    <button onClick={addNewReview}>Add New Review</button>
                    
                    <h2 className='h2-header'>Interviews</h2>
                    <h2 className='h2-header'>Description</h2>
                    <button onClick={cancelButton}>Cancel</button>
                    <button onClick={deleteBookButton}>Delete Book</button>
                    <button onClick={saveButton}>Save</button>
                </div>
            </div>
        )
    }

}

export default BookAdminInner
