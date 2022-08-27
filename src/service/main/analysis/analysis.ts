import hyRequest from "@/service";
import { IDataType } from "@/service/types";

enum AnalysisAPI {
  amountList = "/goods/amount/list",
  categoryGoodsCount = "/goods/category/count",
  categoryGoodsSale = "/goods/category/sale",
  categoryGoodsFavor = "/goods/category/favor",
  addressGoodsSale = "/goods/address/sale"
}

export function getAmountList() {
  return hyRequest.get<IDataType>({
    url: AnalysisAPI.amountList
    // showLoading: false
  });
}

export function getCategoryGoodsCount() {
  return hyRequest.get<IDataType>({
    url: AnalysisAPI.categoryGoodsCount,
    showLoading: false
  });
}

export function getCategoryGoodsSale() {
  return hyRequest.get<IDataType>({
    url: AnalysisAPI.categoryGoodsSale,
    showLoading: false
  });
}

export function getCategoryGoodsFavor() {
  return hyRequest.get<IDataType>({
    url: AnalysisAPI.categoryGoodsFavor,
    showLoading: false
  });
}

export function getAddressGoodsSale() {
  return hyRequest.get<IDataType>({
    url: AnalysisAPI.addressGoodsSale,
    showLoading: false
  });
}
