import {getProduct} from "../../data/products.js";
import{ cart,deleteCart,cartDelivery} from "../../data/cart.js";
import{moneyData}from "../utils/money.js"
import{options,deliveryOption} from "../../data/options.js"
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import{renderPaymentSummary}from './paymentSummary.js';
export function OrderSummary(){
  let cartHtml = '';
  cart.forEach((cartItem)=>{
  const productId = cartItem.productId;
  let selectItem = getProduct(productId);
  const deliveryId = cartItem.deliveryOption;
  const now = dayjs();
  const deliveryDate = now.add(
    deliveryOption(deliveryId).deliveryDay,
    'day'
  )
  let string = deliveryDate.format('dddd, MMMM DD');
  cartHtml+=`
    <div class="cart-item-container js-container-${selectItem.id}">
      <div class="delivery-date">
        Delivery date: ${string}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${selectItem.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${selectItem.name}
          </div>
          <div class="product-price">
            $${moneyData(selectItem.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.count}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-button" data-product-id = "${selectItem.id}">
              Delete
            </span>
          </div>
        </div>
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${optionHtml(selectItem,cartItem)}
        </div>
      </div>
    </div>
  `;
})
let summaryElement = document.querySelector('.js-order-summary');
summaryElement.innerHTML = cartHtml;


document.querySelectorAll('.js-delete-button')
  .forEach((deleteButton)=>{
    deleteButton.addEventListener('click',()=>{
      deleteCart(deleteButton.dataset.productId);
      document.querySelector(`.js-container-${deleteButton.dataset.productId}`).remove();
      renderPaymentSummary();
    })
  })

  function optionHtml(selectItem,cartItem){
    const optionSelected = cartItem.deliveryOption;
    let isChecked;
    let html = '';
    const now = dayjs();
    options.forEach((option)=>{
      const deliveryDate = now.add(
        option.deliveryDay,
        'day'
      )
      let string = deliveryDate.format('dddd, MMMM DD');
      let cost = option.deliveryCost === 0?'Free':`$${moneyData(option.deliveryCost)}-`
      isChecked = option.id === optionSelected?'checked':'';
      html+=`
      <div class="delivery-option js-delivery-option"
      data-product-id = ${selectItem.id} data-option-selected=${option.id}>
        <input type="radio" ${isChecked}
          class="delivery-option-input"
          name="delivery-option-${selectItem.id}">
        <div>
          <div class="delivery-option-date">
              ${string}
          </div>
          <div class="delivery-option-price">
            ${cost} Shipping
          </div>
        </div>
      </div>
    `
    })
    return html;
  }

  let optionElement = document.querySelectorAll('.js-delivery-option');
  optionElement.forEach((optionItem)=>{
    optionItem.addEventListener('click',()=>{
      const productId = optionItem.dataset.productId;
      const selectedOption = optionItem.dataset.optionSelected;
      cartDelivery(productId,selectedOption);
      OrderSummary();
      renderPaymentSummary();
    })
  })
}