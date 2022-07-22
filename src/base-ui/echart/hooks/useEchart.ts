import * as echarts from "echarts";

import ChinaMapData from "../data/china.json";

echarts.registerMap("china", ChinaMapData);

export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el, "light", { renderer: "svg" });

  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options);
  };

  const updateSize = () => {
    echartInstance.resize();
  };

  // 监听window尺寸的变化
  window.addEventListener("resize", updateSize);

  return { echartInstance, setOptions, updateSize };
}
