import React from "react";

function ImagePopup({card, isOpen, onClose}) {
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

  return(
    <div className={`popup popup_type_image-zoom ${isOpen ? 'popup_opened' : ''}`} onClick={handleCLoseOverlayClick}>
      <div className="popup__container-image">
        <button 
          type="button"
          className="button button_type_close"
          aria-label="Закрыть окно"
          onClick={closePopup}
        >
        </button>
        <img 
          className="popup__image"
          src={card.link}
          alt={card.name}
        />
        <h2 className="popup__text">{card.name}</h2>
      </div>
    </div>
  );
}
export default ImagePopup;