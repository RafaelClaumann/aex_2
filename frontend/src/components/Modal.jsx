import "./Modal.css";

function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>

      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {title && <h2 className="modal-title">{title}</h2>}
        
        <div className="modal-body">{children}</div>
        
        <button className="close-btn" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default Modal;
