import React from 'react'
import BlogPost from './BlogPost'
import './BlogPage.css';
import blogRecords from './blogRecords.json'

// this is the main page for blog
function BlogPage() {
    console.log(blogRecords);
  return (
    <div className='blogPageOuter'>
      <BlogPost instanceID = {0}/>
      <BlogPost instanceID = {1}/>
      <BlogPost instanceID = {2}/>
    </div>
  )
}

export default BlogPage
