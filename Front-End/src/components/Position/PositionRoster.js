import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from '../../axiosConfig';
import './PositionRoster.scss';
import useScrollToTop from '../../useScrollToTop';

const PositionRoster = () => {
    useScrollToTop();
    
    const { positionName } = useParams(); // Capture the abbreviation from the URL
    const [players, setPlayers] = useState([]);
    const [error, setError] = useState(null); // State to manage errors

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get(`https://statswish.onrender.com/api/v1/player?position=${positionName}`);
                setPlayers(response.data); // Assuming the response is an array of players
                setError(null); // Clear previous errors
            } catch (error) {
                console.error('Error fetching players:', error);
                setError('Failed to fetch players. Please try again.');
            }
        };

        fetchPlayers();
    }, [positionName]);

    const renderPlayers = () => {
        if (error) return <p className="error">{error}</p>; // Display error if present

        return (
            <table className="position-players-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Team</th>
                        <th>Position</th>
                        <th>Points</th>
                        <th>Rebounds</th>
                        <th>Assists</th>
                        <th>Blocks</th>
                        <th>Steals</th>
                        <th>Free Throws</th>
                        <th>Free Throw Percentage</th>
                        <th>Two Pointers</th>
                        <th>Two Point Percentage</th>
                        <th>Three Pointers</th>
                        <th>Three Point Percentage</th>
                        <th>Efficient Field Goal Percentage</th>
                        <th>Turnovers</th>
                        <th>Age</th>
                        <th>Minutes per Game</th>
                        <th>Games Played</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player, index) => (
                        <tr key={[index]}>
                            <td>{player.player_name}</td>
                            <td>{player.team}</td>
                            <td>{player.position}</td>
                            <td>{player.points}</td>
                            <td>{player.totalRebounds}</td>
                            <td>{player.assists}</td>
                            <td>{player.blocks}</td>
                            <td>{player.steals}</td>
                            <td>{player.freeThrows}</td>
                            <td>{player.freeThrowPercentage}</td>
                            <td>{player.twoPointers}</td>
                            <td>{player.twoPointPercentage}</td>
                            <td>{player.threePointers}</td>
                            <td>{player.threePointPercentage}</td>
                            <td>{player.efficientFieldGoalPercentage}</td>
                            <td>{player.turnovers}</td>
                            <td>{player.age}</td>
                            <td>{player.minutes_per_game}</td>
                            <td>{player.games_played}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const criteriaDisplayNames = {
        C: 'Centers',
        PF: 'Power Forwards',
        SF: 'Small Forwards',
        SG: 'Shooting Guards',
        PG: 'Point Guards'
    };

    return (
        <div className="position-roster-container">
            <h1>NBA {criteriaDisplayNames[positionName]} </h1>
            {renderPlayers()}
        </div>
    );
};

export default PositionRoster;