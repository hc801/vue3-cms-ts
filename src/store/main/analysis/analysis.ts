import { Module } from "vuex";

import {
  getAddressGoodsSale,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale
} from "@/service/main/analysis/analysis";

import { IRootState } from "@/store/type";
import { IDashboardState } from "./types";

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsFavor: [],
      categoryGoodsSale: [],
      addressGoodsSale: []
    };
  },
  mutations: {
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
    async getDashboardDataAction({ commit }) {
      const categoryCountResult = await getCategoryGoodsCount();
      const categorySaleResult = await getCategoryGoodsSale();
      const categoryFavorResult = await getCategoryGoodsFavor();
      const addressSaleResult = await getAddressGoodsSale();
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
