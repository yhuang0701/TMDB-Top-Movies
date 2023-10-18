import './DetailView.css';
import { Link, useParams } from 'react-router-dom';

const DetailView = ({ movieDetails }) => {
  const { id } = useParams();
  const currentIndex = movieDetails.findIndex(movie => movie.id.toString() === id);
  const currentMovie = movieDetails[currentIndex];

  const previousMovie = movieDetails[currentIndex - 1];
  const nextMovie = movieDetails[currentIndex + 1];

  return (
    <div className="detail-view">
      <h1>{currentMovie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w300${currentMovie.poster_path}`} alt="movie poster" />
      <p><strong>Release Date:</strong> {currentMovie.release_date}</p>
      <p><strong>Vote Average:</strong> {currentMovie.vote_average}</p>
      <p><strong>Overview:</strong> {currentMovie.overview}</p>

      <div className="navigation">
        {previousMovie &&
          <Link to={`/detail/${previousMovie.id}`} className="nav-button">Previous</Link>
        }
        {nextMovie &&
          <Link to={`/detail/${nextMovie.id}`} className="nav-button">Next</Link>
        }
      </div>
    </div>
  );
}

export default DetailView;