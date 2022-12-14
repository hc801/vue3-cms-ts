<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">Vue3 + TS</span>
    </div>
    <el-menu
      :default-active="defaultActive"
      :collapse="collapse"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单可以展开的标题 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <template v-if="item.icon === 'el-icon-monitor'">
                  <Monitor />
                </template>
                <template v-if="item.icon === 'el-icon-setting'">
                  <Setting />
                </template>
                <template v-if="item.icon === 'el-icon-goods'">
                  <Goods />
                </template>
                <template v-if="item.icon === 'el-icon-chat-line-round'">
                  <ChatLineRound />
                </template>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "@/store";
import { useRouter, useRoute } from "vue-router";

import {
  Monitor,
  Setting,
  Goods,
  ChatLineRound
} from "@element-plus/icons-vue";

import { pathMapToMenu } from "@/utils/map-menus";

defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
});

const router = useRouter();
const route = useRoute();
const currentPath = route.path;

const store = useStore();
const userMenus = computed(() => store.state.login.userMenus);

const menu = pathMapToMenu(userMenus.value, currentPath);

const defaultActive = ref(menu.id + "");

const handleMenuItemClick = (item: any) => {
  router.push({
    path: item.url ?? "/not-found"
  });
};
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
    background-color: #0c2135;
    color: #b7bdc3;
  }

  // 目录
  .el-sub-menu {
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-sub-menu__title {
    background-color: #001529 !important;
  }

  .el-menu-item:hover {
    color: #fff !important;
  }

  .el-menu .is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
