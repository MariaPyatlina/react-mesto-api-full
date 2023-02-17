import React from "react";
import PopupWithForm from './PopupWithForm';

function PopupEditAvatar({
    isOpen,
    onClose,
    onUpdateAvatar
}) {
    const avatarLinkRef = React.useRef('');

    React.useEffect(() => {
        avatarLinkRef.current.value = '';
    }, [isOpen]);


    function handleSubmit(evt) {
        evt.preventDefault();

        console.log('что лежит в аватарке', avatarLinkRef.current.value);

        onUpdateAvatar({
            newUserAvatar: avatarLinkRef.current.value,
        })
    }

    return (
        <PopupWithForm
            name='update-avatar'
            title='Обновить аватар'
            textButton='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                ref={avatarLinkRef}
                id="avatar_link_input"
                type="url"
                name="avatar"
                placeholder="Ссылка на картинку"
                className="popup__input-field popup__input-field_avatar_link"
                required
            />

            <span
                id="avatar_link_input-error"
                className="popup__input-error">
            </span>
        </PopupWithForm>

    );

}

export default PopupEditAvatar;