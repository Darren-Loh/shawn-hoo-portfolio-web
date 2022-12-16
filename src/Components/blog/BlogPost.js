import React, { useState, useEffect } from 'react'
import BlogTags from './BlogTags'
import './BlogPage.css';

import {FaFileImage} from "react-icons/fa";

//this defines a singular blog post that will be used on blogpage
function BlogPost({instanceID, imageUrl, recordHeader, bodyPara, recordDate, recordTags}) {

  // state to check if keep reading has been clicked
  const [isKeepReading, setIsKeepReading] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);

  function toggleKeepReading(e){
    setIsKeepReading(true);
    e.target.remove();
  }

  function checkOverflow(){
    const paraContainer = document.querySelectorAll('.blogPostContainer');
      if(paraContainer[instanceID].childNodes[2].classList.contains("blogPostPara")){
        const para = paraContainer[instanceID].childNodes[2];

        if(para.scrollHeight>para.clientHeight){
          //means it is currently overflowing
          setIsOverflow(true);
        }
        else if (para.scrollHeight==para.clientHeight){
          setIsOverflow(false);
        }
    }

  }

  useEffect(() => {
    checkOverflow();
  },[]);

  //checking for zoom event, function gotten online
  const zoomEvent = new Event('zoom')
  let currentRatio = window.devicePixelRatio

  function checkZooming() {
    if (currentRatio !== window.devicePixelRatio) {
      window.dispatchEvent(zoomEvent)
    }
  }

  window.addEventListener('resize', checkZooming)

  // usage
  window.addEventListener('zoom', () => {
    //every user zoom event check if box overflows
    checkOverflow();
    
  })

  

  return (
    <div className='blogPostContainer'>
      <h2 className='blogPostHeader'>{recordHeader}</h2>
      <div className='editImage'>
            {imageUrl==null?<FaFileImage size={300} />:<img className='.bookcover-img-blog' src={imageUrl} />}
        </div>
      <p className='blogPostDate'>{recordDate}</p>
      
      <p className={isKeepReading? 'blogPostParaKeepReading':'blogPostPara'}>
        {bodyPara}
       </p>
      <div className='blogPostBtmDiv'>
        <BlogTags recordTags = {recordTags}/>
        {/* {this.checkVisability()} */}
        {isOverflow?<p className='blogPostKeepReading' onClick={toggleKeepReading}>Keep Reading</p>:''}
        {/* <div className='blogPostKeepReading' onClick={toggleKeepReading}>Keep Reading</div> */}
      </div>
      
    </div>
  )
}

export default BlogPost
