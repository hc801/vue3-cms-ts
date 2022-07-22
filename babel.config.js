module.exports = {
  plugins: [
    // [
    //   "import",
    //   {
    //     libraryName: "element-plus",
    //     customStyleName: (name) => {
    //       return `element-plus/theme-chalk/${name}.css`;
    //     }
    //   }
    // ]
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator"
  ],
  presets: ["@vue/cli-plugin-babel/preset"]
};
