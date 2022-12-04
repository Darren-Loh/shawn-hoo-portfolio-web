import React from 'react'
// import blogRecords from '../blogRecords.json'
import BlogPostAdmin from './BlogPostAdmin.js'
import './BlogAdmin.css';
import { useState, useEffect } from 'react';

function BlogPageAdmin() {

  let [blogRecords,setBlogRecords] = useState("");
  useEffect(() => {
    const getPosts = async() => {
      const postsFromServer = await fetchPosts();
      // console.log(postsFromServer.id);
      setBlogRecords(postsFromServer);
    }

    getPosts();
  },[])

  // Fetch blogPosts from backend
  const fetchPosts = async() => {
    const res = await fetch('http://localhost:5000/blogPosts');
    const data = await res.json();

    return data;
  }

  let blogPostsAdmin = blogRecords && blogRecords.map((post,index) => <BlogPostAdmin key={index} instanceID = {index} recordHeader = {post.header} bodyPara = {post.bodyPara} recordDate = {post.date} recordTags = {post.tags} />)

  return (
    <div className='blogPageAdminOuter'>
      {blogPostsAdmin}
    </div>
  )
}

export default BlogPageAdmin
