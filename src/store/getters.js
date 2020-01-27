const getters = {
  cartList(state) {
    return state.cartList
  },
  cartListLength(state, getters) {
    return getters.cartList.length
  }
}

export default getters