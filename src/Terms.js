import './App.css';
import logo from "./static/icon.png"
import logo_iso from "./static/CS alternativo2 blanco.png"
import login from "./static/login3.svg"
import {useState, useEffect,useRef} from 'react'
import "./navb.css";
import "./terms.css"
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar'
function Terms() {
// h
  const [isOpen, setIsOpen] = useState(false)
  let navigate = useNavigate()
  const [securePlans, setSecurePlans] = useState([])
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <div className='home'>
    <Navbar menuVisible={menuVisible} setMenuVisible={setMenuVisible}></Navbar>
    <div className='filosofia-info'>
      <div className='filosofia-contain'>
        <div className='filosofia-text'>
          <h1 className='filosofia-title'>Terminos y condiciones</h1>
          <p className='b-filosofia'><strong>Bienvenido a Compra Seguro</strong></p>
          <p className='p-filosofia'><strong>Al utilizar nuestra página web o nuestros servicios, usted acepta estos Términos y Condiciones.</strong></p>
          <h2 className='filosofia-title'>1. Definiciones</h2>
          <p className='p-filosofia'>"Compra Seguro" o "nosotros" se refiere a [Nombre de la empresa], una empresa constituida y existente bajo las leyes de la República de Panamá, con domicilio en [Dirección de la empresa]."Usuario" o "usted" se refiere a cualquier persona que acceda o utilice nuestra página web o nuestros servicios."Página web" se refiere al sitio web ubicado en [se quitó una URL no válida]."Servicios" se refiere a cualquier servicio ofrecido por Compra Seguro, incluyendo la comparación de precios de seguros de viaje, reservas de vuelos, hoteles, alquiler de autos y actividades.</p>
          <h2 className='filosofia-title'>2. Aceptación de los Términos y Condiciones</h2>
          <p className='p-filosofia'>Al utilizar nuestra página web o nuestros servicios, usted acepta estos Términos y Condiciones. Si no está de acuerdo con estos Términos y Condiciones, no debe utilizar nuestra página web o nuestros servicios.</p>
          <h2 className='filosofia-title'>3. Modificación de los Términos y Condiciones</h2>
          <p className='p-filosofia'>Compra Seguro se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Le notificaremos de cualquier cambio publicando los Términos y Condiciones modificados en nuestra página web. Si continúa utilizando nuestra página web o nuestros servicios después de la publicación de los Términos y Condiciones modificados, se considerará que ha aceptado los cambios.</p>
          <h2 className='filosofia-title'>4. Uso de la Página Web y los Servicios</h2>
          <p className='p-filosofia'>Usted acepta usar nuestra página web y nuestros servicios solo para fines legítimos y de acuerdo con estos Términos y Condiciones. Usted acepta no usar nuestra página web o nuestros servicios para ningún propósito ilegal o que pueda dañar o interferir con el uso de nuestra página web o nuestros servicios por parte de otras personas.</p>
          <h2 className='filosofia-title'>5. Propiedad Intelectual</h2>
          <p className='p-filosofia'>Toda la propiedad intelectual, incluidos los derechos de autor, marcas comerciales y patentes, en nuestra página web y nuestros servicios es propiedad de Compra Seguro o de sus licenciantes. Usted no tiene derecho a usar ninguna propiedad intelectual de Compra Seguro sin nuestro consentimiento previo por escrito.</p>
          <h2 className='filosofia-title'>6. Enlaces a Otros Sitios Web</h2>
          <p className='p-filosofia'>Nuestra página web puede contener enlaces a otros sitios web. Compra Seguro no es responsable del contenido o las prácticas de otros sitios web. Le recomendamos que revise los términos y condiciones y las políticas de privacidad de cualquier otro sitio web que visite.</p>
          <h2 className='filosofia-title'>7. Exención de Responsabilidad</h2>
          <p className='p-filosofia'>Compra Seguro no garantiza que nuestra página web o nuestros servicios sean ininterrumpidos o libres de errores. Compra Seguro no es responsable de ningún daño o pérdida que pueda sufrir como resultado del uso de nuestra página web o nuestros servicios.</p>
          <h2 className='filosofia-title'>8. Limitación de Responsabilidad</h2>
          <p className='p-filosofia'>La responsabilidad total de Compra Seguro por cualquier daño o pérdida que usted pueda sufrir como resultado del uso de nuestra página web o nuestros servicios se limita a la cantidad que usted pagó por los servicios. Compra Seguro no será responsable de ningún daño indirecto, incidental, especial o consecuente, incluidos los daños por pérdida de ganancias, pérdida de uso, pérdida de datos u otros daños intangibles, independientemente de la causa y de la teoría de la responsabilidad, ya sea por contrato, responsabilidad civil (incluyendo negligencia) u otra teoría legal, que surja de o en conexión con el uso de nuestra página web o nuestros servicios, incluso si Compra Seguro ha sido advertido de la posibilidad de tales daños.</p>
          <h2 className='filosofia-title'>9. Indemnización</h2>
          <p className='p-filosofia'>Usted acepta indemnizar, defender y mantener a Compra Seguro, sus directores, funcionarios, empleados, agentes, representantes y licenciantes libres de cualquier reclamo, responsabilidad, daño, pérdida, costo o gasto (incluidos los honorarios razonables de abogados) que surjan de o en conexión con su uso de nuestra página web o nuestros servicios, o su violación de estos Términos y Condiciones.</p>
          <h2 className='filosofia-title'>10. Ley Aplicable y Jurisdicción</h2>
          <p className='p-filosofia'>Estos Términos y Condiciones se regirán e interpretarán de conformidad con las leyes de la República de Panamá. Cualquier disputa que surja de o en conexión con estos Términos y Condiciones será resuelta exclusivamente por los tribunales competentes de la República de Panamá.</p>
          <h2 className='filosofia-title'>11. Disposiciones Generales</h2>
          <p className='p-filosofia'>Estos Términos y Condiciones constituyen el acuerdo completo entre usted y Compra Seguro con respecto al uso de nuestra página web y nuestros servicios. Si alguna disposición de estos Términos y Condiciones se considera inválida o inaplicable, dicha disposición se eliminará de estos Términos y Condiciones y las disposiciones restantes permanecerán en pleno vigor y efecto. Estos Términos y Condiciones pueden ser modificados por Compra Seguro en cualquier momento mediante la publicación de los Términos y Condiciones modificados en nuestra página web. Su uso continuo de nuestra página web o nuestros servicios después de la publicación de los Términos y condiciones.</p>

        </div>
      </div>
    </div>
    <Footer />
    </div>
      



  );
}

export default Terms;
