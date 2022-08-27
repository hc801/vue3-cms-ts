<template>
  <div class="user-info">
    <div class="operation">
      <span>
        <el-icon :size="20"><Bell /></el-icon>
      </span>
      <span>
        <el-icon :size="20"><ChatDotRound /></el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon :size="20"><Postcard /></el-icon>
      </span>
    </div>
    <div class="info">
      <el-dropdown :hide-on-click="false">
        <span class="el-dropdown-link">
          <el-avatar
            size="small"
            class="avatar"
            src="https://avatars.githubusercontent.com/u/78576743?v=4"
          />
          <span>{{ name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon><CircleClose /></el-icon>退出登录
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>个人信息
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Lock /></el-icon>修改密码
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";

import localCache from "@/utils/cache";

import {
  CircleClose,
  InfoFilled,
  Lock,
  Bell,
  ChatDotRound,
  Postcard
} from "@element-plus/icons-vue";

const store = useStore();
const name = computed(() => store.state.login.userInfo.name);

const router = useRouter();
const handleExitClick = () => {
  localCache.deleteCache("token");
  router.replace("/main");
};
</script>

<style scoped lang="less">
.user-info {
  display: flex;
  align-items: center;

  .el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;

    .avatar {
      width: 30px;
      height: 30px;
    }

    span {
      margin-left: 5px;
    }
  }

  .operation {
    margin-right: 20px;

    span {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 35px;
      line-height: 40px;
      cursor: pointer;

      &:hover {
        background: #f2f2f2;
      }

      .dot {
        position: absolute;
        top: 3px;
        right: 3px;
        width: 6px;
        height: 6px;
        background-color: red;
        border-radius: 50%;
      }
    }
  }
}
</style>
