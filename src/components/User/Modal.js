import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ isOpen, children, onRequestClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onRequestClose}>
          Close
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
