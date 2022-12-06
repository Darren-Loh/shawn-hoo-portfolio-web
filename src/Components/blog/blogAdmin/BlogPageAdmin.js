import React from 'react'
// import blogRecords from '../blogRecords.json'
import BlogPostAdmin from './BlogPostAdmin.js'
import './BlogAdmin.css';
import { useState, useEffect } from 'react';
import AddPostHeader from './AddPostHeader.js';

function BlogPageAdmin() {
  let blogPostsAdmin;
  let [blogRecords,setBlogRecords] = useState("");
  useEffect(() => {
    const getPosts = async() => {
      const postsFromServer = await fetchPosts();
      //reverse arr to display most recent first
      setBlogRecords(postsFromServer.slice(0).reverse());
    }

    getPosts();

  },[])

  // Fetch blogPosts from backend
  const fetchPosts = async() => {
    const res = await fetch('http://localhost:5000/blogPosts');
    const data = await res.json();

    return data;
  }

  return (
    <div className='blogPageAdminOuter'>
      {/* {blogPostsAdmin} */}
      <AddPostHeader blogRecords = {blogRecords} setBlogRecords = {setBlogRecords}/>
      {blogRecords && blogRecords.map((post,index) => <BlogPostAdmin key={post.id} itemIdx = {index} instanceID = {post.id} recordHeader = {post.header} bodyPara = {post.bodyPara} recordDate = {post.date} recordTags = {post.tags} blogRecords = {blogRecords} setBlogRecords = {setBlogRecords}/>)}
    </div>
  )
}

export default BlogPageAdmin
