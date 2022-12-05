import React, { useState } from 'react'
import shawnhoo from '../assets/shawnhoo.jpg'
import florids from '../assets/book-cover_of-the-florids.png'

const HomePage = () => {

  const [isHovering, setIsHovering] = useState(false)
  const [firstLine, setFirstLine] = useState('Shawn Hoo')
  const [secondLine, setSecondLine] = useState('is the author of')
  const [fourthLine, setFourthLine] = useState('He is a person.')

  const handleMouseOver = () => {
    setIsHovering(true)
    setFirstLine('test')
    setSecondLine('test')
    setFourthLine('test')
  }

  const handleMouseOut = () => {
    setIsHovering(false)
    setFirstLine('Shawn Hoo')
    setSecondLine('is the author of')
    setFourthLine('He is a person')
  }
  
  return (
    <div>
      <div style={imageContainerStyle}>
        {/* <div style={imageContainerStyle}> */}
        <div style={textStyle}>
          <h1>
            {firstLine}
          </h1>

          <h1 >
            {secondLine}
          </h1>

          <h1><i style={{color: '#EA0354'}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Of the Florids.</i></h1>

          <h1 >
            {fourthLine}
          </h1>
        </div>
        <img 
        src={isHovering ? florids : shawnhoo} 
        style={isHovering ? null : {width: '75%'}}
        alt={isHovering ? 'of the florids cover page' : 'author portrait'}/>
        {/* </div> */}
        {/* {
          isHovering ? (
            <div style={imageContainerStyle}>
              <div style={textStyle}>
                <h1 className='floridsHovering'>Shawn Hoo</h1>
                <h1 className='floridsHovering'>is the author of</h1>
                <h1 className='floridsHovering'><i style={{color: '#EA0354'}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Of the Florids.</i></h1>
                <h1 className='floridsHovering'>He is a person.</h1>
              </div>
              <img className='floridsHovering' src={florids} alt='of the florids cover page'/>
            </div>
          ) : (
            <div style={imageContainerStyle}>
              <div style={textStyle}>
                <h1 className='floridsNotHovering'>Shawn Hoo</h1>
                <h1 className='floridsNotHovering'>is the author of</h1>
                <h1 className='floridsNotHovering'><i style={{color: '#EA0354'}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Of the Florids.</i></h1>
                <h1 className='floridsNotHovering'>He is a person.</h1>
              </div>
              <img className='floridsNotHovering' style={{width: '75%'}} src={shawnhoo} alt='author portrait'/>
            </div>
          )
        } */}
        {/* <div style={textStyle}>
          <h1 style={highlightStyle}>Shawn Hoo</h1>
          <h1 style={highlightStyle}>is the author of</h1>
          <h1 style={highlightStyle}><i style={{color: '#EA0354'}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Of the Florids.</i></h1>
          <h1 style={highlightStyle}>He is a person.</h1>
        </div> */}
        {/* <img style={{width: '75%'}} src={shawnhoo} alt='author portrait'/> */}
      </div>

      {/* <div style={imageContainerStyle}>
        <div style={textStyle}>
          <h1>Shawn Hoo</h1>
          <h1>is the author of</h1>
          <h1><i style={{color: '#EA0354'}}>Of the Florids.</i></h1>
          <h1>He is a person.</h1>
        </div>
        <img style={{width: '40%'}} src={florids} alt='of the florids cover page'/>
      </div> */}
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