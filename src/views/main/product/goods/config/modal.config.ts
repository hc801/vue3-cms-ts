import { IForm } from "@/base-ui/form";

export const modalConfig: IForm = {
  formItems: [
    {
      field: "name",
      type: "input",
      label: "商品名称",
      placeholder: "请输入商品名称"
    },
    {
      field: "oldPrice",
      type: "input",
      label: "原价",
      placeholder: "请输入原价"
    },
    {
      field: "newPrice",
      type: "input",
      label: "现价",
      placeholder: "请输入现价"
    },
    {
      field: "desc",
      type: "input",
      label: "商品描述",
      placeholder: "请输入商品描述"
    },
    {
      field: "imgUrl",
      type: "input",
      label: "图片URL",
      placeholder: "请输入图片URL"
    },
    {
      field: "inventoryCount",
      type: "input",
      label: "库存数量",
      placeholder: "请输入库存数量"
    },
    {
      field: "saleCount",
      type: "input",
      label: "销售量",
      placeholder: "请输入销售量"
    },
    {
      field: "favorCount",
      type: "input",
      label: "收藏量",
      placeholder: "请输入收藏量"
    },
    {
      field: "address",
      type: "input",
      label: "地址",
      placeholder: "请输入地址"
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
};
