import React from 'react'
import blogRecords from '../blogRecords.json'
import BlogPostAdmin from './BlogPostAdmin.js'
import './BlogAdmin.css';

function BlogPageAdmin() {
  let blogPostsAdmin = blogRecords && blogRecords.map(post => <BlogPostAdmin key={post.id} instanceID = {post.id} recordHeader = {post.header} bodyPara = {post.bodyPara} recordDate = {post.date} recordTags = {post.tags} />)
  return (
    <div className='blogPageAdminOuter'>
      {blogPostsAdmin}
    </div>
  )
}

export default BlogPageAdmin
