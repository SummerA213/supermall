<!--商品数据-->
<template>
    <div class="clist">
      <scroll class="content" ref="scroll">
        <cart-list-item v-for="(item,index) in cartList"
                        :key="index"
                        :item-info="item">
        </cart-list-item>
      </scroll>
    </div>
</template>

<script>
  import Scroll from "../../../components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";
  import {mapGetters} from 'vuex'

    export default {
      name: "CarList",
      components: {
        Scroll,
        CartListItem
      },
      computed: {
          ...mapGetters(['cartList'])
      },
      activated() {
        this.$refs.scroll.refresh()
      }
    }
</script>

<style scoped>
  .clist{
    height: calc(100% - 44px - 49px - 40px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
