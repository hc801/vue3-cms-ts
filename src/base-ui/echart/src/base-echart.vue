<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { EChartsOption } from "echarts";
import useEchart from "../hooks/useEchart";

const props = withDefaults(
  defineProps<{ width?: string; height?: string; options: EChartsOption }>(),
  {
    width: "100%",
    height: "360px"
  }
);

const echartDivRef = ref<HTMLElement>();

onMounted(() => {
  const { setOptions } = useEchart(echartDivRef.value!);
  watchEffect(() => {
    setOptions(props.options);
  });
});
</script>

<style scoped lang="less"></style>
