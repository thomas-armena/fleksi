import path from "path";

export const WORKING_DIR = path.resolve(process.cwd());
export const APP_DIR = path.resolve(__dirname);

export const THING_APP_REGEX = '<thing-app>';
export const PATH_TO_HTML_TEMPLATE = path.join(APP_DIR, '..', '..', 'src', 'server', 'template.html');