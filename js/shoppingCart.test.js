// shoppingCart.test.js
const {
  onClickAddToCart,
  onClickRemoveFromCart,
  updateSummary,
  showNotification
} = require('./shoppingCart'); // Ensure this path is correct based on your file structure

jest.mock('./shoppingCart', () => {
  const originalModule = jest.requireActual('./shoppingCart');
  return {
    ...originalModule,
    saveDataToLocalStorage: jest.fn(),
    loadFromLocalStorage: jest.fn(),
  };
});

describe('Shopping Cart Functionality', () => {
  beforeEach(() => {
    // Reset local storage mock before each test
    localStorage.clear();
    jest.clearAllMocks();

    // Set up the DOM elements for testing
    document.body.innerHTML = `
      <div class="subtotalPrice"></div>
      <div class="shippingPrice"></div>
      <div class="estimatedTotalPrice"></div>
      <div class="shopping-list"></div>
      <div id="notification"></div> 
      <div id="shopping-cart-empty-message"></div>
    `;
  });

  test('should remove item from cart and update summary', () => {
    const product = {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    };

    // Add product to the cart
    onClickAddToCart({ preventDefault: jest.fn() }, product);
    updateSummary();

    // Remove the product
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `<div class="product-title">${product.title}</div><button class="remove-button">Remove</button>`;
    document.querySelector('.shopping-list').appendChild(productCard);

    onClickRemoveFromCart(0, productCard); // Assuming it's the first item

    // Check updated summary
    expect(document.querySelector('.subtotalPrice').textContent).toBe('0.00');
    expect(document.querySelector('.shippingPrice').textContent).toBe('0.00');
    expect(document.querySelector('.estimatedTotalPrice').textContent).toBe('0.00');
    
    // Check if the cart is empty
    expect(document.querySelector('#shopping-cart-empty-message').textContent).toBe("Your cart is empty.");
  });

  test('should show notification when item is removed', () => {
    const message = "Item removed from cart.";
    showNotification(message);

    // Check if notification shows the correct message
    expect(document.getElementById("notification").textContent).toBe(message);
  });
});

