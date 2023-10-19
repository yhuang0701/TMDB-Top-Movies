import './ListView.css'
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ListView = ({ movieData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedData, setSortedData] = useState([]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  }

  const handleSortOrder = (e) => {
    setSortOrder(e.target.value);
  }

  const filterData = useCallback(() => {
    if (movieData) {
      return movieData.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return [];
  }, [movieData, searchQuery]);

  const sortData = useCallback((data) => {
    let sortedData = [...data];
    if (sortBy === 'name') {
      sortedData.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'release_date') {
      sortedData.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
    } else if (sortBy === 'vote_average') {
      sortedData.sort((a, b) => a.vote_average - b.vote_average);
    }

    if (sortOrder === 'desc') {
      sortedData.reverse();
    }

    return sortedData;
  }, [sortBy, sortOrder]);

  useEffect(() => {
    const filtered = filterData();
    const sorted = sortData(filtered);
    setSortedData(sorted);
  }, [movieData, searchQuery, sortBy, sortOrder, filterData, sortData]);

  return (
    <div>
      <div className="search-and-sort">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <div className='sorted-card'>
          <label>Sort By: </label>
          <select value={sortBy} onChange={handleSortBy}>
            <option value="name">Name</option>
            <option value="release_date">Release Date</option>
            <option value="vote_average">Vote Average</option>
          </select>
        </div>
        <div className='sorted-card'>
          <label>Sort Order: </label>
          <select value={sortOrder} onChange={handleSortOrder}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="listview-container">
        {sortedData.map(movie => (
          <div key={movie.id} className="listview-card">
            <div className="listviewImg">
              <Link to={`detail/${movie.id}`}>
                <img className="movieListImg" src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} alt="movie poster" />
              </Link>
            </div>
            <div className="listviewText">
              <h3>{movie.title}</h3>
              <h3>{movie.release_date}</h3>
              <h3>{`Movie Rating: ${movie.vote_average}`}</h3>
            </div>
          </div>
        ))
        }
      </div>
    </div>
  );
}

ListView.propTypes = {
  movieData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    poster_path: PropTypes.string.isRequired,
  })).isRequired,
};

export default ListView;