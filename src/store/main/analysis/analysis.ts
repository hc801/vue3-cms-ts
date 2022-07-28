import { Module } from "vuex";

import {
  getAmountList,
  getAddressGoodsSale,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale
} from "@/service/main/analysis/analysis";

import { IRootState } from "@/store/type";
import { IAnalysisState } from "./types";

const dashboardModule: Module<IAnalysisState, IRootState> = {
  namespaced: true,
  state() {
    return {
      topPanelData: [],
      categoryGoodsCount: [],
      categoryGoodsFavor: [],
      categoryGoodsSale: [],
      addressGoodsSale: []
    };
  },
  mutations: {
    changeTopPanelData(state, list) {
      state.topPanelData = list;
    },
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list;
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list;
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list;
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list;
    }
  },
  actions: {
    async getAnalysisDataAction({ commit }) {
      const topPanelDataResult = await getAmountList();
      const categoryCountResult = await getCategoryGoodsCount();
      const categorySaleResult = await getCategoryGoodsSale();
      const categoryFavorResult = await getCategoryGoodsFavor();
      const addressSaleResult = await getAddressGoodsSale();
      commit("changeTopPanelData", topPanelDataResult.data);
      commit("changeCategoryGoodsCount", categoryCountResult.data);
      commit("changeCategoryGoodsSale", categorySaleResult.data);
      commit("changeCategoryGoodsFavor", categoryFavorResult.data);
      commit("changeAddressGoodsSale", addressSaleResult.data);

      // getCategoryGoodsSale();
      // getCategoryGoodsFavor();
      // getAddressGoodsSale();
    }
  }
};

export default dashboardModule;
