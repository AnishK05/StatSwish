import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faTshirt, faBars, faClose, faUsers, faBasketballBall } from '@fortawesome/free-solid-svg-icons';
import './index.scss';
import LogoStatTransparent from '../../assets/images/logo.png';

const NavBar = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className='nav-bar'>
      <Link className="logo" to="/">
        <img src= {LogoStatTransparent} alt="logo" />
      </Link>
      <nav className={showNav ? 'mobile-show' : ''}>
        <NavLink exact="true" activeclassname="active" to="/" onClick={() => setShowNav(false)}>
          <FontAwesomeIcon icon={faHome} />
        </NavLink>
        <NavLink exact="true" activeclassname="active" className="teams-link" to="/Teams" onClick={() => setShowNav(false)}>
          <FontAwesomeIcon icon={faUsers} />
        </NavLink>
        <NavLink exact="true" activeclassname="active" className="position-link" to="/Position" onClick={() => setShowNav(false)}>
          <FontAwesomeIcon icon={faTshirt} />
        </NavLink>
        <NavLink exact="true" activeclassname="active" className="search-link" to="/Search" onClick={() => setShowNav(false)}>
          <FontAwesomeIcon icon={faSearch} />
        </NavLink>
        <NavLink exact="true" activeclassname="active" className="predictor-link" to="/MatchPredictor" onClick={() => setShowNav(false)}>
          <FontAwesomeIcon icon={faBasketballBall} />
        </NavLink>
        <FontAwesomeIcon icon={faClose} size="3x" className="close-icon" onClick={() => setShowNav(false)} />
      </nav>
      <FontAwesomeIcon onClick={() => setShowNav(true)} icon={faBars} color="#E6B17E" size="3x" className="hamburger-icon" />
    </div>
  );
};

export default NavBar;