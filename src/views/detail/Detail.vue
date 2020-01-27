<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @itemClick="titleClick" ref="nav"></detail-nav-bar>
    <Scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad" />
      <detail-param-info ref="param" :param-info="paramsInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <detail-recommend-info ref="recommend" :recommends="recommends"></detail-recommend-info>
    </Scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <toast :message="message" :is-show="isShow"></toast>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
// import Toast from "components/common/toast/Toast"

import { getDetail, Goods, Shop, paramsInfo, getRecommend } from "network/detail";
import { debounce } from "common/utils";
import { itemImgListenerMixin, backTopMixin } from "common/mixin"

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: null,
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommends: [],
      themeTops: [],
      getThemeTops: null,
      currentIndex: 0,
      // message: "",
      // isShow: false
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar,
    GoodsList,
    // Toast,
    Scroll
  },
  mixins:[itemImgListenerMixin, backTopMixin],
  destroyed() {
    this.$bus.$off(this.itemImgListener);
  },
  mounted() {
    // // 3.图片加载完成的事件监听
    // const refresh = debounce(this.$refs.scroll.refresh, 200);

    // // 对监听的事件进行保存
    // this.itemImgListener = () => {
    //   refresh();
    // }
    // this.$bus.$on("itemImgLoad", this.itemImgListener);
    // console.log("hahah");

    // 元素是有了，但是数据还没有获取到
    // this.themeTops.push(0);
    // this.themeTops.push(this.$refs.param.$el.offsetTop);
    // this.themeTops.push(this.$refs.comment.$el.offsetTop);
    // this.themeTops.push(this.$refs.recommend.$el.offsetTop);

    // console.log(this.themeTops);//[0, undefined, undefined, 542];
  },
  created() {
    // 1.获取iid
    this.iid = this.$route.params.iid;

    //2.根据获取到的iid请求相应的数据
    getDetail(this.iid).then(res => {
      // 2.1请求轮播图数据
      console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      // 2.2请求商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 2.3请求店铺信息
      this.shop = new Shop(data.shopInfo);

      // 2.4请求商品详情数据
      this.detailInfo = data.detailInfo;

      // 2.5请求参数信息
      this.paramsInfo = new paramsInfo(data.itemParams.info, data.itemParams.rule)

      // 2.6请求评论信息
      if(data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }

      // 数据有了，但是还没有完全渲染出来，必须updated()后数据跟新后才会有值
      // this.themeTops.push(0);
      // this.themeTops.push(this.$refs.params.$el.offsetTop);
      // this.themeTops.push(this.$refs.comment.$el.offsetTop);
      // this.themeTops.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTops);

      // 可以获取到值，但是此时图片还没有完全被渲染出来，所以获取到的offsetTop是不准确的
      // this.$nextTick(() => {
      //   this.themeTops.push(0);
      //   this.themeTops.push(this.$refs.params.$el.offsetTop);
      //   this.themeTops.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTops.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTops);//[0, 1491, 2429, 2760]
      // })
    });

    // 3. 请求推荐的数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
      // console.log(this.recommends);
    })

    // 获取不到，元素$el压根获取不到
    // this.themeTops.push(0);
    // this.themeTops.push(this.$refs.params.$el.offsetTop);
    // this.themeTops.push(this.$refs.comment.$el.offsetTop);
    // this.themeTops.push(this.$refs.recommend.$el.offsetTop);

    // console.log(this.themeTops);

  },
  methods: {
    imgLoad() {
      // console.log("=====");
      this.$refs.scroll.refresh();
      
      this.getThemeTops = debounce(()=> {
        this.themeTops.push(0);
        this.themeTops.push(this.$refs.param.$el.offsetTop);
        this.themeTops.push(this.$refs.comment.$el.offsetTop);
        this.themeTops.push(this.$refs.recommend.$el.offsetTop);
        this.themeTops.push(Number.MAX_VALUE);
        // console.log(this.themeTops);
      }, 100)

      this.getThemeTops();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTops[index], 200);
    },
    contentScroll(position) {
      const positionY = -position.y;
      // console.log(positionY);
      // 0, 2862, 3714, 4004
      let length = this.themeTops.length;
      // for(let i = 0; i < length; i ++) {
      //   if((this.currentIndex !== i) && (i < length - 1 && positionY > this.themeTops[i] && positionY < this.themeTops[i + 1]) || (i === length - 1 && positionY >= this.themeTops[i])) {
      //     this.currentIndex = i;
      //     this.$refs.nav.currentIndex = this.currentIndex;
      //   }
      // }

      for(let i = 0; i < length - 1; i ++) {
        if(this.currentIndex !== i && positionY > this.themeTops[i] && positionY < this.themeTops[i + 1]) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      this.isShowBackTop = -position.y > 1000;
    },
    addToCart() {
      // 获取购物车需要展示的信息
      const product = {};

      product.iid = this.iid;
      product.imageUrl = this.topImages[0];
      product.price = this.goods.realPrice;
      product.title = this.goods.title;
      product.desc = this.goods.desc;

      // 判断操作是否完成
      this.$store.dispatch("addCart", product).then(res => {
        // this.message = res;
        // this.isShow = true;

        // setTimeout(() => {
        //   this.isShow = false;
        //   this.message = "";
        // }, 1500)

        this.$toast.show(res, 2000);
      })


    }
  },
  updated() {
    // // 可以获取到值
    // this.themeTops = [];
    // this.themeTops.push(0);
    // this.themeTops.push(this.$refs.param.$el.offsetTop);
    // this.themeTops.push(this.$refs.comment.$el.offsetTop);
    // this.themeTops.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themeTops); //[0, 11058, 11996, 12327]
  },
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background: #fff;
}

/* .detail-nav{
    position: relative;
    z-index: 9;
    background: #fff;
  } */

.content {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
  overflow: hidden;
}
</style>