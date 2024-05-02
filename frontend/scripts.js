document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('searchForm');
  const loader = document.getElementById('loader');
  const resultsList = document.getElementById('results');

  // Function to fetch data from the server and display results
  const fetchData = async (keyword) => {
    resultsList.innerHTML = "";
    loader.style.display = 'block';
  
    try {
      const response = await fetch(`http://localhost:3000/api/scrape?keyword=${keyword}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      let data = await response.json();

      displayResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      resultsList.innerHTML = 'Error fetching data. Please try again later.';
    }
  
    loader.style.display = 'none';
  };

  // Function to display results on the page
  const displayResults = (data) => {
    if (data.error) {
      resultsList.innerHTML = `${data.error}`;
      return;
    }

    if (data.length === 0) {
      resultsList.innerHTML = 'No results found.';
      return;
    }

    // Iterating through each product in the data array
data.forEach(product => {
  // Creating a new list item (li)
  const productItem = document.createElement('li'); // Creating a new list item (li)
  
  // Setting the title attribute of the list item to the product title
  productItem.title = product.title;
  
  // Creating the HTML content for the list item
  productItem.innerHTML = `
    <div class="img-container">
      <img src="${product.imageUrl}" alt="${product.title}">
    </div>
    <h3>${product.title}</h3>
    <div class="review-container">
      <p class="rating" title="${product.rating}">
        ${'<i class="fa-solid fa-star" style="color: #FFD43B;"></i>'.repeat(product.rating)}${'<i class="fa-regular fa-star" style="color: #C8CED9;">></i>'.repeat((Number(product.rating) / 5).toFixed())} 
        ${product.rating}
      </p>
      <p>${product.reviews} Reviews</p>
    </div>
  `;
  
  // Adding the created product item to the results list
  resultsList.appendChild(productItem); // Adding the product item to the results list
});
  };

  // Fetch data when the page is loaded
  fetchData("Apple");

  // Event listener for form submission
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const keyword = document.getElementById('keyword').value;
    fetchData(keyword);
  });
});