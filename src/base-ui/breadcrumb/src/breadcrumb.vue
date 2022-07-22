<template>
  <div class="nav-breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item>
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

import { IBreadcrumb } from "@/base-ui/breadcrumb";

defineProps({
  breadcrumbs: Array as PropType<IBreadcrumb[]>,
  default: () => []
});
</script>

<style scoped lang="less"></style>
