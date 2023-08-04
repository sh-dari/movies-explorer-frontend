import React, {useEffect} from 'react';
import './ApiError.css';

function ApiError({ isOpen, onClose }) {

  const isOpened = isOpen ? "popup_opened" : "";
  useEffect(() => {
    if (!isOpen) return;
    const handleCloseEscPopup = (evt) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleCloseEscPopup)
    return () => document.removeEventListener('keydown', handleCloseEscPopup)
  }, [isOpen, onClose])

  const handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return(
    <div className={`popup ${isOpened}`} onMouseDown={handleOverlayClose}>
      <div className="popup__content">
        <p className="popup__text">Нужно ввести ключевое слово</p>
        <button type="button" className="popup__close" onClick={onClose} />
      </div>
    </div>
  );
}

export default ApiError;
