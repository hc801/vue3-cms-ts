import { Module } from "vuex";

import {
  createPageData,
  deletePageData,
  editPageData,
  getPageListData
} from "@/service/main/system/system";

import { IRootState } from "@/store/type";
import { ISystemState } from "./types";

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    };
  },
  mutations: {
    changeUsersList(state, list: any[]) {
      state.usersList = list;
    },
    changeUsersCount(state, count: number) {
      state.usersCount = count;
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list;
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count;
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list;
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count;
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list;
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count;
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`];
      };
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`];
      };
    }
  },
  actions: {
    async getPageListAction({ commit }, payload) {
      // 1.拼接请求url
      const { pageName } = payload;
      const pageUrl = `/${pageName}/list`;

      // 2.对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo);

      const { list, totalCount } = pageResult.data;

      // 3.保存到vuex中
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1);
      commit(`change${changePageName}List`, list);
      commit(`change${changePageName}Count`, totalCount);
    },
    async deletePageDataAction({ dispatch }, payload) {
      const { pageName, id } = payload;
      const pageUrl = `/${pageName}/${id}`;

      await deletePageData(pageUrl);

      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },
    async createPageDataAction({ dispatch }, payload) {
      const { pageName, newData } = payload;
      const pageUrl = `/${pageName}`;

      await createPageData(pageUrl, newData);

      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },
    async editPageDataAction({ dispatch }, payload) {
      const { pageName, editData, id } = payload;
      const pageUrl = `/${pageName}/${id}`;

      await editPageData(pageUrl, editData);

      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    }
  }
};

export default systemModule;
