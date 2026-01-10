# StatSwish

## Overview

**StatSwish** is a full-stack CRUD web application that provides NBA fantasy enthusiasts and analysts with access to advanced statistics, comprehensive data metrics, and AI-powered game analysis. Users can search player statistics by team, position, or 20 custom filters, while the platform’s machine learning models automatically analyze upcoming games to deliver predictions. Additionally, StatSwish integrates Python-based data scraping to ensure accurate and current statistics for over 700 NBA players. The platform utilizes a modern tech stack, including React.js, Spring Boot, Flask, PostgreSQL, and machine learning (Python), to create a user-friendly experience for exploring and analyzing NBA data.

View the website [here](https://statswish.vercel.app/)

![StatSwish Screenshot](statswishscreenshot.png)

## Technologies Used

* **Front-End:** React.js, HTML, SCSS, CSS
* **Back-End:** Spring Boot, Flask, RESTful APIs, Machine Learning (Python)
* **Data Scraping:** Python (for scraping 700+ NBA players' data)
* **Database:** PostgreSQL

## Features & Project Highlights

* **Front-End:** React.js application with component-based architecture. Uses React hooks (useState, useEffect) for state management and React Router for navigation. Implements RESTful API integration for fetching player statistics, team data, and game predictions.
* **Back-End:** Dual-framework REST API architecture:
  * Flask service handles ML model inference and game prediction endpoints
  * Spring Boot service manages CRUD operations for player data and statistics
  * Both services expose REST APIs for front-end consumption
* **Database:** PostgreSQL database storing 700+ NBA player records. Supports 20 filter criteria including team, position, points per game, rebounds, assists, shooting percentages, and other performance metrics. Query optimization enables fast filtering and sorting operations.
* **Machine Learning Model:** Logistic regression model with grid search hyperparameter tuning. Achieves 65% accuracy on game outcome predictions. Features include effective field goal percentage (eFG%), turnover percentage (TOV%), offensive rebounding percentage (ORB%), and free throw rate (FTr). Model trained on historical NBA game data.
* **Data Scraping:** Python web scraper extracts player statistics from NBA data sources. Processes and updates records for 700+ players, maintaining current season statistics for the database.
