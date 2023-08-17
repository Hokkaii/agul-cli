module.exports = {
    getDefault: () => `
        chainWebpack: function (config, { webpack, env, createCSSRule }) {
            if (env === "production") {
                // Gzip压缩
                config.plugin("compression-webpack-plugin").use(CompressionPlugin, [
                    {
                        test: /\.(js|css|html)$/i, // 匹配
                        threshold: 10240, // 超过10k的文件压缩
                        deleteOriginalAssets: false, // 不删除源文件
                    },
                ]);
                config.plugin("terser-webpack-plugin").use(TerserPlugin, [
                    {
                        terserOptions: {
                            compress: true,
                        },
                    },
                ]);
            }
        },
    `,
    getChild: () => `
        qiankun: {
            slave: {},
        },
        chainWebpack: function (config, { webpack, env, createCSSRule }) {
            if (env === "production") {
            // 关闭代码拆分，防止子应用资源加载失败
            config
                .plugin("limitChunkCountPlugin")
                .use(webpack.optimize.LimitChunkCountPlugin, [{ maxChunks: 1 }]);
            }
        },
    `,
    getMain: () => `
        qiankun: {
            master: {
                // 注册子应用信息
                apps: [
                    {
                    name: "child-ms", // 唯一 id 需要确认后准确配置
                    entry:
                        process.env.NODE_ENV === "development"
                        ? "//localhost:8001"
                        : ${'`${' + `QIANKUN_HOST}/child-ms` + '`'}, // 需要确认后准确配置
                    }
                ]
            }
        },
        chainWebpack: function (config, { webpack, env, createCSSRule }) {
            if (env === "production") {
                // Gzip压缩
                config.plugin("compression-webpack-plugin").use(CompressionPlugin, [
                    {
                        test: /\.(js|css|html)$/i, // 匹配
                        threshold: 10240, // 超过10k的文件压缩
                        deleteOriginalAssets: false, // 不删除源文件
                    },
                ]);
                config.plugin("terser-webpack-plugin").use(TerserPlugin, [
                    {
                        terserOptions: {
                            compress: true,
                        },
                    },
                ]);
            }
        },
    `
}