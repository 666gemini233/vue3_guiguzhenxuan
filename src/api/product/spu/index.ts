//SPU管理模块的接口
import request from '@/utils/request'
import type {
  SpuData,
  HasSpuResponseData,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  SkuData,
  SkuInfoData,
} from './type'
enum API {
  //获取已有的SPU数据
  HASSPU_URL = 'http://114.115.179.162:8022/prod-api/admin/product/',
  //获取全部品牌的数据
  ALLTRADEMARK_URL = 'http://114.115.179.162:8022/prod-api/admin/product/baseTrademark/getTrademarkList',
  //获取某个SPU下的全部的售卖商品的图片数据
  IMAGE_URL = 'http://114.115.179.162:8022/prod-api/admin/product/spuImageList/',
  //获取某个SPU下全部已有的销售属性接口
  SPUHASSALEATTR_URL = 'http://114.115.179.162:8022/prod-api/admin/product/spuSaleAttrList/',
  //获取整个项目全部的销售属性【颜色、版本、尺码】
  ALLSALEATTR_URL = 'http://114.115.179.162:8022/prod-api/admin/product/baseSaleAttrList',
  //追加一个新的SPU
  ADDSPU_URL = 'http://114.115.179.162:8022/prod-api/admin/product/saveSpuInfo',
  //更新已有SPU
  UPDATESPU_URL = 'http://114.115.179.162:8022/prod-api/admin/product/updateSpuInfo',
  //追加一个新的SKU地址
  ADDSKU_URL = 'http://114.115.179.162:8022/prod-api/admin/product/saveSkuInfo',
  //查看某个已有的SPU下全部售卖的商品
  SKUINFO_URL = 'http://114.115.179.162:8022/prod-api/admin/product/findBySpuId/',
  //删除已有SPU
  REMOVESPU_URL = 'http://114.115.179.162:8022/prod-api/admin/product/deleteSpu/',
}
//获取某个三级分类下已有的SPU数据
export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: string | number,
) =>
  request.get<any, HasSpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )

//获取全部SPU品牌数据
export const reqAllTrademark = () =>
  request.get<any, AllTradeMark>(API.ALLTRADEMARK_URL)
//获取某个SPU下的全部的售卖商品的图片地址
export const reqSpuImageList = (spuId: number) =>
  request.get<any, SpuHasImg>(API.IMAGE_URL + spuId)
//获取某个SPU下全部已有的销售属性
export const reqSpuHasSaleAttr = (spuId: number) =>
  request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId)
//获取全部销售属性
export const reqAllSaleAttr = () =>
  request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL)
//添加一个新的SPU
//更新已有SPU
export const reqAddOrUpdateSpu = (data: SpuData) => {
  if (data.id) {
    //如果SPU对象有ID，则为更新
    return request.post<any, any>(API.UPDATESPU_URL, data)
  } else {
    return request.post<any, any>(API.ADDSPU_URL, data)
  }
}
//添加SKU请求方法
export const reqAddSku = (data: SkuData) =>
  request.post<any, any>(API.ADDSKU_URL, data)
//获取SKU数据
export const reqSkuList = (spuId: number | string) =>
  request.get<any, SkuInfoData>(API.SKUINFO_URL + spuId)
//删除已有SPU
export const reqRemoveSpu = (spuId: number | string) =>
  request.delete<any, any>(API.REMOVESPU_URL + spuId)
