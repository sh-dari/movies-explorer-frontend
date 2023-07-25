import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies() {
  return(
    <>
      <Header movies={true} />
      <main className="saved-movies">
        <SearchForm />
        <MoviesCardList savedList={true} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
