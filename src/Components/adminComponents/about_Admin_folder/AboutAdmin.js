import React from 'react'
import { useState, useEffect } from 'react';
import './AboutAdmin.css';

function AboutAdmin() {
  let [oriAboutContent,setOriAboutContent] = useState("");
  let [aboutContent,setAboutContent] = useState("");
  let [isEdit,setIsEdit] = useState(false);
  
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
    setIsEdit(!isEdit);
  }
  function cancelEdit(){
    setAboutContent(oriAboutContent);
    setIsEdit(!isEdit);
  }

  function handleBodyParaChange(e){
    setAboutContent(e.target.value);
  }

// inner styling
  const bodyStyle = {
  marginTop: 64,
  paddingTop: 20,
  fontWeight: 400,
  fontSize: '48px',
  color: '#102851',
  width: '70%',
  whiteSpace: "pre-line"
      }

  if(!isEdit){
    return (
      <div className='aboutAdminContainer'>
        <p className='contentContainer' style={bodyStyle}>
        {/* is the author of Of the Florids (Diode Editions, 2022), winner of the 2021 Diode Editions Chapbook Prize. His poetry has been anthologised in New Singapore Poetries (Gaudy Boy, 2022) and Exhale: An Anthology of Queer Singapore Voices (Math Paper Press, 2021) and published in New Delta Review, Queer Southeast Asia, Quarterly Literary Review Singapore, Voice and Verse Poetry Magazine and elsewhere. His Mandarin Chinese to English translations have been published in Journal of Practice, Research and Tangential Activities (PR&TA) and Exchanges: Journal of Literary Translation. He is Translation Tuesdays Editor at Asymptote. Shawn is born and based in Singapore. */}
        {aboutContent}
        </p>
        <button className='editAboutAdminBtn' onClick={triggerEdit}>Edit</button>

      </div>

      
    )
  }
  else{
    return(
      <div className='aboutAdminEditContainer'>
        <label htmlFor="editAdminAbout">Description</label>
        <textarea className='editDescBox' type="text" id="editAdminAbout" name="editAdminAbout" rows="20" cols="50" value={aboutContent} onChange={handleBodyParaChange}/>
        <div className='bottomBtns'>
          <button className='editAboutAdminBtn' onClick={cancelEdit}>Cancel</button>
          <button className='editAboutAdminBtn' onClick={saveEdit}>Save</button>
        </div>
      </div>
    )
  }

}

export default AboutAdmin
