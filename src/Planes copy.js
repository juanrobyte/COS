import './App.css';
import logo from "./static/icon.png"
import logo_iso from "./static/CS alternativo2 blanco.png"
import login from "./static/login3.svg"
import {useState, useEffect,useRef} from 'react'
import "./navb.css";
import { useLocation, useNavigate } from 'react-router-dom';

function Planes() {

  const [isOpen, setIsOpen] = useState(false)
  let location = useLocation();
  let navigate = useNavigate()
  const [securePlans, setSecurePlans] = useState([])
  const data = location.state
  useEffect(()=>{
    console.log(data)
    if (data === null){
        console.log('null')
       navigate('/') 
    }
    else{
        setSecurePlans(data.data.securePlans)
    }
// h
  },[])
    console.log(data)
  return (
    <div className='home'>
    <div className={`App ${isOpen && "openz"}`}>
      <div className='sec-1'>
        <div className={`navb ${isOpen && "openx"}`} >
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
        <div className='planes-contain'>
          <div className='card-planes'>
          {securePlans !== null && securePlans.map((x, i)=>{
            return(
            <>
                <div className='card-logo-planes' key={i}>
                  <img draggable={false} src={require('./static/icon.png')} className='img-card-logo'/>
                  <div style={{display:'flex', flexDirection:'column', paddingLeft:10}}>
                    <p style={{fontSize:20, color:'black'}}>{x.nombre}</p>
                    <p style={{fontSize:12}}>{x.masinfo}</p>
                  </div>
                </div>
            </>
        )})}
          </div>
        </div>

        </div>
    </div>
    </div>
      



  );
}

export default Planes;
