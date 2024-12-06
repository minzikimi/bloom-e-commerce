// const addToCartBtn = document.querySelector(".add-2-cart-btn");
// const shoppingCartIcon = document.querySelector(".shopping-cart-icon");
// const removeItemBtn = document.querySelector("#remove-item-button");
// const itemImg = document.querySelector("#item-image")
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


function onClickAddToCart (event, product){
  event.preventDefault();

  let cart = loadFromLocalStorage();
  cart.push(product);
  saveDataToLocalStorage(cart);

  console.log(`Added ${product.title} to cart`);
  console.log(cart)
}


function displayProducts(cartFromLocalStorage) {
  const emptyMessage = document.querySelector("#shopping-cart-empty-message");
  const shoppingCart = document.querySelector(".shopping-list");


  if (cartFromLocalStorage.length === 0) {
    emptyMessage.textContent = "Your cart is empty.";
  } else {
    emptyMessage.textContent = "";
    shoppingCart.innerHTML = "";
    

    cartFromLocalStorage.forEach(product => {
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
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const shoppingCart = document.querySelector(".shopping-list");
  if (shoppingCart) {
    const cart = loadFromLocalStorage();
    displayProducts(cart);
  }
});
