import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './index.scss';
import positionData from "../../data/positions.json";
import useScrollToTop from '../../useScrollToTop';

const Positions = () => {
    useScrollToTop();
    
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPositions, setFilteredPositions] = useState([]);

    useEffect(() => {
        const filtered = positionData.positions.filter(position =>
            position.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPositions(filtered);
    }, [searchQuery]);

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
    };

    const renderPositions = () => {
        return (
            <div className="position-images-container">
                {filteredPositions.map((position, idx) => (
                    <div key={idx} className="position-image-box">
                        <img src={position.cover} alt={position.title} className="positions-image" />
                        <div className="position-content">
                            <p className="position-title">{position.title}</p>
                            <Link className="position-btn" to={`/positions/${position.abbreviation}`}>
                                View
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="container positions-page">
            <h1 className="position-page-title">Positions</h1>
            <div className="position-search-bar">
                <input
                    type="text"
                    placeholder="Search for positions"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div>{renderPositions()}</div>
        </div>
    );
};

export default Positions;