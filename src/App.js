import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/header/Header";
import GalleryView from "./components/galleryView/GalleryView";
import ListView from "./components/listView/ListView";
import DetailView from "./components/detailView/DetailView";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const api_key = "a4d366e658580b25d2ef402d277cb96f";
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    getTopMovieData();
  }, []);

  const getTopMovieData = async () => {
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
  }

  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route exact path="/" element={<ListView />} />
          <Route exact path="/gallery" element={<GalleryView movieData={movieData} api_key={api_key} />} />
          <Route path="/detail/:title" element={<DetailView movieDetails={movieData} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
