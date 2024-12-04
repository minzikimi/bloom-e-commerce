let apiURL = "https://fakestoreapi.com/products";

fetch(apiURL)
  .then(res => res.json())
  .then(json => {
    console.log(json);
    const productContainer = document.querySelector(".product-grid");
    json.forEach(product => {
      const productElement = document.createElement("div");
      productElement.className = "product-card";
  
      // Create and append the image
      const imgElement = document.createElement("img");
      imgElement.src = product.image;
      imgElement.alt = product.title;
      productElement.appendChild(imgElement);
  
      // Create and append the title
      const titleElement = document.createElement("h3");
      titleElement.textContent = product.title;
      productElement.appendChild(titleElement);
  
      // Create and append the price
      const priceElement = document.createElement("p");
      priceElement.textContent = `$${product.price.toFixed(2)}`;
      productElement.appendChild(priceElement);
  
      // Create and append the button
      const buttonElement = document.createElement("button");
      // buttonElement.classList = "add-button"
      buttonElement.textContent = "Add to cart";
      productElement.appendChild(buttonElement);
  
      // Finally, append the product card to the container
      productContainer.appendChild(productElement);
    });
  })
  .catch(error => console.log("Error occured:", error));