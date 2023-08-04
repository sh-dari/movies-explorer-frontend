import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({
    movies,
    handleSubmitSearch,
    isChecked,
    setIsChecked,
    searchTerm,
    setSearchTerm,
    handleMovieDelete
}) {
  return(
    <>
      <Header movies={true} />
      <main className="saved-movies">
        <SearchForm
          handleSubmitSearch={handleSubmitSearch}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <MoviesCardList savedList={true} movies={movies} handleMovieDelete={handleMovieDelete} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
