import React from 'react'
import BlogPost from './BlogPost'
import './BlogPage.css';
import blogRecords from './blogRecords.json'

// this is the main page for blog
function BlogPage() {

  let blogPosts = blogRecords && blogRecords.map(post => <BlogPost instanceID = {post.id} recordHeader = {post.header} bodyPara = {post.bodyPara} recordDate = {post.date} recordTags = {post.tags} />)

  
  return (
    <div className='blogPageOuter'>
      {blogPosts}
    </div>
  )
}

export default BlogPage
