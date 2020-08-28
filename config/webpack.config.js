const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    // entry: "./src/index.js",
    entry: "./src/base/index.js",
    mode:"development", 

    devServer:{
        contentBase:"./dist",
        open:true,
        port:8090
    },
    
    output : {
        filename : "test-build.js",
        path : path.resolve(__dirname,"../dist")
    },

    plugins :[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template:"./config/template.html"
        })
    ]
}