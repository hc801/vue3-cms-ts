<template>
  <div
    ref="editorRef"
    class="hy-editor"
    :style="{ width: width ? `${width}px` : '100%' }"
  ></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";

import type Editor from "wangeditor";
import WangEditor from "wangeditor";

interface EditorInfo {
  html: string;
  text: string;
}

const props = defineProps({
  value: {
    type: String,
    default: ""
  },
  zIndex: {
    type: Number,
    default: 500
  },
  height: {
    type: Number,
    default: 500
  },
  width: {
    type: Number,
    default: 0
  },
  focus: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["update:value"]);

const editorRef = ref<HTMLElement>();
const isInitContent = ref(false);
const instance = ref<Editor | null>();
const content = reactive<EditorInfo>({
  html: "",
  text: ""
});

watch(
  () => props.value,
  () => {
    initEditorConfig(props.value);
  }
);

onMounted(() => {
  createWangEditor();
});

onBeforeUnmount(() => {
  if (!instance.value) return;
  instance.value.destroy();
  instance.value = null;
});

const createWangEditor = () => {
  instance.value = new WangEditor(editorRef.value);
  setEditorConfig();
  instance.value.create();
  // create之后才能初始化
  initEditorConfig(props.value);
};

const initEditorConfig = (htmlStr: string, isFocus = true) => {
  if (!instance.value) return;
  const editor = instance.value;
  editor.config.focus = isFocus;
  // if (!htmlStr) return;
  isInitContent.value = true;
  editor.txt.html(htmlStr);
};

const setEditorConfig = () => {
  if (!instance.value) return;
  const editor = instance.value;
  // 设置编辑区域高500px
  editor.config.height = props.height;
  // 设置z-index
  editor.config.zIndex = props.zIndex;
  // 取消自动focus
  editor.config.focus = props.focus;
  editor.config.onchange = (newHtml: string) => {
    content.html = newHtml;
    content.text = editor.txt.text();
    if (!isInitContent.value) {
      emit("update:value", content.html);
    }
    isInitContent.value = false;
  };

  // 配置触发 onchange 的时间频率，默认为 200ms
  editor.config.onchangeTimeout = 500; // 修改为 500ms
  // 配置菜单栏，删减菜单，调整顺序
  editor.config.menus = [
    "head",
    "bold",
    "fontSize",
    "fontName",
    "italic",
    "underline",
    "strikeThrough",
    "indent",
    "lineHeight",
    "foreColor",
    "backColor",
    "link",
    "list",
    // 'todo',
    "justify",
    "quote",
    // 'emoticon',
    "image",
    // 'video',
    // 'table',
    "code",
    "splitLine",
    "undo",
    "redo"
  ];
};
</script>

<style scoped lang="less">
.hy-editor {
  text-align: left;
}
</style>
