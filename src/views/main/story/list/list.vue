<template>
  <div class="list">
    <page-content
      page-name="story"
      :contentTableConfig="contentTableConfig"
      :isShowNewBtn="false"
    ></page-content>
  </div>
</template>

<script setup lang="ts">
import PageContent from "@/components/page-content";

import { contentTableConfig } from "./config/content.config";
</script>

<style scoped></style>
