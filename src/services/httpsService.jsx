import axios from 'axios';
import { toast } from 'react-toastify';
import logger from './logService';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, error => {

    // TODO why am I receiving a 500 status, not a 404? 
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

    // unexpected errors (erros that shouldn't occur: network down, server down, database down, bug)
    // - Log them
    // - display a generic and freindly error message

    if (!expectedError) {
        logger.log(error);
        toast.error('unexpected error occured');
    }

    return Promise.reject(error);

});

// set jwt function handled in here to remove bi-directional dependancies
// authService is reliant on httpService. authService shouldn't also be reliant on httpService
function setJwt(jwt) {
    axios.defaults.headers.common['x-auth-token'] = jwt;
}


export default {

    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt
}