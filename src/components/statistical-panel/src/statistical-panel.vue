<template>
  <div class="statistical-panel">
    <div class="header">
      <span>{{ panelData.title }}</span>
      <el-tooltip :content="panelData.tips" placement="top" effect="light">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <hy-count-up
        :number="panelData.number1"
        :options="
          panelData.amount === 'saleroom' ? counterOption2 : counterOption1
        "
      ></hy-count-up>
    </div>
    <div class="footer">
      <span>{{ panelData.subtitle }}</span>
      <hy-count-up
        :number="panelData.number2"
        :options="
          panelData.amount === 'saleroom' ? counterOption2 : counterOption1
        "
      ></hy-count-up>
    </div>
  </div>
</template>

<script setup lang="ts">
import HyCountUp from "@/base-ui/count-up";
import { Warning } from "@element-plus/icons-vue";

defineProps({
  panelData: {
    type: Object,
    default: () => ({})
  }
});

const counterOption1 = {
  decimalPlaces: 0, // 保留两位
  prefix: "" // 单位
};
const counterOption2 = {
  decimalPlaces: 0, // 保留两位
  prefix: "￥" // 单位
};
</script>

<style scoped lang="less">
@h: 38px;

.statistical-panel {
  padding: 0 20px;
  text-align: left;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgb(0 0 0, 0.1);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: @h;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    padding-top: 10px;
  }

  .content {
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
  }

  .footer {
    display: flex;
    align-items: center;

    height: @h;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    margin-top: 10px;
    border-top: 1px solid #f0f0f0;

    span + span {
      margin-left: 5px;
    }
  }
}
</style>
