import React, { useState } from 'react'
import BlogTags from '../BlogTags.js'

function BlogPostAdmin({instanceID, recordHeader, bodyPara, recordDate, recordTags}) {
  let [isEdit, setIsEdit] = useState(false);
  function triggerEditMode(){
    setIsEdit(!isEdit);
  }
  if(!isEdit){
    //return this view if its not editing
    return (
      <div className='blogPostAdminContainer'>
        <div className='headerContainer'>
          <h2 className='blogPostAdminHeader'>{recordHeader}</h2>
          <div className='headerBtns'>
            <button className='blogPostEditBtn' onClick={triggerEditMode}>Edit</button>
          </div>
        </div>
        <BlogTags instanceID = {instanceID} recordTags = {recordTags}/>
        <p className='blogPostAdminPara'>
          {bodyPara}
         </p>
        <div className='blogPostAdminBtmDiv'>
          <p className='blogPostAdminDate'>{recordDate}</p>
        </div>
        
      </div>
    )
  }else{
    //return this view if it is currently editing
    return (
      <form className='blogPostEditContainer'>
        <div className='editHeader'>
            <label className='editBlogPostLabels' htmlFor="editInnerHeader" >Header</label>
            <input className='editInputs' type="text" id="editInnerHeader" name="editInnerHeader"></input>
        </div>

        <div className='editPara'>
          <label className='editBlogPostLabels' htmlFor="editInnerPara">Description</label>
          <textarea className='editParaBox' type="text" id="editInnerPara" name="editInnerPara" rows="10" cols="50"/>
        </div>

      <div className='editDate'>
          <label className='editBlogPostLabels' htmlFor="editInnerDate">Date</label>
          <input className='editInputs' type="text" id="editInnerDate" name="editInnerDate"/>
      </div>




      <button className='submitBtn' id='contactButton' type='submit'>
          SUBMIT
      </button>

  </form>
    )
  }

}

export default BlogPostAdmin
