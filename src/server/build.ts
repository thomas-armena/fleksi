import path from 'path';
import webpack from 'webpack';
import { WORKING_DIR, APP_DIR } from '../utils/constants';

const babelRule: webpack.RuleSetRule = {
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

const cssRule: webpack.RuleSetRule = {
    test: /\.css$/i,
    use: ["style-loader", "css-loader"],
};

const scssRule: webpack.RuleSetRule = {
    test: /\.s[ac]ss$/i,
    use: [
      "style-loader",
      "css-loader",
      "sass-loader",
    ],
};

const tsRule: webpack.RuleSetRule = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
};

const componentLibWebpackConfig: webpack.Configuration = {
    entry: ['@babel/polyfill', path.join(WORKING_DIR, 'components', 'index.js')],
    output: {
        path: path.resolve(WORKING_DIR, 'build'),
        filename: 'components.js',
        library: 'Components',
    },
    context: path.resolve(WORKING_DIR, 'src'),
    module: {
        rules: [babelRule, cssRule, scssRule, tsRule],
    },
    optimization: {
        minimize: false
    },
};

const rendererWebpackConfig: webpack.Configuration = {
    entry: ['@babel/polyfill', path.join(APP_DIR, '..', '..', 'src', 'renderer', 'index.tsx')],
    output: {
        path: path.resolve(WORKING_DIR, 'build'),
        filename: 'renderer.js',
        library: 'Renderer',
    },
    context: path.resolve(APP_DIR, 'renderer'),
    module: {
        rules: [babelRule, cssRule, scssRule, tsRule],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    optimization: {
        minimize: false
    },
};

const runWithConfig = (config: webpack.Configuration): Promise<string> => {
    return new Promise((resolve, reject) => {
        const compiler = webpack(config);
        compiler.run((err, stats) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(stats.toString({
                chunks: false,  // Makes the build much quieter
                colors: true    // Shows colors in the console
            }));
        })
    });
}

const buildComponentLibrary = (): Promise<string> => runWithConfig(componentLibWebpackConfig);
const buildRendererLibary = (): Promise<string> => runWithConfig(rendererWebpackConfig);

export { buildComponentLibrary, buildRendererLibary };

