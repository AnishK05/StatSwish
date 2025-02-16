# StatSwish

## Overview

**StatSwish** is a full-stack CRUD web application that provides NBA fantasy enthusiasts and analysts with access to advanced statistics, comprehensive data metrics, and AI-powered game analysis. Users can search player statistics by team, position, or 20 custom filters, while the platform’s machine learning models automatically analyze upcoming games to deliver predictions. Additionally, StatSwish integrates Python-based data scraping to ensure accurate and current statistics for over 700 NBA players. The platform utilizes a modern tech stack, including React.js, Spring Boot, Flask, PostgreSQL, and machine learning (Python), to create a user-friendly experience for exploring and analyzing NBA data.

View the website [here](https://statswish.vercel.app/)

![StatSwish Screenshot](statswishscreenshot.png)

## Technologies Used

* **Front-End:** React.js, HTML, SCSS, CSS
* **Back-End:** Spring Boot, Flast, RESTful APIs, Machine Learning (Python)
* **Data Scraping:** Python (for scraping 700+ NBA players' data)
* **Database:** PostgreSQL
* **Deployment:** Vercel (Front-End), Render (Back-End), Supabase (Database)

## Features & Project Highlights

* **Front-End:** Developed using React.js to deliver a modular, component-based architecture. Utilizes React hooks for efficient state management and client-side routing, and connects seamlessly to RESTful APIs to fetch and display real-time NBA statistics and predictions.
* **Back-End:** Built with a dual-framework architecture using Flask and Spring Boot, both leveraging RESTful APIs to handle specific functionalities. Flask processes machine learning predictions and serves them via lightweight API endpoints, while Spring Boot handles CRUD operations and secure data access.
* **Database:** Utilizes PostgreSQL to support advanced queries, enabling 20 custom filtering options for player statistics. The schema is optimized for efficient data retrieval, supporting filters by team, position, and other custom metrics.
* **Machine Learning Model:** Implements a Python-based logistic regression model optimized with grid search, achieving a performance accuracy of 65%, on par with top of the line models (66-72%). The model analyzes historical game data, utilizing advanced basketball statistics such as effective field goal percentage (eFG%), turnover percentage (TOV%), offensive rebounding percentage (ORB%), and free throw rate (FTr) to generate accurate game outcome predictions.
* **Data Scraping:** Scrapes and processes real-time statistics for 700+ NBA players using Python scripts, automating updates to maintain accurate and up-to-date player data.
