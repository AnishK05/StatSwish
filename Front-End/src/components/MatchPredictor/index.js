import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import teamStats from "../../data/teamStats.json";
import "./index.scss";
import useScrollToTop from '../../useScrollToTop';

const MatchPredictor = () => {
    useScrollToTop();

    const [homeTeam, setHomeTeam] = useState('');
    const [awayTeam, setAwayTeam] = useState('');
    const [prediction, setPrediction] = useState('');
    const [loading, setLoading] = useState(false);
    const resultRef = useRef(null);

    const handleHomeTeamChange = (e) => {
        setHomeTeam(e.target.value);
    };

    const handleAwayTeamChange = (e) => {
        setAwayTeam(e.target.value);
    };

    const handlePredict = () => {
        // Ensure homeTeam and awayTeam are selected before proceeding
        if (!homeTeam || !awayTeam) {
            alert('Please select both home and away teams!');
            return;
        }
        if (homeTeam === awayTeam) {
            alert('Please choose different teams');
            return;
        }

        setLoading(true); // Set loading to true before fetching

        fetch('https://statswishml.onrender.com/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                home_team: homeTeam,
                away_team: awayTeam,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const winningTeam = data.result === "Home" ? homeTeam : awayTeam;
                const homeProb = (data.probabilities.home * 100).toFixed(0);
                const awayProb = (data.probabilities.away * 100).toFixed(0);

                if (homeProb > awayProb) {
                    setPrediction(`${winningTeam} will win! (${homeProb}% odds)`);
                }
                else {
                    setPrediction(`${winningTeam} will win! (${awayProb}% odds)`);
                }
                
                setLoading(false); // Set loading to false after processing data
            })
            .catch((error) => {
                console.error('Error fetching prediction:', error);
                setLoading(false); // Set loading to false after processing data
            });
    };

    useEffect(() => {
        if (prediction) {
            resultRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [prediction]);

    return (
        <div className="match-predictor">
            <h1 className="match-predictor-title">NBA Regular Season Match Predictor</h1>
            <h3 className="caption">Predict upcoming match-ups using our custom built machine learning model! For more information about the model's architecture, visit our <Link to="https://github.com/AnishK05">Github</Link></h3>
            <form onSubmit={(e) => { e.preventDefault(); handlePredict(); }}>
                <div className="team-selection">
                    <h3 className="selector-title">Home Team</h3>
                    <select id="home-team" value={homeTeam} onChange={handleHomeTeamChange}>
                        <option value="">Select Home Team</option>
                        {teamStats.teams.map((team) => (
                            <option key={team.name} value={team.name}>{team.name}</option>
                        ))}
                    </select>
                </div>
                <div className="team-selection">
                    <h3 className="selector-title">Away Team</h3>
                    <select id="away-team" value={awayTeam} onChange={handleAwayTeamChange}>
                        <option value="">Select Away Team</option>
                        {teamStats.teams.map((team) => (
                            <option key={team.name} value={team.name}>{team.name}</option>
                        ))}
                    </select>
                </div>
                <button className="predict-button" type="submit">Predict</button>
            </form>
            {loading && <div className="spinner"></div>} {/* Loading indicator */}
            {prediction && !loading && <div className="result" ref={resultRef}>{prediction}</div>}
        </div>
    );
};

export default MatchPredictor;