<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";

  import {getDetail} from "../../network/detail";

    export default {
      name: "Detail",
      components: {
        DetailNavBar,
        DetailSwiper
      },
      data() {
        return {
          iid: null,
          topImages: []
        }
      },
      created() {
        //1.保存ID
        this.iid = this.$route.params.iid

        //2.根据ID请求详情页
        getDetail(this.iid).then(res => {
          //获取顶部轮播数据
          console.log(res);
          this.topImages = res.result.itemInfo.topImages
        })
      }
    }
</script>

<style scoped>

</style>
