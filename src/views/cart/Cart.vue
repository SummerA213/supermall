<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <!--导航-->
      <div slot="center">购物车({{cartLength}})</div>
      <!--<div slot="right" class="Ad">管理</div>-->
    </nav-bar>
    <!--商品列表-->
    <cart-list></cart-list>
    <!--汇总-->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
     // cartLength() {
     //   return this.$store.state.cartList.length
     // }
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;

  }
/*  .Ad {
    font-weight: 400;
    color: #f2f5f8;
  }*/
</style>
