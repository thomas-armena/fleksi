const path = require('path');

const entryIndex = path.resolve(__dirname, '..', 'src', 'renderer', 'client.tsx');
const entryDir = path.resolve(__dirname, '..', 'src');
const outDir = path.resolve(__dirname, '..', 'build-client');

const babelRule = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: {
        loader: "babel-loader",
        options: {
            presets: [
              '@babel/preset-env',
              "@babel/preset-react"
            ]
        }
    },
};

const cssRule = {
    test: /\.css$/i,
    use: [
        'style-loader',
        "css-loader"
    ],
};

const scssRule = {
    test: /\.s[ac]ss$/i,
    use: [
        'style-loader',
        "css-loader",
        "sass-loader",
    ],
};

const tsRule = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
};

module.exports = {
    mode: 'production',
    entry: ['@babel/polyfill', entryIndex],
    output: {
        path: outDir,
        filename: 'renderer.js',
    },
    context: entryDir,
    module: {
        rules: [babelRule, cssRule, scssRule, tsRule],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', 'jsx'],
    },
    optimization: {
        minimize: false
    },
    target: 'node'
};