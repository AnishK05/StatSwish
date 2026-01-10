/**
 * Player Data Service
 * Provides functions to load, filter, and search player data from CSV
 */

import { loadAndParseCSV } from '../utils/csvParser';

// Cache for the loaded player data
let cachedPlayers = null;
let loadingPromise = null;

/**
 * Load player data from CSV (with caching)
 * @returns {Promise<Array>} Promise that resolves to array of player objects
 */
const loadPlayers = async () => {
  // Return cached data if available
  if (cachedPlayers) {
    return cachedPlayers;
  }

  // If already loading, return the existing promise
  if (loadingPromise) {
    return loadingPromise;
  }

  // Load the data
  loadingPromise = loadAndParseCSV('/nba_player_stats.csv')
    .then((players) => {
      cachedPlayers = players;
      loadingPromise = null;
      return players;
    })
    .catch((error) => {
      loadingPromise = null;
      throw error;
    });

  return loadingPromise;
};

/**
 * Get players by team abbreviation
 * Excludes "TOT" entries (players who played for multiple teams)
 * @param {string} teamAbbreviation - Team abbreviation (e.g., "LAL", "GSW")
 * @returns {Promise<Array>} Promise that resolves to filtered array of players
 */
export const getPlayersByTeam = async (teamAbbreviation) => {
  const players = await loadPlayers();
  
  return players.filter(
    (player) => player.team === teamAbbreviation && player.team !== 'TOT'
  );
};

/**
 * Get players by position
 * Handles compound positions (e.g., "PF-C" matches "PF" or "C")
 * @param {string} positionAbbreviation - Position abbreviation (e.g., "PG", "SG")
 * @returns {Promise<Array>} Promise that resolves to filtered array of players
 */
export const getPlayersByPosition = async (positionAbbreviation) => {
  const players = await loadPlayers();
  
  return players.filter((player) => {
    // Match if the position string contains the search position
    // This handles compound positions like "PF-C"
    return player.position.includes(positionAbbreviation);
  });
};

/**
 * Search players by various criteria
 * @param {string} criteria - Search criteria field name
 * @param {string|number} value - Search value
 * @returns {Promise<Array>} Promise that resolves to filtered array of players
 */
export const searchPlayers = async (criteria, value) => {
  const players = await loadPlayers();
  
  // Map frontend field names to backend field names if needed
  const fieldMap = {
    name: 'player_name',
    team: 'team',
    position: 'position',
    points: 'points',
    freeThrows: 'freeThrows',
    freeThrowPercentage: 'freeThrowPercentage',
    twoPointers: 'twoPointers',
    twoPointPercentage: 'twoPointPercentage',
    threePointers: 'threePointers',
    threePointPercentage: 'threePointPercentage',
    efficientFieldGoalPercentage: 'efficientFieldGoalPercentage',
    totalRebounds: 'totalRebounds',
    assists: 'assists',
    blocks: 'blocks',
    steals: 'steals',
    turnovers: 'turnovers',
    age: 'age',
    minutesPlayed: 'minutes_per_game',
    gamesPlayed: 'games_played',
  };

  const field = fieldMap[criteria] || criteria;

  // String fields: case-insensitive partial match
  const stringFields = ['player_name', 'team', 'position'];
  
  // Fields that use <= comparison (less than or equal)
  const lessThanOrEqualFields = ['turnovers', 'age'];

  return players.filter((player) => {
    const playerValue = player[field];

    // Handle string fields
    if (stringFields.includes(field)) {
      const searchStr = String(value).toLowerCase();
      const playerStr = String(playerValue).toLowerCase();
      return playerStr.includes(searchStr);
    }

    // Handle numeric fields
    const searchNum = parseFloat(value);
    const playerNum = parseFloat(playerValue);

    // Skip if either value is NaN
    if (isNaN(searchNum) || isNaN(playerNum)) {
      return false;
    }

    // Use <= for age and turnovers, >= for all other numeric fields
    if (lessThanOrEqualFields.includes(field)) {
      return playerNum <= searchNum;
    } else {
      return playerNum >= searchNum;
    }
  });
};

/**
 * Clear the cached player data (useful for testing or forcing reload)
 */
export const clearCache = () => {
  cachedPlayers = null;
  loadingPromise = null;
};
