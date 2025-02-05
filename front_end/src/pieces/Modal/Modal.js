import React from "react";
import ReactDOM from "react-dom";
import "./modal.css";

const Modal = ({ isShowing, hide, component }) =>
  isShowing ? (
    ReactDOM.createPortal(
      <>
        <div className='modal-overlay' />
        <div
          className='modal-wrapper'
          aria-modal
          aria-hidden
          tabIndex={-1}
          role='dialog'
        >
          <div className='modal'>
            <div className='modal-header'>
              <button
                type='button'
                className='modal-close-button'
                data-dismiss='modal'
                aria-label='Close'
                onClick={hide}
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            {component}
          </div>
        </div>
      </>,
      document.body
    )
  ) : (
    <span>{isShowing}</span>
  );

export default Modal;