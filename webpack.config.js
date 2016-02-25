/**
 * Created by Ian on 2016/2/17.
 */
    //npm install --save-dev react-hot-loader
    //npm install --save-dev babel-loader
    //安装加载器
var webpack = require('webpack');
module.exports = {
    entry: [//它定义了打包的入口文件，数组中的文件会按顺序进行，并且它会自行解决依赖问题。
        //'webpack/hot/only-dev-server',
        //"./outerIndex.html",
        "./js/app.js"
    ],
    output: {
        path: './build/',//打包文件存放的绝对路径
        publicPath: "/build/",// 网站运行时的访问路径
        //chunkFilename: '[chunkhash:8].min.js',//md5取8位
        chunkFilename: '[id].[hash].min.js',//md5取8位
        //filename: "js/[name].[chunkhash:8].min.js"//打包后的文件名Template based on keys in entry above
        filename: "js/[name].[hash;8].min.js"//打包后的文件名Template based on keys in entry above
    },
    module: {
        loaders: [//加载器之间的级联是通过感叹号来连接
            //{ test: /\.js?$/, loaders: ['jsx?harmony']},
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},// inline base64 URLs for <=8k images, direct URLs for the rest
            {test:/\.js?$/,loader:'react-hot!jsx?harmony',exclude:/node_modeles/},
            //{test: /\.js?$/, loaders: ['react-hot?harmony'], exclude: /node_modules/},//babel ->可以让我们在js文件中随心所欲的开始写ES6规范的代码
            //{test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.css$/, loader: "style!css"},
            {test: /\.less/, loader: 'style-loader!css-loader!less-loader'}//Webpack的加载器之间可以进行串联，一个加载器的输出可以成为另一个加载器的输入。比如LESS文件先通过less-load处理成css，然后再通过css-loader加载成css模块，最后由style-loader加载器对其做最后的处理，从而运行时可以通过style标签将其应用到最终的浏览器环境。
        ]
    },
    resolve: {//resolve属性中的extensions数组中用于配置程序可以自行补全哪些后缀。比如说我们要require一个common.js文件，添加了这个配置我们只要写：require('common')；就可以了。
        extensions: ['', '.js', '.json']
    },
    plugins: [
        //function() {
        //    this.plugin("done", function(stats) {
        //        require("fs").writeFileSync(
        //            path.join('', "...", "stats.json"),
        //            JSON.stringify(stats.toJson()));
        //    });
        //}
        new webpack.NoErrorsPlugin()
        //new webpack.optimize.MinChunkSizePlugin(1000)
    ]
    //我们可以在plugin参数中配置我们需要用到的各种各样的插件。比如我们想将多个文件分开打包，可能会用到:
    /* {
     entry: { a: "./a", b: "./b" },
     output: { filename: "[name].js" },
     plugins: [ new webpack.CommonsChunkPlugin("init.js") ]
     }};
     */
}