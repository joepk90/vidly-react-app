import http from './httpsService.jsx';

const apiEndpoint = "/users";

function userUrl(id) {
    return `${apiEndpoint}/${id}`;
}

export async function register(user) {
    return await http.post(apiEndpoint, {
        email: user.username,
        password: user.password,
        name: user.name
    });
}

export function getUsers() {
    return http.get(apiEndpoint);
}

export function getUser(id) {
    return http.get(userUrl(id));
}