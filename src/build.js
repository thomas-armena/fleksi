import path from 'path';
import webpack from 'webpack';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const WORKING_DIR = path.resolve(process.cwd());
const APP_DIR = path.resolve(dirname(fileURLToPath(import.meta.url)));

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
      // Creates `style` nodes from JS strings
      "style-loader",
      // Translates CSS into CommonJS
      "css-loader",
      // Compiles Sass to CSS
      "sass-loader",
    ],
};

const componentLibWebpackConfig = {
    entry: path.join(WORKING_DIR, 'components', 'index.js'),
    output: {
        path: path.resolve(WORKING_DIR, 'build'),
        filename: 'components.js',
        library: 'Components',
    },
    context: path.resolve(WORKING_DIR, 'src'),
    module: {
        rules: [babelRule, cssRule, scssRule],
    },
};

const rendererWebpackConfig = {
    entry: path.join(APP_DIR, 'renderer', 'index.js'),
    output: {
        path: path.resolve(WORKING_DIR, 'build'),
        filename: 'renderer.js',
        library: 'Renderer',
    },
    context: path.resolve(APP_DIR, 'renderer'),
    module: {
        rules: [babelRule],
    },
};

const runWithConfig = (config) => {
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

const buildComponentLibrary = () => runWithConfig(componentLibWebpackConfig);
const buildRendererLibary = () => runWithConfig(rendererWebpackConfig);

export { buildComponentLibrary, buildRendererLibary };

