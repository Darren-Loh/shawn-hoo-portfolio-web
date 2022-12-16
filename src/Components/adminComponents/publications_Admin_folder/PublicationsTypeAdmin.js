import React from 'react'
import { useState } from 'react';
import _ from "lodash"; // Import the entire lodash library, deepcopy required for cancel function
import PopupEditor from '../popup/PopupEditor';
import popupStyle from "../popup/PopupEditor.module.css";

function PublicationsTypeAdmin({title, publications, instanceID, setArrAll}) {
  // console.log(publications[0].second);
  let [isEdit, setIsEdit] = useState(false);
  let [headerText, setHeaderText] = useState(title);
  let [oriPubArr, setOriPubArr] = useState(_.cloneDeep(publications));
  let [pubArr, setPubArr] = useState(_.cloneDeep(publications));

  function triggerEdit(){
    setIsEdit(true);
  }

  //----------------handle input change---------------------

  function handleHeaderChange(title) {
    setHeaderText(title);
  }

  function handleContentChange1(newVal, idx){
    setPubArr(pubArr.map((item)=>{
      if(item.id === idx){
        item.first = newVal;
        return item;
      }
      return item;
      
    }))
  }
  
  function handleContentChange2(newVal, idx){
    setPubArr(pubArr.map((item)=>{
      if(item.id === idx){
        item.second = newVal;
        return item;
      }
      return item;
      
    }))
  }

  function handleAddItem(){
    let newId = pubArr[pubArr.length-1].id +1;
    let newItem = {"id": newId, "first": "", "second": ""};
    setPubArr(current => [...current,newItem]);
    updatePost(instanceID);
  }

  function handleDeleteItem(idx){
    setPubArr((current)=>current.filter((content)=> content.id !== idx));
  }

  function handleSave(){
    updatePost(instanceID);
    setOriPubArr(_.cloneDeep(pubArr));
    setIsEdit(false);
  }

  function handleResetCat(){
    console.log(oriPubArr);
    setPubArr(_.cloneDeep(oriPubArr));
    setIsEdit(false);
  }

  function handleDeleteCat(){
    deleteServerPost(instanceID);
    setArrAll(current => current.filter((item)=>item.id !==instanceID));
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
        <div>
            <div className={popupStyle.popupOverlay}></div>
            <PopupEditor 
              title={headerText} onTitleChange={handleHeaderChange}
              content={pubArr} onContentChange1={handleContentChange1} onContentChange2={handleContentChange2}
              onAddItem={handleAddItem}
              onDeleteItem={handleDeleteItem}
              onCancel={handleResetCat}
              onSave={handleSave}
              onDeleteCat={handleDeleteCat}
            />
        </div>
    )
  }

}

export default PublicationsTypeAdmin
