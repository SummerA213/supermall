<!--商品信息-->
<template>
    <div id="shop-item">
     <div class="selector">
        <CheckButton :is-checked="itemInfo.checked" @click.native="checkClick"/>
      </div>
      <div class="item-img">
        <img :src="itemInfo.image" alt="商品图片">
      </div>
      <div class="iinfo">
        <div class="ititle">{{itemInfo.title}}</div>
        <div class="idesc">{{itemInfo.desc}}</div>
        <div class="ibottom">
          <div class="iprice left">￥{{itemInfo.price}}</div>
          <div class="icount right">X{{itemInfo.count}}</div>
        </div>
      </div>
    </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
    export default {
      name: "CartListItem",
      components: {
        CheckButton
      },
      props: {
        itemInfo: {
          type: Object,
          default() {
            return {}
          }
        }
      },
      methods: {
        checkClick() {
          this.itemInfo.checked = !this.itemInfo.checked
        }
      }
    }
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  .selector{
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ititle, .idesc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item-img {
    padding: 5px;
  }
  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }
  .iinfo {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .iinfo .idesc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }
  .ibottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .ibottom .iprice {
    color: orangered;
  }
</style>
