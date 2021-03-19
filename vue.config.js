module.exports = {
    /* 静态资源路径*/
    publicPath: './',
    /* 是否带哈希*/
    filenameHashing: true,
    /* 多线程 [如果使用了多线程插件 这里必须为false] */
    parallel: false,
    /* 生产模式是否带映射文件*/
    productionSourceMap: true,
    /* 输出目录*/
    outputDir: 'dist/escm-web',
    /* 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右*/
    runtimeCompiler: false,
    chainWebpack: (config) => {
        // 去除预加载模块 [因为路由已经使用懒加载，所以需要把webpack的预加载关闭]
        config.plugins.delete('prefetch-index').delete('preload-index');
        // svg插件配置
        // config.module
        //     .rule('svg')
        //     .exclude.add(resolve('src/svg'))
        //     .end();
        // config.module
        //     .rule('icons')
        //     .test(/\.svg$/)
        //     .include.add(resolve('src/svg'))
        //     .end()
        //     .use('svg-sprite-loader')
        //     .loader('svg-sprite-loader')
        //     .options({
        //         symbolId: 'icon-[name]'
        //     });
        config.module
            .rule('worker')
            .test(/\.worker\.js$/)
            .use('worker')
            .loader('worker-loader')
            .options({
                inline: 'fallback'
            });
        // config.output.globalObject('this');
        // if (production) {
        //     // 拆包;
        //     config.optimization.splitChunks({
        //         cacheGroups: {
        //             vendor: {
        //                 chunks: 'all',
        //                 test: /node_modules/,
        //                 name: 'vendor',
        //                 minChunks: 1,
        //                 maxInitialRequests: 5,
        //                 minSize: 0,
        //                 priority: 100
        //             },
        //             common: {
        //                 chunks: 'all',
        //                 test: /[\\/]src[\\/]js[\\/]/,
        //                 name: 'common',
        //                 minChunks: 2,
        //                 maxInitialRequests: 5,
        //                 minSize: 0,
        //                 priority: 60
        //             },
        //             styles: {
        //                 name: 'styles',
        //                 test: /\.(sa|sc|c)ss$/,
        //                 chunks: 'all',
        //                 enforce: true
        //             },
        //             runtimeChunk: {
        //                 name: 'manifest'
        //             }
        //         }
        //     });
        //     // 打包分析
        //     // config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
        // }
    }
    // configureWebpack: (config) => {
    //     config.plugins.push(
    //         new CDNPlugins({
    //             devMode: false,
    //             // css: [['https://image3.myjuniu.com/u-table.css']],
    //             css: [],
    //             js: [
    //                 {
    //                     externals: { vue: 'Vue' },
    //                     path: ['https://image3.myjuniu.com/vue.min.js', 'https://data-wp.myjuniu.com/cdn/js/vue.min.js']
    //                 },
    //                 {
    //                     externals: { 'vue-router': 'VueRouter' },
    //                     path: ['https://image3.myjuniu.com/vue-router.min.js', 'https://data-wp.myjuniu.com/cdn/js/vue-router.min.js']
    //                 },
    //                 {
    //                     externals: { vuex: 'Vuex' },
    //                     path: ['https://image3.myjuniu.com/vuex.min.js', 'https://data-wp.myjuniu.com/cdn/js/vuex.min.js']
    //                 },
    //                 {
    //                     externals: { 'element-ui': 'ELEMENT' },
    //                     path: ['https://image3.myjuniu.com/elementUi.js', 'https://data-wp.myjuniu.com/cdn/js/elementUi.js']
    //                 },
    //                 {
    //                     externals: { 'umy-table': 'uTable' },
    //                     path: ['https://image3.myjuniu.com/u-table.js']
    //                 },
    //                 {
    //                     externals: { 'vxe-table-bloodcat': 'VXETableJZ' },
    //                     path: ['https://image3.myjuniu.com/vxe-table.js']
    //                 }
    //             ]
    //         })
    //     );
    //     config.plugins.push(
    //         new CompressionWebpackPlugin({
    //             filename: '[path].gz[query]',
    //             algorithm: 'gzip',
    //             test: /\.js$|\.html$|.\css/, // 匹配     test:/\.js$|\.html$|.\css/, //匹配
    //             threshold: 0, // 超过容量压缩
    //             minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
    //             deleteOriginalAssets: false // 是否删除原文件
    //         })
    //     );
    // }};
};
