import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({
  movies,
  handleSubmitSearch,
  isLoading,
  notFoundMessage,
  isChecked,
  setIsChecked,
  searchTerm,
  setSearchTerm,
  handleMovieSave,
  handleChange,
  handleChangeInput,
  setMovies,
  setErrorPopupOpened,
  setErrorMessage,
  handleMovieDelete
}) {

  return(
    <>
      <Header />
      <main className="movies">
        <SearchForm
          handleSubmitSearch={handleSubmitSearch}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleChange={handleChange}
          handleChangeInput={handleChangeInput}
          setErrorPopupOpened={setErrorPopupOpened}
          setErrorMessage={setErrorMessage}
        />
        <MoviesCardList
          movies={movies}
          isLoading={isLoading}
          notFoundMessage={notFoundMessage}
          handleMovieSave={handleMovieSave}
          setMovies={setMovies}
          handleMovieDelete={handleMovieDelete}
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
