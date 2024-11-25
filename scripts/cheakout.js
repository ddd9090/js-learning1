import{OrderSummary} from "./cheakout/orderSummary.js"
import{renderPaymentSummary}from "./cheakout/paymentSummary.js"
import { loadProductsFetch } from "../data/products.js";
import{loadCart}from '../data/cart.js'
// import '../data/cart-claas.js';
// import '../data/backend-practice.js'

async function loadPage() {
  try{
    await loadProductsFetch();

    await new Promise((resolve)=>{
      loadCart(()=>{
        resolve();
      });
    });
  } catch(error) {
    console.log('error');
  }
  
  OrderSummary();
  renderPaymentSummary();
}

loadPage();
/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve)=>{
    loadCart(()=>{
      resolve('value2');
    })
  })

]).then((value)=>{
  OrderSummary();
  renderPaymentSummary();
});
*/
// new Promise((resolve)=>{
//   LoadProducts(()=>{
//     resolve();
//   });

// }).then(()=>{
//   return new Promise((resolve)=>{
//     loadCart(()=>{
//       resolve();
//     })
//   })

// }).then(()=>{
//     OrderSummary();
//     renderPaymentSummary();
// });

// LoadProducts(()=>{
//   loadCart(()=>{
//     OrderSummary();
//     renderPaymentSummary();
//   })
// });
