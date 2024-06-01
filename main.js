import { writeFileSync } from "fs";
import { gotScraping } from "got-scraping";
import * as cheerio from "cheerio";
import { parse } from "json2csv";

(async () => {
  const storeUrl = "https://www.allrecipes.com/recipes";
  const response = await gotScraping(storeUrl);
  const html = response.body;

  // Parse HTML with Cheerio
  const $ = cheerio.load(html);

  // Print page title to terminal
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

    // titles, ingredients, and ratings.

    const title = $productPage("h1").text().trim();
    const ingredients = Array.from(
      $productPage(
        ".comp.mntl-structured-ingredients ul li.mntl-structured-ingredients__list-item"
      )
    ).map((el) => $(el).text().replace("\n", "").replace("\n", " "));

    const ratings = +$productPage(
      "article #article-header--recipe_1-0 .comp.mntl-recipe-review-bar__rating.mntl-text-block.type--squirrel-bold"
    )
      .text()
      .trim();

    // console.log({ title, ingredients, ratings });
    results.push({ title, ingredients, ratings });
  }
  const csv = parse(results);
  writeFileSync("product.csv", csv);
})();
