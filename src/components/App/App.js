import React, {useState, useEffect, useCallback} from 'react';
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

function App() {
  const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem("movies")) || []);
  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem("movies")));
  const [isLoading, setIsLoading] = useState(false);
  const [errorPopupOpened, setErrorPopupOpened] = useState(false);
  const [notFoundMessage, setNotFoundMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem("request"));
  const [isChecked, setIsChecked] = useState(JSON.parse(localStorage.getItem("checkbox")));

  const [searchTermSaved, setSearchTermSaved] = useState("");
  const [isCheckedSaved, setIsCheckedSaved] = useState(false);
  const [allMoviesSaved, setAllMoviesSaved] = useState([]);
  const [moviesSaved, setMoviesSaved] = useState(JSON.parse(localStorage.getItem("saved-movies")));

  const [currentUser, setСurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleTokenCheck = useCallback(async () => {
    try {
      const userInfoData = await mainApi.getUserInfo();
      if (userInfoData){
        setLoggedIn(true);
        navigate("/movies");
      }else {
        setLoggedIn(false);
      }
    } catch(err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    handleTokenCheck();
  }, [handleTokenCheck]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userInfoData, savedMoviesData] = await mainApi.getDataToLoadPage();
        const moviesData = await moviesApi.getMovies();
        setAllMovies(moviesData);
        if (userInfoData){
          setLoggedIn(true);
          setСurrentUser(userInfoData);
          setAllMoviesSaved(savedMoviesData.reverse());
          setMoviesSaved(savedMoviesData);
        }
      } catch(err) {
        console.log(err);
      }
    }
    if (loggedIn) {
      fetchData();
    }
  }, [loggedIn]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const savedMoviesData = await mainApi.getSavedMovies();
  //       setAllMoviesSaved(savedMoviesData);
  //     } catch(err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchData();
  // }, [moviesSaved]);

  useEffect(() => {
    if (localStorage.getItem("saved-movies")) {
      let ownerMovies = allMovies.map((movie) => {
        if (JSON.parse(localStorage.getItem("saved-movies")).map(el => el.movieId).includes(movie.id)) {
           movie.saved = true;
        }else {
          movie.saved = false;
        }
        return movie
      });
      setAllMovies(ownerMovies);
    }
  }, [movies, loggedIn, navigate, moviesSaved])

  useEffect(() => {
    if (searchTerm) {
      localStorage.setItem("request", searchTerm);
    }
    localStorage.setItem("movies", JSON.stringify(movies));
    localStorage.setItem("checkbox", JSON.stringify(isChecked));
    localStorage.setItem("saved-movies", JSON.stringify(allMoviesSaved));
  }, [movies, searchTerm, isChecked, allMoviesSaved]);

  useEffect(() => {
    handleSubmitSearch();
  }, [isChecked, searchTerm]);

  useEffect(() => {
    handleSubmitSearchSave();
  }, [isCheckedSaved, searchTermSaved]);

  const filterMovies = (movies, searchItem, isChecked) => {
    let updatedList = [...movies];
    updatedList = updatedList.filter((movie) => {
      const searchRU = movie.nameRU.toLowerCase();
      const searchEN = movie.nameEN.toLowerCase();
      const isShortMovie = isChecked ? movie.duration < 40 : true;
      return (searchRU.includes(searchItem) || searchEN.includes(searchItem)) && isShortMovie
    });
    if (updatedList.length === 0 && localStorage.getItem("request")) {
      setNotFoundMessage("Ничего не найдено");
    }
    return updatedList
  };

  const handleSubmitSearch = () => {
    if (!searchTerm && !localStorage.getItem("request") && loggedIn) {
      setErrorPopupOpened(true);
      return
    }
    const filteredMovies = filterMovies(allMovies, searchTerm, isChecked);
    setMovies(filteredMovies);
  };

  const handleSubmitSearchSave = () => {
    const filteredMovies = filterMovies(allMoviesSaved, searchTermSaved, isCheckedSaved);
    setMoviesSaved(filteredMovies);
  };

  const closeAllPopups = () => {
    setErrorPopupOpened(false);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = async () => {
    localStorage.clear();
    try {
      await mainApi.logout();
      setLoggedIn(false);
      navigate('/', {replace: true});
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
      }else {
        throw new Error("При авторизации произошла ошибка. Токен не передан или передан не в том формате.");
      }
      const userInfo = await mainApi.getUserInfo();
      setСurrentUser(userInfo);
    } catch(err) {
      if (err.includes("401")) {
        throw new Error("Вы ввели неправильный логин или пароль.");
      }else if (err.includes("403")) {
        throw new Error("При авторизации произошла ошибка. Переданный токен некорректен.");
      }
      console.log(err);
    }
  };

  const handleRegister = async (values) => {
    try {
      await mainApi.register(values.password, values.email, values.name);
      handleAuthorize(values);
    } catch(err) {
      if (err.includes("409")) {
        throw new Error("Пользователь с таким email уже существует.");
      }else if (err.includes("400")) {
        throw new Error("При обновлении профиля произошла ошибка");
      }
      console.log(err);
    }
  };

  const handleUpdateUser = async (profile) => {
    try {
      const userData = await mainApi.updateUserInfo(profile);
      setСurrentUser(userData);
    } catch(err) {
      if (err.includes("409")) {
        throw new Error("Пользователь с таким email уже существует.");
      }else if (err.includes("400")) {
        throw new Error("При обновлении профиля произошла ошибка");
      }
      console.log(err);
    }
  };

  const handleMovieSave = async (movie) => {
    try {
      const newMovie = await mainApi.addNewMovie(movie);
      setAllMoviesSaved([...allMoviesSaved, newMovie]);
      // setMoviesSaved([...allMoviesSaved, newMovie]);
    } catch(err) {
      console.log(err);
    }
  };

  const handleMovieDelete = async (id) => {
    try {
      const deletedMovie = await mainApi.deleteMovie(id);
      setAllMoviesSaved(allMoviesSaved.filter(el => el.movieId !== deletedMovie.movieId));
      setMoviesSaved(moviesSaved.filter(el => el.movieId !== deletedMovie.movieId));
    } catch(err) {
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
                handleChange={handleChangeCheckbox}
                handleChangeInput={handleChangeInput}
                setMovies={setMovies}
              />
            }/>
            <Route path="/saved-movies" element={
              <ProtectedRouteElement
                element={SavedMovies}
                movies={moviesSaved}
                handleSubmitSearch={handleSubmitSearchSave}
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
