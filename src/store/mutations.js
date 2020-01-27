import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation_types"

export default {
  // mutations的唯一目的就是修改state里面的状态
  // mutations里面的每一个方法尽可能完成的事件比较单一一点
  // 涉及到异步操作或者复杂逻辑相关的操作，通过actions来进修改

  [ADD_COUNTER](state, payload) {
    payload.count += 1;
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true;
    state.cartList.push(payload);
  }
}