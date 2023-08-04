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
  handleMovieSave
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
        />
        <MoviesCardList
          movies={movies}
          isLoading={isLoading}
          notFoundMessage={notFoundMessage}
          handleMovieSave={handleMovieSave}
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
