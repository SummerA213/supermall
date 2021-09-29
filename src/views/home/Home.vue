<template>
      <div id="home">
          <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
          <tab-control class="tab-control"
                       :titles="['流行','新款','精选']"
                       @tabClick="tabClick"
                       ref="tabControl1" v-show="isTabFixed"/>
          <scroll class="content"
                  ref="scroll"
                  :probe-type="3"
                  @scroll="contentScroll"
                  :pull-up-load="true"
                  @pullingUp="loadMore">
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
            <recommend-view :recommends="recommends"/>
            <feature-view/>
            <tab-control class="tab-control"
                         :titles="['流行','新款','精选']"
                         @tabClick="tabClick"
                         ref="tabControl2"/>
            <goods-list :goods=showGoods />
          </scroll>
          <back-top @click.native="backClick" v-show="isShowBackTop"/> <!--加native可以监听组件-->
      </div>
</template>

<script>

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";

  import {getHomeMultidata} from "network/home";
  import {getHomeGoods} from "../../network/home";
  import {decbounce} from "common/utils";
  import  {itemListenerMixin} from "../../common/mixin";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    mixins:[itemListenerMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop':{page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop:false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    destroyed() {
      console.log('home destroyed');
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      //保存Y值
      this.saveY = this.$refs.scroll.getScrollY()
      //取消全局事件的监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      //1.图片加载完成的事件监听
/*      const  refresh = decbounce(this.$refs.scroll.refresh,100)
      this.itemImgListener = () => {
        refresh()
      }
      this.$bus.$on('itemImageLoad', this.itemImgListener)*/
    },
    methods: {
      /*
      * 事件监听相关的方法
      * */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick() {
        this.$refs.scroll.scroll.scrollTo (0, 0, 500)   /*最后一个参数 返回顶部时间*/
      },
      contentScroll (position) {
        //判断backTop是否显示
        //console.log(position);
        this.isShowBackTop = (-position.y) > 700

        //决定tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },//滚动监听
      loadMore() {
       // console.log('上拉');
        this.getHomeGoods(this.currentType)
        //refresh:保留之前的缓存内容，重新加载页面
        this.$refs.scroll.scroll.refresh()
      },//上拉加载*/
      swiperImageLoad() {
        //获取tabControl的offsetTop
        //所有的组件都有一个属性$el：用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      /*
      * 网络请求相关
      */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {

          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>
<!--scoped 作用域-->
<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
/*  position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;*/
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
/*  .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  }*/
</style>
