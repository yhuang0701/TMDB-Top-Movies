import './Gallery.css';

const Gallery = ({ movieData }) => {
  return (
    <div id="gallery">
      {movieData.map(movie => (
        <div key={movie.id} className="movie-card">
          <img className="movieImg" src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`} alt="movie image" />
        </div>
      ))}
    </div>
  )
}
export default Gallery;