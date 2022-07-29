<template>
  <div class="goods">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="goods"
      newBtnText="新建商品"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <template #imgUrl="scope">
        <el-image
          style="width: 60px; height: 80px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          preview-teleported
        ></el-image>
      </template>
      <template #oldPrice="scope">{{ "￥" + scope.row.oldPrice }}</template>
    </page-content>
    <page-modal
      ref="pageModalRef"
      page-name="goods"
      :modal-config="modalConfig"
      :defaultInfo="defaultInfo"
    ></page-modal>
  </div>
</template>

<script setup lang="ts">
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";

import { contentTableConfig } from "./config/content.config";
import { searchFormConfig } from "./config/search.config";
import { modalConfig } from "./config/modal.config";

import { usePageSearch } from "@/hooks/usePageSearch";
import { usePageModal } from "@/hooks/usePageModal";

const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch();

const [defaultInfo, pageModalRef, handleNewData, handleEditData] =
  usePageModal();
</script>

<style scoped></style>
