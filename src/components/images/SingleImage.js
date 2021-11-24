import ReactDOM from "react-dom";

export default function SingleImage({ closeModal }) {
  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="content-wrapper" onClick={(e) => e.stopPropagation()}>
        <section className="modal-content"></section>
      </div>
    </div>,
    document.body
  );
}
