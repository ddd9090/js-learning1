export const options = [{
  id:'1',
  deliveryDay:7,
  deliveryCost:0
},{
  id:'2',
  deliveryDay:3,
  deliveryCost:499
},{
  id:'3',
  deliveryDay:1,
  deliveryCost:999
}]

export function deliveryOption(OptionId){
  let delivery;
  options.forEach((option)=>{
    if(option.id === OptionId){
      delivery = option
    }
  })
  return delivery||options[0];
}