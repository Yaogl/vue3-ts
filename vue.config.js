module.exports = {
  publicPath: '/question-web', // 署应用包时的基本 URL。 vue-router hash 模式使用
  //  publicPath: '/app/', //署应用包时的基本 URL。  vue-router history模式使用
  outputDir: 'dist', //  生产环境构建文件的目录
  assetsDir: 'static', 
  devServer: {
    proxy: {
      "/api": {
        target: "http://182.92.153.233/api",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
