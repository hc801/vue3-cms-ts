<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <template v-if="isFold"><Fold /></template>
      <template v-else><Expand /></template>
    </el-icon>
    <div class="content">
      <hy-breadcrumb :breadcrumbs="breadcrumbs"></hy-breadcrumb>
      <user-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "@/store";
import { useRoute } from "vue-router";

import { Fold, Expand } from "@element-plus/icons-vue";
import UserInfo from "./user-info.vue";

import { pathMapToBreadcrumb } from "@/utils/map-menus";

import HyBreadcrumb from "@/base-ui/breadcrumb";

const emit = defineEmits(["foldChange"]);

const store = useStore();
const route = useRoute();

const isFold = ref(false);
const handleFoldClick = () => {
  isFold.value = !isFold.value;
  emit("foldChange", isFold.value);
};

const breadcrumbs = computed(() => {
  const userMenus = store.state.login.userMenus;
  const currentPath = route.path;
  return pathMapToBreadcrumb(userMenus, currentPath);
});
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  width: 100%;

  .fold-menu {
    margin-right: 20px;
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
  }
}
</style>
