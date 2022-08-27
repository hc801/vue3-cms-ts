<template>
  <div class="chat">
    <hy-card title="留下你的故事吧">
      <template #header-right>
        <el-button type="primary" @click="handleSubmitClick">
          提交故事
        </el-button>
      </template>
      <hy-editor v-model:value="storyStr.titleStr" :height="80"></hy-editor>
      <hy-editor v-model:value="storyStr.htmlStr" :height="300"></hy-editor>
    </hy-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

import HyCard from "@/base-ui/card";
import HyEditor from "@/base-ui/editor";

import { createStory } from "@/service/main/story/story";

import { ElMessage } from "element-plus";

const storyStr = reactive({
  titleStr: "默认的title",
  htmlStr: "默认的content"
});

const handleSubmitClick = () => {
  createStory({ title: storyStr.titleStr, content: storyStr.htmlStr }).then(
    () => {
      storyStr.titleStr = "";
      storyStr.htmlStr = "";
      openCenter();
    }
  );
};

const openCenter = () => {
  ElMessage({
    type: "success",
    showClose: true,
    message: "故事提交成功！",
    center: true
  });
};
</script>

<style scoped lang="less">
.el-button {
  &:deep(span) {
    // ::v-deep .el-card__header span {
    font-weight: 400 !important;
  }
}

.el-card {
  &:deep(.el-card__header span) {
    // ::v-deep .el-card__header span {
    font-weight: 700;
  }
}

.hy-editor + .hy-editor {
  margin-top: 10px;
  &:deep(.w-e-toolbar) {
    z-index: 2 !important;
  }
  &:deep(.w-e-text-container) {
    z-index: 1 !important;
  }
}
</style>
