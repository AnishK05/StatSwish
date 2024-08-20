from bs4 import BeautifulSoup  # Library for parsing HTML and XML documents
import pandas as pd            # Library for data manipulation and analysis
import requests                # Library for making HTTP requests
import time                    # Library for time-related functions

# List to store all player stats
all_players = []

# URL of the NBA stats page
url = 'https://www.basketball-reference.com/leagues/NBA_2024_per_game.html'

# Getting the HTML from the website
html = requests.get(url).text  # Sending a GET request to the URL and getting the response text

# Parsing the HTML using BeautifulSoup
soup = BeautifulSoup(html, 'lxml')  # Creating a BeautifulSoup object to parse the HTML, using 'lxml' parser

# Finding the table with id 'per_game_stats'
table = soup.find('table', id='per_game_stats')

# Extracting the headers from the table
header_row = table.find('thead').find_all('tr')[0]  # Get the first row from the table header
headers = header_row.find_all('th')  # Get all header cells (th tags) from the header row
columns = [header.text for header in headers]  # Extract column names from header cells

# Remove the 'Rk' column since we do not need it
if 'Rk' in columns:
    columns.remove('Rk')

# Extracting all rows in the table
rows = table.find('tbody').find_all('tr')  # Ensure to get rows from tbody

# Loop through each row to scrape data
for row in rows:
    # Extracting all cells in the row
    cells = row.find_all('td')  # Each data point is enclosed in a <td> tag
    
    # Skip header rows or rows without data
    if cells:
        # Extracting player stats from each cell
        player_data = [cell.text for cell in cells]
        # Append player data to the list
        all_players.append(player_data)

# Convert the list of player stats to a DataFrame
stat_df = pd.DataFrame(all_players, columns=columns)  # Creating a DataFrame with the player stats and column names

# Exporting the DataFrame to a CSV file
stat_df.to_csv("nba_player_stats.csv", index=False)  # Saving the DataFrame to a CSV file, without the index

## Page Source Code Structure:

## thead = Table Head; tbody = Table Body; th = Table Header; tr = Table Row; td = Table Data
'''
<thead>
    <tr>
        <th>Player Name</th> 
        <th>Stat Name</th>
    </tr>
</thead>

<tbody>
    <tr>
        <td>Player1</td>
    </tr>
    <tr>
        <td>Player2</td>
    </tr>
</tbody>
'''