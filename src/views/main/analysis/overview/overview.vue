<template>
  <div class="overview">
    <hy-card title="关于">
      <div class="c-left">
        Vue3Admin 是基于 Vue3、Vuex、VueRouter、Vite、 ElementPlus
        、TypeScript、Echart5 等后台系统解决方案。
      </div>
    </hy-card>
    <hy-card title="技术栈">
      <hy-text-link :textArrs="technologyStacks"></hy-text-link>
      <hy-descriptions
        title="生产环境依赖"
        :column="2"
        :tableDatas="dependencies"
      ></hy-descriptions>
      <hy-descriptions
        title="开发环境依赖"
        :column="2"
        :tableDatas="devDependencies"
      ></hy-descriptions>
    </hy-card>
    <hy-card title="项目结构">
      <div class="c-left">
        <hy-code language="bash" :code="projectDir" />
      </div>
    </hy-card>
    <hy-card title="项目规范">
      <hy-descriptions
        title="文件命名规范"
        :table-datas="fileStandard"
      ></hy-descriptions>
      <hy-descriptions
        title="编写组件规范"
        :table-datas="componentStandard"
      ></hy-descriptions>
    </hy-card>
    <hy-card title="git提交规范">
      <hy-descriptions :table-datas="gitStandard"></hy-descriptions>
    </hy-card>
  </div>
</template>

<script setup lang="ts">
import HyCode from "@/base-ui/code";
import HyDescriptions from "@/base-ui/descriptions";
import HyTextLink from "@/base-ui/text-link";
import HyCard from "@/base-ui/card";

import {
  technologyStacks,
  dependencies,
  devDependencies,
  projectDir,
  componentStandard,
  fileStandard,
  gitStandard
} from "./config";
</script>

<style scoped lang="less">
.c-left {
  text-align: left;
}
.el-card {
  margin-bottom: 20px;

  &:deep(.el-card__header span) {
    // ::v-deep .el-card__header span {
    font-weight: 700;
  }
}
</style>
