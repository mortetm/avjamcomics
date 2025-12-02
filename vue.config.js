const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "assets",

  devServer: {
    proxy: {
      "/CDN": {
        target: "https://www.avjamcomics.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
