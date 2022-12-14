import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { AiOutlineEdit } from "react-icons/ai";
import './AboutAdmin.css';
import editStyles from "../../CSS/edit-style.module.css";

function AboutAdmin() {
  let [oriAboutContent,setOriAboutContent] = useState("");
  let [aboutContent,setAboutContent] = useState("");
  let [isEdit,setIsEdit] = useState(false);
  let timer = useRef();
  
  useEffect(() => {
      const getPosts = async() => {
        const postsFromServer = await fetchPosts();
        //reverse arr to display most recent first
      //   setBlogRecords(postsFromServer.slice(0).reverse());
      setOriAboutContent(postsFromServer[0].content);
      setAboutContent(postsFromServer[0].content);
      }
  
      getPosts();
  
    },[])

  //----------------------database stuff------------------------------------------------
    const fetchPosts = async() => {
      const res = await fetch('http://localhost:5000/about');
      const data = await res.json();
      return data;
    }

    const fetchPost = async() => {
      const res = await fetch(`http://localhost:5000/about/0`);
      const data = await res.json();

      return data;
    }

    const updatePost = async () => {
      const postToUpdate = await fetchPost();
      const updatedPost = {
        ...postToUpdate, 
        "content": aboutContent
      }

      const res = await fetch(`http://localhost:5000/about/0`, {
        method:'PUT',
        headers:{
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updatedPost)
      })

      const data = await res.json();
    }

  //----------------------database stuff------------------------------------------------



  function triggerEdit(){
    setIsEdit(!isEdit);
  }
  function saveEdit(){
    updatePost();
    setOriAboutContent(aboutContent);
    setIsEdit(!isEdit);
  }
  function cancelEdit(){
    setAboutContent(oriAboutContent);
    setIsEdit(!isEdit);
  }

  function handleBodyParaChange(e){
    setAboutContent(e.target.value);
  }

  function onDoubleClick() {
    triggerEdit();
  }

  function onClickEditTextArea(e) {
    clearTimeout(timer.current);

    if (e.detail === 2) {
        onDoubleClick();
    }
  }

  
  if(!isEdit){
    return (
      <div className="about-wrapper-admin">
        <div className={editStyles.editHeaderWrapper}>
          <h2 className={editStyles.editHeader}>Description</h2>
          <button className={editStyles.editHeaderButton} onClick={triggerEdit}><AiOutlineEdit className={editStyles.editIconMediumSize}/></button>
        </div>

        <div className={editStyles.editContentBorderWrapper} onClick={onClickEditTextArea}>
          <p className='about-content-admin'>{aboutContent}</p>
        </div>
      </div>
    )
  }
  else{
    return(
      <div className="about-wrapper-admin">
        <div className={editStyles.editHeaderWrapper}>
          <h2 className={editStyles.editHeader}>Edit Description</h2>
          <AiOutlineEdit className={editStyles.editIconMediumSize}/>
        </div>
        <div>
          <textarea className={editStyles.editDescBox} type="text" id="editAdminAbout" name="editAdminAbout" rows="10" value={aboutContent} onChange={handleBodyParaChange}/>
        </div>
        <div className={editStyles.btnRow}>
          <button className={editStyles.editCancelBtn} onClick={cancelEdit}>Cancel</button>
          <button className={editStyles.editSaveBtn} onClick={saveEdit}>Save</button>
        </div>
      </div>
    )
  }

}

export default AboutAdmin
