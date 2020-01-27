import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation_types"

export default {
  addCart(context, payload) {
    // 查找之前数组里面是否有该商品
   return new Promise((resolve, reject) => {
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);

    if (oldProduct) {
      // oldProduct.count += 1;
      context.commit(ADD_COUNTER, oldProduct)
      resolve("当前商品数量加1")
    } else {
      payload.count = 1;
      // state.cartList.push(payload);
      context.commit(ADD_TO_CART, payload);
      resolve("添加新的商品")
    }
   })
  }
}