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


function onClickAddToCart(event, product) {
  event.preventDefault();

  let cart = loadFromLocalStorage();

  let existingProductIndex = cart.findIndex(item => item.id === product.id);

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  saveDataToLocalStorage(cart);
  console.log(`Added ${product.title} to cart`);
  showNotification(`${product.title} has been added to your cart!`);
  displayAddedProducts(cart);
}


<<<<<<< HEAD
//render added items in shopping cart
function displayAddedProducts(cart) {
=======

function displayProducts(cart) {
>>>>>>> 032c4e0fa9cbb1a1a2a93e294539d030abbcece9
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

      // New quantity display and buttons
      const itemActions = document.createElement("div");
      itemActions.className = "item-actions";

      const itemQuantity = document.createElement("div");
      itemQuantity.className = "item-quantity";

      const decreaseButton = document.createElement("button");
      decreaseButton.textContent = "-";
      decreaseButton.addEventListener("click", () => {
          updateQuantity(index, -1); // Decrease quantity
          updateSummary(); 
      });

      const quantityDisplay = document.createElement("span");
      quantityDisplay.className = "theQuantity"
  

      quantityDisplay.textContent = product.quantity || 1; ; // Display current quantity
      const increaseButton = document.createElement("button");

      increaseButton.textContent = "+";
      increaseButton.addEventListener("click", () => {
          updateQuantity(index, 1); // Increase quantity
          updateSummary(); // 요약 업데이트
      });

      // Append buttons and display to the container
      itemQuantity.appendChild(decreaseButton);
      itemQuantity.appendChild(quantityDisplay);
      itemQuantity.appendChild(increaseButton);
      
      // Append the quantity actions to the main actions div
      itemActions.appendChild(itemQuantity);
      
      // Append action div to the card
      itemInfo.appendChild(itemActions);

      const removeItemButton = document.createElement("button");
      removeItemButton.className = "remove-item-button";
      productCard.appendChild(removeItemButton);
<<<<<<< HEAD
 
=======
>>>>>>> 032c4e0fa9cbb1a1a2a93e294539d030abbcece9
      
      // Add event listener for removing items
      removeItemButton.addEventListener("click", () => {
        onClickRemoveFromCart(index, productCard); // Pass the card element
<<<<<<< HEAD

        if (cart.length === 0) {
            emptyMessage.textContent = "Your cart is empty."; 
        }
=======
>>>>>>> 032c4e0fa9cbb1a1a2a93e294539d030abbcece9
      });
    });
  }
}

<<<<<<< HEAD

=======
>>>>>>> 032c4e0fa9cbb1a1a2a93e294539d030abbcece9
function onClickRemoveFromCart(index, productCard) {
  let cart = loadFromLocalStorage();
  cart.splice(index, 1); 
  saveDataToLocalStorage(cart); 

<<<<<<< HEAD
  console.log(`Removed item at index ${index}`);

  // remove the product card from the DOM immediately
  productCard.remove();
  updateSummary();
=======
  console.log(`Removed item at index ${index} from cart`);

  // Remove the product card from the DOM immediately
  productCard.remove();
>>>>>>> 032c4e0fa9cbb1a1a2a93e294539d030abbcece9
  if (cart.length === 0) {
    emptyMessage.textContent = "Your cart is empty."; //didnt work 
    shoppingCart.innerHTML = ""; 
  } else {
    emptyMessage.textContent = "";
  }
<<<<<<< HEAD
}


function updateQuantity(index, change) {
const quantityDisplayWrapper = document.querySelector(".theQuantity");
  let cart = loadFromLocalStorage();
  if (cart[index].quantity === undefined) {
      cart[index].quantity = 1;
  }
  cart[index].quantity += change;
  if (cart[index].quantity < 1) {
      cart.splice(index, 1);
  } 
  saveDataToLocalStorage(cart);
  // displayAddedProducts(cart);
  quantityDisplayWrapper.innerHTML = cart[index].quantity;
  console.log(`${index} and ${cart[index].quantity}`)
  updateSummary();
     console.log(`Updating quantity for index ${index} by ${change}`);
}



//calculate the total amount
function updateSummary() {
  console.log("im updating price!");
  const subtotalElement = document.querySelector(".subtotalPrice");
  const shippingElement = document.querySelector(".shippingPrice");
  const estimatedTotalElement = document.querySelector(".estimatedTotalPrice");

  let shippingCost = 19;//standard shipping fee;
  let cart = loadFromLocalStorage();

  if (cart.length === 0) {
    // Reset summary when cart is empty
    subtotalElement.textContent = "0.00";
    shippingElement.textContent = "0.00";
    estimatedTotalElement.textContent = "0.00";
    return;
    }

  let subtotal = 0;

  cart.forEach(product => {
      const price = product.price;
      const quantity = product.quantity || 1;
      subtotal += price * quantity;
  });

  //free shipping over 500kr purchase
  if (subtotal >= 500) {
    shippingCost = 0;
  }
  subtotalElement.textContent = `${subtotal.toFixed(2)}`;
  shippingElement.textContent = `${shippingCost.toFixed(2)}`;
  const estimatedTotal = subtotal + shippingCost;
  estimatedTotalElement.textContent = `${estimatedTotal.toFixed(2)} `;
}




// update the number of items in the cart display
function updateCartItemCount() {
  const numOfItemElement = document.getElementById("numOfItem");
  let cart = loadFromLocalStorage();
  
  // Calculate total quantity
  const totalQuantity = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  
  // Update the span with the total quantity
  numOfItemElement.textContent = ` (${totalQuantity})`; // Add parentheses for better readability
}



=======

}


>>>>>>> 032c4e0fa9cbb1a1a2a93e294539d030abbcece9
document.addEventListener("DOMContentLoaded", () => {

  const shoppingCart = document.querySelector(".shopping-list");
  if (shoppingCart) {
    let cart = loadFromLocalStorage();
    displayAddedProducts(cart); 
    // updateSummary();
  }
  updateSummary();
  updateCartItemCount();
  
});


/* function onClickAddToCart (event, product){
  event.preventDefault();

  let cart = loadFromLocalStorage();
  cart.push(product);
  saveDataToLocalStorage(cart);

  console.log(`Added ${product.title} to cart`);
  console.log(cart)
  showNotification(`${product.title} has been added to your cart!`);
} */

/* function updateSummary(){
  const subtotalElement = document.querySelector("#subtotalPrice")
  const shippingElement = document.querySelector("#shippingPrice");
  const estimatedTotalPrice = document.querySelector("#estimatedTotalPrice");

  let total = 0;
  shippingElement = 39;

  let cart = loadFromLocalStorage();
  cart.forEach(product) =>{
    const priceElement = `$${product.price.toFixed(2)}`;

    const price=parseFloat(priceElement.replace("$",""));
    const quantity = ?

    total= total(price*quantity);
    


    subtotalElement.textContent = total;
    shippingElement.textContent = 39;
    estimatedTotalPrice.textContent = total+shippingElement;


  }
}
 */

/* function onClickRemoveFromCart(index, productCard) {
  let cart = loadFromLocalStorage();
  cart.splice(index, 1); 
  saveDataToLocalStorage(cart); 

  console.log(`Removed item at index ${index}`);

  // Remove the product card from the DOM immediately
  productCard.remove();
  if (cart.length === 0) {
    emptyMessage.textContent = "Your cart is empty."; //didnt work 
    shoppingCart.innerHTML = ""; 
  } else {
    emptyMessage.textContent = "";
  }
  updateSummary();
}
 */