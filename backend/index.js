const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS to allow requests from different origins

// Endpoint to scrape Amazon products
app.get('/api/scrape', async (req, res) => {
  try {
    const keyword = req.query.keyword; // Get the keyword from the request query
    const amazonUrl = `https://www.amazon.com/s?k=${keyword}`; // URL of Amazon search results page

    // Launch a new Puppeteer browser instance
    const browser = await puppeteer.launch({
      headless: true, // Whether to show (true) or hide (false) the browser window
      args: ['--no-sandbox', '--disable-setuid-sandbox'] // Additional arguments for the browser
    });

    // Open a new page in the browser
    const page = await browser.newPage();
    
    // Navigate to the Amazon search results page URL
    await page.goto(amazonUrl, { waitUntil: 'domcontentloaded', timeout: 0 });

    // Execute a script on the page to extract product data
    const scrapedData = await page.evaluate(() => {
      // Select all elements representing products on the page
      const products = Array.from(document.querySelectorAll('div[data-component-type="s-search-result"]'));

      // Map the data of each product and return them in an array
      return products
        .filter(product => !product.textContent.includes("Amazon's Choice")) // Filter out products with "Amazon's Choice" in the title
        .map(product => {
          const title = product.querySelector('h2 a').textContent.trim(); // Product title
          const rating = product.querySelector('span.a-icon-alt') ? product.querySelector('span.a-icon-alt').textContent.replace(' out of 5 stars', '') : 'N/A'; // Product rating
          const reviews = product.querySelector('span.a-size-base') ? product.querySelector('span.a-size-base').textContent : 'N/A'; // Number of product reviews
          const imageUrl = product.querySelector('img.s-image') ? product.querySelector('img.s-image').getAttribute('src') : ''; // Product image URL

          // Return the product data
          return {
            title,
            rating,
            reviews,
            imageUrl
          };
        });
    });

    // Close the Puppeteer browser
    await browser.close();

    // Set the 'X-Content-Type-Options' header to 'nosniff'
    res.setHeader('X-Content-Type-Options', 'nosniff');

    // Send the extracted data as the response of the request
    res.json(scrapedData);
  } catch (error) {
    // If an error occurs during scraping, return a 500 error status and an error message
    console.error('Error scraping Amazon:', error);
    res.status(500).json({ error: 'Error scraping Amazon' });
  }
});

// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
