// import { writeFileSync } from "fs";
// import { gotScraping } from "got-scraping";
// import * as cheerio from "cheerio";
// import { parse } from "json2csv";

// (async () => {
//   const storeUrl = "https://www.allrecipes.com/recipes";
//   const response = await gotScraping(storeUrl);
//   const html = response.body;

//   // Parse HTML with Cheerio
//   const $ = cheerio.load(html);

//   // Print page title to terminal
//   const products = $(
//     "section .comp.tax-sc__recirc-list-container.mntl-block a"
//   );

//   const prodUrls = [];

//   for (const product of products) {
//     const productUrls = $(product).attr("href");
//     prodUrls.push(productUrls);
//   }

//   const results = [];

//   for (const productDetails of prodUrls) {
//     const productResponse = await gotScraping(productDetails);
//     const productHtml = productResponse.body;
//     const $productPage = cheerio.load(productHtml);

//     // titles, ingredients, and ratings.

//     const title = $productPage("h1").text().trim();
//     const ingredients = Array.from(
//       $productPage(
//         ".comp.mntl-structured-ingredients ul li.mntl-structured-ingredients__list-item"
//       )
//     ).map((el) => $(el).text().replace("\n", "").replace("\n", " "));

//     const ratings = +$productPage(
//       "article #article-header--recipe_1-0 .comp.mntl-recipe-review-bar__rating.mntl-text-block.type--squirrel-bold"
//     )
//       .text()
//       .trim();

//     // console.log({ title, ingredients, ratings });
//     results.push({ title, ingredients, ratings });
//   }
//   const csv = parse(results);
//   writeFileSync("product.csv", csv);
// })();

// const sqlite3 = require("sqlite3").verbose();
import sqlite3 from "sqlite3";
import { gotScraping } from "got-scraping";
import * as cheerio from "cheerio";
// No need for json2csv

(async () => {
  // Store URL and establish database connection (replace with your database path)
  const storeUrl = "https://www.allrecipes.com/recipes";
  const db = new sqlite3.Database("my_data.db");

  // Create table if it doesn't exist (replace with your column names and types)
  db.run(
    `CREATE TABLE IF NOT EXISTS products (title , ingredients , ratings )`
  );

  try {
    const response = await gotScraping(storeUrl);
    const html = response.body;

    // Parse HTML with Cheerio
    const $ = cheerio.load(html);

    // Extract product links
    const products = $(
      "section .comp.tax-sc__recirc-list-container.mntl-block a"
    );
    const prodUrls = [];
    for (const product of products) {
      const productUrls = $(product).attr("href");
      prodUrls.push(productUrls);
    }

    const results = [];
    for (const productDetails of prodUrls) {
      const productResponse = await gotScraping(productDetails);
      const productHtml = productResponse.body;
      const $productPage = cheerio.load(productHtml);

      // Extract title, ingredients (joined as string), and ratings
      const title = $productPage("h1").text().trim();
      const ingredients = Array.from(
        $productPage(
          ".comp.mntl-structured-ingredients ul li.mntl-structured-ingredients__list-item"
        )
      ).map((el) => $(el).text().replace(/\n/g, " ")); // Combine and remove all newlines
      const ratings = +$productPage(
        "article #article-header--recipe_1-0 .comp.mntl-recipe-review-bar__rating.mntl-text-block.type--squirrel-bold"
      )
        .text()
        .trim();

      results.push({ title, ingredients: ingredients.join(", "), ratings });

      // Save data to database
      db.run(
        `INSERT INTO products (title, ingredients, ratings) VALUES (?, ?, ?)`,
        [
          results[results.length - 1].title,
          results[results.length - 1].ingredients,
          results[results.length - 1].ratings,
        ]
      );
    }

    console.log("Data saved successfully to SQLite database!");

    // Optional: Write scraped data to CSV for debugging purposes (comment out if not needed)
    // const csv = JSON.stringify(results);
    // writeFileSync("product.csv", csv);
  } catch (error) {
    console.error("Error scraping or saving data:", error);
  } finally {
    // Close database connection
    db.close((err) => {
      if (err) {
        console.error("Error closing database connection:", err);
      }
    });
  }
})();
