import './DetailView.css';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const DetailView = ({ movieDetails }) => {
  const { id } = useParams();
  const currentIndex = movieDetails.findIndex(movie => movie.id.toString() === id);
  const currentMovie = movieDetails[currentIndex];

  const previousMovie = movieDetails[(currentIndex + movieDetails.length - 1) % movieDetails.length];
  const nextMovie = movieDetails[(currentIndex + movieDetails.length + 1) % movieDetails.length];

  return (
    <div className="detail-view">
      <div className="movie-container">
        <img src={`https://image.tmdb.org/t/p/w780/${currentMovie.backdrop_path}`} alt="movie backdrop" />
        <h2>{currentMovie.title}</h2>
        <div className="para-container">
          <p><strong>Release Date:</strong> {currentMovie.release_date}</p>
          <p><strong>Vote Average:</strong> {currentMovie.vote_average}</p>
          <p><strong>Overview:</strong> {currentMovie.overview}</p>
        </div>
      </div>

      <div className="slideBtns">
        {previousMovie &&
          <Link to={`/detail/${previousMovie.id}`} className="slide-button">Previous</Link>
        }
        {nextMovie &&
          <Link to={`/detail/${nextMovie.id}`} className="slide-button">Next</Link>
        }
      </div>
    </div>
  );
}

DetailView.propTypes = {
  movieDetails: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    poster_path: PropTypes.string.isRequired,
  })).isRequired,
};

export default DetailView;