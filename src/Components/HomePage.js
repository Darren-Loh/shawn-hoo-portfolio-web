import React, { useState } from 'react'
import './CSS/HomePage.css';
import { motion } from "framer-motion"
import shawnhoo from '../assets/shawnhoo.jpg'
import florids from '../assets/book-cover_of-the-florids.png'

const HomePage = () => {

  const [isHovering, setIsHovering] = useState(false)

  const handleMouseOver = () => {
    setIsHovering(true)
  }

  const handleMouseOut = () => {
    setIsHovering(false)
  }

  const textPadding = 20

  const textVariant = {
    hidden: {
      opacity: 0,
      transition: { ease: "easeOut", duration: 0.4 }
    },
    visible: {
      opacity: 1,
      transition: { ease: "easeOut", duration: 0.4 }
    }
  }
  
  return (
    <div style={{display: 'flex'}}>
      <div className="imageContainerStyle">
        <div className="textStyle">

          {/* first line */}
          <div>
            <motion.h1 
              variants={textVariant}
              initial="hidden"
              animate={isHovering ? "visible" : "hidden"}
              className="secondaryText"
              >
              test
            </motion.h1>


            <motion.h1 
              variants={textVariant}
              initial="visible"
              animate={isHovering ? "hidden" : "visible"}
              className="primaryText">
              Shawn Hoo
            </motion.h1>
          </div>

          {/* second line */}
          <div>
            <motion.h1 
              variants={textVariant}
              initial="hidden"
              animate={isHovering ? "visible" : "hidden"}
              className="secondaryText">
              test
            </motion.h1>

            <motion.h1 
              variants={textVariant}
              initial="visible"
              animate={isHovering ? "hidden" : "visible"}
              className="primaryText">
              is the author of
            </motion.h1>
          </div>
          
          {/* third line */}
          <motion.h1
            // animate={{y: 1.5}}
            // transition={{duration: 0.8, yoyo: Infinity}}
            >
            <i 
            className="floridsText"
            onMouseOver={handleMouseOver} 
            onMouseOut={handleMouseOut}>
              Of the Florids.
            </i>
          </motion.h1>

          {/* fourth line */}
          <div>
            <motion.h1 
              variants={textVariant}
              initial="hidden"
              animate={isHovering ? "visible" : "hidden"}
              className="secondaryText">
              test
            </motion.h1>

            <motion.h1 
              variants={textVariant}
              initial="visible"
              animate={isHovering ? "hidden" : "visible"}
              className="primaryText">
              He is a person.
            </motion.h1>
          </div>
        </div>

        <div>
          {/* image section */}
          <motion.img 
            variants={textVariant}
            initial="hidden"
            animate={isHovering ? "visible" : "hidden"}
            src={florids}
            className="secondaryImage"
            alt='of the florids cover page'/>

          <motion.img 
            variants={textVariant}
            initial="visible"
            animate={isHovering ? "hidden" : "visible"}
            src={shawnhoo}
            className="primaryImage"
            alt='author portrait'/>
        </div>
      </div>
    </div>
  )
}

// const textStyle = {
//     position: 'absolute',
//     left: 180,
//     color: '#102851',
//     backgroundColor: 'rgba(245, 203, 156, 0.6)',
// }

// const imageContainerStyle = {
//     display: 'flex',
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'end',
//     height: '100vh',
//     marginLeft: '5vw',
//     marginRight: '5vw',
// }

export default HomePage