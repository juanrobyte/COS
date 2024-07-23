import React from 'react'
import logo from "../static/CS alternativo2 blanco.png"
import lilLogo from "../static/icon Blanco.svg"
import '../styles/Navbar.css'
import login from '../static/login3.svg'
import barsBlack from '../static/bars-solid.svg'
import bars from '../static/bars-solid (white).svg'
import closei from '../static/xmark-solid.svg'
// h
const Navbar = ({ menuVisible, setMenuVisible, section }) => {
    console.log(section)
    return ( 
        <div className={"header"} style={{background: section===1? "transparent" : "linear-gradient(90deg, #5DBCA3 0%, #008DC7 100%)"}}>
            <div className='logo'>
                <a href='/' className='logo-a'><img className='logo-compara' src={logo} alt='Logo Compara Seguro' /></a>
            </div>
            <div className='navbar'>
                <ul className='links'>
                    <li>
                        <a href='/home'>Inicio</a>
                    </li>
                    <li>
                        <a href='/nosotros'>Conócenos</a>
                    </li>
                    <li>
                        <a href='/productos'>Nuestros Productos</a>
                    </li>
                </ul>
                <div className='login'>
                    <a href='#' className='a-login'><img className='login-compara' src={login} alt='Login' /></a>
                    <a href='#' className='a-login2'>Iniciar Sesión</a>
                </div>
                <div className='toggle-btn'>
                    <a className='bars-btn' onClick={() => setMenuVisible(!menuVisible)}><img className='bars-solid' src={bars} alt='bars-solid' /></a>
                    <img className='logo-peq' src={lilLogo} alt="Logo Compara Seguro" />
                </div>
            </div>
            <div className={`dropdown-menu-navb ${menuVisible ? "open" : ""}`}>
                <li>
                    <a href='/home'>Inicio</a>
                </li>
                <li>
                    <a href='/nosotros'>Conócenos</a>
                </li>
                <li>
                    <a href='/productos'>Nuestros Productos</a>
                </li>
                <li>
                    <a href='#' className='a-login'>Iniciar Sesión</a>
                </li>
                {/* <li>
                    <a className='close-btn'><img className='close-solid' src={closei} alt='close-solid' /></a>
                </li> */}
            </div>
        </div>
    )
}

export default Navbar
