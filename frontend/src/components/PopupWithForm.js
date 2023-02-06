import React from "react";

function PopupWithForm({
    name,
    title,
    children,
    textButton,
    isOpen,
    onClose,
    onSubmit
}) {
    return (
        <section className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button
                    type="button"
                    className="popup__close-button"
                    onClick={onClose}>
                </button>

                <h2 className="popup__title">
                    {title}
                </h2>

                <form
                    className="popup__form"
                    name={`form_${name}`}
                    onSubmit={onSubmit}>

                    {children}

                    <button
                        type="submit"
                        className="popup__save-button"
                    >
                        {textButton}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default PopupWithForm;