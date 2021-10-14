import {request} from "./request";

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export class  Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.price = itemInfo.price
    this.oldPrice = itemInfo.lowPrice
    this.discountDesc = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.score = shopInfo.score;
    this.fans = shopInfo.cFans;
    this.goodCounts = shopInfo.cGoods;
    this.sells = shopInfo.cSells;
  }
}

export class GoodsParam {
  constructor(info , rule) {
    //image 可能没有值（某些商品有值，有的没有）
    this.image = info.image ? info.image[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

export function getRecommend() {
  return request ({
    url: '/recommend'
  })
}

