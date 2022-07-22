<template>
  <div class="goods">
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="goods"
      newBtnText="新建商品"
    >
      <template #imgUrl="scope">
        <el-image
          style="width: 100px; height: 100px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          preview-teleported
        ></el-image>
      </template>
      <template #oldPrice="scope">{{ "￥" + scope.row.oldPrice }}</template>
    </page-content>
  </div>
</template>

<script setup lang="ts">
import PageContent from "@/components/page-content";

import { contentTableConfig } from "./config/content.config";
</script>

<style scoped></style>
