import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoStatTransparent from '../../assets/images/logo.png';
import './index.scss';
import useScrollToTop from '../../useScrollToTop';

const Home = () => {
  useScrollToTop();
  
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={`home-container ${loaded ? 'loaded' : ''}`}>
      <img src={LogoStatTransparent} alt="logo" className='home-img' />
      <div className="home-text">
        <h1 className="home-title">Welcome to StatSwish</h1>
        <h2 className="home-subtitle">Your Game, Your Stats</h2>
        <h3>Use advanced data metrics and machine learning to help construct your NBA Fantasy team, consistently hit parlays, and track your favorite NBA players!</h3>
        <h4>Get Started: Search for player stats by <Link to="/Teams">team</Link> or <Link to="/Position">position</Link>. Can't find what you're looking for? Use our <Link to="/Search">search feature</Link> and filter through various metrics to find your perfect player. Also check out our <Link to="/MatchPredictor">match predictor</Link> (powered by machine learning) for game analysis!</h4>
      </div>
    </div>
  );
};

export default Home;