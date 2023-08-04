import React, {useState, useEffect, useCallback} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
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

function App() {
  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorPopupOpened, setErrorPopupOpened] = useState(false);
  const [notFoundMessage, setNotFoundMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const [searchTermSaved, setSearchTermSaved] = useState("");
  const [isCheckedSaved, setIsCheckedSaved] = useState(false);
  const [moviesSaved, setMoviesSaved] = useState([]);

  const [currentUser, setСurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleTokenCheck = useCallback(async () => {
    try {
      const [userInfoData, savedMoviesData] = await mainApi.getDataToLoadPage();
      if (userInfoData){
        setLoggedIn(true);
        setСurrentUser(userInfoData);
        setMoviesSaved(savedMoviesData);
      } else {
        return
      }
    } catch(err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    handleTokenCheck();
  }, [handleTokenCheck]);

  useEffect(() => {
    if (localStorage.getItem("movies")) {
      setMovies(JSON.parse(localStorage.getItem("movies")));
    } else {
      setMovies([]);
    }
    setSearchTerm(localStorage.getItem("request") || "");
  }, [loggedIn]);

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await moviesApi.getMovies();
      setAllMovies(movies);
    };
    fetchMovies()
    .catch(console.error);
  }, [moviesSaved]);

  const saveToLocalStorage = (request, checkbox, movies) => {
    localStorage.setItem("request", request);
    localStorage.setItem("checkbox", JSON.stringify(checkbox));
    localStorage.setItem("movies", JSON.stringify(movies));
  };

  const filterMovies = (movies, searchItem, isChecked) => {
    const filterMovies = movies.filter((movie) => {
      const searchRU = movie.nameRU.toLowerCase();
      const searchEN = movie.nameEN.toLowerCase();
      const isShortMovie = isChecked ? movie.duration < 40 : true;
      return searchRU.includes(searchItem) || searchEN.includes(searchItem) && isShortMovie
    });
    if (filterMovies.length === 0) {
      setNotFoundMessage("Ничего не найдено");
    }
    return filterMovies
  };

  const handleSubmitSearch = (word, isChecked) => {
    const searchItem = word.toLowerCase();
    if (!searchItem) {
      setErrorPopupOpened(true);
      return
    }
    const filteredMovies = filterMovies(allMovies, searchItem, isChecked);
    setMovies(filteredMovies);
    setIsLoading(false);
    saveToLocalStorage(searchItem, isChecked, filteredMovies);
  };

  const handleSubmitSearchSave = (word, isChecked) => {
    const searchItem = word.toLowerCase();
    const filteredMovies = filterMovies(moviesSaved, searchItem, isChecked);
    return filteredMovies;
  };

  const closeAllPopups = () => {
    setErrorPopupOpened(false);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      await mainApi.logout();
      setLoggedIn(false);
      navigate('/', {replace: true});
      localStorage.clear();
    } catch(err) {
      console.log(err);
    }
  };

  const handleAuthorize = async (values) => {
    try {
      const data = await mainApi.authorize(values.password, values.email);
      if (data.token){
        handleLogin();
        navigate('/movies', {replace: true});
      }
      const userInfo = await mainApi.getUserInfo();
      setСurrentUser(userInfo);
    } catch(err) {
      console.log(err);
    }
  };

  const handleRegister = async (values) => {
    try {
      await mainApi.register(values.password, values.email, values.name);
      handleAuthorize(values);
    } catch(err) {
      console.log(err);
    }
  };

  const handleMovieSave = async (movie) => {
    try {
      const isSaved = false;
      if (movie.saved) {
        isSaved = movie.saved.some(user => user === currentUser._id);
      }
      const newMovie = await mainApi.addNewMovie(movie);
      // setAllMoviesSaved(state => state.map(() => isSaved ? newMovie : null));
      console.log(moviesSaved)
      setMoviesSaved([...moviesSaved, newMovie]);
    } catch(err) {
      console.log(err);
    }
  };

  const handleMovieDelete = async (id) => {
    try {
      const deletedMovie = await mainApi.deleteMovie(id);
      setMoviesSaved(moviesSaved.filter(el => el.movieId !== deletedMovie.movieId));
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <LoginContext.Provider value={ {loggedIn, handleLogout} }>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/movies" element={
              <Movies
                movies={movies}
                handleSubmitSearch={handleSubmitSearch}
                isLoading={isLoading}
                notFoundMessage={notFoundMessage}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                handleMovieSave={handleMovieSave}
              />
            }/>
            <Route path="/saved-movies" element={
              <SavedMovies
                movies={moviesSaved}
                handleSubmitSearch={handleSubmitSearchSave}
                searchTerm={searchTermSaved}
                setSearchTerm={setSearchTermSaved}
                isChecked={isCheckedSaved}
                setIsChecked={setIsCheckedSaved}
                handleMovieDelete={handleMovieDelete}
              />
            }/>
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<Register handleRegister={handleRegister} />} />
            <Route path="/signin" element={<Login handleAuthorize={handleAuthorize} />} />
            <Route path="*" element={<NoMatch />}/>
          </Routes>
          <ApiError
            isOpen={errorPopupOpened}
            onClose={closeAllPopups}
          />
        </div>
      </CurrentUserContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
