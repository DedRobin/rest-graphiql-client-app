"use client";

import { useState } from "react";

export function Modal({ isOpen = false }) {
  const [isClosed, setIsClosed] = useState(!isOpen);

  const closeModal = () => setIsClosed(true);

  return (
    <>
      {isClosed ? null : (
        <div className="h5 flex flex-col text-h5 font-h5 leading-h5 tracking-h5 transition-colors duration-300 absolute bottom-[48px] right-[48px] border-2 border-green p-2">
          <div
            className="close-button self-end hover:text-red hover:cursor-pointer"
            onClick={closeModal}
          >
            X
          </div>
          <p>Error Message</p>
        </div>
      )}
    </>
  );
}
