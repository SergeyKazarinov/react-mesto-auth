import React from "react";
import AcceptRegist from '../../images/Accept-registration.png';
import RejectRegist from '../../images/rejectRegistration.png'

const InfoTooltip = ({name, isOpen, onClose, isRegistration }) => {
  function handleCLoseOverlayClick(e) {
    if(e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={handleCLoseOverlayClick}
    >
      <div className="popup__container-info">
        <button
          onClick={onClose}
          type="button"
          className="button button_type_close"
          aria-label="Закрыть окно"
        />
        <img src={isRegistration ? AcceptRegist : RejectRegist} className="popup__union" alt="Значок галочки" />
        <h2 className="popup__title-info">{isRegistration ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;