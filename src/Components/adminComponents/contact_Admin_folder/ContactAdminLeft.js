import React from 'react'
import twitLogo from '../../contact/contactImages/twitter_logo.jpg';
import indeedLogo from '../../contact/contactImages/indeed_logo.jpg';
import msgLogo from '../../contact/contactImages/msg_logo.jpg';
import { useState, useEffect } from 'react';
import './ContactAdmin.css';

function ContactAdminLeft() {
  let [oriContactContent,setOriContactContent] = useState("");
  let [contactContent,setContactContent] = useState("");
  let [isEdit,setIsEdit] = useState(false);

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
    const res = await fetch('http://localhost:5000/contact');
    const data = await res.json();
    return data;
  }

  const fetchPost = async() => {
    const res = await fetch(`http://localhost:5000/contact/0`);
    const data = await res.json();

    return data;
  }

  const updatePost = async () => {
    const postToUpdate = await fetchPost();
    const updatedPost = {
      ...postToUpdate, 
      "content": contactContent
    }

    const res = await fetch(`http://localhost:5000/contact/0`, {
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

if(!isEdit){
  return (
    <div className='contactPageLeft'>
        <div className='contactPageDesc'>
            <p>{contactContent}</p>
        </div>
        <button className='editContactAdminBtn' onClick={triggerEdit}>Edit</button>
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
          <label htmlFor="editAdminContact">Description</label>
          <textarea className='editDescBox' type="text" id="editAdminContact" name="editAdminContact" rows="20" cols="2000" value={contactContent} onChange={handleBodyParaChange}/>
        </div>
        <div className='contactEditBtnCollection'>
          <button className='editContactAdminBtn' onClick={cancelEdit}>Cancel</button>
          <button className='editContactAdminBtn' onClick={saveEdit}>Save</button>
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
