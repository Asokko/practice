const webpack=require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path=require('path')
const loader = require('sass-loader')

const isProd=process.env.NODE_ENV==='production' //cross-env
const isDev=!isProd
 
const filename=ext=>isDev?`bundle.${ext}`:`bundle.[hash].${ext}`
console.log('is prod', isProd)
console.log('is dev', isDev)

/*const jsLoader=()=>{
    const Loader=[
        {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
            
          }
    ]
    if(isDev){
        Loader.push('eslint-loader')
    }
}
*/
module.exports={
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: ['@babel/polyfill','./index.js'],
    output:{
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve:{
        extensions:['.js'],
        alias:{
            path: path.resolve(__dirname, 'src/'),
            pathCore: path.resolve(__dirname, 'src/core/')
        }
    },
    devtool:isDev?'source-map': false,
    devServer:{
        port: 3000,
        hot:isDev
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            minify:{
                removeComments:isProd,
                collapseWhitespace:isProd
            }
        }),
        new CopyWebpackPlugin({ patterns: [{ 
            from: path.resolve(__dirname, './src/favicon.ico'),
            to: path.resolve(__dirname, 'dist/favicon.ico') 
        }] }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    module: {
        rules: [
            {
              test: /\.s[ac]ss$/i,
              use: [
                {
                    loader:MiniCssExtractPlugin.loader,
                    options:{
                        hmr:isDev,
                        reloadALL:true
                    }
                },
                'css-loader',
                'sass-loader',
              ],
            },
            {
                test: /\.m?js$/,
                use:[
                    {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env'],
                      plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
                ]
            }
          ],
    }
}