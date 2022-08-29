import React from "react";

const InfoTooltip = ({name, isOpen, onClose, image, text }) => {
  function handleCLoseOverlayClick(e) {
    if(e.target === e.currentTarget) {
      closePopup();
    }
  }

  if(isOpen) {
    window.addEventListener('keydown', handleEscClose);
  }
  
  function handleEscClose(e) {
    e.key === "Escape" && closePopup();
  }

  function closePopup() {
    window.removeEventListener('keydown', handleEscClose);
    onClose();
  }

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={handleCLoseOverlayClick}
    >
      <div className="popup__container-info">
        <button
          onClick={closePopup}
          type="button"
          className="button button_type_close"
          aria-label="Закрыть окно"
        />
        <img src={image} className="popup__union" alt="Значок галочки" />
        <h2 className="popup__title-info">{text}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;