import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const WORKING_DIR = path.resolve(process.cwd());
const APP_DIR = path.resolve(dirname(fileURLToPath(import.meta.url)));

export { WORKING_DIR, APP_DIR };