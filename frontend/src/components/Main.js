import React from 'react';
import Card from './Card';
import Header from './Header';
import Footer from './Footer';
import iconEditButton from '../images/button_icon_edit.svg';

import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Main({
    cards,
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    onCardLike,
    onCardDelete,
    onExit,
    email,
    loggedIn,
}) {
    const currentUser = React.useContext(CurrentUserContext);
    console.log('currentUser in main', currentUser);

    return (
        <>
            <Header email={email} loggedIn={loggedIn} onExit={onExit} />
            <main className="content">
                <section className="profile">
                    <div className="profile__container"  >
                        <img className="profile__avatar"
                            src={currentUser.avatar}
                            alt="Аватар"
                        />
                        <button className="profile__avatar-button" onClick={onEditAvatar}></button>
                        <div className="profile__info">
                            <div className="profile__title-container">
                                <h1 className="profile__name">
                                    {currentUser.name}
                                </h1>
                                <button
                                    type="button"
                                    className="profile__edit-button">
                                    <img
                                        className="profile__edit-image"
                                        src={iconEditButton}
                                        alt="Редактировать профиль"
                                        onClick={onEditProfile}
                                    />
                                </button>
                            </div>
                            <p className="profile__profession">
                                {currentUser.about}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="profile__add-button"
                        onClick={onAddPlace}>
                    </button>
                </section>

                <section className="elements">
                    <div className="cards-container">
                        {cards.map((card) => (
                            <Card
                                key={card._id}
                                card={card}
                                onCardClick={onCardClick}
                                onCardDelete={onCardDelete}
                                onCardLike={onCardLike}
                            />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );

}

export default Main;