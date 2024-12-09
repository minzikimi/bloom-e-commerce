// filter.js

function setupFilters() {
  const categoryFilter = document.getElementById('category-filter');
  const ratingFilter = document.getElementById('rating-filter');
  const priceFilter = document.getElementById('price-filter');

  categoryFilter.addEventListener('change', applyFilters);
  ratingFilter.addEventListener('change', applyFilters);
  priceFilter.addEventListener('change', applyFilters);

}

function applyFilters() {
  console.log("Applying filters");
  let filteredProducts = products; 

  const categoryFilter = document.getElementById('category-filter');
  const ratingFilter = document.getElementById('rating-filter');
  const priceFilter = document.getElementById('price-filter');

  if (categoryFilter && categoryFilter.value !== 'all') {
    filteredProducts = filteredProducts.filter(product => 
      product.category.toLowerCase() === categoryFilter.value.toLowerCase()
    );
    console.log("After category filter:", filteredProducts.length);
  }

  if (ratingFilter && ratingFilter.value !== 'all') {
    filteredProducts = filteredProducts.filter(product => 
      product.rating.rate >= parseFloat(ratingFilter.value)
    );
    console.log("After rating filter:", filteredProducts.length);
  }

  if (priceFilter && priceFilter.value !== 'all') {
    const [min, max] = priceFilter.value.split('-').map(Number);
    filteredProducts = filteredProducts.filter(product => 
      product.price >= min && (max ? product.price <= max : true)
    );
    console.log("After price filter:", filteredProducts.length);
  }

  console.log("Final filtered products:", filteredProducts.length);
  renderProducts(filteredProducts); 
}

