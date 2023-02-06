import React from "react";

function ImagePopup({
    card,
    onClose
}) {
    return (
        <section className={`popup popup_type_open-picture ${card ? 'popup_opened' : ''}`}>
            <div className="popup__container-picture">
                <button
                    type="button"
                    className="popup__close-button"
                    onClick={onClose}>
                </button>

                <figure
                    className="popup__figure-box">

                    <img
                        className="popup__image"
                        src={card ? card.link : ''}
                        alt={card ? card.name : ''}
                    />
                    <figcaption
                        className="popup__caption">
                        {card ? card.name : ''}
                    </figcaption>
                </figure>
            </div>
        </section>
    );
}

export default ImagePopup;