// shoppingCart.js

const ITEM_KEY = "cartitems";


// Save data to local storage
function saveDataToLocalStorage(items) {
  localStorage.setItem(ITEM_KEY, JSON.stringify(items));
}

// Load data from local storage
function loadFromLocalStorage() { 
  const itemJSON = localStorage.getItem(ITEM_KEY); 
  return itemJSON ? JSON.parse(itemJSON) : [];
}

// New function to update basket icon
function updateBasketIcon() {
  const basketIcon = document.getElementById('shopping-cart-icon');
  const cart = loadFromLocalStorage();
  const totalItems = cart.length;

  basketIcon.setAttribute('data-count', totalItems);
  
  if (totalItems > 0) {
    basketIcon.classList.add('has-items');
  } else {
    basketIcon.classList.remove('has-items');
  }
}




function onClickAddToCart (event, product){
  event.preventDefault();

  let cart = loadFromLocalStorage();
  cart.push(product);
  saveDataToLocalStorage(cart);

  console.log(`Added ${product.title} to cart`);
  console.log(cart);
  updateBasketIcon(); // Call this function after adding item to cart
}



function displayProducts(cart) {
  const emptyMessage = document.querySelector("#shopping-cart-empty-message");
  const shoppingCart = document.querySelector(".shopping-list");

  if (cart.length === 0) {
    emptyMessage.textContent = "Your cart is empty.";
  } else {
    emptyMessage.textContent = "";
    shoppingCart.innerHTML = "";

    cart.forEach((product, index) => {
      const productCard = document.createElement("div");
      productCard.className = "shopping-item-card";
      shoppingCart.appendChild(productCard);

      const productImage = document.createElement("img");
      productImage.src = product.image;
      productImage.alt = product.title;
      productImage.className = "item-image";
      productCard.appendChild(productImage);

      const itemDetails = document.createElement("div");
      itemDetails.className = "item-details";
      productCard.appendChild(itemDetails);

      const itemInfo = document.createElement("div");
      itemInfo.className = "item-info";
      itemDetails.appendChild(itemInfo);

      const itemName = document.createElement("h2");
      itemName.className = "item-name";
      itemName.textContent = product.title;
      itemInfo.appendChild(itemName);

      const itemPrice = document.createElement("p");
      itemPrice.className = "item-price";
      itemPrice.textContent = `$${product.price.toFixed(2)}`;
      itemInfo.appendChild(itemPrice);

      const removeItemButton = document.createElement("button");
      removeItemButton.className = "remove-item-button";
      productCard.appendChild(removeItemButton);
      
      // Add event listener for removing items
      removeItemButton.addEventListener("click", () => {
        onClickRemoveFromCart(index, productCard); // Pass the card element
      });
    });
  }
}

function onClickRemoveFromCart(index, productCard) {
  let cart = loadFromLocalStorage();
  cart.splice(index, 1); 
  saveDataToLocalStorage(cart); 

  console.log(`Removed item at index ${index} from cart`);

  // Remove the product card from the DOM immediately
  productCard.remove();
  if (cart.length === 0) {
  //  mptyMessage.textContent = "Your cart is empty."; //didnt work 
  //   shoppingCart.innerHTML = ""; 
  // } else {
  //   emptyMessage.textContent = "";
  // } 
  const emptyMessage = document.querySelector("#shopping-cart-empty-message");
  const shoppingCart = document.querySelector(".shopping-list");
  emptyMessage.textContent = "Your cart is empty.";
  shoppingCart.innerHTML = ""; 
}


  updateBasketIcon(); // Call this function after removing item from cart
}


document.addEventListener("DOMContentLoaded", () => {
  const shoppingCart = document.querySelector(".shopping-list");
  if (shoppingCart) {
    const cart = loadFromLocalStorage();
    displayProducts(cart);
  }
  updateBasketIcon(); // Call this function when the page loads
});
// new function for basket
function onClickCard(product) {
  console.log('Product clicked:', product); 

  const modal = document.getElementById("productDetailModal");
  const titleElement = modal.querySelector(".modal-title");
  const imageElement = modal.querySelector(".modal-image");
  const descriptionElement = modal.querySelector(".modal-description");
  const priceElement = modal.querySelector(".modal-price");
  const ratingElement = modal.querySelector(".modal-rating");

  titleElement.textContent = product.title;
  imageElement.src = product.image;
  imageElement.style.width = '300px';
  descriptionElement.textContent = product.description;
  priceElement.textContent = `$${product.price.toFixed(2)}`;
  ratingElement.textContent = `Rating: ${product.rating.rate} (${product.rating.count} reviews)`;

  modal.showModal();

  const closeButton = modal.querySelector(".close-button");
  closeButton.addEventListener("click", () => {
    modal.close();
  });
} 