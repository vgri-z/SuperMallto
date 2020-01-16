<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BSroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    };
  },

  props: {
    probeType: {
      type: Number,
      default: 0 
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },

  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BSroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });

    // 2.监听滚动位置
    this.scroll.on("scroll", position => {
      // console.log(position);
      this.$emit("scroll", position)
    })

    // 3.上拉加载更多
    this.scroll.on("pullingUp", () => {
      console.log("上拉加载更多");
      this.$emit("pullingUp");
    })
  },

  methods: {
    scrollTo(x, y, time = 600) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    }
  }
};
</script>

<style scoped>
</style>