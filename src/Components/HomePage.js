import React, { useState } from 'react'
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
    <div>
      <div style={imageContainerStyle}>
        <div style={textStyle}>

          {/* first line */}
          <div>
            <motion.h1 
              variants={textVariant}
              initial="hidden"
              animate={isHovering ? "visible" : "hidden"}
              style={{position: 'absolute', paddingLeft: textPadding, paddingRight: textPadding}}>
              test
            </motion.h1>


            <motion.h1 
              variants={textVariant}
              initial="visible"
              animate={isHovering ? "hidden" : "visible"}
              style={{paddingLeft: textPadding, paddingRight: textPadding}}>
              Shawn Hoo
            </motion.h1>
          </div>

          {/* second line */}
          <div>
            <motion.h1 
              variants={textVariant}
              initial="hidden"
              animate={isHovering ? "visible" : "hidden"}
              style={{position: 'absolute', paddingLeft: textPadding, paddingRight: textPadding}}>
              test
            </motion.h1>

            <motion.h1 
              variants={textVariant}
              initial="visible"
              animate={isHovering ? "hidden" : "visible"}
              style={{paddingLeft: textPadding, paddingRight: textPadding}}>
              is the author of
            </motion.h1>
          </div>
          
          {/* third line */}
          <motion.h1
            // animate={{y: 1.5}}
            // transition={{duration: 0.8, yoyo: Infinity}}
            >
            <i style={{color: '#EA0354', paddingLeft: textPadding, paddingRight: textPadding}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Of the Florids.</i>
          </motion.h1>

          {/* fourth line */}
          <div>
            <motion.h1 
              variants={textVariant}
              initial="hidden"
              animate={isHovering ? "visible" : "hidden"}
              style={{position: 'absolute', paddingLeft: textPadding, paddingRight: textPadding}}>
              test
            </motion.h1>

            <motion.h1 
              variants={textVariant}
              initial="visible"
              animate={isHovering ? "hidden" : "visible"}
              style={{paddingLeft: textPadding, paddingRight: textPadding}}>
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
            style={{height: '75vh', position: 'absolute', zIndex: '-10', right: 180}}
            alt='of the florids cover page'/>

          <motion.img 
            variants={textVariant}
            initial="visible"
            animate={isHovering ? "hidden" : "visible"}
            src={shawnhoo}
            style={{height: '75vh', position: 'relative', margin: '0 auto', zIndex: '-10'}}
            alt='author portrait'/>
        </div>
      </div>
    </div>
  )
}

const textStyle = {
    position: 'absolute',
    left: 180,
    color: '#102851',
    backgroundColor: 'rgba(245, 203, 156, 0.6)',
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