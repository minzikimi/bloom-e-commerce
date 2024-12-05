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
  let filteredProducts = products; 

  const categoryFilter = document.getElementById('category-filter');
  const ratingFilter = document.getElementById('rating-filter');
  const priceFilter = document.getElementById('price-filter');

  if (categoryFilter.value !== 'all') {
    filteredProducts = filteredProducts.filter(product => 
      product.category.toLowerCase() === categoryFilter.value.toLowerCase()
    );
  }

  if (ratingFilter.value !== 'all') {
    filteredProducts = filteredProducts.filter(product => 
      product.rating.rate >= parseFloat(ratingFilter.value)
    );
  }

  if (priceFilter.value !== 'all') {
    const [min, max] = priceFilter.value.split('-').map(Number);
    filteredProducts = filteredProducts.filter(product => 
      product.price >= min && (max ? product.price <= max : true)
    );
  }

  renderProducts(filteredProducts); 
}