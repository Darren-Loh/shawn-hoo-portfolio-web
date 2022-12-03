import React, { useState } from 'react'
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


  // return function here
  if(!isEdit){
    //return this view if its not editing
    return (
      <div className='blogPostAdminContainer'>
        <div className='headerContainer'>
          <h2 className='blogPostAdminHeader'>{recordHeader}</h2>

        </div>
        <BlogTags instanceID = {instanceID} recordTags = {recordTags}/>
        <p className='blogPostAdminPara'>
          {bodyPara}
         </p>
        <div className='blogPostAdminBtmDiv'>
          <p className='blogPostAdminDate'>{recordDate}</p>

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

          <button className='admingBlogSaveBtn' id='saveButton' type='submit'>
          Save
          </button>
        </div>

  </form>
    )
  }

}

export default BlogPostAdmin
