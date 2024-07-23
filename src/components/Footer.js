import {useState, useEffect,useRef} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import "../navb.css"
import logo from "../static/CS blanco.png"

function Footer() {


  return (
    <div className='footer'>
        {/* <div className='LogoSocial'>
            <img className='footerLogo' src={logo} draggable={false} />
            <div className='contentIcon'>
                <a className='iconSocial' href='https://www.instagram.com/comparaseguro_?igsh=MXV5aDNraDNzOXVkZg=='><img src={require('../static/instagram.png')} draggable={false}/></a>
                <a className='iconSocial'><img src={require('../static/facebook.png')} draggable={false}/></a>
                <a className='iconSocial'><img src={require('../static/whatsapp.png')} draggable={false}/></a>
                <a className='iconSocial'><img src={require('../static/x.png')} draggable={false}/></a>

            </div>
        </div>
        <div className='ColumnCard'>
            <a className='footerLink'href='/'>• Inicio</a>
            <a className='footerLink' href='/nosotros'>• Nosotros</a>
            <a className='footerLink'>• Aliados</a>
            <a className='footerLink' href='/'>• Asistencia Médica</a>
            <a className='footerLink'>• Viaja Seguro</a>
        </div>
        <div className='ColumnCard'>
            <a className='footerLink'>• Blog</a>
            <a className='footerLink' href='/productos'>• Productos</a>
            <a className='footerLink'>• Seguros de viaje</a>
            <a className='footerLink'>• Cobertura de viaje</a>
            <a className='footerLink'>• Para empresas</a>
        </div>
        <div className='ColumnCard'>
            <a className='footerLink' href='/#cotizar'>• Cotizar</a>
            <a className='footerLink'>• ¿Tienes una emergencia?</a>
            <a className='footerLink'>• Contacto</a>
            <a className='footerLink' href='/terms'>• Términos y condiciones</a>
            <a className='footerLink'>• Política de privacidad</a>
        </div> */}
    </div>
  );
}

export default Footer;
