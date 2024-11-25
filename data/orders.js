export const orders = JSON.parse(localStorage.getItem('order'))||[];

export function addToOrder(order){
  orders.unshift(order);
  saveToLocal();
}

function saveToLocal(){
  localStorage.setItem('order',JSON.stringify(orders));
}