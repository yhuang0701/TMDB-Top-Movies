import './GalleryView.css';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const GalleryView = ({ movieData, api_key }) => {
  const [genres, setGenres] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const getGenreData = useCallback(async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${api_key}`);
      setGenres(response.data.genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  }, [api_key]);

  useEffect(() => {
    getGenreData();
    setFilteredMovies(movieData);
  }, [getGenreData, movieData]);

  const handleFilter = (genreId) => {
    if (genreId === 0) {
      setFilteredMovies(movieData);
    } else {
      const filteredMovieData = movieData.filter(movie => movie.genre_ids.includes(genreId))
      setFilteredMovies(filteredMovieData);
    }
  }


  return (
    <>
      <div className="genreBtns">
        <button className="genreBtn" onClick={() => handleFilter(0)}>All</button>
        {genres.map(genre => (
          <button
            key={genre.id}
            className="genreBtn"
            onClick={() => handleFilter(genre.id)}>
            {genre.name}
          </button>
        ))}
      </div>

      <div id="gallery">
        {filteredMovies.map(movie => (
          <div key={movie.id} className="movie-card">
            <img className="movieImg" src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`} alt="movie poster" />
          </div>
        ))}
      </div>
    </>
  )
}
export default GalleryView;