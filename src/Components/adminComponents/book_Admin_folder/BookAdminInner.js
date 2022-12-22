import React, { useState, useEffect, Component } from 'react';
import BookCover from '../../../assets/book-cover_of-the-florids.png';
import './BookAdmin.css';
import {storage} from "../../../firebase.js";
import {ref,uploadBytes, listAll, getDownloadURL, deleteObject} from "firebase/storage";
import {v4} from 'uuid';
import {FaFileImage} from "react-icons/fa";

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

    //firebase values
    let [imageUpload,setImageUpload] = useState(null);
    let [oriImageURL, setOriImageURL] = useState(book.imageUrl);
    let [imageURL, setImageURL] = useState(book.imageUrl);
    let [imageChanged, setImageChanged] = useState(false);


    //----------------------firebase stuff------------------------------------------------
    const uploadImage = () => {
        if(imageUpload==null)return;
        //if not null have to first remove old image
        if(imageURL!=null){
            deleteFromFirebase(imageURL);
        }

        //add new image
        let imageRef = ref(storage,`bookImages/${imageUpload.name+v4()}`);

        uploadBytes(imageRef,imageUpload).then(()=>{
            getDownloadURL(imageRef).then((innerUrl)=>{
                setImageURL(innerUrl);
            });
            alert("Image Successfully Uploaded!");
            setImageChanged(true);
        });

    };

    const deleteFromFirebase = (url) => {
        //1.
        let pictureRef = ref(storage,imageURL);
       //2.
        deleteObject(pictureRef)
          .then(() => {
            //3.
            // setImages(allImages.filter((image) => image !== url));
            // alert("Picture is deleted successfully!");
          })
          .catch((err) => {
            console.log(err);
          });
      };
    

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

    function interviewChange(e,idx){
        setInterviewsArr(current => current.map((innerInterview)=>{
            if(innerInterview[0] === idx){
                return [idx,e.target.value,innerInterview[2]];
            }
            return innerInterview;
        }))
    }

    function interviewAuthorChange(e,idx){
        setInterviewsArr(current => current.map((innerInterview)=>{
            if(innerInterview[0] === idx){
                return [idx,innerInterview[1],e.target.value];
            }
            return innerInterview;
        }))
    }

    function saveButton(){
        updatePost(book.id);
        setOriImageURL(imageURL);
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
        if(imageChanged){
            deleteFromFirebase(imageURL);
        }
        setImageChanged(false);
        setImageURL(oriImageURL);
        setTitleText(oriTitleText);
        setEditionText(oriEditionText);
        setAwardsText(oriAwardsText);
        setDescText(oriDescText);
        setReviewsArr(oriReviewsArr);
        setInterviewsArr(oriInterviewsArr);
        setIsEdit(false);
        
    }

    function deleteBookButton(){
        if(imageURL!=null){
            deleteFromFirebase(imageURL);
        }
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

    function addNewInterview(){
        let newID = reviewsArr[reviewsArr.length-1][0]+1;
        let newInterview = [newID,"Interview Text","Writer Name"];
        setInterviewsArr(current => [...current,newInterview]);
        
    }

    function deleteInterview(idx){
        setInterviewsArr(current => current.filter((innerItem) => innerItem[0]!==idx));
        
    }

      //----------------------database stuff------------------------------------------------
  const fetchPost = async(instanceID) => {
    const res = await fetch(`https://shawn-hoo-portfolio-server.onrender.com/books/${instanceID}`);
    const data = await res.json();

    return data;
  }

  const deleteServerPost = async (id) => {
    await fetch(`https://shawn-hoo-portfolio-server.onrender.com/books/${id}`,{
      method: 'DELETE',
    });

    // setBlogRecords(blogRecords.filter((record) => record.id !== id));
    
  }

  const updatePost = async (instanceID) => {
    const postToUpdate = await fetchPost(instanceID);
    const updatedPost = {
      ...postToUpdate, 
      "title": titleText,
      "imageUrl": imageURL,
      "edition": editionText,
      "awards": awardsText,
      "description": descText,
      "reviews": reviewsArr,
      "interviews": interviewsArr
    }

    const res = await fetch(`https://shawn-hoo-portfolio-server.onrender.com/books/${instanceID}`, {
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
                        {imageURL==null?<FaFileImage size={300} />:<img className='bookcover-img' src={imageURL} />}
                        
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
                    {interviewsArr.map((interview) => 
                    <div key={interview[0]}>
                        <p className='text'><span>“</span><span>{interview[1]}</span><span>” —</span><span className='reviews-signoff-name'>{interview[2]}</span></p>
                    </div> 
                    )}
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
                        {imageURL==null?<FaFileImage size={300} />:<img className='bookcover-img' src={imageURL} />}
                        {/* <img className='bookcover-img' src={imageURL} /> */}
                        <div className='col-left-btn-collection'>
                            <input className='fileInputBook' type="file" onChange={(event) => {setImageUpload(event.target.files[0])}}/>
                            <button className='internalButtonLeft' onClick={uploadImage}>Upload</button>
                        </div>
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
                        <button className='internalButton' onClick={()=>deleteReview(review[0])}>Delete this review</button>
                        
                    </div> 
                    )}
                    <button onClick={addNewReview}>Add New Review</button>
                    
                    <h2 className='h2-header'>Interviews</h2>
                    {interviewsArr.map((interview) => 
                    <div key={interview[0]}>
                        <p className='text'>
                            <span>“</span>
                            <textarea className='editReviewDescription' type="text" id="editReviewDescription" name="editReviewDescription" rows="5" cols="100" value={interview[1]} onChange={(e)=>interviewChange(e,interview[0])}/>
                            <span>” —</span>
                            <input type="text" id="editReviewAuthor" name="editReviewAuthor" className='editReviewAuthor' value={interview[2]} onChange={(e)=>interviewAuthorChange(e,interview[0])}></input>
                        </p>
                        <button className='internalButton' onClick={()=>deleteInterview(interview[0])}>Delete this interview</button>
                        
                    </div> 
                    )}
                    <button onClick={addNewInterview}>Add New Interview</button>
                    <div className='innerBookBtnCollection'>
                        <button className='internalButton' onClick={cancelButton}>Cancel</button>
                        <button className='internalButton' onClick={deleteBookButton}>Delete Book</button>
                        <button className='internalButton' onClick={saveButton}>Save</button>
                    </div>

                </div>
            </div>
        )
    }

}

export default BookAdminInner
