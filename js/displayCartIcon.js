function updateBasketIcon() {
  const basketIcon = document.getElementById('shopping-cart-icon');
  const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);
  basketIcon.setAttribute('data-count', totalItems);
}

function renderBasket() {
  const basketContainer = document.getElementById('basket-container');
  basketContainer.innerHTML = ''; 
}
renderBasket();
  

// function items add to basket

function addToBasket(product) {
  const existingItem = basket.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    basket.push({...product, quantity: 1});
  }
  updateBasketIcon();
  renderBasket();
}