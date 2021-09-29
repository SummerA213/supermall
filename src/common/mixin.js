import {decbounce} from "./utils";

export const itemListenerMixin = {
  data() {
    return {
      itemListener: null,
      refresh: null
    }
  },
  mounted() {
    const  refresh = decbounce(this.$refs.scroll.refresh,100)
    this.itemImgListener = () => {
      this.refresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
  }
}
