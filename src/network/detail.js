import { request } from "./request"

export function getDetail(iid) {
  return request({
    url: "/detail",
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: "/recommend"
  })
}

export class Goods{
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.desc = itemInfo.desc;
    this.discount = itemInfo.discountDesc;
    this.realPrice = itemInfo.lowNowPrice;
    this.columns = columns;
    this.services = services;
  }
}

export class Shop{
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.sells = shopInfo.cSells;
    this.fans = shopInfo.cFans;
    this.score = shopInfo.score;
    this.goodCount = shopInfo.cGoods;
  }
}

export class paramsInfo{
  constructor(info, rule) {
    this.image = info.images ? info.images[0] : "";
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
