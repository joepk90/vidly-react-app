import http from './httpsService.jsx';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + "/users";

export async function register(user) {
    return await http.post(apiEndpoint, {
        email: user.username,
        password: user.password,
        name: user.name
    });
}