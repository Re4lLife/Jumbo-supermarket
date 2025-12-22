import React, { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import useClickOut from '../hooks/useClickOut';

const ModalContext = createContext();
export const useModalContext = () => useContext(ModalContext);

const Modal = ({ children }) => {
    const [openName, setOpenName] = useState('');

    const close = () => setOpenName('');
    const open = setOpenName;

    return (
        <ModalContext.Provider value={{ openName, close, open }}>
            {children}
        </ModalContext.Provider>
    );
};

function Open({ name, children }) {
    const { open } = useModalContext();

    return cloneElement(children, { onClick: () => open(name) });
}


function Close({ children }) {
    const { close } = useModalContext();

    return cloneElement(children, { onClick: () => close() });
}


function Window({ children, name }) {
    const { openName, close } = useModalContext();
    const  el = useClickOut(close)

    // If the window name doesn't match the currently open name, don't render anything
    if (name !== openName) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"/>

            <div ref={el} className="relative z-10 w-full max-w-3xl transform transition-all" >
                {cloneElement(children, { onCloseModal: close })}
            </div>
        </div>,
        document.body
    );
}

Modal.Open = Open;
Modal.Close = Close;
Modal.Window = Window;

export default Modal;