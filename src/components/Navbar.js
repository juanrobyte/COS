import React, { useState, useEffect } from "react";
import logo from "../static/CS blanco.png";
import lilLogo from "../static/seguro-de-viaje-logo.svg";
import "../styles/Navbar.css";
import login from "../static/login3.svg";
import bars from "../static/bars-seguro-de-viaje.svg";
import closeIcon from "../static/close-icon.svg";
import insta from "../static/instagram.svg";
import facebook from "../static/facebook.svg";
import phone from "../static/telefono.svg";
import ad from "../static/menu-advertisement.png";
import ws from "../static/whatsapp.svg";

/**
 * Componente Navbar que muestra una barra de navegación con logo, botón de inicio de sesión y un menú desplegable.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.menuVisible - Estado que indica si el menú está visible.
 * @param {Function} props.setMenuVisible - Función para actualizar el estado del menú visible.
 * @param {string} props.section - Sección actual del sitio web (no utilizado en este componente).
 *
 * @returns {JSX.Element} - Renderiza el componente Navbar.
 */
const Navbar = ({ menuVisible, setMenuVisible, section, notSticky }) => {
  // Estado que indica si la página ha sido desplazada hacia abajo
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    /**
     * Maneja el evento de desplazamiento para actualizar el estado `scrolled`.
     */
    if (section === 4) {
      setScrolled(true);
    } else {
      const handleScroll = () => {
        const offset = window.scrollY;
        setScrolled(offset > 50);
      };

      // Agrega el evento de desplazamiento al cargar el componente
      window.addEventListener("scroll", handleScroll);

      // Limpia el evento de desplazamiento al desmontar el componente
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <>
      <div
        className={"header " + (notSticky ? "notSticky" : "")}
        style={{
          background: scrolled
            ? "linear-gradient(90deg, #5DBCA3 0%, #008DC7 100%)"
            : "transparent",
          boxShadow: scrolled ? "5px 5px 15px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        <div className="logo-seguro-de-viaje">
          <a href="/" className="logo-a">
            <img
              className="logo-compara"
              src={logo}
              alt="Logo Compara Seguro"
              draggable={false}
            />
          </a>
        </div>
        <div className="nav-items-seguro-de-viaje">
          <div className="login">
            <a href="#" className="a-login">
              <img className="login-compara" src={login} alt="Login" draggable={false}/>
            </a>
            <a href="#" className="a-login2">
              Iniciar Sesión
            </a>
          </div>
          <div className="toggle-btn-nav">
            <div className="btns">
              <a className="bars-btn" onClick={() => setMenuVisible(true)}>
                <img className="bars-solid-compara" src={bars} alt="Menú" draggable={false}/>
              </a>
              <img
                className="logo-peq"
                src={lilLogo}
                alt="Logo Compara Seguro"
                draggable={false}
                onClick={() => setMenuVisible(true)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Menú desplegable a pantalla completa */}
      <div className={`fullscreen-menu ${menuVisible ? "active" : ""}`}>
        <div className="menu-sections">
          <div className="menu-advertisement"></div>
          <div className="menu-content">
            <a className="close-menu" onClick={() => setMenuVisible(false)}>
              <img src={closeIcon} alt="Cerrar" />
            </a>
            <div className="menu-list">
              <a href="https://web.compara-seguro.com">ASISTENCIA MÉDICA</a>
              <a href="/nosotros">CONÓCENOS</a>
              <a href="#contacto">CONTÁCTANOS</a>
              <a href="#formaparte">FORMA PARTE</a>
              <a href="https://blog.compara-seguro.com/" target="_blank">BLOG</a>
            </div>
            <div className="footer-info">
              <h1>Atención al Cliente</h1>
              <div className="contacto-bts">
              <a href="#">
                  <img src={phone} className="phone" alt="phone" />
                  +57 1111-11111
                </a>
                <a href="#">
                  <img src={ws} className="ws" alt="whatsapp" />
                  +57 1111-11111
                </a>
              </div>
              <p>Lunes a Viernes de 8:00 a 16:00</p>
              <p>Sábados, Domingos y Feriados de 9:00 a 15:00</p>
              <div className="social-icons">
                <a
                  href="https://www.facebook.com/Compara.Seguro.Viajes"
                  target="_blank"
                >
                  <img src={facebook} className="facebook" alt="facebook" />
                </a>
                <a
                  href="https://www.instagram.com/comparaseguro_viajes"
                  target="_blank"
                >
                  <img src={insta} className="insta" alt="insta" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
