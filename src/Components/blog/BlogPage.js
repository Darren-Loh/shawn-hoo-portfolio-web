import React from 'react'
import BlogPost from './BlogPost'
import './BlogPage.css';
import { useState, useEffect } from 'react';

// this is the main page for blog
function BlogPage() {

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

  let blogPosts = blogRecords && blogRecords.slice(0).reverse().map((post,index) => <BlogPost key={index} instanceID = {index} recordHeader = {post.header} bodyPara = {post.bodyPara} recordDate = {post.date} recordTags = {post.tags} />)
  

  return (
    <div className='blogPageOuter'>
      {blogPosts}
      {/* <BlogPost key={0} instanceID = {0} recordHeader = {"SealyHeaderChallenge"} bodyPara = {"testing"} recordDate = {"2022"} recordTags = {["poetry","poetry2"]} /> */}
    </div>
    
  )
}

export default BlogPage
