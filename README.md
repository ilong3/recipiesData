# Recipe Scraper and Database Storage

Welcome to the Recipe Scraper and Database Storage project! This project demonstrates how to scrape recipe data from AllRecipes.com and store it in a SQLite database. It's a perfect starting point for anyone interested in web scraping, data extraction, and database management.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Inspiration](#inspiration)
- [License](#license)

## Introduction

This project automates the process of extracting recipe information such as titles, ingredients, and ratings from AllRecipes.com. The extracted data is then stored in a SQLite database for easy access and analysis. Whether you're a data enthusiast, a cooking lover, or someone looking to learn more about web scraping, this project is for you!

## Features

- **Web Scraping:** Extracts recipe data from AllRecipes.com using `got-scraping` and `cheerio`.
- **Data Storage:** Stores the extracted data in a SQLite database.
- **Error Handling:** Robust error handling to ensure smooth operation.
- **Extensibility:** Easily extendable to scrape more data or from different sources.

## Technologies Used

- Node.js
- SQLite
- `got-scraping`
- `cheerio`

## Setup Instructions

### Prerequisites
1. **Download and install Node.js:**
   - Visit the [Node.js website](https://nodejs.org/).
   - Download the LTS version suitable for your operating system.
   - Follow the installation instructions.

2. **Download and install Visual Studio Code (VS Code):**
   - Visit the [Visual Studio Code website](https://code.visualstudio.com/).
   - Download the version suitable for your operating system.
   - Follow the installation instructions.

### Cloning the Repository and Setting Up
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/recipe-scraper.git
   cd recipe-scraper
2. **Install dependencies:**\
   Open your Vs-code editor terminal(gitbash/powershell)\
   Type: npm install cheerio\
   Type: npm install gotscraping
4. **Run the scraper:**
    node scraper.js

## Usage
After running the scraper, the data will be saved in a SQLite database named my_data.db. You can query this database using any SQLite client to explore the recipes and their details.
Example Query
To retrieve all recipes from the database, you can use the following SQL query:
`SELECT * FROM products`

## Project Structure
Here’s a quick overview of the project structure to help you navigate:\
recipe-scraper/\
├── scraper.js         # The main script for scraping and storing data\
├── package.json       # Node.js dependencies and scripts\
├── README.md          # Project documentation\
├── my_data.db         # SQLite database file (created after running the scraper)\
└── .gitignore         # Git ignore file


## Contributing
Contributions are welcome! If you have ideas for improving this project, feel free to fork the repository and submit a pull request. Here are some ways you can contribute:

- Add more data fields to scrape (e.g., cooking time, servings).
- Implement additional error handling.
- Optimize the scraping process for speed and efficiency.
- Create a front-end application to display the scraped data.


## Inspiration
Web scraping and data analysis open up a world of possibilities. Here are some ideas to spark your creativity:

- Personal Recipe Book: Use this project to create your own digital recipe book, tailored to your tastes and dietary preferences.
- Nutritional Analysis: Extend the scraper to gather nutritional information and analyze the health benefits of different recipes.
- Cooking Assistant: Develop a cooking assistant app that suggests recipes based on ingredients you have at home.
- Food Trends: Analyze the scraped data to identify food trends and popular ingredients over time.
- Learning and Sharing: Share your findings and tools with the community to inspire others to explore the exciting world of web scraping and data analysis.


## License
This project is licensed under the MIT License. See the LICENSE file for more details.
Thank you for checking out the Recipe Scraper and Database Storage project! We hope you find it useful and inspiring. Happy coding and happy cooking!
