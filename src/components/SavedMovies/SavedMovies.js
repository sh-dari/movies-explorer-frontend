import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
// import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies() {
  return(
    <>
      <Header movies={true} />
      <div className="saved-movies">
        <SearchForm />
        <FilterCheckbox />
        <MoviesCardList savedList={true} />
      </div>
      <Footer />
    </>
  );
}

export default SavedMovies;
