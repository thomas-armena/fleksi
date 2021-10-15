import util from 'util';

export const logFull = (obj) => {
    console.log(util.inspect(obj, {
        showHidden: false,
        depth: null,
        colors: true,
    }));
}