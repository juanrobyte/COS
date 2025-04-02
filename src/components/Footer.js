import "../styles/Footer.css";
import logo from "../static/CS blanco.png";
import facebook from "../static/facebook.svg";
import insta from "../static/instagram.svg";
import phone from "../static/telefono.svg";
import ws from "../static/whatsapp.svg";
import oferta from "../static/Oferta.svg";
import MediaQuery from "react-responsive";
import Accordion from "react-bootstrap/Accordion";

function Footer() {
  return (
    <div className="footer">
      <MediaQuery orientation={"landscape"}>
        <div className="curva-footer"></div>
        <div className="footer-contenedor">
          <div className="sec-1-footer">
            <div className="logo-cos-redes">
              <a href="/">
                <img
                  src={logo}
                  className="logo-compara"
                />
              </a>
              <div className="botones-redes">
                <a href="https://www.facebook.com/Compara.Seguro.Viajes" target="_blank">
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

            <div className="sec-cos1">
              <div className="btn-sec1">
                <p id="company-btn">
                  Compañía
                </p>
                <a href="/nosotros">Conócenos</a>
                <a href="#">Forma parte</a>
                <a href="#">Contáctanos</a>
                <a href="https://web.compara-seguro.com">Asistencia Médica</a>
              </div>
              <div className="asesoria-btn">
                <a href="#">Asesoría en compra</a>
              </div>
            </div>

            <div className="sec-cos3">
              <div className="btn-sec2">
                <a href="https://blog.compara-seguro.com/" target="_blank"  id="company-btn">
                  Blog
                </a>
                <a href="#">Consejos para viajar en avión</a>
                <a href="#">
                  Viaja Seguro con
                  <br />
                  Enfermedades Preexistentes
                </a>
              </div>
            </div>

            <div className="sec-cos2">
              <div className="btn-sec2">
                <a href="#" id="company-btn">
                  Atención al Cliente
                </a>
                <a href="#">
                  <img src={phone} className="phone" alt="phone" />
                  +57 1111-11111
                </a>
                <a href="#">
                  <img src={ws} className="ws" alt="whatsapp" />
                  +57 1111-11111
                </a>
                <p>Lunes a viernes de 8:00 a<br/>16:00hs</p>
                <p>Sábados, domingos y<br/>feriados de 9:00 a 15:0hs</p>
              </div>
            </div>

            <div className="sec-cos2">
              <div className="btn-sec2">
                <div className="ofertas-gmail">
                  <img src={oferta} className="oferta" alt="ofertas" />
                  <p>
                    Ofertas exclusivas en
                    <br />
                    tu email
                  </p>
                </div>
                <div className="oferta-input">
                  <input
                    placeholder="Ingresa tu email"
                    type="text"
                  />
                </div>
                <button type="submit" className="suscribirme">
                  Suscribirme
                </button>
              </div>
            </div>
          </div>

          <div className="sec-2-footer">
            <div className="sec2-cos">
              <p>Compara Seguro 2024. Todos los derechos</p>
            </div>
            <div className="sec2-cos2">
              <a href="#">Políticas de Privacidad</a>
              <a href="/terms">Términos y Condiciones</a>
            </div>
          </div>
        </div>
      </MediaQuery>

      <MediaQuery orientation={"portrait"}>
        <div className="items-footer">
          <div className="logo-cos-redes">
            <a href="/">
              <img
                src={logo}
                className="logo-compara"
              />
            </a>
            <div className="botones-redes">
              <a href="#">
                <img src={facebook} className="facebook" alt="facebook" />
              </a>
              <a href="https://www.instagram.com/comparaseguro_/">
                <img src={insta} className="insta" alt="insta" />
              </a>
            </div>
          </div>
          <div className="secc-mobile-footer">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="1">
                <Accordion.Header>Compañía</Accordion.Header>
                <Accordion.Body>
                  <a href="/nosotros">Conócenos</a>
                  <a href="#">Forma parte</a>
                  <a href="#">Contáctanos</a>
                  <a href="https://web.compara-seguro.com">Asistencia Médica</a>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          <div className="secc-mobile-footer">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="1">
                <Accordion.Header>Blog</Accordion.Header>
                <Accordion.Body>
                <a href="https://blog.compara-seguro.com/" target="_blank"  id="company-btn">
                  Blog
                </a>
                  <a href="#">Consejos para viajar en avión</a>
                  <a href="#">Viaja Seguro con Enfermedades Preexistentes</a>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          <div className="secc-mobile-footer">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="1">
                <Accordion.Header>Atención al Cliente</Accordion.Header>
                <Accordion.Body>
                  <a href="#">Página 1</a>
                  <a href="#">Página 2</a>
                  <a href="#">Página 3</a>
                  <a href="#">Página 4</a>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          <div className="asesoria-btn">
            <a href="#">Asesoría en compra</a>
          </div>
        </div>
        <div className="sec-2-footer">
          <div className="sec2-cos2">
            <a href="#">Políticas de Privacidad</a>
            <a href="/terms">Términos y Condiciones</a>
          </div>
          <div className="sec2-cos">
            <p>Compara Seguro 2024. Todos los derechos</p>
          </div>
        </div>
      </MediaQuery>
    </div>
  );
}

export default Footer;
