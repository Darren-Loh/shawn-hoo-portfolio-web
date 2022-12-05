import React, { useState, useEffect } from 'react'
//component for blogtags to be used in a singular blogpost

function BlogTagAdmin({tagArr, setTagArr}) {
//   let renderContainer = tagArr.map((tag,index) => <div className={`blogTag ${index%2===0? "darkTagAdmin": "lightTagAdmin"}`} key = {index} onClick={removeTag}>{tag}</div>)
    function removeTag(e){
        setTagArr(tagArr.filter((tag, index) => index!==e));
        
    }
    
  return (
    <div className='blogTagContainer'>
      {/* {renderContainer} */}
      {tagArr.map((tag,index) => <div className={`blogTag ${index%2===0? "darkTagAdmin": "lightTagAdmin"}`} key = {index} idx = {index} onClick={()=>removeTag(index)}>{tag}</div>)}
    </div>
  )
}

export default BlogTagAdmin
