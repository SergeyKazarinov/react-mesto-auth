import React, {useState, useEffect} from "react";
import {CurrentUserContext} from '../context/CurrentUserContext';
import { Route, Switch, withRouter } from 'react-router-dom';
import api from "../utils/Api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from './popup/EditProfilePopup';
import EditAvatarPopup from './popup/EditAvatarPopup'
import AddPlacePopup from "./popup/AddPlacePopup";
import DeleteCardPopup from "./popup/DeleteCardPopup";
import ImagePopup from "./popup/ImagePopup";
import ProtectedRoute from "./ProtectedRoute";
import Register from './Register';
import Login from './Login';
import InfoTooltip from './popup/InfoTooltip';
import { getUserData, authorize, register } from "../utils/Auth";

function App({history}) {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectCard] = useState({isOpen: false, card: {}});
  const [currentUser, setCurrentUser] = useState({name: '', about: ''});
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState({});
  const [loggedIn, setLoggedIn] = useState();
  const [userEmail, setUserEmail] = useState('');
  const [isRegistration, setIsRegistration] = useState(false);


  useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });

    api.getInitialCards()
    .then((res) => {
      setCards(res);
    })
    .catch((err) => {
      console.log(err);
    });
    const token = localStorage.getItem('token');
    if (token) {
      const getUserEmail = async (token) => {
        try{
          const res = await getUserData(token);
          if(res.data.email) {
            setUserEmail(res.data.email)
            setLoggedIn(true);
            history.push('/')
          } else {
            setLoggedIn(false);
          }
        } catch {
          console.error("Ошибка");
        }
      }
      getUserEmail(token);
    }
  }, []);

  function handleEscClose(e) {
    e.key === "Escape" && closeAllPopups();
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    window.addEventListener('keydown', handleEscClose);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
    window.addEventListener('keydown', handleEscClose);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
    window.addEventListener('keydown', handleEscClose);
  }

  function handleDeleteCardClick(card) {
    setCard(card);
    setIsDeleteCardPopupOpen(true);
    window.addEventListener('keydown', handleEscClose);
  }

  function handleCardClick(card) {
    setSelectCard({isOpen: true, card: card});
    window.addEventListener('keydown', handleEscClose);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectCard({...selectedCard, isOpen: false});
    window.removeEventListener('keydown', handleEscClose);
  }

  function handleUpdateUser(userData) {
    api.patchUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleUpdateAvatar(avatarLink) {
    api.patchAvatarInfo(avatarLink)
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closeAllPopups();
    });
  }

  function handleAddPlaceSubmit(newCard) {
    api.addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if(isLiked) {
      api.deleteLike(card)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      api.setLike(card)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card)
      .then(() => {
        setCards((cards) => {
          return cards.filter(item => item !== card);
        })
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  const handleSignOut = () => {
    if(localStorage.getItem('token')) {
      localStorage.removeItem('token')
      setLoggedIn(false);
    }
  }

  const handleSignIn = async ({email, password}) => {
    try{
      const res = await authorize(email, password);
      if(res.token) {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        history.push('/');
      } else return;
    } catch {
      setIsInfoTooltipPopupOpen(true);
      setIsRegistration(false);
      window.addEventListener('keydown', handleEscClose);
    }
  }

  const handleRegistration = async ({email, password}) => {
    try{
      const res = await register(email, password);
      setIsInfoTooltipPopupOpen(true);
      setIsRegistration(true);
      window.addEventListener('keydown', handleEscClose);
      history.push('/sign-in');
    } catch {
      setIsInfoTooltipPopupOpen(true);
      setIsRegistration(false);
      window.addEventListener('keydown', handleEscClose);
    }
  }

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute 
            exact path="/" 
            loggedIn={loggedIn} 
          >
            <Header linkTitle="Выйти" link="/sign-in" onSignOut={handleSignOut} email={userEmail}/>
            <Main 
                onEditProfile={handleEditProfileClick} 
                onAddPlace={handleAddPlaceClick} 
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteCardClick}
              />
            <Footer />
          </ProtectedRoute>
          <Route path="/sign-up">
            <Register onRegistration={handleRegistration}/>
          </Route>
          <Route path="/sign-in">
            <Login onLogIn={handleSignIn} />
          </Route>
        </Switch>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        /> 

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          card={card}
        />

        <ImagePopup 
          card = {selectedCard}
          onClose = {() => setSelectCard({...selectedCard, isOpen: false})}
        />

        <InfoTooltip name="info" isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} isRegistration={isRegistration} />
      </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
