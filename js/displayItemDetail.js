function onClickCard(product) {

  console.log("Product clicked:", product); 

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




