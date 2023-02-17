import React from "react";
import PopupWithForm from './PopupWithForm';

function PopupAddPlace({
  isOpen,
  onClose,
  onAddPlace,
}) {
  const [title, setTitle] = React.useState('');
  const [linkPlace, setLinkPlace] = React.useState('');

  React.useEffect(() => {
    setTitle('');
    setLinkPlace('');
  }, [isOpen]);

  function handleTitleChange(evt) {
    setTitle(evt.target.value);
  }


  function handleLinkPlaceChange(evt) {
    setLinkPlace(evt.target.value);
  }


  function handleAddPlaceSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      newTitlePlace: title,
      newLinkPlace: linkPlace,

    })
  }

  return (
    <PopupWithForm
      name='add-card'
      title='Новое место'
      textButton='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
    >

      <input
        value={title}
        id="place_name_input"
        type="text"
        name="place_name"
        placeholder="Название"
        className="popup__input-field popup__input-field_place_name"
        required
        minLength="2"
        maxLength="30"
        onChange={handleTitleChange}
      />

      <span
        id="place_name_input-error"
        className="popup__input-error">
      </span>

      <input
        value={linkPlace}
        id="place_link_input"
        type="url"
        name="place_link"
        placeholder="Ссылка на картинку"
        className="popup__input-field popup__input-field_place_link"
        required
        onChange={handleLinkPlaceChange}
      />

      <span
        id="place_link_input-error"
        className="popup__input-error">
      </span>
    </PopupWithForm>

  );

}

export default PopupAddPlace;