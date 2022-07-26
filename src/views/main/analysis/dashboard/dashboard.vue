<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <hy-card title="分类商品数量（饼图）">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </hy-card>
      </el-col>
      <el-col :span="10">
        <hy-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </hy-card>
      </el-col>
      <el-col :span="7">
        <hy-card title="分类商品数量（玫瑰图）">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </hy-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <hy-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </hy-card>
      </el-col>
      <el-col :span="12">
        <hy-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </hy-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/store";

import HyCard from "@/base-ui/card";
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from "@/components/page-echarts";

const store = useStore();
store.dispatch("analysis/getDashboardDataAction");

const categoryGoodsCount = computed(() => {
  return store.state.analysis.categoryGoodsCount.map((item: any) => {
    return { name: item.name, value: item.goodsCount };
  });
});
const categoryGoodsSale = computed(() => {
  const xLabels: string[] = [];
  const values: any[] = [];

  const categoryGoodsSale = store.state.analysis.categoryGoodsSale;

  for (const item of categoryGoodsSale) {
    if (item.goodsCount && item.name) {
      xLabels.push(item.name);
      values.push(item.goodsCount);
    }
  }

  return {
    xLabels,
    values
  };
});
const categoryGoodsFavor = computed(() => {
  const xLabels: string[] = [];
  const values: any[] = [];

  const categoryGoodsFavor = store.state.analysis.categoryGoodsFavor;

  for (const item of categoryGoodsFavor) {
    if (item.goodsFavor && item.name) {
      xLabels.push(item.name);
      values.push(item.goodsFavor);
    }
  }

  return {
    xLabels,
    values
  };
});
const addressGoodsSale = computed(() => {
  return store.state.analysis.addressGoodsSale.map((item: any) => {
    return { name: item.address, value: item.count };
  });
});
</script>

<style scoped lang="less">
.content-row {
  margin-top: 10px;
}
</style>
