import React from 'react'
import florids from '../../assets/book-cover_of-the-florids.png'

function CreateDynamicBlog() {

  let data = [
    {
      type: 'img',
      content: require('../../assets/book-cover_of-the-florids.png')
    },
    {
      type: 'text',
      content: 'lorem ipsum'
    },
    {
      type: 'img',
      content: require('../../assets/book-cover_of-the-florids.png')
    },
    {
      type: 'text',
      content: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
    }
  ]

  return (
    <div style={pageContainer}>
      {data.map((item) => {
        if (item.type === 'img') {
          return (
            <img src={item.content} style={{width: '30vw'}}/>
          )
        } else if (item.type === 'text') {
          return (
            <p>{item.content}</p>
          )
        }
      })}
    </div>
  )
}

const pageContainer = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
}

export default CreateDynamicBlog