const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.tsx', // Entry point for TypeScript React files
    output: {
        path: path.resolve(__dirname, './dist/'), // Output directory
        filename: 'bundle.js', // Bundled JavaScript file
        // publicPath: '/dist/', // Public path for assets
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'public', to:  path.resolve(__dirname, 'dist')},
            ],
        }),
        new CleanWebpackPlugin(), // Clean output directory
        new MiniCssExtractPlugin({ // Extract CSS into separate file
            filename: 'styles.css', // Bundled JavaScript file
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'], // Resolving file extensions
    },
    module: {
        rules: [
            // TypeScript/JSX handling
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            // CSS handling
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    // MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            },
            // SVG handling
            {
                test: /\.svg$/,
                use: {
                    loader: 'file-loader', // Use file-loader for SVG files
                    options: {
                        name: '[name].[ext]', // Keep the original file name and extension
                        outputPath: 'assets/', // Output directory for bundled SVG files
                    },
                },
            },
            // PNG handling
            {
                test: /\.png$/,
                use: {
                    loader: 'file-loader', // Use file-loader for SVG files
                    options: {
                        name: '[name].[ext]', // Keep the original file name and extension
                        outputPath: 'assets/', // Output directory for bundled SVG files
                    },
                },
            },
        ],
    },
};
