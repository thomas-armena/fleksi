"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRendererLibary = exports.buildComponentLibrary = void 0;
const path_1 = __importDefault(require("path"));
const webpack_1 = __importDefault(require("webpack"));
const constants_1 = require("./constants");
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
    use: ["style-loader", "css-loader"],
};
const scssRule = {
    test: /\.s[ac]ss$/i,
    use: [
        "style-loader",
        "css-loader",
        "sass-loader",
    ],
};
const componentLibWebpackConfig = {
    entry: ['@babel/polyfill', path_1.default.join(constants_1.WORKING_DIR, 'components', 'index.js')],
    output: {
        path: path_1.default.resolve(constants_1.WORKING_DIR, 'build'),
        filename: 'components.js',
        library: 'Components',
    },
    context: path_1.default.resolve(constants_1.WORKING_DIR, 'src'),
    module: {
        rules: [babelRule, cssRule, scssRule],
    },
    optimization: {
        minimize: false
    },
};
const rendererWebpackConfig = {
    entry: ['@babel/polyfill', path_1.default.join(constants_1.APP_DIR, '..', 'src', 'renderer', 'index.js')],
    output: {
        path: path_1.default.resolve(constants_1.WORKING_DIR, 'build'),
        filename: 'renderer.js',
        library: 'Renderer',
    },
    context: path_1.default.resolve(constants_1.APP_DIR, 'renderer'),
    module: {
        rules: [babelRule, cssRule, scssRule],
    },
    optimization: {
        minimize: false
    },
};
const runWithConfig = (config) => {
    return new Promise((resolve, reject) => {
        const compiler = webpack_1.default(config);
        compiler.run((err, stats) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(stats.toString({
                chunks: false,
                colors: true // Shows colors in the console
            }));
        });
    });
};
const buildComponentLibrary = () => runWithConfig(componentLibWebpackConfig);
exports.buildComponentLibrary = buildComponentLibrary;
const buildRendererLibary = () => runWithConfig(rendererWebpackConfig);
exports.buildRendererLibary = buildRendererLibary;
//# sourceMappingURL=build.js.map