import React from 'react'
import florids from '../../assets/book-cover_of-the-florids.png'
import '../CSS/ckeditor.css';
import './blogAdmin/BlogAdmin.css';
import BlogTags from './BlogTags'

function CreateDynamicBlog({content}) {

  return (
    <div className='dynamicContainer'>
      <h2>{content.header}</h2>
      <p>{content.date}</p>
      <p className='ck-content' dangerouslySetInnerHTML={{__html: content.bodyPara}} />
      <div>
        <BlogTags recordTags = {content.tags}/>
      </div>
    </div>
  )
}

const pageContainer = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
}

export default CreateDynamicBlog