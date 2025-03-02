import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

export default function Modal({ open, onClose, downloadedData }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onClose}>
      {open && (
        <>
          <h2>Downloaded Items</h2>
          {downloadedData.map((data) => (
            <p key={`downloaded_${data.name}`}>
              <span>Name: {data.name}</span>
              <span> Device: {data.device}</span>
              <span> Path: {data.path}</span>
            </p>
          ))}
          <button onClick={onClose} className="button">
            Okay
          </button>
        </>
      )}
    </dialog>,
    document.getElementById("modal")
  );
}
