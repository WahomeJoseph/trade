/* eslint-disable no-unused-vars */
import React from "react"
import PropTypes from 'prop-types'
import { MdOutlineCloseFullscreen } from "react-icons/md";
const Modal = ({isOpen, onClose, children}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-60"></div> 
          {/* [#010127] */}
          <div className="absolute w-full max-w-lg mx-4 sm:mx-auto bg-gray-900 p-4 rounded-lg z-10 text-right">
            <button
              className="text-gray-100 font-bold hover:text-gray-300 cursor-pointer focus:outline-none mr-2"
              onClick={onClose}>
              <MdOutlineCloseFullscreen size={24}/>
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
}

export default Modal;