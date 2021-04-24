const isPro = process.env.NODE_ENV === "production"; //是否为生产环境
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

let config = {
    publicPath: "./",
    transpileDependencies: [/vue/g],
    productionSourceMap: false, //map文件
    css: {
        requireModuleExtension: false,
        extract: false,
    },
    chainWebpack: (res) => {
        res.module
            .rule("images")
            .use("url-loader")
            .loader("url-loader")
            .tap((options) => Object.assign(options, { limit: 20480 }));
    },
};

if (isPro) {
    config = Object.assign({}, config, {
        configureWebpack: {
            performance: {
                hints: "warning",
                //入口起点的最大体积
                maxEntrypointSize: 1048576,
                //生成文件的最大体积
                maxAssetSize: 1048576,
                //只给出 js 文件的性能提示
                assetFilter: function (assetFilename) {
                    return assetFilename.endsWith(".js");
                },
            },
            optimization: {
                minimizer: [
                    new UglifyJsPlugin({
                        uglifyOptions: {
                            output: {
                                // 删除注释
                                comments: false,
                            },
                            //生产环境自动删除console
                            compress: {
                                //warnings: false, // 若打包错误，则注释这行
                                drop_debugger: true, //清除 debugger 语句
                                drop_console: true, //清除console语句
                                pure_funcs: ["console.log"],
                            },
                        },
                        sourceMap: false,
                        parallel: true,
                    }),
                ],
            },
        },
    });
    //
}

module.exports = config;
