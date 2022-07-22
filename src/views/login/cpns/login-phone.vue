<template>
  <div class="login-phone">
    <el-form label-width="70px" :rules="rules" :model="phone">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="phone.num"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code"></el-input>
          <el-button class="get-code-btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

import { rules } from "../config/phone-config";

const phone = reactive({
  num: "",
  code: ""
});
</script>

<style scoped lang="less">
.get-code {
  display: flex;
  justify-content: center;
  align-items: center;

  .get-code-btn {
    margin-left: 5px;
  }
}
</style>
