/**
 * Created by zhengfeiling on 17/3/1.
 */
require('shelljs/global')

var path = require('path')
var webpack = require('webpack')
var webpackConfig = require('./webpack.config')

console.log(
    '  Tip:\n' +
    '  Dist files are meant to be served over an build server.\n' +
    '  Index.html is one demo file'
)

var assetsPath = path.join(path.resolve(__dirname, '../dist'), '')
rm('-rf', assetsPath)
mkdir('-p', assetsPath)

webpack(webpackConfig, function (err, stats) {
    if (err) throw err
    process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n')
})