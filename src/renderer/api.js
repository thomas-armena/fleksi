import axios from 'axios';

const updateCancelToken = axios.CancelToken.source();
const getCancelToken = axios.CancelToken.source();

const updateNode = async (path, value) => {
    const url = getUrlFromPathNodes(path);
    try {
        //updateCancelToken.cancel();
        const response = await axios.post(url, {set: value}, {
            headers: {
                'Content-Type': 'application/json'
            },
            //cancelToken: updateCancelToken.token
        });
        console.log(response);
        return response;
    } catch(error) {
        console.error(error);
    }
}

const getNode = async (path) => {
    const url = getUrlFromPathNodes(path)+'?raw=true';
    try {
        //getCancelToken.cancel();
        const response = await axios.get(url, {
         //   cancelToken: getCancelToken,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const getUrlFromPathNodes = (path) => {
    let url = path.join('/');
    if (url[0] != '/') url = '/'+url;
    return url;
}

export { updateNode, getNode };