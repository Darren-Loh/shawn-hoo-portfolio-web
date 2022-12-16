import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { MdOutlineLogout } from "react-icons/md";
import { FaBars } from "react-icons/fa";

function SmallNavMenuAdmin(props) {

    const [navClicked, setNavClicked] = useState(false);
    const { logout } = useAuth0();

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
            <NavLink to='/admin' className="nav-bar-small-logo">shawn hoo</NavLink>
            </div>

            <motion.div 
            className='nav-menu-small'
            variants={navVariant}
            initial="hidden"
            animate={navClicked ? "visible" : "hidden"}
            onClick={() => {setNavClicked(false)}}
            >
                <li><NavLink to='/admin/about' className={(({isActive}) => isActive ? "active" : undefined) + " admin-link"}>about</NavLink></li>
                <li><NavLink to='/admin/books' className={({isActive}) => isActive ? "active" : undefined}>{props.bookAll.length>1?"books":props.bookTitle}</NavLink></li>
                <li><NavLink to='/admin/publications' className={(({isActive}) => isActive ? "active" : undefined) + " admin-link"}>publications</NavLink></li>
                <li><NavLink to='/admin/blog' className={(({isActive}) => isActive ? "active" : undefined) + " admin-link"}>blog</NavLink></li>
                <li><NavLink to='/admin/contact' className={(({isActive}) => isActive ? "active" : undefined) + " admin-link"}>contact</NavLink></li>
                <li><a className="logout-button" onClick={() => logout({ returnTo: window.location.origin })}>logout <MdOutlineLogout style={{verticalAlign: 'middle'}}/></a></li>
            </motion.div>
        </nav>
    )
}

export default SmallNavMenuAdmin;