import React from 'react'
import twitLogo from '../../contact/contactImages/twitter_logo.jpg';
import indeedLogo from '../../contact/contactImages/indeed_logo.jpg';
import msgLogo from '../../contact/contactImages/msg_logo.jpg';
import { useState, useEffect, useRef } from 'react';
import { AiOutlineEdit } from "react-icons/ai";
import './ContactAdmin.css';
import editStyles from "../../CSS/edit-style.module.css";

function ContactAdminLeft() {
  let [oriContactContent,setOriContactContent] = useState("");
  let [contactContent,setContactContent] = useState("");
  let [isEdit,setIsEdit] = useState(false);
  let timer = useRef();

  useEffect(() => {
    const getPosts = async() => {
      const postsFromServer = await fetchPosts();
      //reverse arr to display most recent first
    //   setBlogRecords(postsFromServer.slice(0).reverse());
    setOriContactContent(postsFromServer[0].content);
    setContactContent(postsFromServer[0].content);
    }

    getPosts();

  },[])

//----------------------database stuff------------------------------------------------
  const fetchPosts = async() => {
    const res = await fetch('https://shawn-hoo-portfolio-server.onrender.com/contact');
    const data = await res.json();
    return data;
  }

  const fetchPost = async() => {
    const res = await fetch(`https://shawn-hoo-portfolio-server.onrender.com/contact/0`);
    const data = await res.json();

    return data;
  }

  const updatePost = async () => {
    const postToUpdate = await fetchPost();
    const updatedPost = {
      ...postToUpdate, 
      "content": contactContent
    }

    const res = await fetch(`https://shawn-hoo-portfolio-server.onrender.com/contact/0`, {
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
  setOriContactContent(contactContent);
  setIsEdit(!isEdit);
}
function cancelEdit(){
  setContactContent(oriContactContent);
  setIsEdit(!isEdit);
}

function handleBodyParaChange(e){
  setContactContent(e.target.value);
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
    <div className='contactPageLeft'>
        <div className='contactPageDesc'>
          <div className={editStyles.editHeaderWrapper}>
            <h2 className={editStyles.editHeader}>Description</h2>
            <button className={editStyles.editHeaderButton} onClick={triggerEdit}><AiOutlineEdit className={editStyles.editIconMediumSize}/></button>
          </div>
          <div className={editStyles.editContentBorderWrapper}  onClick={onClickEditTextArea}>
            <p>{contactContent}</p>
          </div>
            
        </div>
        {/* <button className='editContactAdminBtn' onClick={triggerEdit}>Edit</button> */}
        <div className='contactPageIcons'>
            <img className='twitlogo' src={twitLogo} alt="TwitterLogo" />
            <img className='indeedlogo' src={indeedLogo} alt="IndeedLogo" />
            <img className='msglogo' src={msgLogo} alt="MessagegLogo" />
        
        </div>
    </div>
  )
}
else{
  return(
    <div className='contactPageLeft'>
        <div className='contactPageDesc'>
          <div className={editStyles.editHeaderWrapper}>
            <h2 className={editStyles.editHeader} style={{width: '100%'}}>Edit Description</h2>
            <button className={editStyles.editHeaderButton} onClick={triggerEdit}><AiOutlineEdit className={editStyles.editIconMediumSize}/></button>
          </div>
          <div>
            <textarea className={editStyles.editDescBox} type="text" id="editAdminContact" name="editAdminContact" rows="15" cols="2000" value={contactContent} onChange={handleBodyParaChange}/>
          </div>
          
        </div>
        <div className={editStyles.btnRow}>
          <button className={editStyles.editCancelBtn} onClick={cancelEdit}>Cancel</button>
          <button className={editStyles.editSaveBtn} onClick={saveEdit}>Save</button>
        </div>
        <div className='contactPageIcons'>
            <img className='twitlogo' src={twitLogo} alt="TwitterLogo" />
            <img className='indeedlogo' src={indeedLogo} alt="IndeedLogo" />
            <img className='msglogo' src={msgLogo} alt="MessagegLogo" />
        
        </div>
    </div>
  )
}


}

export default ContactAdminLeft
