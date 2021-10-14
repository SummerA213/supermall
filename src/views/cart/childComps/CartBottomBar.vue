<template>
  <div class="bottom-bar">
    <div class="c" >
      <input type="checkbox"
             @click="checkClick"
             :checked="isAll"
             class="check" >
      <span class="word">全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="clate">
      结算:{{checkLength}}
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
    export default {
      name: "CartBottomBar",
      computed : {
        ...mapGetters (['cartList']),

        totalPrice(){
          return "￥"+this.$store.state.cartList.filter(item => {
            return item.checked
          }).reduce((preValue,item) =>{
            return parseFloat(item.price.slice(1)) * parseFloat(item.count)+preValue
          },0).toFixed(2);
        },
        checkLength () {
          return this.cartList.filter(item => item.checked).length
        },
        //判断全选
        isAll () {
          if (this.cartList.length === 0)
           return false

          //方法一：使用find
          //return !this.cartList.find(item => !item.checked)

          //方法二：使用filter
          //return !(this.cartList.filter(item => !item.checked).length)

          //方法三：普通遍历
          for (let item of this.cartList) {
            if (!item.checked) {
              return false
            }
          }
          return true
        }
      },
      methods: {
        checkClick() {
          if (this.isAll) {
            this.cartList.forEach(item =>item.checked = false)
          }else  {
            this.cartList.forEach(item =>item.checked = true)
          }
        }
      }
    }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    line-height: 40px;
    display: flex;
    background-color: #eeeeee;
    position: relative;
    font-size: 14px;
/*    padding-top: 13px;*/
  }
  .c {
    display: flex;
    align-items: center;
    margin-left: 8px;
    width: 50px;
  }
  .check {
    width: 14px;
    height: 14px;
  }
  .word {
    font-size: 14px;
    margin-left:5px;
  }
  .price {
    margin-left: 15px;
    flex: 1;
  }
  .clate {
    width: 90px;
    background: #ff8198;
    text-align: center;
  }
</style>
