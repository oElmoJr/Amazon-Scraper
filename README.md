<h1 align="center">Amazon Product Scraper</h1>


This is a project for scraping data from Amazon. It allows you to search for products on Amazon and view the results in a user-friendly interface.


## Introduction

Initially, I attempted to scrape Amazon products using only Axios and JSDOM. However, I encountered blocking issues from Amazon, as it detected my requests as automated and blocked them.

To overcome this problem, I decided to use Puppeteer, which allowed me to simulate a real browser and avoid blocking from Amazon. However, even with Puppeteer, I still faced occasional blocking and instability issues during scraping.

After encountering these problems, I made some modifications to the way I was making requests, such as adding a 'User-Agent' header to the requests. This allowed me to scrape more stably and reliably, without facing further blocking issues.

As a result, I was able to resolve the scraping issues and make the backend more robust and reliable.

## Things that still need to be done

- [ ] Input validation: Check if the input field is empty before initiating the search.
- [ ] Improve star rating display.

## Design

For this project's design, the focus was on creating a user-friendly and presentable interface. The design follows modern trends, using glassmorphism concepts to give a sleek and transparent look to the page elements.

<img src="https://i.ibb.co/wQ95rpD/Group-4.png">
<img src="https://i.ibb.co/C1M8gv8/image.png">
<img width="36%" align="right" src="https://i.ibb.co/p1dMxJr/Components.png">
<img width="60%" src="https://i.ibb.co/q9TMMjp/Captura-de-tela-1.png">


## Setup

### **Clone the repository:**

   ```bash
   git clone https://github.com/oElmoJr/Amazon-Scraper.git
   ```

### Running the Application

**Backend**

1. Start the server:

    ```bash
    cd backend
    npm install
    npm start
    ```

    The server will start at <http://localhost:3000>.

2. **Access the API endpoints:**

    To scrape Amazon for a specific product, use the following endpoint:

    ```bash
    http://localhost:3000/api/scrape?keyword=your-product
    ```

    Replace `your-product` with the product you want to search for.

**Frontend**

1. **Open the frontend:**

    Navigate to the `frontend` directory and open `index.html` directly in your browser,
    or use a local server extension like Live Server in VSCode.

2. **Search for products:**

    Enter the product name in the search box and press Enter or click the search button.

3. **View the results:**

    The search results will be displayed below the search box.
    You can see the product title, rating, number of reviews, and the product image.

## Technologies Used

- Node.js
- Express.js
- Axios
- JSDOM
- HTML/CSS/JavaScript

<p align="center">Developed with 💛 by <a target="_blank" href="http://elmojr.dev">elmojr</a>.</p>

