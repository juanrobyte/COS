import React from 'react'
import "./Modal.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
const Modal = ({ children, isOpen, closeModal, header, headerText, turnAround, setTurnAround,isMobile, navBar  }) => {
  const handleModalContainerClick = e => e.stopPropagation()
  return (
    <article className={`modal ${isOpen && "is-open"} ${isMobile && "isMobile"}`} onClick={closeModal}>
      <div className='modal-container' onClick={handleModalContainerClick}>
        
        <div className='boton-container'>
          
          {header !==undefined &&(
            <>
              {'plan' in header &&(<>
              <div className='planes-card2'>
                <img draggable={false} src={require('./static/CS color.png')} className='img-card-planes2' />
                  <div className='apart'>
                    <p className='namePlan'>{header.plan.nombre}</p>
                    <span className='pricePlan'>USD {header.tarifa.tarifaventa}</span>
                    <p className='subtext'>Vendido por ultima vez hace 3 horas</p>
                  </div>
              </div>
              </>)}
            </>
          )}
          {headerText !== undefined &&(
            <div className='headerText'>
              <img src={require('./static/alert.png')} style={{width:35, height:35}}/>
              <span className='headlineText'>{headerText}</span>
            </div>
          )}
          
        <a className='modal-close' onClick={closeModal}><img src={require('./static/icon-x.png')} alt='close-modal'/></a>
        </div>
        <div className="comparationContainer">
          {children}
          {navBar !== undefined &&(

          <div className="cotizacion-form">
            <div className="footerBanner">
              <h2>¡Recibe esta cotización en tu email!</h2>
            </div>
            <form>
              <div className="email-input">
                <FontAwesomeIcon icon={faEnvelope} className="email-icon" />
                <input
                  type="email" 
                  placeholder="email@email.com"
                />
              </div>
              <div className="Enviar">
                <img src={require('./static/backArrow.png')} className="backArrow" />
                <span>Enviar ahora</span>
              </div>
            </form>
          </div>
        
          )}
        </div>
        
      </div>
    </article>
  )
}

export default Modal
