import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({
    movies,
    handleSubmitSearch,
    isChecked,
    setIsChecked,
    searchTerm,
    setSearchTerm,
    handleMovieDelete,
    handleChange,
    handleChangeInput,
    isLoading
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
          handleChange={handleChange}
          handleChangeInput={handleChangeInput}
        />
        <MoviesCardList savedList={true} movies={movies} handleMovieDelete={handleMovieDelete} isLoading={isLoading} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
