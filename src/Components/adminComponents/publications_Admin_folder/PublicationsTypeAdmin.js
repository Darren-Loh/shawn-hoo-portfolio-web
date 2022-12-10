import React from 'react'
import { useState, useEffect } from 'react';
import _ from "lodash" // Import the entire lodash library, deepcopy required for cancel function

function PublicationsTypeAdmin({title, publications, instanceID}) {
  // console.log(publications[0].second);
  let [isEdit, setIsEdit] = useState(false);
  let [headerText, setHeaderText] = useState(title);
  let [oriPubArr, setOriPubArr] = useState(_.cloneDeep(publications));
  let [pubArr, setPubArr] = useState(_.cloneDeep(publications));

  function triggerEdit(){
    setIsEdit(true);
  }

  function saveBtn(){
    updatePost(instanceID);
    setOriPubArr(_.cloneDeep(pubArr));
    setIsEdit(false);
  }

  function resetAll(){
    console.log(oriPubArr);
    setPubArr(_.cloneDeep(oriPubArr));
    setIsEdit(false);
  }



  function deleteContent(e,idx){
    setPubArr((current)=>current.filter((content)=> content.id !== idx));

  }

  //----------------handle input change---------------------

  function handleHeaderChange(e){
    setHeaderText(e.target.value);
  }

  function handleContentChange1(e,idx){

    setPubArr(pubArr.map((item)=>{
      if(item.id === idx){
        item.first = e.target.value;
        return item;
      }
      return item;
      
    }))

  }
  
  function handleContentChange2(e,idx){

    setPubArr(pubArr.map((item)=>{
      if(item.id === idx){
        item.second = e.target.value;
        return item;
      }
      return item;
      
    }))

  }
  function addNewContent(){
    let newId = pubArr[pubArr.length-1].id +1;
    let newItem = {"id": newId, "first": "", "second": ""};
    setPubArr(current => [...current,newItem]);
    updatePost(instanceID);
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

  
}

const updatePost = async (instanceID) => {
  const postToUpdate = await fetchPost(instanceID);
  
  let newPost = [headerText,pubArr];

  const updatedPost = {
    ...postToUpdate, 
    "category": newPost

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
            {pubArr.map((publication) => (
                <div className='editContentInputsContainer' key={publication.id}>
                    
                    <input className='editContentInputs' type="text" id="editPubContent" name="editPubContent" value={publication.first} onChange={(e)=>handleContentChange1(e,publication.id)} ></input>
                    <input className='editContentInputs' type="text" id="editPubContent" name="editPubContent" value={publication.second} onChange={(e)=>handleContentChange2(e,publication.id)} ></input>
                    <div className='deleteText' onClick={(e)=>deleteContent(e,publication.id)} ></div>
                </div>
            ))}
            <div className='addNewInnerContent' onClick={addNewContent}>Add New Content</div>
            <div className='pubEditBtnCollection'>
              <button className='publicationsAdminEditBtn' onClick={resetAll}>Cancel</button>
              <button className='publicationsAdminEditBtn' onClick={saveBtn}>Save</button>
            </div>
        </div>
    )
  }

}

export default PublicationsTypeAdmin
