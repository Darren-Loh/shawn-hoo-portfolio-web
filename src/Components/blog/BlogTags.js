import React, { useState, useEffect } from 'react'
//component for blogtags to be used in a singular blogpost

function BlogTags({instanceID, recordTags}) {
  //cheating here abit by using key = tag, which throws error if tags are ever the same 
  let renderContainer = recordTags.map(tag => <div className={'blogTag'} key = {tag}>{tag}</div>)

  useEffect(() => {
    // code to run after render goes here
    let tagContainer = document.querySelectorAll(".blogTagContainer");
    // console.log(tagContainer[instanceID].childNodes[0].classList.add("mysetle"));
    for(let i = 0 ; i < tagContainer[instanceID].childNodes.length; i ++){
      if (i%2===0){
        //if even
        tagContainer[instanceID].childNodes[i].classList.add("darkTag");
      }
      else{
        //if odd
        tagContainer[instanceID].childNodes[i].classList.add("lightTag");
      }
    }
  });


  

  return (
    // <div className='blogTagContainer'>
    //   <p className='blogTag darkTag'>poetry</p>
    //   <p className='blogTag lightTag'>poetry</p>
    // </div>


    <div className='blogTagContainer'>
      {renderContainer}
    </div>
  )
}

export default BlogTags
