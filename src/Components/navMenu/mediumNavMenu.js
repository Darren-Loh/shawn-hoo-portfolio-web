import { NavLink } from "react-router-dom";

function MediumNavMenu() {
    return (
        <nav className='nav-bar'>
            <div className='nav-logo'>
                <NavLink to='/' className="logo">shawn hoo</NavLink>
            </div>
            <ul className='nav-links'>
                <div className='nav-menu'>
                    <li><NavLink to='/about' className={({isActive}) => isActive ? "active" : undefined}>about</NavLink></li>
                    <li><NavLink to='/of-the-florids' className={({isActive}) => isActive ? "active" : undefined}>of the florids</NavLink></li>
                    <li><NavLink to='/publications' className={({isActive}) => isActive ? "active" : undefined}>publications</NavLink></li>
                    <li><NavLink to='/blog' className={({isActive}) => isActive ? "active" : undefined}>blog</NavLink></li>
                    <li><NavLink to='/contact' className={({isActive}) => isActive ? "active" : undefined}>contact</NavLink></li>
                </div>
            </ul>
        </nav>
    )
}

export default MediumNavMenu;