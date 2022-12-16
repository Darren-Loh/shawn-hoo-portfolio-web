import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from "react-icons/ai";

import BlogTags from '../BlogTags';
import BlogTagAdmin from './BlogTagAdmin.js';

import {storage} from "../../../firebase.js";
import {ref,uploadBytes, listAll, getDownloadURL, deleteObject} from "firebase/storage";
import {v4} from 'uuid';
import {FaFileImage} from "react-icons/fa";

function BlogPostAdmin({itemIdx, instanceID, recordImageUrl, recordHeader, bodyPara, recordDate, recordTags, blogRecords, setBlogRecords}) {
  let [isEdit, setIsEdit] = useState(false);
  let [headerText, setHeaderText] = useState(recordHeader);
  let [paraText, setParaText] = useState(bodyPara);
  let [dateText, setDateText] = useState(recordDate);
  let [tagArr, setTagArr] = useState(recordTags);
  let [addTagText, setAddTagText] = useState("");

  //firebase values
  let [imageUpload,setImageUpload] = useState(null);
  let [oriImageURL, setOriImageURL] = useState(recordImageUrl);
  let [imageURL, setImageURL] = useState(recordImageUrl);
  let [imageChanged, setImageChanged] = useState(false);


  //----------------------firebase stuff------------------------------------------------
  const uploadImage = (e) => {
      e.preventDefault();
      // console.log("hello");
      if(imageUpload==null)return;
      //if not null have to first remove old image
      if(imageURL!=null){
          deleteFromFirebase(imageURL);
      }

      //add new image
      let imageRef = ref(storage,`blogImages/${imageUpload.name+v4()}`);

      uploadBytes(imageRef,imageUpload).then(()=>{
          getDownloadURL(imageRef).then((innerUrl)=>{
              console.log(innerUrl);
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

  function triggerEditMode(){
    setIsEdit(!isEdit);
  }

  function handleHeaderChange(e){
    setHeaderText(e.target.value);
    
  }

  function handleBodyParaChange(e){
    setParaText(e.target.value);
  }

  function handleDateChange(e){
    setDateText(e.target.value);
  }

  function handleAddTagChange(e){
    setAddTagText(e.target.value);
  }

  let addToTagArr = (e) => {
    e.preventDefault();
    setTagArr(current => [...current, addTagText]);
    setAddTagText("");
  };

  //----------------------database stuff------------------------------------------------
  const fetchPost = async(instanceID) => {
    const res = await fetch(`http://localhost:5000/blogPosts/${instanceID}`);
    const data = await res.json();

    return data;
  }

  const deleteServerPost = async (id) => {
    await fetch(`http://localhost:5000/blogPosts/${id}`,{
      method: 'DELETE',
    });

    setBlogRecords(blogRecords.filter((record) => record.id !== id));
    
  }

  const updatePost = async (instanceID) => {
    const postToUpdate = await fetchPost(instanceID);
    const updatedPost = {
      ...postToUpdate, 
      "header": headerText,
      "imageUrl":imageURL,
      "bodyPara": paraText,
      "date": dateText,
      "tags": tagArr
    }

    const res = await fetch(`http://localhost:5000/blogPosts/${instanceID}`, {
      method:'PUT',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedPost)
    })

    const data = await res.json();
  }

  //----------------------database stuff------------------------------------------------

  // button methods
  let onSavePost = (e) => {
    e.preventDefault();
    setIsEdit(!isEdit);
    setImageChanged(false);
    setOriImageURL(imageURL);
    updatePost(instanceID);
  };

  let onDeletePost = (e) => {
    e.preventDefault();
    if (window.confirm("Proceed to delete post?")) {
      deleteFromFirebase(imageURL);
      deleteServerPost(instanceID);
    }
  };

  let onCancel = (e) => {
    e.preventDefault();
    setIsEdit(false);
    if(imageChanged){
      deleteFromFirebase(imageURL);
    }
    setImageChanged(false);
    resetAllText();
    
  };

  function resetAllText(){
    setHeaderText(recordHeader);
    setImageURL(oriImageURL);
    setParaText(bodyPara);
    setDateText(recordDate);
    setTagArr(recordTags);
    setAddTagText("");
}

  function handleAddNewTag(e) {
    e.preventDefault();
    if (e.key === 'Enter') {
        // console.log(e.target.value);
        setTagArr(oldArray => [...oldArray, "qweqwe"]);
        // setAddTagText("");
        console.log(tagArr);
    }
  }

  // return function here
  if(!isEdit){
    //return this view if its not editing
    return (
      <div className='blogPostAdminContainer'>
        <div className='headerContainer'>
          <h2 className='blogPostAdminHeader'>{headerText}</h2>
          <div className='headerBtns'>
            <button className='blogPostEditBtn' onClick={triggerEditMode}>
            <AiOutlineEdit style={{verticalAlign: 'middle'}}/>
            </button>
          </div>
        </div>
        <div className='editImage'>
            {imageURL==null?<FaFileImage size={300} />:<img className='bookcover-img' src={imageURL} />}
        </div>
        <p className='blogPostAdminDate'>{dateText}</p>
        
        <p className='blogPostAdminPara'>
          {paraText}
          </p>
        <div className='blogPostAdminBtmDiv'>
          <BlogTags recordTags = {tagArr}/>

          {/* <div className='headerBtns'>
            <button className='blogPostEditBtn' onClick={triggerEditMode}>Edit</button>
          </div> */}
        </div>
        
      </div>
    )
  }else{
    //return this view if it is currently editing
    return (
      <form className='blogPostEditContainer'>
        <h2 style={{margin: 0}}>Edit Post</h2>
        <div className='editHeader'>
            <label className='editBlogPostLabels' htmlFor="editInnerHeader" >Header</label>
            <input className='editInputs' type="text" id="editInnerHeader" name="editInnerHeader" value={headerText} onChange={handleHeaderChange}></input>
        </div> 
        <div className='editImage'>
            {imageURL==null?<FaFileImage size={300} />:<img className='bookcover-img' src={imageURL} />}
            {/* <img className='bookcover-img' src={imageURL} /> */}
            <div className='col-left-btn-collection'>
                <input className='fileInputBook' type="file" onChange={(event) => {setImageUpload(event.target.files[0])}}/>
                <button className='internalButtonLeft' onClick={(e)=>uploadImage(e)}>Upload</button>
            </div>
        </div>
        <div className='editDate'>
            <label className='editBlogPostLabels' htmlFor="editInnerDate">Date</label>
            <input className='editInputs' type="text" id="editInnerDate" name="editInnerDate" value={dateText} onChange={handleDateChange}/>
          </div>
      
        <div className='editTags'>
          <label className='editBlogPostLabels'>Tags</label>
          <div className='editTagsWrapper'>
              <BlogTagAdmin tagArr = {tagArr} setTagArr={setTagArr}/>
              <input className='blogTagAdminInput' type="text" name="addInnerTags" placeholder='Add tag here' value={addTagText} onChange={handleAddTagChange} onKeyDown={handleAddNewTag}></input>
          </div>
        </div>

        
        <div className='editPara'>
          <label className='editBlogPostLabels' htmlFor="editInnerPara">Description</label>
          <textarea className='editParaBox' type="text" id="editInnerPara" name="editInnerPara" rows="10" cols="50" value={paraText} onChange={handleBodyParaChange}/>
        </div>

        <div className='adminBlogBtmDiv'>
          {/* <div className='editTags'>
            <BlogTagAdmin tagArr = {tagArr} setTagArr={setTagArr}/>
            <div className='addTags'>
              <input className='blogTagAdmin' type="text" id="addInnerTags" name="addInnerTags" placeholder='add tag here' value={addTagText} onChange={handleAddTagChange}></input>
              <button className='editInputs blogTag' id='addTagBtn' onClick={addToTagArr}>Add</button>
            </div>
          </div> */}

        <div className='adminBlogEditBtnCollection'>
          <button className='admingBlogCancelBtn' id='cancelButton' type='submit' onClick={onCancel}>
            Cancel
          </button>
          <button className='admingBlogDeleteBtn' id='deleteButton' type='submit' onClick={onDeletePost}>
            Delete
          </button>
          <button className='admingBlogSaveBtn' id='saveButton' type='submit' onClick={onSavePost}>
            Save
          </button>
        </div>

        </div>

  </form>
    )
  }
  
  

}

export default BlogPostAdmin
