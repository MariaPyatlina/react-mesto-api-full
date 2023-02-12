import React from "react";
import iconSuccess from '../images/icon_success.svg';
import iconFail from '../images/icon_fail.svg';

function InfoTooltip({
    status,
    isOpen,
    onClose,
}) {
    return (
        <section className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button
                    type="button"
                    className="popup__close-button"
                    onClick={onClose}>
                </button>

                <img className="popup__icon" src={status ? iconSuccess : iconFail} alt="icon"></img>

                <p className="popup__message">
                    {status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так!Попробуйте ещё раз"}
                </p>

            </div>
        </section>
    );
}

export default InfoTooltip;