import React from 'react'
import "./Modal.css"

const Modal = ({ children, isOpen, closeModal }) => {
  const handleModalContainerClick = e => e.stopPropagation()
  return (
    <article className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className='modal-container' onClick={handleModalContainerClick}>
        <div className='boton-container'>
        <a className='modal-close' onClick={closeModal}><img src={require('./static/icon-x.png')} alt='close-modal'/></a>
        </div>
        {children}
      </div>
    </article>
  )
}

export default Modal
