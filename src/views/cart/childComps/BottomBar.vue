<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-bar" @click.native="checkBtnClick" :is-checked="isSelected"></check-button>
      <span class="check-all">全选</span>
    </div>
    <div class="total">
      <span>合计: {{totalPrice}}</span>
    </div>
    <div class="calculate" @click="calcClick">
      <span class="calc-item">去计算({{totalCount}})</span>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton"

  import { mapGetters } from 'vuex';

  export default {
    name: "BottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(["cartList"]),
      totalPrice() {
        return "￥" + this.cartList.filter(item => {
          return item.checked
        }).reduce((pre, item) => {
          return pre + item.count * item.price
        }, 0).toFixed(2);
      },
      totalCount() {
        return this.cartList.length;
      },
      isSelected() {
        // 1.使用filter
        // return !(this.cartList.filter(item => !item.checked).length)
        
        // 2.使用find
        if(this.cartList.length === 0) return false;
        return !this.cartList.find(item => item.checked === false);

        // 3.普通判断
        // for(let item of this.cartList) {
        //   if(item.checked === false) {
        //     return false;
        //   }
        // }

        // return true;
        
      }
    },
    methods: {
      checkBtnClick() {
        if(this.isSelected) {
          this.cartList.forEach(item => item.checked = false)
        } else {
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        console.log("calcClick")
        this.$toast.show("请添加商品", 2000)
      }
    },
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background: #eee;
    box-shadow: 0 -1px 1px rgba(100,100,100,.2);
    font-size: 14px;

    position: relative;
    bottom: 40px;

    display: flex;
  }

  .check-content{
    display: flex;
    /* line-height: 40px; */
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-bar{
    width: 20px;
    height: 20px;
  }

  .check-all{
    margin-left: 5px;
  }

  .total {
    line-height: 40px;
    margin-left: 30px;
    flex: 1;
  }

  .calculate{
    line-height: 40px;
    width: 90px;
    text-align: center;
    background: #f00;
    color: #fff;
  }
</style>