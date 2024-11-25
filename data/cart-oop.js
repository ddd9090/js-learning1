function Cart(localKey){
  let Cart = {
    cartItem : undefined,
    loadFromStorage(){
      this.cartItem = JSON.parse(localStorage.getItem(localKey));
      if(!this.cartItem){
        this.cartItem = [{
            productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            count:1,
            deliveryOption:'1'
          },{
            productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
            count:1,
            deliveryOption:'2'
          }];
        }   
    },
    saveCartData(){
      localStorage.setItem(localKey,JSON.stringify(this.cartItem ));
    },
    addToCart(productId){
      let matchedItem;
      this.cartItem.forEach((item)=>{
          if(item.productId === productId){
            matchedItem = item;
          }
        })
        if(matchedItem){
          matchedItem.count+=1;
        }else{
          this.cartItem.push(
            {
              productId,
              count:1,
              deliveryOption:'1'
            }
          )
        }
      this.saveCartData();
    },
    reNewCartquanlity(){
      let cartquanlity = 0;
      this.cartItem.forEach((item)=>{
          cartquanlity+=item.count;
        })
      return cartquanlity;
    },
    deleteCart(productId){
      let newCart = [];
      this.cartItem.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
          newCart.push(cartItem);
        }
      })
      this.cartItem = newCart;
      this.saveCartData();
    },
    cartDelivery(productId,selectedOption){
      let selectItem = '';
      this.cartItem.forEach((cartItem)=>{
        if(cartItem.productId===productId){
          selectItem = cartItem;
        }
      })
      selectItem.deliveryOption = selectedOption;
      this.saveCartData();
    }
  }
  return Cart;
}

let c1 = Cart('aaa');
let b2 = Cart('bbb');
c1.loadFromStorage();
b2.loadFromStorage();
console.log(c1.cartItem);
console.log(b2.cartItem);