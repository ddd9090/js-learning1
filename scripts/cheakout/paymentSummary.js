import{cart,reNewCartquanlity} from '../../data/cart.js'
import {getProduct} from "../../data/products.js";
import{deliveryOption} from '../../data/options.js'
import{moneyData} from '../utils/money.js'
import{addToOrder}from '../../data/orders.js'
export function renderPaymentSummary(){
  let itemCount = 0;
  let shippingCount = 0;
  let itemTotal = 0;
  cart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    let product = getProduct(productId);
    itemCount += product.priceCents*cartItem.count;
    const optionId = cartItem.deliveryOption;
    let option = deliveryOption(optionId);
    shippingCount+=option.deliveryCost;
    itemTotal += itemCount;
    itemTotal+= shippingCount;
  })
  let tax = itemTotal*0.1;
  let cartquanlity = reNewCartquanlity();
  let orderTotal = tax+itemTotal;
  let paymentHtml = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartquanlity}):</div>
      <div class="payment-summary-money">$${moneyData(itemCount)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${moneyData(shippingCount)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${moneyData(itemTotal)}</div>
    </div>
    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${moneyData(tax)}</div>
    </div>
    <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${moneyData(orderTotal)}</div>
    </div>
    <button class="place-order-button button-primary js-place-order">
            Place your order
    </button>
  `
  let paymentContainerElement = document.querySelector('.js-payment-summary');
  paymentContainerElement.innerHTML = paymentHtml;

  document.querySelector('.js-place-order')
    .addEventListener('click',async ()=>{
      try{
        const response = await fetch('https://supersimplebackend.dev/orders',{
          method :'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            cart:cart
          })
        })
        const order = await response.json();
        addToOrder(order);

      }catch(error){
        console.log('Unexpected error.Try again Later.');
      }

      window.location.href = 'orders.html';
    })
}