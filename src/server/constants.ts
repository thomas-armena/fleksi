import path from 'path';

const WORKING_DIR = path.resolve(process.cwd());
const APP_DIR = path.resolve(__dirname);

console.log(`Working directory: ${WORKING_DIR}`);
console.log(`App directory: ${APP_DIR}`);


export { WORKING_DIR, APP_DIR };