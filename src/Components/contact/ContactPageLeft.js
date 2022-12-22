import React from 'react'
import { useState, useEffect } from 'react';
import twitLogo from './contactImages/twitter_logo.jpg';
import indeedLogo from './contactImages/indeed_logo.jpg';
import msgLogo from './contactImages/msg_logo.jpg';

function ContactPageLeft() {
  let [contactContent,setContactContent] = useState("");

  useEffect(() => {
    const getPosts = async() => {
      const postsFromServer = await fetchPosts();
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

  return (
    <div className='contactPageLeft'>
        <div className='contactPageDesc'>
          <p>{contactContent}</p>
        </div>
        <div className='contactPageIcons'>
            <img className='twitlogo' src={twitLogo} alt="TwitterLogo" />
            <img className='indeedlogo' src={indeedLogo} alt="IndeedLogo" />
            <img className='msglogo' src={msgLogo} alt="MessagegLogo" />
        
        </div>
    </div>
  )
}

export default ContactPageLeft
