export const rules = {
  phone: [
    {
      required: true,
      message: "手机号是必传内容~",
      trigger: "blur"
    },
    {
      pattern: /^\d{11}$/,
      message: "手机号必须是11个数字~",
      trigger: "blur"
    }
  ],
  code: [
    {
      required: true,
      message: "验证码是必传内容~",
      trigger: "blur"
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: "验证码必须是3个以上的字母或数字~",
      trigger: "blur"
    }
  ]
};
