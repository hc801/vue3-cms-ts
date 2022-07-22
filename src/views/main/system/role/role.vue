<template>
  <div class="role">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      newBtnText="新建角色"
      ref="pageContentRef"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :modalConfig="modalConfig"
      :otherInfo="otherInfo"
      :defaultInfo="defaultInfo"
      pageName="role"
    >
      <el-tree
        ref="elTreeRef"
        :data="menus"
        show-checkbox
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        @check="handleCheckChange"
      />
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from "vue";
import { useStore } from "@/store";
import { menuMapLeafKeys } from "@/utils/map-menus";

import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";
import { ElTree } from "element-plus";

import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { modalConfig } from "./config/modal.config";

import { usePageSearch } from "@/hooks/usePageSearch";
import { usePageModal } from "@/hooks/usePageModal";

const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch();

const elTreeRef = ref<InstanceType<typeof ElTree>>();
const editCallback = (item: any) => {
  const leafKeys = menuMapLeafKeys(item.menuList);
  nextTick(() => {
    elTreeRef.value?.setCheckedKeys(leafKeys, false);
  });
};
const [defaultInfo, pageModalRef, handleNewData, handleEditData] = usePageModal(
  undefined,
  editCallback
);

const store = useStore();
const menus = computed(() => store.state.entireMenu);

const otherInfo = ref({});
const handleCheckChange = (data1: any, data2: any) => {
  const checkedKeys = data2.checkedKeys;
  const halfCheckedKeys = data2.halfCheckedKeys;
  const menuList = [...checkedKeys, ...halfCheckedKeys];
  otherInfo.value = { menuList };
};
</script>

<style scoped></style>
