import React from 'react'
import { useState, useEffect } from 'react';

function PublicationsTypeAdmin({title, publications, instanceID}) {
  // console.log(publications[0].second);
  let [isEdit, setIsEdit] = useState(false);
  let [headerText, setHeaderText] = useState(title);
  let [pubArr, setPubArr] = useState(publications);
  let [pubTextArr1, setPubTextArr1] = useState(publications.map((item)=>item.first));
  let [pubTextArr2, setPubTextArr2] = useState(publications.map((item)=>item.second));

  function triggerEdit(){
    setIsEdit(true);
  }

  function saveBtn(){
    updatePost(instanceID);
    setIsEdit(false);
  }

  function resetAll(){
    setPubArr(publications);
    setPubTextArr1(publications.map((item)=>item.first));
    setPubTextArr2(publications.map((item)=>item.second));
    setIsEdit(false);
  }

  function updatePubArr(){
    setPubArr(pubArr.map((item,idx) => {
      item.first = pubTextArr1[idx];
      item.second = pubTextArr2[idx];
      return item;
    }));
    // console.log(pubArr);
  }

  //----------------handle input change---------------------

  function handleHeaderChange(e){
    setHeaderText(e.target.value);
  }

  function handleContentChange1(e,idx){
    setPubTextArr1(pubTextArr1.map((item,innerIdx)=>{
        if(idx === innerIdx){
            return e.target.value;
        }
        return item;
    }));

  }
  function handleContentChange2(e,idx){
    setPubTextArr2(pubTextArr2.map((item,innerIdx)=>{
        if(idx === innerIdx){
            return e.target.value;
        }
        return item;
    }));

  }
//----------------------------------------------

//----------------------database stuff------------------------------------------------
const fetchPost = async(instanceID) => {
  const res = await fetch(`http://localhost:5000/publications/${instanceID}`);
  const data = await res.json();

  return data;
}

const deleteServerPost = async (id) => {
  await fetch(`http://localhost:5000/publications/${id}`,{
    method: 'DELETE',
  });

  // setBlogRecords(blogRecords.filter((record) => record.id !== id));
  
}

const updatePost = async (instanceID) => {
  const postToUpdate = await fetchPost(instanceID);
  updatePubArr();
  let newPost = [headerText,pubArr];
  // console.log(pubArr);
  const updatedPost = {
    ...postToUpdate, 
    "category": newPost
    // "bodyPara": paraText,
    // "date": dateText,
    // "tags": tagArr
  }

  const res = await fetch(`http://localhost:5000/publications/${instanceID}`, {
    method:'PUT',
    headers:{
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updatedPost)
  })

  const data = await res.json();
}

//----------------------database stuff------------------------------------------------


  //return here
  if(!isEdit){
    return (
        <div>
            <h2 style={{paddingTop: 20}}>{title}</h2>
            {pubArr.map((publication) => (
                <div>
                    {/* possibly has to change this to an a tag */}
                    <text>{publication.first}. <i>{publication.second}</i>. </text>
                </div>
            ))}
            <button className='publicationsAdminEditBtn' onClick={triggerEdit}>Edit</button>
        </div>
      )
  }
  else{
    return(
        <div className='publicationsEditContainer'>
            <label className='editPubTypeCat' htmlFor="editPubCat" >Category</label>
            <input className='editHeaderInputs' type="text" id="editPubCat" name="editPubCat" value={headerText} onChange={handleHeaderChange}></input>
            <label className='editPubTypeContent' htmlFor="editPubContent" >Content</label>
            {pubArr.map((publication,idx) => (
                <div className='editContentInputsContainer'>
                    
                    <input className='editContentInputs' type="text" id="editPubContent" name="editPubContent" value={pubTextArr1[idx]} onChange={(e)=>handleContentChange1(e,idx)}></input>
                    <input className='editContentInputs' type="text" id="editPubContent" name="editPubContent" value={pubTextArr2[idx]} onChange={(e)=>handleContentChange2(e,idx)}></input>
                </div>
            ))}
            <div className='pubEditBtnCollection'>
              <button className='publicationsAdminEditBtn' onClick={resetAll}>Cancel</button>
              <button className='publicationsAdminEditBtn' onClick={saveBtn}>Save</button>
            </div>
        </div>
    )
  }

}

export default PublicationsTypeAdmin
