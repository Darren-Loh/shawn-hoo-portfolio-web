import React from 'react'
import shawnhoo from '../assets/shawnhoo.jpg'
import florids from '../assets/book-cover_of-the-florids.png'

const HomePage = () => {
  return (
    <div>
        <div style={imageContainerStyle}>
            <div style={textStyle}>
                <text>Shawn Hoo</text>
                <br></br>
                <text>is the author of</text>
                <br></br>
                <i style={{color: '#EA0354', fontFamily: 'Newsreader-Italic'}}>Of the Florids.</i>
                <br></br>
                <br></br>
                <text>He is a person.</text>
            </div>
            <img style={{width: '75%'}} src={shawnhoo} alt='author portrait'/>
        </div>

        <div style={imageContainerStyle}>
            <div style={textStyle}>
                <text style={{backgroundColor: 'yellow', paddingLeft: 20, paddingRight: 20}}>Shawn Hoo</text>
                <br></br>
                <text>is the author of</text>
                <br></br>
                <i style={{color: '#EA0354', fontFamily: 'Newsreader-Italic'}}>Of the Florids.</i>
                <br></br>
                <br></br>
                <text>He is a person.</text>
            </div>
            <img style={{width: '40%'}} src={florids} alt='of the florids cover page'/>
        </div>
    </div>
  )
}

// const containerStyle = {
//     // marginLeft: 100,
//     // marginRight: 100,
//     backgroundColor: 'red'
// }

const textStyle = {
    position: 'absolute',
    left: 180,
    fontFamily: 'Newsreader-Regular',
    fontSize: 64,
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