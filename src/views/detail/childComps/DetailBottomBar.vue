<template>
  <div class="bottom-bar">
    <div class="shop-info">
      <div class="left">
        <div class="icon one"></div>
        <div>客服</div>
      </div>
       <div class="center">
        <div class="icon two"></div>
        <div>店铺</div>
      </div>
       <div class="right">
        <div class="icon three"></div>
        <div>收藏</div>
      </div>
    </div>
    <div class="shop-buy">
      <div @click="addToCart">加入购物车</div>
      <div>购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {
      this.$emit("addCart");
    }
  },
}
</script>

<style scoped>
  .bottom-bar {
    height: 49px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    text-align: center;
  }

  .bottom-bar > div {
    flex: 1;
  }

  .shop-info{
    font-size: 13px;
    display: flex;
  }

  .shop-info div {
    flex: 1;
  }

  .icon{
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
    margin: 6px 16px 3px;
    width: 22px;
    height: 22px;
  }

  .one {
    background-position: 0 -52px;
  }

  .two{
     background-position: 0 -98px;
  }

  .three{
     background-position: 0 0;
  }

  .shop-buy {
    font-size: 15px;
    display: flex;
    line-height: 49px;
  }

  .shop-buy div {
    flex: 1;
  }

  .shop-buy div:nth-child(1) {
    background: #0ff;
  }

  .shop-buy div:nth-child(2) {
    background: lime;
    color: #fff;
  }


</style>