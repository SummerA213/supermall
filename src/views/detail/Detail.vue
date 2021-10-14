<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="ImageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"/> <!--加native可以监听组件-->
    <toast></toast>
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
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "../../components/common/scroll/Scroll";
  import GoodsList from "../../components/content/goods/GoodsList";
  import BackTop from "../../components/content/backTop/BackTop";
  import Toast from "../../components/common/toast/Toast";

  import {getDetail,Goods,Shop,GoodsParam, getRecommend} from "../../network/detail";
  import {decbounce} from "../../common/utils";
  import {itemListenerMixin} from "../../common/mixin";

  export default {
    name: "Detail",
    mixins:[itemListenerMixin],
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList,
      DetailBottomBar,
      BackTop,
      Toast
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        isShowBackTop:false
      }
    },
    created() {
      //1.保存ID
      this.iid = this.$route.params.iid

      //2.根据ID请求详情页
      getDetail(this.iid).then(res => {
        //获取数据
         console.log(res);
        const data = res.result
        //获取顶部轮播数据
        this.topImages = data.itemInfo.topImages

        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //获取商家信息
        this.shop = new Shop(data.shopInfo)

        //保存商品详情数据
        this.detailInfo = data.detailInfo;

        //获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //获取评论信息
        if(data.rate.cRate !==0) {
          this.commentInfo = data.rate.list[0]
        }

       /* this.$nextTick(() => {
          //值不对原因:图片没有计算在内
          //根据最新的数据，对应DOM已经被渲染出来
          //但图片没有加载完成
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          console.log(this.themeTopYs);
        })*/
      })
      //3.请求推荐数据
      getRecommend()
        {
        getRecommend().then(res => {
          this.recommends = res.data.list
        })

        //4.给getThemetypY赋值,给this.themeTopYs赋值的操作进行防抖
        this.getThemeTopY = decbounce(() => {//获取数据
          this.themeTopYs = []
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          this.themeTopYs.push(Number.MAX_VALUE)
          console.log(this.themeTopYs);
        })
      }
    },
    methods: {
      ImageLoad () {

        // this.$refs.scroll.refresh()
        // this.recommends = res.data.list
        this.$refs.scroll.refresh()//刷新防抖

        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index], 200)
      },
      contentScroll(position) { //判断导航栏位置
        const positionY = -position.y
        let  length = this.themeTopYs.length
        for (let  i=0; i<length; i++) {
/*         if (this.currentIndex !== i && ((i < length - 1 && positionY > this.themeTopYs[i] && positionY <
            this.themeTopYs[i+1]) || (i === length - 1 && positionY >this.themeTopYs[i]))){
            this.currentIndex = i;
            console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex
          }*/
          //优化判断
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i-1])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        //显示返回图标
        this.isShowBackTop = -position.y > 480
      },
      backClick() {
        this.$refs.scroll.scroll.scrollTo (0, 0, 500)   /*最后一个参数 返回顶部时间*/
      },
      addToCart() {
        //获取购物车展示的信息
        const product = {}
        product.image = this.topImages[1]
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.price;
        product.iid = this.iid;
        //将商品添加到购物车
        //this.$store.commit('addCart',product)
        this.$store.dispatch('addCart', product).then(res => {
          console.log(res);
        })
      }
    },
    mounted() {
    },
    destroyed() {
      //取消全局的事件监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 50px)
  }
</style>
