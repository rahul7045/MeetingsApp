const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
module.exports = {
    mode: 'development',
    entry: './src/ts/index.ts',
    output: {
        path: path.join( __dirname, 'public/dist' ),
        filename: '[name].bundle.js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.s?css$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.ts$/i,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js' ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './public/index.html',
            inject: true,
            chunks: [ 'main' ]
        })
    ]
};