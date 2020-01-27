<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款', '精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommend="recommend"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款', '精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import { getHomeMultidata, getHomeGoods } from "network/home";
  import { debounce } from "common/utils";
  import { itemImgListenerMixin, backTopMixin } from "common/mixin";

  export default {
    name: "Home",
    data() {
      return {
        banners: [],
        recommend: [],
        goods: {
          pop: { page: 0, list: [] },
          new: { page: 0, list: [] },
          sell: { page: 0, list: [] }
        },
        currentType: "pop",
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
      };
    },
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,

      NavBar,
      TabControl,
      GoodsList,
      Scroll,
    },
    mixins:[itemImgListenerMixin, backTopMixin],
    destroyed() {
      console.log("Home destroyed");
    },
    activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0); 
    this.$refs.scroll.refresh();
    //  console.log(this.saveY);
    },
    deactivated() {
      // 保存saveY
      this.saveY = this.$refs.scroll.getScrollY();
      // console.log(this.saveY);

      // 取消itemImgLoad全局事件的监听
      this.$bus.$off("itemImgLoad", this.itemImgListener);
    },
    created() {
      // 1.请求多个数据(轮播图，推荐页)
      this.getHomeMultidata();

      // 2.请求商品数据
      this.getHomeGoods("pop");
      this.getHomeGoods("new");
      this.getHomeGoods("sell");
    },
    mounted() {
      // // 3.图片加载完成的事件监听
      // const refresh = debounce(this.$refs.scroll.refresh, 200);

      // // 对监听的事件进行保存
      // this.itemImgListener = () => {
      //   refresh();
      // }
      // this.$bus.$on("itemImgLoad", this.itemImgListener);

      // 获取tabControl的offsetTop
      // 所有的组件都有一个属性$el，用于获取组件内的元素
      // console.log(this.$refs.tabControl.$el.offsetTop);
    },
    methods: {
      /**
       *事件监听相关的方法
      */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = "pop";
            break;
          case 1:
            this.currentType = "new";
            break;
          case 2:
            this.currentType = "sell";
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      contentScroll(position) {
        // console.log(position)
        this.isShowBackTop = -position.y > 1000;
        this.isTabFixed = -position.y > this.tabOffsetTop;
      },
      loadMore() {
        // console.log("上拉加载更多");
        this.getHomeGoods(this.currentType);
      },
      swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      /**
       *网络请求相关的方法
      */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          // 请求多个数据
          this.banners = res.data.banner.list;
          this.recommend = res.data.recommend.list;
        });
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          this.$refs.scroll.finishPullUp();
        });
      }
    }
  };
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  /* .tab-control {
    background-color: #fff;
    position: sticky;
    top: 44px;
    z-index: 9;
  } */

    .tab-control {
      position: relative;
      z-index: 9;
      background: #fff;
    }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;

    overflow: hidden;
  }

  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>
