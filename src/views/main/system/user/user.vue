<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      newBtnText="新建用户"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :modalConfig="modalConfigRef"
      :defaultInfo="defaultInfo"
      pageName="users"
    ></page-modal>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/store";

import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";

import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { modalConfig } from "./config/modal.config";

import { usePageSearch } from "@/hooks/usePageSearch";
import { usePageModal } from "@/hooks/usePageModal";

const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch();

// 2.动态添加部门和角色列表
const store = useStore();
const modalConfigRef = computed(() => {
  const departmentItem = modalConfig.formItems.find(
    (item) => item.field === "departmentId"
  );
  departmentItem!.options = store.state.entireDepartment.map((item) => ({
    title: item.name,
    value: item.id
  }));
  const roleItem = modalConfig.formItems.find(
    (item) => item.field === "roleId"
  );
  roleItem!.options = store.state.entireRole.map((item) => ({
    title: item.name,
    value: item.id
  }));

  return modalConfig;
});

const passwordItem = modalConfig.formItems.find(
  (item) => item.field === "password"
);
const newCallback = () => {
  passwordItem!.isHidden = false;
};
const editCallback = () => {
  passwordItem!.isHidden = true;
};
const [defaultInfo, pageModalRef, handleNewData, handleEditData] = usePageModal(
  newCallback,
  editCallback
);
</script>

<style scoped lang="less"></style>
