// const path = require("path");

module.exports = {
  outputDir: "./build",
  // publicPath: "./",
  // 该配置仅解决开发阶段的跨域请求
  // 项目上线想要解决跨域问题：
  // 1.找后端关闭CORS跨域访问限制
  // 2.配置nginx
  devServer: {
    proxy: {
      "^/api": {
        target: "http://152.136.185.210:5000",
        pathRewrite: {
          "^/api": ""
        },
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        views: "@/views"
      }
    }
  }
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     views: '@/views'
  //   }
  // },
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set("@", path.resolve(__dirname, "src"))
  //     .set("views", "@/views");
  // }
};
