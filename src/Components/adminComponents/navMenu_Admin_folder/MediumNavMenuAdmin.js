import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { MdOutlineLogout } from "react-icons/md";

function MediumNavMenuAdmin(props) {
    const { logout } = useAuth0();

    return (
        <nav className='nav-bar nav-bar-admin'>
            <div className='nav-logo nav-logo-admin'>
                <NavLink to='/admin' className="logo">shawn hoo</NavLink>
            </div>
            <ul className='nav-links'>
                <div className='nav-menu'>
                    <li><NavLink to='/admin/about' className={(({isActive}) => isActive ? "active" : undefined) + " admin-link"}>about</NavLink></li>
                    <li><NavLink to='/admin/books' className={(({isActive}) => isActive ? "active" : undefined) + " admin-link"}>{props.bookLength>1?"books":props.bookTitle}</NavLink></li>
                    <li><NavLink to='/admin/publications' className={(({isActive}) => isActive ? "active" : undefined) + " admin-link"}>publications</NavLink></li>
                    <li><NavLink to='/admin/blog' className={(({isActive}) => isActive ? "active" : undefined) + " admin-link"}>blog</NavLink></li>
                    <li><NavLink to='/admin/contact' className={(({isActive}) => isActive ? "active" : undefined) + " admin-link"}>contact</NavLink></li>
                    <li><a className="logout-button" onClick={() => logout({ returnTo: window.location.origin })}>logout <MdOutlineLogout style={{verticalAlign: 'middle'}}/></a></li>
                </div>
            </ul>
        </nav>
    )
}

export default MediumNavMenuAdmin;