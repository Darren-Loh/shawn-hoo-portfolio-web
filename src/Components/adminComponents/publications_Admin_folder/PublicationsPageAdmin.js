import React from 'react'
import { useState, useEffect } from 'react';
import PublicationsTypeAdmin from './PublicationsTypeAdmin'
import './PublicationsAdmin.css';

function PublicationsPageAdmin() {
    // have 1 overall map
    // on mount, split map into 3 diff arrays by category index
    // render 3 different maps into 3 divs for 3 columns
    let [arrAll,setArrAll] = useState([]);

    useEffect(() => {
        const getPosts = async() => {
        const postsFromServer = await fetchPosts();
        setArrAll(postsFromServer);
        
        }
        getPosts();
        

    },[])

    function addNewCategory(){
        let newID = arrAll[arrAll.length-1].id+1;
        let newPost = {
            "id": newID,
            "category": [
              "Category Name",
              [
                {
                  "id": 0,
                  "first": "Poem",
                  "second": "Source"
                }
              ]
            ]
          };

        addPostFunction(newPost);
        setArrAll(current => [...current,newPost]);
        
    }

    //----------------------database stuff------------------------------------------------
    const fetchPosts = async() => {
        const res = await fetch('http://localhost:5000/publications');
        const data = await res.json();
        return data;
    }
    const fetchPost = async(instanceID) => {
        const res = await fetch(`http://localhost:5000/publications/${instanceID}`);
        const data = await res.json();
    
        return data;
    }

    const addPostFunction = async (post) => {
        const res = await fetch('http://localhost:5000/publications', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(post),
        })

        const data = await res.json();
    }
    
    const updatePost = async (instanceID) => {
        const postToUpdate = await fetchPost(instanceID);
        // updatePubArr();
        // let newPost = [headerText,pubArr];
        // console.log(pubArr);
        const updatedPost = {
        ...postToUpdate, 
        // "category": newPost
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

    return (
        <div style={containerStyle}>
            <div style={columnContainerStyle}>
                {arrAll && arrAll.filter((cat,idx) => idx%3===0).map((cat) => <PublicationsTypeAdmin key = {cat.id} title={cat.category[0]} publications={cat.category[1]} instanceID = {cat.id} setArrAll={setArrAll}/>)}
            </div>

            <div style={columnContainerStyle}>
                {arrAll && arrAll.filter((cat,idx) => idx%3===1).map((cat) => <PublicationsTypeAdmin key = {cat.id} title={cat.category[0]} publications={cat.category[1]} setArrAll={setArrAll}/>)}
            </div>

            <div style={columnContainerStyle}>
                {arrAll && arrAll.filter((cat,idx) => idx%3===2).map((cat) => <PublicationsTypeAdmin key = {cat.id} title={cat.category[0]} publications={cat.category[1]} setArrAll={setArrAll}/>)}
            </div>
            <button className='publicationNewCat' onClick={addNewCategory}>Create new category</button>
        </div>
    )
}
const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    marginTop: 64,
    paddingTop: 20,
  }
  
  const columnContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  }

export default PublicationsPageAdmin
