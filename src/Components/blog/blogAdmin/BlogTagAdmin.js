import React, { useState, useEffect } from 'react';
import { MdCancel } from "react-icons/md";

import inputTagStyle from "../../CSS/input-tag-style.module.css";
//component for blogtags to be used in a singular blogpost

function BlogTagAdmin({tagArr, setTagArr}) {
//   let renderContainer = tagArr.map((tag,index) => <div className={`blogTag ${index%2===0? "darkTagAdmin": "lightTagAdmin"}`} key = {index} onClick={removeTag}>{tag}</div>)
    function removeTag(e){
        setTagArr(tagArr.filter((tag, index) => index!==e));
        
    }
    
  return (
    // 'blogTagContainer'
    <div className={inputTagStyle.inputTagWrapper}>
      {/* {renderContainer} */}
      {tagArr.map((tag,index) => <div className={inputTagStyle.inputTag} key = {index} idx = {index} onClick={()=>removeTag(index)}>{tag}<MdCancel className={inputTagStyle.cancelIcon}/></div>)}
    </div>
  )
}

export default BlogTagAdmin
