import React, { useEffect, useState } from 'react'
import BlogTags from '../BlogTags.js'

function BlogPostAdmin({instanceID, recordHeader, bodyPara, recordDate, recordTags}) {
  let [isEdit, setIsEdit] = useState(false);
  let [headerText, setHeaderText] = useState(recordHeader);
  let [paraText, setParaText] = useState(bodyPara);
  let [dateText, setDateText] = useState(recordDate);

  function triggerEditMode(){
    setIsEdit(!isEdit);
  }

  function handleHeaderChange(e){
    setHeaderText(e.target.value);
    recordHeader = e.target.value;
  }

  function handleBodyParaChange(e){
    setParaText(e.target.value);
  }

  function handleDateChange(e){
    setDateText(e.target.value);
  }

  //----------------------database stuff------------------------------------------------
  const fetchPost = async(instanceID) => {
    const res = await fetch(`http://localhost:5000/blogPosts/${instanceID}`);
    const data = await res.json();

    return data;
  }

  const updatePost = async (instanceID) => {
    const postToUpdate = await fetchPost(instanceID);
    const updatedPost = {
      ...postToUpdate, 
      header: headerText,
      "bodyPara": paraText,
      "date": dateText
    }

    const res = await fetch(`http://localhost:5000/blogPosts/${instanceID}`, {
      method:'PUT',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedPost)
    })

    const data = await res.json();
    console.log(data);
  }

  // "header":"Sealey Challenge 1 2022",
  // "tags":["poetry1","poetry2", "poetry3"],
  // "bodyPara":"Read a book of poems a day for the whole of August. Here’s my accompanying reading diary: not so much “reviews” as meditations on the words that float up to me as I close these books, or scribbles on the snatches of phrases that seem to arise out of a. CONTINUE. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  // "date":"21 August 2022"
  //----------------------database stuff------------------------------------------------

  let onSubmitTask = (e) => {
    e.preventDefault();
    setIsEdit(!isEdit);
    updatePost(instanceID);
  };

  // return function here
  if(!isEdit){
    //return this view if its not editing
    return (
      <div className='blogPostAdminContainer'>
        <div className='headerContainer'>
          <h2 className='blogPostAdminHeader'>{headerText}</h2>

        </div>
        <BlogTags instanceID = {instanceID} recordTags = {recordTags}/>
        <p className='blogPostAdminPara'>
          {paraText}
         </p>
        <div className='blogPostAdminBtmDiv'>
          <p className='blogPostAdminDate'>{dateText}</p>

          <div className='headerBtns'>
            <button className='blogPostEditBtn' onClick={triggerEditMode}>Edit</button>
          </div>
        </div>
        
      </div>
    )
  }else{
    //return this view if it is currently editing
    return (
      <form className='blogPostEditContainer'>
        <div className='editHeader'>
            <label className='editBlogPostLabels' htmlFor="editInnerHeader" >Header</label>
            <input className='editInputs' type="text" id="editInnerHeader" name="editInnerHeader" value={headerText} onChange={handleHeaderChange}></input>
        </div>

        <div className='editPara'>
          <label className='editBlogPostLabels' htmlFor="editInnerPara">Description</label>
          <textarea className='editParaBox' type="text" id="editInnerPara" name="editInnerPara" rows="10" cols="50" value={paraText} onChange={handleBodyParaChange}/>
        </div>

        <div className='adminBlogBtmDiv'>
          <div className='editDate'>
            <label className='editBlogPostLabels' htmlFor="editInnerDate">Date</label>
            <input className='editInputs' type="text" id="editInnerDate" name="editInnerDate" value={dateText} onChange={handleDateChange}/>
          </div>

          <button className='admingBlogSaveBtn' id='saveButton' type='submit' onClick={onSubmitTask}>
          Save
          </button>
        </div>

  </form>
    )
  }

}

export default BlogPostAdmin
