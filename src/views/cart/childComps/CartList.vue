<template>
  <scroll class="content" ref="scroll">
    <div class="cart-list">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :item-info="item"></cart-list-item>
    </div>
  </scroll>
</template>

<script>
import CartListItem from "./CartListItem";

import Scroll from "components/common/scroll/Scroll";

import { mapGetters } from "vuex";

export default {
  name: "CartList",
  components: {
    CartListItem,
    Scroll
  },
  computed: {
    ...mapGetters(["cartList"])
  },

  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>

  /* .content{
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;

    overflow: hidden;
  } */

  .content {
    height: calc(100% - 49px - 44px);
    overflow: hidden;
  }

</style>