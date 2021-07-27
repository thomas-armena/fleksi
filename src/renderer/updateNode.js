import axios from 'axios';

const updateNode = async (path, value) => {
    let url = path.join('/');
    if (url[0] != '/') url = '/'+url;
    console.log(url);
    try {
        const response = await axios.post(url, {set: value}, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
    } catch(error) {
        console.error(error);
    }
}

export default updateNode;