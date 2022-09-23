<template>
  <div class="page-content">
    <hy-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <template #headerHandler>
        <el-button
          v-if="isCreate && isShowNewBtn"
          type="primary"
          @click="handleNewClick"
        >
          {{ newBtnText }}
        </el-button>
      </template>
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? "启用" : "禁用" }}
        </el-button>
      </template>
      <template #createAt="scope">
        {{ $filter.formatTime(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filter.formatTime(scope.row.updateAt) }}
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            v-if="isUpdate"
            size="small"
            type="primary"
            link
            @click="handleEditClick(scope.row)"
          >
            <el-icon><Edit /></el-icon>编辑
          </el-button>
          <el-button
            v-if="isDelete"
            size="small"
            type="primary"
            link
            @click="handleDeleteClick(scope.row)"
          >
            <el-icon><Delete /></el-icon>删除
          </el-button>
        </div>
      </template>

      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropsSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <div class="other-slots">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </div>
      </template>
    </hy-table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useStore } from "@/store";

import HyTable from "@/base-ui/table";
import { Edit, Delete } from "@element-plus/icons-vue";

import { usePermission } from "@/hooks/usePermission";

const props = defineProps({
  contentTableConfig: {
    type: Object,
    required: true
  },
  pageName: {
    type: String,
    required: true
  },
  newBtnText: {
    type: String,
    default: ""
  },
  isShowNewBtn: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(["newBtnClick", "editBtnClick"]);

const store = useStore();

// 0.获取操作的权限
const isCreate = usePermission(props.pageName, "create");
const isUpdate = usePermission(props.pageName, "update");
const isDelete = usePermission(props.pageName, "delete");
const isQuery = usePermission(props.pageName, "query");

// 1.双向绑定pageInfo
const pageInfo = ref({ currentPage: 1, pageSize: 10 });
watch(pageInfo, () => getPageData());

// 2.请求页面数据
const getPageData = (queryInfo: any = {}) => {
  if (!isQuery) return;
  store.dispatch("system/getPageListAction", {
    pageName: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo
    }
  });
};
getPageData();

// 3.从vuex中获取数据
const dataList = computed(() =>
  store.getters[`system/pageListData`](props.pageName)
);
const dataCount = computed(() =>
  store.getters[`system/pageListCount`](props.pageName)
);

// 4.获取其他的动态插槽插槽名称
const otherPropsSlots = props.contentTableConfig.propList.filter(
  (item: any) => {
    if (item.slotName === "status") return false;
    if (item.slotName === "createAt") return false;
    if (item.slotName === "updateAt") return false;
    if (item.slotName === "handler") return false;
    if (item.slotName) return true;
  }
);

// 5.删除/编辑/新建操作
const handleDeleteClick = (item: any) => {
  store.dispatch("system/deletePageDataAction", {
    pageName: props.pageName,
    id: item.id
  });
};
const handleNewClick = () => {
  emit("newBtnClick");
};
const handleEditClick = (item: any) => {
  emit("editBtnClick", item);
};

defineExpose({
  getPageData
});
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;

  .handle-btns {
    display: flex;
    align-items: center;
    justify-content: center;

    .el-button + .el-button {
      margin: 0 !important;
    }
  }

  .other-slots {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
