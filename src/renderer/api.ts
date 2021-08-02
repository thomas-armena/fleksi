import axios, { AxiosResponse, CancelTokenSource } from 'axios';
import { Thing } from '../thing';

let updateCancelSource: CancelTokenSource = null;
let getCancelSource: CancelTokenSource = null;

const updateNode = async (path: string[], value: Thing): Promise<AxiosResponse | null> => {
    const url = getUrlFromPathNodes(path);
    try {
        if (updateCancelSource != null) {
            updateCancelSource.cancel('Operation canceled');
        }
        updateCancelSource = axios.CancelToken.source();
        const response = await axios.post(url, {set: value}, {
            headers: {
                'Content-Type': 'application/json'
            },
            cancelToken: updateCancelSource.token
        });
        console.log('responsee', response);
        return response;
    } catch(error) {
        console.log("in error")
        console.error(error);
        return null;
    }
}

const getNode = async (path: string[]): Promise<Thing> => {
    const url = getUrlFromPathNodes(path)+'?raw=true';
    try {
        if (getCancelSource != null) {
            getCancelSource.cancel('Operation canceled');
        }
        getCancelSource = axios.CancelToken.source();        
        const response = await axios.get(url, {
            cancelToken: getCancelSource.token,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const getUrlFromPathNodes = (path: string[]): string => {
    let url = path.join('/');
    if (url[0] != '/') url = '/'+url;
    return url;
}

export { updateNode, getNode };