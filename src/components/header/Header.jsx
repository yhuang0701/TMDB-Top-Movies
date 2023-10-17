import './Header.css'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <div id="header">
        <h2>TMDB Top 200 Movie Directory</h2>
      </div>
      <div className="nav-buttons">
        <Link to="/" className="nav-button">List View</Link>
        <Link to="/gallery" className="nav-button">Gallery View</Link>
      </div>
    </>
  )
}
export default Header