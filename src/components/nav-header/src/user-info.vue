<template>
  <div class="user-info">
    <el-dropdown :hide-on-click="false">
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        />
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">
            <el-icon><CircleClose /></el-icon>退出登录
          </el-dropdown-item>
          <el-dropdown-item divided>Action 6</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/store";

import localCache from "@/utils/cache";

import { CircleClose } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const store = useStore();
const name = computed(() => store.state.login.userInfo.name);

const router = useRouter();
const handleExitClick = () => {
  localCache.deleteCache("token");
  router.replace("/main");
};
</script>

<style scoped lang="less">
.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;

  span {
    margin-left: 5px;
  }
}
</style>
