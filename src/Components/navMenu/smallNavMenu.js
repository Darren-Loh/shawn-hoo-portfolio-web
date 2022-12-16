import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from 'react';
import { FaBars } from "react-icons/fa";

function SmallNavMenu(props) {

    const [navClicked, setNavClicked] = useState(false);

    const navVariant = {
        hidden: {
          x:-1000,
          transition: { ease: "easeOut", duration: 0.8 }
        },
        visible: {
          x:0,
          transition: { ease: "easeIn", duration: 0.8 }
        }
    };

    return (
        <nav className='nav-bar-small'>
            <div className="nav-bar-main-small">
            <FaBars className="nav-bar-small-icon" onClick={() => {setNavClicked(!navClicked)}}/>
            <NavLink to='/' className="nav-bar-small-logo" onClick={() => {setNavClicked(false)}}>shawn hoo</NavLink>
            </div>

            <motion.div 
            className='nav-menu-small'
            variants={navVariant}
            initial="hidden"
            animate={navClicked ? "visible" : "hidden"}
            onClick={() => {setNavClicked(false)}}
            >
                <li><NavLink to='/about' className={(({isActive}) => isActive ? "active" : undefined)}>about</NavLink></li>
                <li><NavLink to='/books' className={(({isActive}) => isActive ? "active" : undefined)}>{props.bookAll.length>1?"books":props.bookTitle}</NavLink></li>
                <li><NavLink to='/publications' className={(({isActive}) => isActive ? "active" : undefined)}>publications</NavLink></li>
                <li><NavLink to='/blog' className={(({isActive}) => isActive ? "active" : undefined)}>blog</NavLink></li>
                <li><NavLink to='/contact' className={(({isActive}) => isActive ? "active" : undefined)}>contact</NavLink></li>
            </motion.div>
        </nav>
    )
}

export default SmallNavMenu;