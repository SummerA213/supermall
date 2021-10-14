import {
  ADD_COUNTER,
  ADD_TO_CART
}from './mutation-types'


export default {
  addCart(context, payload){
   return new Promise((resolve, reject) => {
     //payload新添加商品
     //查找之前数组中是有该商品
     let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
     //判断oldProduct是否有值
     if (oldProduct){
       //数量＋1
       //oldProduct.count += 1
       context.commit(ADD_COUNTER,oldProduct)
       resolve('当前商品数量+1')
     }else {
       //添加新的商品
       payload.count = 1
       context.commit(ADD_TO_CART, payload)
       resolve('添加新商品')
     }
   })
  }
}
