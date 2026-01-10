/**
 * CSV Parser Utility
 * Parses the NBA player stats CSV file and converts it to JavaScript objects
 */

/**
 * Parse CSV text into an array of objects
 * @param {string} csvText - Raw CSV text content
 * @returns {Array} Array of player objects
 */
export const parseCSV = (csvText) => {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',');
  const players = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // Skip empty lines

    const values = line.split(',');
    const player = {};

    headers.forEach((header, index) => {
      player[header.trim()] = values[index] ? values[index].trim() : '';
    });

    players.push(player);
  }

  return players;
};

/**
 * Map CSV columns to expected field names and data types
 * @param {Array} csvPlayers - Array of players from CSV
 * @returns {Array} Array of mapped player objects
 */
export const mapCSVToPlayerObjects = (csvPlayers) => {
  return csvPlayers.map((csvPlayer) => {
    // Helper function to parse numeric values
    const parseNum = (value) => {
      if (value === '' || value === undefined || value === null) return 0;
      const parsed = parseFloat(value);
      return isNaN(parsed) ? 0 : parsed;
    };

    return {
      id: csvPlayer.id || '',
      player_name: csvPlayer.Player || '',
      position: csvPlayer.Pos || '',
      age: parseNum(csvPlayer.Age),
      team: csvPlayer.Tm || '',
      games_played: parseNum(csvPlayer.G),
      gamesStarted: parseNum(csvPlayer.GS),
      minutes_per_game: parseNum(csvPlayer.MP),
      fieldGoals: parseNum(csvPlayer.FG),
      fieldGoalAttempts: parseNum(csvPlayer.FGA),
      fieldGoalPercentage: parseNum(csvPlayer['FG%']),
      threePointers: parseNum(csvPlayer['3P']),
      threePointAttempts: parseNum(csvPlayer['3PA']),
      threePointPercentage: parseNum(csvPlayer['3P%']),
      twoPointers: parseNum(csvPlayer['2P']),
      twoPointAttempts: parseNum(csvPlayer['2PA']),
      twoPointPercentage: parseNum(csvPlayer['2P%']),
      efficientFieldGoalPercentage: parseNum(csvPlayer['eFG%']),
      freeThrows: parseNum(csvPlayer.FT),
      freeThrowAttempts: parseNum(csvPlayer.FTA),
      freeThrowPercentage: parseNum(csvPlayer['FT%']),
      offensiveRebounds: parseNum(csvPlayer.ORB),
      defensiveRebounds: parseNum(csvPlayer.DRB),
      totalRebounds: parseNum(csvPlayer.TRB),
      assists: parseNum(csvPlayer.AST),
      steals: parseNum(csvPlayer.STL),
      blocks: parseNum(csvPlayer.BLK),
      turnovers: parseNum(csvPlayer.TOV),
      personalFouls: parseNum(csvPlayer.PF),
      points: parseNum(csvPlayer.PTS),
    };
  });
};

/**
 * Load and parse the CSV file
 * @param {string} csvFilePath - Path to the CSV file
 * @returns {Promise<Array>} Promise that resolves to array of player objects
 */
export const loadAndParseCSV = async (csvFilePath) => {
  try {
    const response = await fetch(csvFilePath);
    const csvText = await response.text();
    const csvPlayers = parseCSV(csvText);
    const mappedPlayers = mapCSVToPlayerObjects(csvPlayers);
    return mappedPlayers;
  } catch (error) {
    console.error('Error loading CSV file:', error);
    throw error;
  }
};
