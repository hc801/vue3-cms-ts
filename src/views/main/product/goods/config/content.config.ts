export const contentTableConfig = {
  title: "商品列表",
  propList: [
    { prop: "name", label: "商品名称", minWidth: "100" },
    { prop: "oldPrice", label: "原价", minWidth: "70", slotName: "oldPrice" },
    { prop: "newPrice", label: "现价", minWidth: "70" },
    { prop: "imgUrl", label: "商品图片", minWidth: "80", slotName: "imgUrl" },
    { prop: "status", label: "状态", minWidth: "70", slotName: "status" },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "150",
      slotName: "createAt"
    },
    {
      prop: "updateAt",
      label: "更新时间",
      minWidth: "150",
      slotName: "updateAt"
    },
    { label: "操作", minWidth: "100", slotName: "handler" }
  ],
  showIndexColumn: true,
  showSelectColumn: true
};
