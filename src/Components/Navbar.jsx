import logo from "../assets/Logo.png"
import './Navbar.css'
import {NavLink} from 'react-router-dom'


function Navbar({cartCount}){
    return(
        <nav className="navbar">
            <div>
                <img src={logo} alt="MediLite Logo" width="100"/>
            </div>
            <div>
                <p>Cart 🛒 : {cartCount} items present </p>
            </div>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/services">Services</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/medicines">Medicines</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar;