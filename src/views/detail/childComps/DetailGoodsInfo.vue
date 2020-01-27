<template>
  <div  v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="base-info">
      <div class="up-line"></div>
      <div>{{detailInfo.desc}}</div>
      <div class="down-line"></div>
    </div>
    <div class="put-on">{{detailInfo.detailImage[0].key}}</div>
    <div>
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item" alt="" @load="imgLoad">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  data() {
    return {
      counter: 0,
      imgLength: 0
    }
  },
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imgLoad() {
      // 判断所有图片是否加载完了，如果加载完了，只要进行一次回调就行了，可以提高性能
      if(++this.counter === this.imgLength) {
        this.$emit("imgLoad");
      }
    }
  },
  watch: {
    // 监听detailInfo的变化，以此来使图片数量imgLength发生变化
    detailInfo() {
      this.imgLength = this.detailInfo.detailImage[0].list.length;
    }
  },
}
</script>

<style scoped>

  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .goods-info .base-info {
    padding: 0 15px;
    font-size: 14px;
  }

  .up-line{
    width: 90px;
    height: 1px;
    margin-bottom: 15px;
    background: #999;
  }

  .up-line::before {
    content: "";
    display: inline-block;
    width: 5px;
    height: 5px;
    background-color: #000;
    position: relative;
    top: -12px;
  }

  .down-line{
    width: 90px;
    height: 1px;
    margin-bottom: 15px;
    background: #999;
    float: right;
  }

  .down-line::after {
    content: "";
    display: inline-block;
    width: 5px;
    height: 5px;
    background-color: #000;
    position: relative;
    top: -12px;
    left: 85px;
  }

  img{
    width: 100%;
  }
  
  .put-on {
    margin: 10px 0 10px 15px;
    font-size: 15px;
  }
</style>