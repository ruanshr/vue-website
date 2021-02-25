module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();

    svgRule
      .use("vue-loader")
      .loader("vue-loader-v16") // or `vue-loader-v16` if you are using a preview support of Vue 3 in Vue CLI
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader");
  },
  devServer: {
    proxy: {
      "/home": {
        target: "http://10.69.7.42:8080"
      }
    }
  }
};
