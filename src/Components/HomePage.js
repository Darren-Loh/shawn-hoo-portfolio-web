import React from 'react'
import shawnhoo from '../assets/shawnhoo.jpg'
import florids from '../assets/book-cover_of-the-florids.png'

const HomePage = () => {
  return (
    <div>
        <div style={imageContainerStyle}>
            <div style={textStyle}>
                <h1 style={highlightStyle}>Shawn Hoo</h1>
                <h1 style={highlightStyle}>is the author of</h1>
                <h1 style={highlightStyle}><i style={{color: '#EA0354'}}>Of the Florids.</i></h1>
                <h1 style={highlightStyle}>He is a person.</h1>
            </div>
            <img style={{width: '75%'}} src={shawnhoo} alt='author portrait'/>
        </div>

        <div style={imageContainerStyle}>
            <div style={textStyle}>
                <h1>Shawn Hoo</h1>
                <h1>is the author of</h1>
                <h1><i style={{color: '#EA0354'}}>Of the Florids.</i></h1>
                <h1>He is a person.</h1>
            </div>
            <img style={{width: '40%'}} src={florids} alt='of the florids cover page'/>
        </div>
    </div>
  )
}

const highlightStyle = {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#F5CB9C',
    opacity: 0.6,
}

const textStyle = {
    position: 'absolute',
    left: 180,
    color: '#102851',
}

const imageContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'end',
    height: '100vh',
    marginLeft: 80,
    marginRight: 80,
}

export default HomePage