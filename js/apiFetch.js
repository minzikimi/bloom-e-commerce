// apiFetch.js
let products =[];
async function fetchAPI() {
  const apiURL = "https://fakestoreapi.com/products";

  try {
    const res = await fetch(apiURL);

    if (!res.ok) throw new Error("Failed to fetch items");

    products = await res.json(); 

    console.log(products);
    renderProducts(products); 

  } catch (error) {
    console.log("Error occurred:", error);
  }
}

function renderProducts(productsToRender) {
  const productContainer = document.querySelector(".product-grid");
  productContainer.innerHTML = "";

  productsToRender.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    const productDetailsElement = document.createElement("div");
    productDetailsElement.className = "product-details";

    const imgElement = document.createElement("img");
    imgElement.src = product.image;
    imgElement.alt = product.title;
    imgElement.loading = "lazy";
    productDetailsElement.appendChild(imgElement);

    const titleElement = document.createElement("h3");
    titleElement.textContent = product.title;
    productDetailsElement.appendChild(titleElement);

    const priceElement = document.createElement("p");
    priceElement.textContent = `$${product.price.toFixed(2)}`;
    productDetailsElement.appendChild(priceElement);

    card.appendChild(productDetailsElement);

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";

    const buttonElement = document.createElement("button");
    buttonElement.textContent = "Add to cart";
    buttonElement.className = "add-2-cart-btn";
    buttonContainer.appendChild(buttonElement);
    card.appendChild(buttonContainer);

    productContainer.appendChild(card);

    //open item detail modal box
    productDetailsElement.addEventListener("click", () => onClickCard(product));

    //upon clicking addtocart button
    buttonElement.addEventListener("click", (e) => {
      onClickAddToCart(e,product);
    });
  });
}


document.addEventListener("DOMContentLoaded", () => {
  fetchAPI();
  setupFilters();
// updateBasketIcon(); // Call this function when the page loads
});

module.exports = {fetchAPI};
