import React, { useState } from 'react';
import axios from '../../axiosConfig';
import './index.scss';
import useScrollToTop from '../../useScrollToTop';

const Search = () => {
    useScrollToTop();

    const [searchTerm, setSearchTerm] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('name');
    const [players, setPlayers] = useState([]);
    const [searchButtonText] = useState('Search');
    const [error, setError] = useState(null);
    const [noPlayersFound, setNoPlayersFound] = useState(false); // State for "No players found"
    const [inputError, setInputError] = useState(false); // State for "Please input player data"
    const [showMoreOptions, setShowMoreOptions] = useState(true); // State to show more options
    const [loading, setLoading] = useState(false);

    // Mapping of criteria to display names
    const criteriaDisplayNames = {
        name: 'name',
        team: 'team',
        position: 'position',
        points: 'points',
        freeThrows: 'free throws',
        freeThrowPercentage: 'free throw percentage',
        twoPointers: 'two pointers',
        twoPointPercentage: 'two point percentage',
        threePointers: 'three pointers',
        threePointPercentage: 'three point percentage',
        efficientFieldGoalPercentage: 'efficient field goal percentage',
        totalRebounds: 'total rebounds',
        assists: 'assists',
        blocks: 'blocks',
        steals: 'steals',
        turnovers: 'turnovers',
        age: 'age',
        minutesPlayed: 'minutes per game',
        gamesPlayed: 'games played',
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setInputError(false); // Reset input error when the user starts typing
    };

    const handleSearchCriteriaChange = (event) => {
        const value = event.target.value;
        setSearchCriteria(value);
    };

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setInputError(true); // Set input error if search term is empty
            setNoPlayersFound(false);
            setPlayers([]);
            return;
        }

        let adjustedSearchTerm = searchTerm;

        // Check if the search criteria involve percentages
        if (
            searchCriteria === 'freeThrowPercentage' ||
            searchCriteria === 'twoPointPercentage' ||
            searchCriteria === 'threePointPercentage' ||
            searchCriteria === 'efficientFieldGoalPercentage'
        ) {
            // Convert percentage input to a decimal if needed
            const numericValue = parseFloat(adjustedSearchTerm);
            if (numericValue > 1) {
                adjustedSearchTerm = (numericValue / 100);
            }
        }

        setLoading(true);

        try {
            const response = await axios.get('https://statswish.onrender.com/api/v1/player', {
                params: {
                    [searchCriteria]: adjustedSearchTerm,
                },
            });
            if (response.data.length === 0) {
                setNoPlayersFound(true); // Set "No players found" message
                setInputError(false);
            } else {
                setNoPlayersFound(false); // Clear the message if players are found
            }
            setPlayers(response.data);
            setError(null); // Clear previous errors
        } catch (error) {
            console.error('Error fetching players:', error);
            setError('Failed to fetch players. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const toggleShowMoreOptions = () => {
        setShowMoreOptions(!showMoreOptions);
    };

    return (
        <div className="container search-page">
            <h1 className="search-page-title">Search</h1>
            <h4 className="user-note">Note: All numerical stats display values greater than or equal to your input, with the exception of turnovers and age (less than or equal to)</h4>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder={`Search for players based on ${criteriaDisplayNames[searchCriteria]}...`}
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button onClick={handleSearch}>{searchButtonText}</button>
            </div>
            <h4 className="toggle-options" onClick={toggleShowMoreOptions}>
                    {showMoreOptions ? 'Show less options ▲' : 'Show more options ▼'}
            </h4>
            <div className="search-criteria">
                <label>
                    <input
                        type="radio"
                        value="name"
                        checked={searchCriteria === 'name'}
                        onChange={handleSearchCriteriaChange}
                    />
                    Name
                </label>
                <label>
                    <input
                        type="radio"
                        value="team"
                        checked={searchCriteria === 'team'}
                        onChange={handleSearchCriteriaChange}
                    />
                    Team
                </label>
                <label>
                    <input
                        type="radio"
                        value="position"
                        checked={searchCriteria === 'position'}
                        onChange={handleSearchCriteriaChange}
                    />
                    Position
                </label>
                <label>
                    <input
                        type="radio"
                        value="points"
                        checked={searchCriteria === 'points'}
                        onChange={handleSearchCriteriaChange}
                    />
                    Points
                </label>

                {/* Conditionally render the rest of the criteria */}
                {showMoreOptions && (
                    <>
                        <label>
                            <input
                                type="radio"
                                value="freeThrows"
                                checked={searchCriteria === 'freeThrows'}
                                onChange={handleSearchCriteriaChange}
                            />
                            Free Throws
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="freeThrowPercentage"
                                checked={searchCriteria === 'freeThrowPercentage'}
                                onChange={handleSearchCriteriaChange}
                            />
                            Free Throw Percentage
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="twoPointers"
                                checked={searchCriteria === 'twoPointers'}
                                onChange={handleSearchCriteriaChange}
                            />
                            Two Pointers
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="twoPointPercentage"
                                checked={searchCriteria === 'twoPointPercentage'}
                                onChange={handleSearchCriteriaChange}
                            />
                            Two Point Percentage
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="threePointers"
                                checked={searchCriteria === 'threePointers'}
                                onChange={handleSearchCriteriaChange}
                            />
                            Three Pointers
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="threePointPercentage"
                                checked={searchCriteria === 'threePointPercentage'}
                                onChange={handleSearchCriteriaChange}
                            />
                            Three Point Percentage
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="efficientFieldGoalPercentage"
                                checked={searchCriteria === 'efficientFieldGoalPercentage'}
                                onChange={handleSearchCriteriaChange}
                            />
                            Efficient Field Goal Percentage
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="totalRebounds"
                                checked={searchCriteria === 'totalRebounds'}
                                onChange={handleSearchCriteriaChange}
                            />
                            Total Rebounds
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="assists"
                                checked={searchCriteria === 'assists'}
                                onChange={handleSearchCriteriaChange}
                            />
                            Assists
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="blocks"
                                checked={searchCriteria === 'blocks'}
                                onChange={handleSearchCriteriaChange}
                            />
                            Blocks
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="steals"
                                checked={searchCriteria === 'steals'}
                                onChange={handleSearchCriteriaChange}
                            />
                            Steals
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="turnovers"
                                checked={searchCriteria === 'turnovers'}
                                onChange={handleSearchCriteriaChange}
                            />
                            Turnovers
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="age"
                                checked={searchCriteria === 'age'}
                                onChange={handleSearchCriteriaChange}
                            />
                            Age
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="minutesPlayed"
                                checked={searchCriteria === 'minutesPlayed'}
                                onChange={handleSearchCriteriaChange}
                            />
                            Minutes Per Game
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="gamesPlayed"
                                checked={searchCriteria === 'gamesPlayed'}
                                onChange={handleSearchCriteriaChange}
                            />
                            Games Played
                        </label>
                    </>
                )}
            </div>
            
            <div className="search-results">

                {loading && <div className="spinner"></div>} {/* Display spinner */}
                {error && <h4 className="error">{error}</h4>}
                {inputError && <h4 className="error">Please input player data</h4>}
                {noPlayersFound && <h4 className="error">No players found</h4>}

                {players.length > 0 && (
                    <table>
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
                            {players.map((player) => (
                                <tr key={player.id}>
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
                )}
            </div>
        </div>
    );
};

export default Search;