<template>
  <div class="description">
    <el-descriptions :title="title" :column="column" border>
      <template v-for="item in tableDatas" :key="item.name">
        <el-descriptions-item>
          <template #label>{{ item.name }}</template>
          <el-tag>{{ item.description }}</el-tag>
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: ""
  },
  column: {
    type: Number,
    default: 1
  },
  tableDatas: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped lang="less">
.description {
  margin-bottom: 20px;
}
</style>
