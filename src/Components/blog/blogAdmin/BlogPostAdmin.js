import React, { useEffect, useState } from 'react'
import BlogTags from '../BlogTags'
import BlogTagAdmin from './BlogTagAdmin.js'

function BlogPostAdmin({itemIdx, instanceID, recordHeader, bodyPara, recordDate, recordTags}) {
  let [isEdit, setIsEdit] = useState(false);
  let [isDeleted, setIsDeleted] = useState(false);
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
    recordHeader = e.target.value;
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

  // function resetIndex(){
  //   // setBlogRecords(blogRecords.filter((posts,index) => posts.id = index));
  //   // console.log(blogRecords.length);
  //   for(let i = 0;i<blogRecords.length;i++){
  //     updatePostID(i);
  //   }
  // }

  function deletePost(id){
    let parent = document.querySelector(".blogPageAdminOuter");
    parent.childNodes[id].remove();
    // console.log()
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
    // console.log(id);
    await fetch(`http://localhost:5000/blogPosts/${id}`,{
      method: 'DELETE',
    });
    
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
    // console.log(data);
  }

  //----------------------database stuff------------------------------------------------

  // button methods
  let onSavePost = (e) => {
    e.preventDefault();
    setIsEdit(!isEdit);
    updatePost(instanceID);
  };

  let onDeletePost = (e) => {
    // console.log(instanceID);
    // setIsEdit(!isEdit);
    e.preventDefault();
    // deletePost(itemIdx);
    setIsDeleted(true);
    // let parent = document.querySelector(".blogPageAdminOuter");
    // removeAllChildNodes(parent);
    deleteServerPost(instanceID);
  };

  function removeAllChildNodes(parent){
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
  }

  // return function here
  if(isDeleted){
    return(<></>)
  }
  else{
    if(!isEdit){
      //return this view if its not editing
      return (
        <div className='blogPostAdminContainer'>
          <div className='headerContainer'>
            <h2 className='blogPostAdminHeader'>{headerText}</h2>
  
          </div>
          <p className='blogPostAdminDate'>{dateText}</p>
          
          <p className='blogPostAdminPara'>
            {paraText}
           </p>
          <div className='blogPostAdminBtmDiv'>
            <BlogTags recordTags = {tagArr}/>
  
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

          <div className='editDate'>
              <label className='editBlogPostLabels' htmlFor="editInnerDate">Date</label>
              <input className='editInputs' type="text" id="editInnerDate" name="editInnerDate" value={dateText} onChange={handleDateChange}/>
            </div>


          
          <div className='editPara'>
            <label className='editBlogPostLabels' htmlFor="editInnerPara">Description</label>
            <textarea className='editParaBox' type="text" id="editInnerPara" name="editInnerPara" rows="10" cols="50" value={paraText} onChange={handleBodyParaChange}/>
          </div>
  
          <div className='adminBlogBtmDiv'>
            <div className='editTags'>
              <BlogTagAdmin updatePost = {updatePost} instanceID = {instanceID} tagArr = {tagArr} setTagArr={setTagArr}/>
              <div className='addTags'>
                <input className='blogTagAdmin' type="text" id="addInnerTags" name="addInnerTags" placeholder='add tag here' value={addTagText} onChange={handleAddTagChange}></input>
                <button className='editInputs blogTag' id='addTagBtn' onClick={addToTagArr}>Add</button>
              </div>
            </div>
  
          <div className='adminBlogEditBtnCollection'>
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
  

}

export default BlogPostAdmin
