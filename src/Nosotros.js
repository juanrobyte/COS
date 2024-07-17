import './App.css';
import logo from "./static/icon.png"
import logo_iso from "./static/CS alternativo2 blanco.png"
import login from "./static/login3.svg"
import { useState, useEffect, useRef } from 'react'
import "./navb.css";
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar'

function Nosotros() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  let navigate = useNavigate()


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
      <div className='nosotros-info'>
        <div className='nosotros-contain'>
          <img draggable={false} src={require('./static/Nosotros.png')} />
          <div className='nosotros-text'>
            <h1 className='nosotros-title'>¡Lo que somos!</h1>
            <p className='p-nosotros'>Somos un equipo dinámico con amplio conocimiento, Nuestra experiencia nos llevó a crear Compara Seguro, brindando asesoría real a los clientes para que comprendan y satisfagan sus necesidades de manera efectiva.</p>
            <p className='p-nosotros'>Ofrecemos una gama completa de servicios para viajeros, incluyendo: asistencia en viajes, alojamiento, tiquetes aéreos y alquiler de vehículos.</p>
            <p className='p-nosotros'>Trabajamos con compañías confiables para proporcionar seguridad y protección, seleccionando las mejores opciones en planes y coberturas.</p>
            <p className='p-nosotros'>Colaboramos con empresas comprometidas que equilibran intereses comerciales con las necesidades de nuestros viajeros, manteniendo alianzas sólidas y dedicación a servicios de calidad.</p>
          </div>
        </div>
      </div>

      <div className='filosofia-info'>
        <div className='filosofia-contain'>
          <div className='filosofia-text'>
            <h1 className='filosofia-title'>Nuestra Filosofía</h1>
            <p className='b-filosofia'><strong>En Comparaseguro, creemos que viajar es una forma de expandir horizontes, descubrir culturas y crear recuerdos invaluables. Sin embargo, sabemos que la planificación de un viaje puede ser abrumadora, con una infinidad de opciones y detalles que considerar.</strong></p>
            <p className='p-filosofia'><strong>Es por eso que nos hemos convertido en tu aliado integral para planificar y disfrutar de tus viajes al máximo.</strong></p>
            <p className='p-filosofia'>•Te ofrecemos una plataforma completa para comparar y reservar una amplia gama de servicios de viaje,desde vuelos y hoteles hasta alquiler de autos, actividades y seguros de viaje.</p>
            <p className='p-filosofia'>•Trabajamos con las mejores empresas del sector para ofrecerte precios competitivos y una experiencia de reserva segura y confiable.</p>
            <p className='p-filosofia'>•Nuestro equipo de expertos está a tu disposición para asesorarte y ayudarte a encontrar las mejores opciones para tu viaje, teniendo en cuenta tus necesidades, presupuesto y preferencias.Nuestra filosofía se basa en tres pilares fundamentales:</p>
            <p className='p-filosofia'><strong>1. Simplicidad:</strong>Comparaseguro te ofrece una plataforma fácil de usar e intuitiva donde puedes encontrar y comparar diferentes opciones en un solo lugar.</p>
            <p className='p-filosofia'>Te ahorramos tiempo y esfuerzo al simplificar el proceso de búsqueda y reserva de tus servicios de viaje.</p>
            <p className='p-filosofia'>Queremos que planificar tu viaje sea una experiencia agradable y sin complicaciones.</p>
            <p className='b-filosofia'><strong>2. Transparencia:</strong> Te proporcionamos información clara y detallada sobre cada opción que te ofrecemos, para que puedas tomar decisiones informadas.</p>
            <p className='p-filosofia'>No tenemos acuerdos exclusivos con ninguna empresa, por lo que te podemos ofrecer las mejores opciones para ti, sin sesgos ni intereses ocultos.</p>
            <p className='p-filosofia'>Creemos que la información es poder, y por eso te brindamos todas las herramientas que necesitas para planificar tu viaje con confianza.</p>
            <p className='p-filosofia'><strong>3. Confianza:</strong>Solo trabajamos con empresas confiables y reconocidas en el mercado.</p>
            <p className='p-filosofia'>Nos aseguramos de que todas las empresas que ofrecemos cumplan con nuestros estrictos criterios de calidad y servicio.</p>
            <p className='p-filosofia'>Queremos que tengas la tranquilidad de saber que estás en buenas manos y que tu viaje estará en buenas condiciones.</p>
            <p className='p-filosofia'>En Comparaseguro, no solo queremos venderte servicios de viaje, queremos ser tu compañero de viaje y mejor elección.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>




  );
}

export default Nosotros;
