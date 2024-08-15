import React, { useState, useEffect } from "react";
import logo from "../static/CS blanco.png";
import lilLogo from "../static/seguro-de-viaje-logo.svg";
import "../styles/Navbar.css";
import login from "../static/login3.svg";
import bars from "../static/bars-seguro-de-viaje.svg";

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
    if(section===4){
      setScrolled(true)
    }
    else{
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    // Agrega el evento de desplazamiento al cargar el componente
    window.addEventListener("scroll", handleScroll);

    // Limpia el evento de desplazamiento al desmontar el componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };}
  }, []);

  return (
    <div
      className={
        "header " +
        (notSticky ? "notSticky" : "")
      }
      style={{
        background: scrolled
          ? "linear-gradient(90deg, #5DBCA3 0%, #008DC7 100%)"
          : "transparent",
      }}
    >
      <div className="logo-seguro-de-viaje">
        <a href="/" className="logo-a">
          <img className="logo-compara" src={logo} alt="Logo Compara Seguro" />
        </a>
      </div>
      <div className="nav-items-seguro-de-viaje">
        <div className="login">
          <a href="#" className="a-login">
            <img className="login-compara" src={login} alt="Login" />
          </a>
          <a href="#" className="a-login2">
            Iniciar Sesión
          </a>
        </div>
        <div className="toggle-btn-nav">
          <div className="btns">
            <a
              className="bars-btn"
              onClick={() => setMenuVisible(!menuVisible)}
            >
              <img className="bars-solid-compara" src={bars} alt="Menú" />
            </a>
            <img className="logo-peq" src={lilLogo} alt="Logo Compara Seguro" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
