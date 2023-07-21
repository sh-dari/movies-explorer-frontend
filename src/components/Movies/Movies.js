import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
// import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies() {
  return(
    <>
      <Header movies={true} />
      <div className="movies">
        <SearchForm />
        <FilterCheckbox />
        <MoviesCardList />
      </div>
      <Footer />
    </>
  );
}

export default Movies;
