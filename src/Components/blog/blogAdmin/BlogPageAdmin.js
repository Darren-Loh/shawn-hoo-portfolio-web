import React from 'react'
// import blogRecords from '../blogRecords.json'
import BlogPostAdmin from './BlogPostAdmin.js'
import './BlogAdmin.css';
import { useState, useEffect } from 'react';

function BlogPageAdmin() {
  let blogPostsAdmin;
  let [blogRecords,setBlogRecords] = useState("");
  useEffect(() => {
    const getPosts = async() => {
      const postsFromServer = await fetchPosts();
      
      // console.log(postsFromServer);
      // setBlogRecords("");
      

      setBlogRecords(postsFromServer);
      console.log(blogRecords);
    }

    getPosts();
    
    // console.log(blogRecords);
    // blogPostsAdmin = blogRecords && blogRecords.map((post,index) => <BlogPostAdmin key={index} instanceID = {index} recordHeader = {post.header} bodyPara = {post.bodyPara} recordDate = {post.date} recordTags = {post.tags} blogRecords={blogRecords} setBlogRecords ={setBlogRecords}/>)

  },[])

  // Fetch blogPosts from backend
  const fetchPosts = async() => {
    const res = await fetch('http://localhost:5000/blogPosts');
    const data = await res.json();

    return data;
  }


  // console.log(blogRecords);

  // blogPostsAdmin = blogRecords && blogRecords.map((post,index) => <BlogPostAdmin key={index} instanceID = {index} recordHeader = {post.header} bodyPara = {post.bodyPara} recordDate = {post.date} recordTags = {post.tags} blogRecords={blogRecords} setBlogRecords ={setBlogRecords}/>)

  return (
    <div className='blogPageAdminOuter'>
      {/* {blogPostsAdmin} */}
      {blogRecords && blogRecords.map((post,index) => <BlogPostAdmin key={index} itemIdx = {index} instanceID = {post.id} recordHeader = {post.header} bodyPara = {post.bodyPara} recordDate = {post.date} recordTags = {post.tags}/>)}
    </div>
  )
}

export default BlogPageAdmin
