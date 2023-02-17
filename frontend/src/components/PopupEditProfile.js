import React from "react";
import PopupWithForm from './PopupWithForm';

import CurrentUserContext from "../contexts/CurrentUserContext";


function PopupEditProfile({
  isOpen,
  onClose,
  onUpdateUser,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);


  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      newUserName: name,
      newUserAbout: description,
    });
  }

  return (
    <PopupWithForm
      name='edit-profile"'
      title='Редактировать профиль'
      textButton='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >

      <input
        id="profile_name_input"
        type="text"
        name="name"
        placeholder="Имя"
        className="popup__input-field popup__input-field_name_name"
        required
        minLength="2"
        maxLength="40"
        value={name || ''}
        onChange={handleNameChange}
      />

      <span
        id="profile_name_input-error"
        className="popup__input-error">
      </span>

      <input
        id="profile_profession_input"
        type="text"
        name="profession"
        placeholder="О себе"
        className="popup__input-field popup__input-field_name_profession"
        required
        minLength="2"
        maxLength="200"
        value={description || ''}
        onChange={handleDescriptionChange}
      />

      <span
        id="profile_profession_input-error"
        className="popup__input-error">
      </span>
    </PopupWithForm>

  );

}

export default PopupEditProfile;