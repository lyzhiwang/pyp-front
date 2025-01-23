const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: "./",
    devServer: {
        allowedHosts: "all",
        historyApiFallback: true,
        // proxy: {
        //     '/api': {
        //       target: 'http://localhost:8080',
        //        changeOrigin: true,
        //       ws: true,
        //       pathRewrite: {
        //         '^/api': ''
        //       }
        //     }
        //   }
    },
});

