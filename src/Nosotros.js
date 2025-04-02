import "./App.css";
import logo from "./static/icon.png";
import logo_iso from "./static/CS alternativo2 blanco.png";
import login from "./static/login3.svg";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./styles/Conocenos.css";

function Nosotros() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate();

  return (
    <div className="home-conocenos">
      <Navbar
        section={4}
        notSticky={true}
        menuVisible={menuVisible}
        setMenuVisible={setMenuVisible}
      ></Navbar>
      <div className="conocenos">
        <div className="conocenos-text">
          <h1>Conócenos</h1>
          <p>
            Nuestra experiencia nos llevó a crear Compara
            <br />
            Seguro, una plataforma de comercio en línea que
            <br />
            conecta a los usuarios con compañías de seguros de
            <br />
            viaje. No solo contamos con un sistema de pago
            <br />
            seguro, sino que también ofrecemos proveedores de
            <br />
            conﬁanza, evitando así dolores de cabeza.
            <br /> <br />
            Queremos hacer fácil lo difícil en pocos pasos, lo que
            <br />
            permite a nuestros usuarios tomar mejores
            <br />
            decisiones ante la gran variedad de opciones que
            <br />
            existen al elegir un seguro de viaje, ajustándose a sus
            <br />
            necesidades y presupuesto.
          </p>
        </div>
        <div className="img-conocenos">
          <img
            src={require("./static/conocenos.png")}
            className="persona-conocenos"
            alt="viajero"
          />
        </div>
      </div>

      <div className="curva-nosotros"></div>

      <div className="carousel-nosotros">
        <div className="card-nosotros">
          <div className="card-number">

          </div>
          
        </div>
      </div>

      <div className="viajero-protegido">
        <div className="protegido-img">
          <img
            src={require("./static/viajero-precavido.png")}
            className="persona-viajero"
            alt="viajero"
          />
        </div>
        <div className="viajero-protegido-info">
          <p>
            Nuestra experiencia nos llevó a crear Compara
            <br />
            Seguro, una plataforma de comercio en línea que
            <br />
            conecta a los usuarios con compañías de seguros de
            <br />
            viaje. No solo contamos con un sistema de pago
            <br />
            seguro, sino que también ofrecemos proveedores de
            <br />
            conﬁanza, evitando así dolores de cabeza.
            <br /> <br />
            Queremos hacer fácil lo difícil en pocos pasos, lo que
            <br />
            permite a nuestros usuarios tomar mejores
            <br />
            decisiones ante la gran variedad de opciones que
            <br />
            existen al elegir un seguro de viaje, ajustándose a sus
            <br />
            necesidades y presupuesto.
          </p>
          <h1>Viajero precavido, viaja protegido.</h1>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Nosotros;
