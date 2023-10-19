import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Header from "./components/header/Header";
import GalleryView from "./components/galleryView/GalleryView";
import ListView from "./components/listView/ListView";
import DetailView from "./components/detailView/DetailView";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PropTypes from 'prop-types';

function App() {
  const api_key = "a4d366e658580b25d2ef402d277cb96f";
  const [movieData, setMovieData] = useState([]);

  const getTopMovieData = useCallback(async () => {
    let allData = []

    for (let page = 1; page <= 10; page++) {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}&api_key=${api_key}`);
        const pageData = response.data.results;
        allData = [...allData, ...pageData];
      } catch (e) {
        console.error(`Error fetching data from page ${page}:`, e);
      }
    }
    setMovieData(allData);
    console.log(allData);
  }, [api_key]);

  useEffect(() => {
    getTopMovieData();
  }, [getTopMovieData]);

  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <Header />
        <Routes>
          <Route exact path="/" element={<ListView movieData={movieData} />} />
          <Route exact path="/gallery" element={<GalleryView movieData={movieData} api_key={api_key} />} />
          <Route path="/detail/:id" element={<DetailView movieDetails={movieData} />} />
        </Routes>
      </Router>
    </>
  );
}

App.propTypes = {
  movieData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    poster_path: PropTypes.string.isRequired,
  })).isRequired,
};

export default App;
