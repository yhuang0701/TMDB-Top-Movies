import Header from "./components/header/Header";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [movieData, setMovieData] = useState([]);
  useEffect(() => {
    getTopMovieData();
  }, []);

  const getTopMovieData = async () => {
    let allData = []
    const api_key = "a4d366e658580b25d2ef402d277cb96f";

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
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
