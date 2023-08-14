//SKU模块接口管理
import request from '@/utils/request'
import type { SkuResponseData, SkuInfoData } from './type'
//枚举地址
enum API {
  //获取已有商品数据SKU
  SKU_URL = 'http://114.115.179.162:8022/prod-api/admin/product/list/',
  //上架
  SALE_URL = 'http://114.115.179.162:8022/prod-api/admin/product/onSale/',
  //下架
  CANCELSALE_URL = 'http://114.115.179.162:8022/prod-api/admin/product/cancelSale/',
  //获取商品详情接口
  SKUINFO_URL = 'http://114.115.179.162:8022/prod-api/admin/product/getSkuInfo/',
  //删除已有商品
  DELETESKU_URL = 'http://114.115.179.162:8022/prod-api/admin/product/deleteSku/',
}
//获取商品SKU接口
export const reqSkuList = (page: number, limit: number) =>
  request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)
//已有商品上架请求
export const reqSaleSku = (skuId: number) =>
  request.get<any, any>(API.SALE_URL + skuId)
//已有商品下架请求
export const reqCancelSale = (skuId: number) =>
  request.get<any, any>(API.CANCELSALE_URL + skuId)
//获取商品详情
export const reqSkuInfo = (skuId: number) =>
  request.get<any, SkuInfoData>(API.SKUINFO_URL + skuId)
//删除已有商品
export const reqRemoveSku = (skuId: number) =>
  request.delete<any, any>(API.DELETESKU_URL + skuId)
