import './App.css';
import logo from "./static/icon.png"
import logo_iso from "./static/CS alternativo2 blanco.png"
import login from "./static/login3.svg"
import {useState, useEffect,useRef} from 'react'
import "./terms.css"
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar'

function Products() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  let navigate = useNavigate()
  const [securePlans, setSecurePlans] = useState([])
  return (
    <div className='home'>
      <Navbar menuVisible={menuVisible} setMenuVisible={setMenuVisible}></Navbar>
    {/* <div className={`App ${isOpen && "openz"}`}>
      <div className='sec-3'>
        <div className={`navb navb2 ${isOpen && "openx"}`} >
        <div className={`navb_items ${isOpen && "open"}`}>
          <div className='logo_iso'>
            <img className='logo_iso_img' src={logo_iso} alt='Isotipo'/>
          </div>
          <div className='login'>
            <a href='#' className='a_login'>
              <img src={login} alt='Login'/>
              <p>Iniciar Sesion</p>
            </a>
          </div>
        <div className="navb_logo">
            <a href="#">
            <a className={`navb_toggle ${isOpen && "open"}`} onClick={() => {isOpen ? setIsOpen(false): setIsOpen(true)}}>
              <span></span>
              <span></span>
            </a>
              <img src={logo} alt="Logo" />
            </a>
        </div>
        </div> 
        </div>
        </div>
    </div> */}

    <div className='title-productos'>
      <div className='texto'>
        <h2 className='title'>!Lo que ofrecemos!</h2>
      </div>
    </div>

    <div className='productos-contain'>
      <div className='sec1-productos'>
        <a href='#'>
        <img className='img-productos' draggable={false} src={require('./static/slider/boton-asistencia.png')}/>
        </a>
        <a href='#'>
        <img className='img-productos' draggable={false} src={require('./static/slider/boton-ticketes.png')}/>
        </a>
        <a href='#'>
        <img className='img-productos' draggable={false} src={require('./static/slider/boton-vehiculos.png')}/>
        </a>
        <a href='#'>
        <img className='img-productos' draggable={false} src={require('./static/slider/boton-hoteles.png')}/>
        </a>
      </div>
      <div className='sec2-productos'>
        <a href='#'>
        <img className='img-productos' draggable={false} src={require('./static/slider/boton-beneficios.png')}/>
        </a>
        <a href='#'>
        <img className='img-productos' draggable={false} src={require('./static/boton-Tours.png')}/>
        </a>
        <a href='#'>
        <img className='img-productos' draggable={false} src={require('./static/boton-cruceros.png')}/>
        </a>
        <a href='#'>
        <img className='img-productos' draggable={false} src={require('./static/boton-tienda virtual.png')}/>
        </a>
      </div>
    </div>

    <Footer />
    </div>
      



  );
}

export default Products;
