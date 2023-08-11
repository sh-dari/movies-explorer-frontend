import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NoMatch from '../NoMatch/NoMatch';
import moviesApi from '../../utils/MoviesApi';
import ApiError from '../ApiError/ApiError';
import mainApi from "../../utils/MainApi";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { LoginContext } from '../../contexts/LoginContext';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import ProtectedRouteLoginElement from '../ProtectedRouteLogin/ProtectedRouteLogin';
import {
  NOT_FOUND_MESSAGE,
  ERROR_TOKEN_MESSAGE,
  ERROR_LOGIN_MESSAGE,
  ERROR_AUTH_MESSAGE,
  ERROR_EMAIL_MESSAGE,
  ERROR_PROFILE_MESSAGE,
  SUCCESS_PROFILE_MESSAGE
} from '../../utils/constants';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [popupOpened, setPopupOpened] = useState(false);
  const [message, setMessage] = useState("");
  const [notFoundMessage, setNotFoundMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem("request"));
  const [isChecked, setIsChecked] = useState(JSON.parse(localStorage.getItem("checkbox")));
  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem("movies")));

  const [searchTermSaved, setSearchTermSaved] = useState("");
  const [isCheckedSaved, setIsCheckedSaved] = useState(false);
  const [moviesSaved, setMoviesSaved] = useState(JSON.parse(localStorage.getItem("all-saved")));

  const [currentUser, setСurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const filterMovies = (moviesList, searchItem, isChecked) => {
    if (!searchItem) {
      if (location.pathname==='/movies') {
        return
      }else {
        setSearchTermSaved("");
      }
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return moviesList && moviesList.filter((movie) => {
      const searchRU = movie.nameRU.toLowerCase();
      const searchEN = movie.nameEN.toLowerCase();
      const isShortMovie = isChecked ? movie.duration < 40 : true;
      return (searchRU.includes(searchItem.toLowerCase()) || searchEN.includes(searchItem.toLowerCase())) && isShortMovie
    })
  };

  const handleSubmitSearch = () => {
    const filteredMovies = filterMovies(JSON.parse(localStorage.getItem("all-movies")), searchTerm, isChecked);
    if (filteredMovies && filteredMovies.length === 0 && localStorage.getItem("request")) {
      setNotFoundMessage(NOT_FOUND_MESSAGE);
    }
    setMovies(filteredMovies);
  };

  const handleSubmitSearchSaved = () => {
    const filteredMovies = filterMovies(JSON.parse(localStorage.getItem("all-saved")), searchTermSaved, isCheckedSaved);
    setMoviesSaved(filteredMovies);
  };

  const closeAllPopups = () => {
    setPopupOpened(false);
  };

  const handleLogout = async () => {
    try {
      await mainApi.logout();
      setLoggedIn(false);
      navigate('/', {replace: true});
      setSearchTerm("");
      setIsChecked(false);
      localStorage.clear();
    } catch(err) {
      setPopupOpened(true);
      setMessage(err);
      console.log(err);
    }
  };

  const handleAuthorize = async (values) => {
    try {
      const data = await mainApi.authorize(values.password, values.email);
      if (data.token){
        setLoggedIn(true);
        navigate('/movies', {replace: true});
      }else {
        throw new Error(ERROR_TOKEN_MESSAGE);
      }
      const userInfo = await mainApi.getUserInfo();
      setСurrentUser(userInfo);
    } catch(err) {
      if (err.includes("401")) {
        throw new Error(ERROR_LOGIN_MESSAGE);
      }else if (err.includes("403")) {
        throw new Error(ERROR_AUTH_MESSAGE);
      }
      setPopupOpened(true);
      setMessage(err);
      console.log(err);
    }
  };

  const handleRegister = async (values) => {
    try {
      await mainApi.register(values.password, values.email, values.name);
      handleAuthorize(values);
    } catch(err) {
      if (err.includes("409")) {
        throw new Error(ERROR_EMAIL_MESSAGE);
      }else if (err.includes("400")) {
        throw new Error(ERROR_PROFILE_MESSAGE);
      }
      setPopupOpened(true);
      setMessage(err);
      console.log(err);
    }
  };

  const handleUpdateUser = async (profile) => {
    try {
      const userData = await mainApi.updateUserInfo(profile);
      setСurrentUser(userData);
      setPopupOpened(true);
      setMessage(SUCCESS_PROFILE_MESSAGE);
    } catch(err) {
      if (err.includes("409")) {
        throw new Error(ERROR_EMAIL_MESSAGE);
      }else if (err.includes("400")) {
        throw new Error(ERROR_PROFILE_MESSAGE);
      }
      setPopupOpened(true);
      setMessage(err);
      console.log(err);
    }
  };

  const updateMovies = () => {
    const moviesData = JSON.parse(localStorage.getItem("all-movies"));
    const savedMoviesData = JSON.parse(localStorage.getItem("all-saved"));
    if (moviesData) {
      const ownerMovies = moviesData.map((movie) => {
        savedMoviesData.map(el => el.movieId).includes(movie.id) ?
        movie.saved = true : movie.saved = false;
        return movie
      });
      localStorage.setItem("all-movies", JSON.stringify(ownerMovies));
    }
  };

  const handleMovieSave = async (movie) => {
    try {
      const newMovie = await mainApi.addNewMovie(movie);
      const newSavedMovies = [newMovie, ...moviesSaved];
      setMoviesSaved(newSavedMovies);
      localStorage.setItem("all-saved", JSON.stringify(newSavedMovies));
      updateMovies();
    } catch(err) {
      setPopupOpened(true);
      setMessage(err);
      console.log(err);
    }
  };

  const handleMovieDelete = async (id) => {
    try {
      const deletedMovie = await mainApi.deleteMovie(id);
      const newSavedMovies = moviesSaved.filter(el => el.movieId !== deletedMovie.movieId);
      setMoviesSaved(newSavedMovies);
      localStorage.setItem("all-saved", JSON.stringify(newSavedMovies));
      updateMovies();
    } catch(err) {
      setPopupOpened(true);
      setMessage(err);
      console.log(err);
    }
  };

  const handleChangeCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleChangeCheckboxSave = () => {
    setIsCheckedSaved(!isCheckedSaved);
  };

  const handleChangeInput = evt => {
    setSearchTerm(evt.target.value);
  };

  const handleChangeInputSaved = evt => {
    setSearchTermSaved(evt.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const userInfoData = await mainApi.getUserInfo();
        if (userInfoData){
          setLoggedIn(true);
          navigate(location.pathname, {replace: true});
        }else {
          setLoggedIn(false);
        }
      } catch(err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const userInfoData = await mainApi.getUserInfo();
        if (userInfoData){
          setСurrentUser(userInfoData);
        }
      } catch(err) {
        console.log(err);
      }
    }
    if (loggedIn) {
      fetchData();
    }
  }, [loggedIn]);

  useEffect(() => {
    if (searchTerm) {
      localStorage.setItem("request", searchTerm);
    }
    if (movies) {
      localStorage.setItem("movies", JSON.stringify(movies));
    }
    localStorage.setItem("checkbox", JSON.stringify(isChecked));
  }, [searchTerm, isChecked, movies]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [savedMoviesData, moviesData] = await Promise.all([
          mainApi.getSavedMovies(),
          moviesApi.getMovies()
        ]);
        if (moviesData) {
          const ownerMovies = moviesData.map((movie) => {
            savedMoviesData.map(el => el.movieId).includes(movie.id) ?
            movie.saved = true : movie.saved = false;
            return movie
          });
          localStorage.setItem("all-movies", JSON.stringify(ownerMovies));
          setIsLoading(false);
        }
        localStorage.setItem("all-saved", JSON.stringify(savedMoviesData.reverse()));
      } catch(err) {
        console.log(err);
      }
    }
    if (loggedIn) {
      fetchData();
    }
  }, [loggedIn]);

  useEffect(() => {
    handleSubmitSearch();
  }, [isChecked, navigate]);

  useEffect(() => {
    handleSubmitSearchSaved();
  }, [isCheckedSaved]);

  useEffect(() => {
    setSearchTermSaved("");
    setIsCheckedSaved(false);
    setMoviesSaved(JSON.parse(localStorage.getItem("all-saved")));
  }, [navigate]);

  return (
    <LoginContext.Provider value={ {loggedIn, handleLogout} }>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/movies" element={
              <ProtectedRouteElement
                element={Movies}
                movies={movies}
                handleSubmitSearch={handleSubmitSearch}
                isLoading={isLoading}
                notFoundMessage={notFoundMessage}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                handleMovieSave={handleMovieSave}
                handleMovieDelete={handleMovieDelete}
                handleChange={handleChangeCheckbox}
                handleChangeInput={handleChangeInput}
                setMovies={setMovies}
                setErrorPopupOpened={setPopupOpened}
                setErrorMessage={setMessage}
              />
            }/>
            <Route path="/saved-movies" element={
              <ProtectedRouteElement
                element={SavedMovies}
                movies={moviesSaved}
                handleSubmitSearch={handleSubmitSearchSaved}
                searchTerm={searchTermSaved}
                setSearchTerm={setSearchTermSaved}
                isChecked={isCheckedSaved}
                setIsChecked={setIsCheckedSaved}
                handleMovieDelete={handleMovieDelete}
                handleChange={handleChangeCheckboxSave}
                handleChangeInput={handleChangeInputSaved}
                isLoading={isLoading}
              />
            }/>
            <Route path="/profile" element={
              <ProtectedRouteElement
                element={Profile}
                handleUpdateUser={handleUpdateUser}
              />
            }/>
            <Route path="/signup" element={
              <ProtectedRouteLoginElement
                element={Register}
                handleRegister={handleRegister}
              />
            }/>
            <Route path="/signin" element={
              <ProtectedRouteLoginElement
                element={Login}
                handleAuthorize={handleAuthorize}
              />
            }/>
            <Route path="*" element={<NoMatch />}/>
          </Routes>
          <ApiError
            isOpen={popupOpened}
            onClose={closeAllPopups}
            message={message}
          />
        </div>
      </CurrentUserContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
