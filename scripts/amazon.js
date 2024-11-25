import { products,loadProductsFetch } from "../data/products.js";
import {cart,addToCart,reNewCartquanlity} from "../data/cart.js";
let productList = document.querySelector('.js-product');


async function loadProducts() {
  await loadProductsFetch();
  renderProductsGrid();
}

loadProducts();
function renderProductsGrid(){
let html = '';
products.forEach((product)=>{
    html += `<div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.getProductImage()}">
            </div>

            <div class="product-name limit-text-to-2-lines">
            ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src=${product.getProductRate()}>
              <div class="product-rating-count link-primary">
              ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
            ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              ${product.showSize()}
            </div>
            <div class="product-spacer"></div>

            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id = "${product.id}">
              Add to Cart
            </button>
          </div>`;
  })
  productList.innerHTML = html;

  let cartquanlity = reNewCartquanlity();
  const cartquanlityDiv = document.querySelector('.js-cart-quanlity');
  cartquanlityDiv.innerText = cartquanlity;
  let addCartButton = document.querySelectorAll('.js-add-to-cart-button');

  addCartButton.forEach((cartButton)=>{
    cartButton.addEventListener('click',()=>{
      const productId = cartButton.dataset.productId;
      addToCart(productId);
      cartquanlityDiv.innerText = reNewCartquanlity();
    })
  })
}