import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from "react-icons/ai";

import BlogTags from '../BlogTags';
import BlogTagAdmin from './BlogTagAdmin.js';
import inputTagStyle from "../../CSS/input-tag-style.module.css";
import editStyles from "../../CSS/edit-style.module.css";

function BlogPostAdmin({itemIdx, instanceID, recordHeader, bodyPara, recordDate, recordTags, blogRecords, setBlogRecords}) {
  let [isEdit, setIsEdit] = useState(false);
  let [headerText, setHeaderText] = useState(recordHeader);
  let [paraText, setParaText] = useState(bodyPara);
  let [dateText, setDateText] = useState(recordDate);
  let [tagArr, setTagArr] = useState(recordTags);
  let [addTagText, setAddTagText] = useState("");

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
    updatePost(instanceID);
  };

  let onDeletePost = (e) => {
    e.preventDefault();
    deleteServerPost(instanceID);
  };

  let onCancel = (e) => {
    e.preventDefault();
    setIsEdit(false);
    resetAllText();
    
  };

  function resetAllText(){
    setHeaderText(recordHeader);
    setParaText(bodyPara);
    setDateText(recordDate);
    setTagArr(recordTags);
    setAddTagText("");
  }

  function handleAddNewTag(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        setTagArr(current => [...current, addTagText]);
        setAddTagText("");
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
        <p className='blogPostAdminDate'>{dateText}</p>
        
        <p className='blogPostAdminPara'>
          {paraText}
          </p>
        <div className='blogPostAdminBtmDiv'>
          <BlogTags recordTags = {tagArr}/>
        </div>
        
      </div>
    )
  }else{
    //return this view if it is currently editing
    return (
      <form className='blogPostEditContainer'>
        <h2 style={{margin: 0}}>Edit Post</h2>
        <div className={editStyles.editInputBoxWrapper}>
            <input className={editStyles.editInputBox} type="text" id="editInnerHeader" name="editInnerHeader" value={headerText} onChange={handleHeaderChange} placeholder="Title"></input>
        </div> 

        <div className={editStyles.editInputBoxWrapper}>
            <input className={editStyles.editInputBox} type="text" id="editInnerDate" name="editInnerDate" value={dateText} onChange={handleDateChange} placeholder="Date"/>
        </div>
      
        <div className={inputTagStyle.inputTextAreaWrapper}>
            <BlogTagAdmin tagArr = {tagArr} setTagArr={setTagArr}/>
            <input className={inputTagStyle.inputTextArea} type="text" name="addInnerTags" placeholder='Add tag here' value={addTagText} onChange={handleAddTagChange} onKeyDown={handleAddNewTag}></input>
        </div>

        <div className={editStyles.editTextAreaBoxWrapper}>
            <textarea className={editStyles.editTextAreaBox} type="text" id="editInnerPara" name="editInnerPara" rows="10" cols="50" value={paraText} onChange={handleBodyParaChange} placeholder="Write post description here..."/>
        </div>

        <div className={`${editStyles.btnRow} btnRowCollectionSplitCol`}>
            <div className='btnCollectionStickLeft'>
              <button className={editStyles.editCancelBtn} type='submit' onClick={onCancel}>Cancel</button>
              <button className={editStyles.editSaveBtn} type='submit' onClick={onSavePost} >Save</button>
            </div>
            <div>
              <button className={editStyles.editDeleteBtn} type='submit' onClick={onDeletePost} >Delete</button>
            </div>
        </div>

  </form>
    )
  }
  
  

}

export default BlogPostAdmin
