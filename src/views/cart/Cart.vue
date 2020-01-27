<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartListLength}})</div>
    </nav-bar>

    <cart-list />
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import CartList from "./childComps/CartList"
import BottomBar from "./childComps/BottomBar"

import NavBar from "components/common/navbar/NavBar"

import { mapGetters } from "vuex"

export default {
  name: "Cart",
  components: {
    CartList,
    BottomBar,
    NavBar
  },
  computed: {
    ...mapGetters([
      "cartListLength"
    ])
  // ...mapGetters(
  //   length: "cartListLength"
  // )
  },
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>