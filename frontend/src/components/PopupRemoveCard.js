import React from "react";
import PopupWithForm from './PopupWithForm';

function PopupRemoveCard({
  isOpen,
  onClose
}) {

  return (
    <PopupWithForm
      name='remove-card'
      title='Вы уверены?'
      textButton='Да'
      isOpen={isOpen}
      onClose={onClose}
    >
    </PopupWithForm>

  );

}

export default PopupRemoveCard;