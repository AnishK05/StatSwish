import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os

app = Flask(__name__)
CORS(app)

# Load your model
model = joblib.load('model2024.pkl')

# Load team stats from JSON file
json_file_path = os.path.join(os.path.dirname(__file__), 'teamStats.json')

with open(json_file_path) as f:
    team_stats = json.load(f)['teams']

def get_team_stats(team_name):
    for team in team_stats:
        if team['name'] == team_name:
            return team['FGp'], team['FTr'], team['ORBp'], team['TOVp']
    return None

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    home_team = data['home_team']
    away_team = data['away_team']

    # Get stats for both teams
    home_stats = get_team_stats(home_team)
    away_stats = get_team_stats(away_team)

    if not home_stats or not away_stats:
        return jsonify({"error": "Invalid team names."}), 400

    # Extract stats
    FGp_home, FTr_home, ORBp_home, TOVp_home = home_stats
    FGp_away, FTr_away, ORBp_away, TOVp_away = away_stats

    # Prepare input for the model (calculate differences)
    model_input = [[
        FGp_away - FGp_home,
        FTr_away - FTr_home,
        ORBp_away - ORBp_home,
        TOVp_away - TOVp_home
    ]]

    # Get prediction probabilities
    probabilities = model.predict_proba(model_input)[0]
    home_prob = probabilities[1]  # Probability of home team winning
    away_prob = probabilities[0]  # Probability of away team winning

    # Determine the winning team based on the model's prediction
    winning_team = "Home" if home_prob > away_prob else "Away"

    # Return the result with probabilities
    return jsonify({
        "result": winning_team,
        "probabilities": {
            "home": home_prob,
            "away": away_prob
        }
    })

if __name__ == '__main__':
    app.run(debug=True)