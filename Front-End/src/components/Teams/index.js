import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './index.scss';
import teamData from "../../data/teams.json";
import useScrollToTop from '../../useScrollToTop';

const Teams = () => {
    useScrollToTop();
    
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTeams, setFilteredTeams] = useState([]);

    useEffect(() => {
        const filtered = teamData.teams.filter(team =>
            team.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredTeams(filtered);
    }, [searchQuery]);

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
    };

    const renderTeams = () => {
        return (
            <div className="team-images-container">
                {filteredTeams.map((team, idx) => (
                    <div key={idx} className="team-image-box">
                        <img src={team.cover} alt={team.title} className="teams-image" />
                        <div className="team-content">
                            <p className="team-title">{team.title}</p>
                            <Link className="team-btn" to={`/roster/${team.abbreviation}`}>
                                View
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="container teams-page">
            <h1 className="team-page-title">Teams</h1>
            <div className="team-search-bar">
                <input
                    type="text"
                    placeholder="Search for teams"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div>{renderTeams()}</div>
        </div>
    );
};

export default Teams;