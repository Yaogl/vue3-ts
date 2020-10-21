module.exports = {
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
